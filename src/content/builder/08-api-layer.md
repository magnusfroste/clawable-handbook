---
title: "The API Layer"
description: "The three diverging inference APIs, why agentic tools enforce strict formats, and how proxies like LiteLLM preserve your freedom to switch."
order: 8
icon: "arrows-right-left"
---

## A Story That Plays Out Every Year

A team builds an autonomous agent. It works beautifully. The model they chose produces excellent results, the integration is clean, the system runs in production for six months without problems.

Then the API changes.

The provider introduces a new format with better capabilities for agentic workflows. The old format still works, but the new one is faster, cheaper for long sessions, and supports tools the old format can't. Except the new format's response structure is entirely different — not a message, but a typed array of interleaved blocks. The 800 lines of parsing logic the team wrote for the old format are now a liability.

Some teams rewrite. Some never make the jump. Some get locked in.

This is not a hypothetical. It is the situation in 2026, and it will repeat. The question is not whether your agent's API layer will need to change — it's whether you've built it with enough abstraction that change is a day's work rather than a month's.

> **The model is not the bottleneck. The API format is.** Every autonomous agent sits on top of an inference layer, and the choices made there — which format, which provider, which proxy — determine how portable, maintainable, and trustworthy the agent is over time.

---

## The Fragmentation Problem

For most of 2023–2024, the choice was easy: OpenAI's `/v1/chat/completions` was the de facto standard. Every framework, every library, every tutorial used it. You picked a model, called the endpoint, parsed the response.

That clarity is gone.

In 2026, there are three distinct API formats in active production use, each with a different design philosophy — and each represents a different theory about where the agent logic should live: in your code, in the API layer, or inside the model itself.

| Format | Endpoint | Provider | Designed for |
|--------|----------|----------|-------------|
| **Chat Completions** | `POST /v1/chat/completions` | OpenAI (universal) | Stateless text generation |
| **Responses API** | `POST /v1/responses` | OpenAI | Agentic workflows with built-in tools |
| **Messages API** | `POST /v1/messages` | Anthropic | Claude-native capabilities |

These are not minor variations. Understanding the differences — and choosing deliberately — is the difference between an agent you can maintain and one that owns you.

---

## Chat Completions — The Lingua Franca

Think of Chat Completions as English: not the most elegant language, not the most expressive — but the one everyone speaks. Every AI provider supports it. Every framework is built on it. If you write your agent against this format, you can swap the model underneath without rewriting a line of logic.

The mechanics: you send a list of messages (the conversation history), the model replies. Simple and stateless — the API remembers nothing between calls. You own the history and pass it along every time.

In technical terms: `/v1/chat/completions` is the de facto standard endpoint. You send an array of messages, the model replies. Stateless by design. You own the conversation history and pass it with every request.

```json
POST /v1/chat/completions
{
  "model": "gpt-4o",
  "messages": [
    {"role": "system", "content": "You are FlowPilot..."},
    {"role": "user",   "content": "Qualify this lead"},
    {"role": "assistant", "content": null, "tool_calls": [...]},
    {"role": "tool",   "content": "Lead score: 78", "tool_call_id": "..."}
  ]
}
```

**Strengths:**
- Supported by every major provider with minimal adapter code
- Predictable response shape (`choices[0].message.content`, `tool_calls`)
- Every framework (LangChain, LlamaIndex, Vercel AI SDK) speaks this natively
- Maximum portability — switching from GPT-4o to Gemini 2.5 is a model name change

**Weaknesses for agents:**
- No built-in tool execution (web search, code, etc.) — you orchestrate everything externally
- No server-side state — you re-send full conversation history every turn (expensive at scale)
- No extended reasoning, no prompt caching, no citation blocks
- No type-safe response shapes beyond message/tool_call

**Verdict:** Still the right default for most agent deployments. If cross-provider portability matters — and for production systems it usually does — start here.

---

## OpenAI Responses API — Agent-Native

OpenAI's `/v1/responses` (introduced early 2026) is designed for agents that run multi-step workflows within a single API call. The model can call built-in tools (web search, code interpreter, file search, computer use, remote MCP servers) and iterate — without you orchestrating each step.

```json
POST /v1/responses
{
  "model": "gpt-4o",
  "input": "Research our top 3 competitors and summarize",
  "tools": [{"type": "web_search_preview"}]
}
// Response: array of typed output items
// [text_block, tool_call, tool_result, text_block]
```

**The key difference:** the response is not `choices[0].message.content`. It's an array of typed items — text blocks, tool calls, tool results, reasoning steps. The model can interleave them in any order.

**Strengths for agents:**
- Built-in tools run server-side without your orchestration code
- `previous_response_id` chains turns without resending prior tokens
- Better cache utilization for long agentic sequences
- Computer use support native

**Weaknesses:**
- OpenAI-only natively (though proxies bridge this)
- More complex response parsing — array of typed items vs. a single message
- Overkill for simple single-turn completions
- Newer, less battle-tested in production

---

## Anthropic Messages API — Built for Reasoning

Anthropic's `/v1/messages` is Claude's native interface. On the surface it looks like Chat Completions — you send messages, you get a response. But the content model is fundamentally different: **a response is an array of typed blocks**, not a single string.

```json
POST /v1/messages
{
  "model": "claude-opus-4-6",
  "messages": [{"role": "user", "content": "Analyze this contract"}],
  "max_tokens": 4096
}
// Response content array:
[
  {"type": "thinking", "thinking": "Let me reason through..."},
  {"type": "text",     "text": "The contract has three key risks..."},
  {"type": "tool_use", "name": "search_case_law", "input": {...}}
]
```

**What this enables for agents:**

| Capability | What it means |
|-----------|--------------|
| **Extended thinking** | `type: "thinking"` blocks expose the model's reasoning chain before the final answer — visible, auditable, usable as agent context |
| **Prompt caching** | `cache_control` on specific content blocks (5-min or 1-hour TTL) — 90% cost savings for document-heavy agents like FlowPilot |
| **Citations** | `type: "text"` blocks can include exact source references (document, character range) — critical for RAG agents that must be traceable |
| **Stop reason granularity** | `stop_reason` can be `end_turn`, `tool_use`, `pause_turn`, `refusal` — each signals a different agentic state |
| **Native web search** | Pass `{"type": "web_search_20250305"}` in tools array; Claude handles server-side execution |

**Why `tool_use` matters for agent reliability:** When Claude decides to call a tool, it returns a typed `tool_use` block with a structured `input` object — not a string that needs to be parsed. The agent framework gets clean, type-safe data. No regex. No JSON.parse-guessing. This is a deliberate design choice that significantly reduces the class of "the agent thought it called a tool but actually just mentioned it" bugs.

---

## How Cline, Roo, and Claude Code Use Strict Formats

The most battle-tested agentic coding tools — Cline (59k GitHub stars), Roo Code (23k), Claude Code — have all converged on a specific pattern: **force the model to output structured, parseable content and verify it before acting.**

### The XML Tool Format (Cline / Roo)

When running against models that don't have native tool use, Cline uses a custom XML format that the model is instructed to output:

```xml
<read_file>
  <path>src/handlers/qualify-lead.ts</path>
</read_file>
```

The agent framework parses this XML to extract the tool call. This is not accident or laziness — it's a deliberate tradeoff: **strict XML is more reliably parsed than free-form JSON in a system prompt**, especially with smaller or instruction-tuned models.

The bug that surfaces most often when this fails: [Cline issue #9848](https://github.com/cline/cline/issues/9848) — *"Cline prints raw tool invocation XML in responses and gets stuck in a loop."* When the model outputs XML without the agent framework triggering the actual tool execution, the model sees its own XML in the next turn and assumes the tool ran. The agent loops.

**The fix Anthropic's native tool use solves:** When you use Claude's `tool_use` content blocks, there is no XML leaking into the conversation. The model outputs a structured `tool_use` block, the framework handles execution, and the result comes back as a `tool_result` block. The model never sees its own tool call as text — it sees a receipt.

### Claude Code's Approach

Claude Code (Anthropic's own agentic coding tool) takes the Messages API native approach exclusively. It uses:
- `tool_use` blocks for all tool calls — no XML, no string parsing
- `thinking` blocks for complex reasoning steps — the agent can introspect its own reasoning
- `tool_result` blocks with structured content — not raw strings

This makes Claude Code substantially more reliable for long agentic sequences than tools that use prompt-injected XML or chat completions with tool schemas injected in the system prompt.

**The key insight:** Anthropic's Messages API was designed with agents in mind from the start. The content block model is not just a different response format — it is a different theory of what a "response" is. A response from Claude is a sequence of typed, structured events. An agent can inspect each event type, route accordingly, and never misparse.

---

## The Proxy Revolution

Here is the practical problem: you want the reliability of Claude's native Messages API and the portability of Chat Completions. You want extended thinking but also want the option to swap to GPT-5 tomorrow. You want prompt caching without rewriting your agent's inference layer.

The solution is a **proxy** — and the analogy is a travel adapter.

When you travel between countries, your laptop doesn't care what the wall socket looks like — you carry an adapter that translates the local format to the plug your device expects. A proxy does the same for AI APIs: your agent always speaks one format (Chat Completions), and the proxy translates that to whatever the underlying model provider requires. Anthropic speaks its own language, OpenAI speaks another, Google yet another — but your agent never needs to know. It talks to the adapter.

In technical terms: a proxy is a translation layer that sits between your agent and the inference providers.

```
Your agent code
      │
      │  (speaks Chat Completions, always)
      ▼
┌───────────────┐
│  Proxy Layer  │  ← LiteLLM, Portkey, OneAPI, etc.
│               │
│  Translates:  │
│  /chat/...    │
│  /messages    │
│  /responses   │
└───────┬───────┘
        │
   ┌────┴─────────────────────┐
   ▼          ▼               ▼
 OpenAI   Anthropic        Gemini
 (native)  (/messages)    (vertexAI)
```

### LiteLLM — The Open-Source Standard

[LiteLLM](https://github.com/BerriAI/litellm) is the most widely deployed open-source proxy. It accepts Chat Completions format and translates to 100+ providers. Your code always looks the same — only the model name changes to indicate which provider you want:

```python
import litellm

# Your code always uses Chat Completions format
response = litellm.completion(
    model="anthropic/claude-opus-4-6",  # routes to Anthropic /messages internally
    messages=[{"role": "user", "content": "Qualify this lead"}]
)
# Returns standard Chat Completions response shape
```

LiteLLM internally translates the Chat Completions request to Anthropic's Messages format, handles the response mapping, and returns a Chat Completions-shaped object. Your agent code never changes.

**LiteLLM also provides:**
- Cost tracking across providers
- Load balancing between multiple instances
- Fallback routing (if Anthropic is down, route to OpenAI)
- Rate limit management
- A `/v1/messages` → `/responses` parameter mapping for OpenAI models

**Note (March 2026):** LiteLLM experienced a supply chain attack on March 26, 2026. The attack was in a dependency, not LiteLLM core code. This triggered significant community discussion about proxy dependencies in production. The incident highlights that any proxy in your inference stack is a security surface — pin your dependencies.

### Other Notable Proxies

| Proxy | Focus | Notes |
|-------|-------|-------|
| **Portkey** | Observability + routing | Supports all three API formats natively; managed service |
| **OneAPI** | Self-hosted gateway | Popular in Chinese enterprise; broad model support |
| **LocalAI** | On-premise | Local model inference with OpenAI-compatible API |
| **Ollama** | Local models | `/api/chat` (OpenAI-compatible); used with NemoClaw/NanoClaw |
| **xinference** | Local + distributed | Distributed inference, OpenAI-compatible |

**For Autoversio-style private deployments** (no data leaves the building), the proxy architecture becomes critical: `agent → LiteLLM → Ollama → local Nemotron model`. Your agent code is unchanged; the inference is entirely on-premises.

---

## How This Affects Flowwink and FlowPilot

FlowPilot's `agent-reason` edge function calls the inference provider through a configurable model resolver. The architecture matters:

**Current state:** The `agent-reason` function calls the Anthropic Messages API directly for Claude models, with model-specific handling. This gives maximum access to thinking blocks, prompt caching, and stop-reason granularity.

**The tradeoff:** Direct API calls give maximum capability but create provider coupling. If Anthropic has an outage, FlowPilot is down.

**The production-hardened approach:**

```
agent-reason edge function
        │
        │  POST  (Chat Completions format)
        ▼
  LiteLLM gateway (self-hosted or managed)
        │
   ┌────┴──────────────┐
   ▼                   ▼
Primary:            Fallback:
Anthropic           OpenAI / Gemini
claude-opus-4-6     gpt-4o
(with thinking)     (without thinking)
```

This pattern gives:
- Primary: Claude's native capabilities (thinking, caching, typed tool calls)
- Fallback: Any OpenAI-compatible model
- Agent code: Never changes regardless of routing

**The convergence thesis:** As proxies mature, the choice of inference provider becomes an operational decision, not an architectural one. Your agent's reasoning core doesn't care if it's talking to Claude or GPT-5 — the proxy abstracts that away. What remains model-specific is capability selection: if your agent *requires* extended thinking or prompt caching, you need a proxy that preserves those semantics when routing to Claude and gracefully degrades when routing elsewhere.

---

## The Design Philosophy Divergence

Looking at the three APIs together, the design philosophies are explicit:

**OpenAI (Chat Completions):** *"Give developers a simple, stateless interface and let them build the orchestration."* Maximum developer control. Minimum assumptions about what the agent needs.

**OpenAI (Responses API):** *"Move orchestration into the API for well-known agentic patterns."* Built-in tools, server-side state, reduced orchestration code. The API becomes an opinionated agentic loop.

**Anthropic (Messages API):** *"Model responses should be typed, structured events — not text."* Every piece of the response (reasoning, tool calls, citations) is a first-class typed object. The agent can inspect, route, and audit each element independently.

**What this means for agent builders:**

1. If you're building a quick prototype or a multi-model system: **Chat Completions + LiteLLM**. Maximum portability, minimum lock-in.

2. If you're building on Claude and never plan to leave: **Messages API directly**. Maximum capability, native extended thinking, prompt caching, typed tool use.

3. If you're building agents that use OpenAI's built-in tools (web search, code interpreter): **Responses API**. Server-side orchestration, reduced token overhead.

4. If you're building for enterprise with failover requirements: **any format + proxy**. Portkey or LiteLLM with fallback routing. Your agent's soul shouldn't depend on a single provider's uptime.

---

## SSE Keepalive — Surviving Long-Running Operations

Imagine you're on a phone call and say nothing for 30 seconds. The other person might assume the connection dropped and hang up. The internet works the same way: if your agent is silently working on a complex task, the infrastructure between your server and the client assumes something went wrong and cuts the connection.

A heartbeat cycle that takes 45–90 seconds hits this wall constantly.

The solution is a **keepalive** — a small signal sent every few seconds that says "still here, still working" — the technical equivalent of saying "mm-hmm" to keep the other person on the line.

In technical terms: **Server-Sent Events (SSE) with keepalive pings**.

### The Pattern

Instead of waiting silently for 90 seconds and hoping the connection survives, the edge function sends a small "still working" signal every 10 seconds while it runs. Here's what that looks like in code:

```typescript
// Edge function: stream keepalive during long-running agent operation
const encoder = new TextEncoder();
const stream = new ReadableStream({
  async start(controller) {
    // Start the keepalive ticker
    const keepalive = setInterval(() => {
      controller.enqueue(encoder.encode(': keepalive\n\n'));
    }, 10_000); // Every 10 seconds

    try {
      // Run the actual agent operation
      const result = await runHeartbeat(supabase, config);

      // Send the final result
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(result)}\n\n`));
    } finally {
      clearInterval(keepalive);
      controller.close();
    }
  }
});

return new Response(stream, {
  headers: {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  }
});
```

### Why This Works

The SSE keepalive sends a comment line (`: keepalive`) every 10 seconds. Comment lines are valid SSE format but ignored by the client. They serve one purpose: **reset the timeout counter on every intermediate hop**.

The proxy sees traffic. The CDN sees traffic. Nobody kills the connection. The agent finishes its work.

### When You Need This

Any agent operation that might exceed 25 seconds needs keepalive:

| Operation | Typical Duration | Needs Keepalive? |
|-----------|-----------------|-----------------|
| Simple tool call | 1-3s | No |
| Heartbeat (minimal) | 15-30s | Sometimes |
| Heartbeat (full cycle) | 45-90s | Yes |
| Multi-step plan execution | 60-180s | Yes |
| Large content generation | 30-60s | Yes |

The 10-second interval is conservative. Most proxies timeout at 30-60 seconds, so 10s gives comfortable headroom.

---

## The Key Takeaway for Autonomous Agents

The API format question is not academic. For long-running autonomous agents like FlowPilot — agents that run heartbeat cycles at 00:00 with critical business data — the format determines:

- **Reliability:** Native `tool_use` blocks vs. parsed XML — the difference between a stuck loop and a clean tool call
- **Cost:** Prompt caching on Messages API can cut token costs by 70-90% for repeated heartbeat context
- **Auditability:** `thinking` blocks give you a human-readable trace of the agent's reasoning — critical for governance (chapter 20)
- **Portability:** Direct API calls couple you to one provider; proxies let you route to the best available model

The agents that perform best in production are built on the right API for their capability needs, wrapped in a proxy that preserves the escape hatch.

The architecture should outlast any single model provider. If Claude disappears tomorrow, FlowPilot should keep running. The proxy layer is what makes that possible.

---

*The inference layer is not commodity infrastructure. It is the interface between your agent's reasoning and the capabilities it needs. Build it to be replaceable — because in this ecosystem, everything changes faster than you think.*

*Next: model chosen, API layer abstracted — now the ten design laws that emerged from building a production business agent on top of exactly these foundations. [The 10 Laws →](/builder/09-flowwink-laws)*
