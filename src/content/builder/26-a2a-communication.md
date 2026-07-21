---
title: "Agent-to-Agent Communication"
description: "How agents talk to each other — A2A protocol, authentication, discovery, and symbiosis."
order: 26
icon: "signal"
---

## From Reliability to Federation

The sequence so far is intentional: chapters 22–24 made a single agent governable, chapter 25 made it reliable in production. Once a single agent is reliable, the next bottleneck is coordination.

A lone agent can run a business workflow. A network of agents can split roles, cross-check each other, and scale specialization without losing control. That is federation in practice.

OpenClaw proved the personal pattern (one agent with identity and memory). Flowwink extends it into business coordination where agents delegate, audit, and report across boundaries.

---

## Three-Channel Architecture

FlowWink exposes capabilities through three complementary channels — each serving a different audience:

| Channel | Purpose | Best For | Auth | Transport |
|---------|---------|----------|------|-----------|
| **Skills** | FlowPilot autonomy — agent reasons and executes | Internal operations | Service role JWT | Edge Function (`agent-execute`) |
| **A2A** | Peer-to-peer agent collaboration (e.g., OpenClaw) | Multi-tenant business collaboration | Bearer token (hashed) | JSON-RPC via `a2a-ingest` |
| **MCP** | External AI clients (Cursor, Claude Desktop) | IDE and external tool integration | API Key (SHA-256 hashed) | Streamable HTTP via `mcp-server` |

For orientation in the wider landscape: OpenClaw's session tools handle coordination *within* a single instance. Google's A2A protocol standardizes *cross-organizational* agent communication. Flowwink's A2A sits between them — inter-tenant business collaboration, implemented on Supabase Edge Functions.

### A2A and MCP: Different Layers, Not Rivals

A common misconception in 2026 discussions is that teams must choose between A2A and MCP. In production systems, they solve different problems:

- **MCP** gives an agent tools, data, and operations (agent-to-system)
- **A2A** gives an agent peers, delegation, and coordination (agent-to-agent)

In Flowwink's QA architecture, both are required:

- FlowPilot uses **A2A** to dispatch audit assignments to OpenClaw
- OpenClaw uses **MCP** to inspect platform state and submit findings

The practical rule: if one agent needs to operate a system, start with MCP. If multiple agents need to coordinate work, add A2A on top.

---

## Flowwink's A2A Implementation

Flowwink implements agent-to-agent communication for multi-tenant scenarios — one FlowPilot agent talking to another company's agent, or to a specialist agent. This is **Flowwink's own design**, inspired by but distinct from both OpenClaw's session tools and Google's A2A protocol.

```
FlowPilot (Operator)
       │
       │ "Analyze the SEO health of our pricing page"
       │
       ▼
OpenClaw (Specialist)
       │
       │ { findings: [...], recommendations: [...] }
       │
       ▼
FlowPilot receives results → acts on them
```

FlowPilot's chat exposes skills through an @-command palette, auto-generated from `agent_skills` and scoped per surface. The detail that matters here: agent-to-agent communication uses the same pattern — `@a2a:agent-name message`.

### Mode 1: Structured (Skill Execution)

Deterministic, schema-bound, machine-to-machine:

```
Client → { skill: "get_quote", arguments: { product: "flashlight", qty: 1000 } }
Server → { price_cents: 4500, currency: "SEK", lead_days: 14 }
```

**When to use:** Known capabilities, repeatable operations, data exchange.

### Mode 2: Conversational (Chat)

Flexible, natural language, LLM-mediated:

```
Client → { text: "Can you deliver 1000 branded flashlights in 2 weeks?" }
Server → { result: "Yes. 1000 units, 2-week lead time, 45,000 SEK ex VAT." }
```

**When to use:** Exploratory questions, unknown capabilities, nuanced requests.

---

## Flowwink's A2A Architecture

### Five Edge Functions

These are **Supabase Edge Functions** — Flowwink's own implementation:

| Function | Direction | Purpose |
|----------|-----------|---------|
| `agent-card` | Inbound (GET) | Publishes Agent Card — who we are, what skills we expose |
| `a2a-ingest` | Inbound (POST) | Gateway — authenticates peer, routes to skill or chat |
| `a2a-chat` | Inbound (internal) | Handles conversational messages through LLM |
| `a2a-outbound` | Outbound (POST) | Calls external peers — auto-detects their protocol |
| `a2a-discover` | Outbound (GET) | Fetches and parses remote Agent Cards |

---

## Authentication

Flowwink's A2A uses bearer token authentication via Supabase Edge Functions:

```
Inbound (peers calling us):
  Peer → Authorization: Bearer <token>
  a2a-ingest → SHA-256(token) → lookup in a2a_peers.inbound_token_hash
  Match + status=active → proceed
  No match → 403

Outbound (us calling peers):
  a2a-outbound → lookup peer in a2a_peers
  Authorization: Bearer <peer.outbound_token>
  POST to peer.url + endpoint
```

---

## Agent Card (Discovery)

Each Flowwink agent publishes an Agent Card describing its capabilities. This follows patterns from Google's A2A protocol but is implemented as Flowwink's own Supabase Edge Function:

```json
{
  "protocolVersion": "0.3.0",
  "name": "FlowPilot",
  "description": "Built-in operator for FlowWink, the Business Operating System",
  "url": "https://.../functions/v1/a2a-ingest",
  "capabilities": { "streaming": false },
  "skills": [
    { "id": "manage_blog_posts", "name": "manage_blog_posts", "tags": ["content"] },
    { "id": "qualify_lead", "name": "qualify_lead", "tags": ["crm"] }
  ],
  "security": [{ "bearer": [] }]
}
```

Skills are loaded dynamically from `agent_skills` where `scope = 'external'` or `'both'`. Only public-facing skills are exposed to peers.

---

## The Symbiosis Model

The most powerful A2A pattern is symbiosis — two agents that make each other better:

```
┌─────────────────────────────────────────────────────────────┐
│                    SYMBIOSIS LOOP                            │
│                                                             │
│  OpenClaw (Architect)          FlowPilot (Operator)         │
│  ┌──────────────┐              ┌──────────────┐             │
│  │ Reads source │──versions──►│ Bootstrap    │             │
│  │ code + docs  │              │ seeds skills │             │
│  │              │◄──findings───│ reflects     │             │
│  │ Reviews      │              │ learns       │             │
│  └──────────────┘              └──────────────┘             │
└─────────────────────────────────────────────────────────────┘
```

One agent is the "architect" (reviews, audits, tests). The other is the "operator" (executes, manages, learns). They share findings and improve each other.

---

## Dual-Channel Communication

Flowwink supports two communication channels between agents:

| Channel | Format | Best For |
|---------|--------|----------|
| **OpenResponses** | OpenAI Responses API | QA testing, code audits, site browsing |
| **Flowwink A2A** | JSON-RPC 2.0 (custom) | Natural language chat, sharing findings |

The channel is selected automatically based on the skill's `handler` prefix:
- `responses:openclaw` → OpenResponses channel
- `a2a:openclaw` → Flowwink A2A protocol channel

---

## Structured Responses — The Caller Defines the Contract

One of the most important design decisions in Flowwink's A2A implementation is `responseSchema`. The calling agent can specify the exact structure it expects back — and the receiving agent's LLM does its best to comply.

This is verified in `a2a-ingest/index.ts` (lines 158-161, 221-223) and documented in `A2A-COMMUNICATION-MODEL.md`:

> *"The caller defines the game. The responder plays or declines."*

### Three Ways to Request Structured Data

| Strategy | Format | Reliability | When to use |
|----------|--------|-------------|-------------|
| **`skill:` prefix** | `skill:qualify_lead { "company": "Acme" }` | High — deterministic skill router | Known capability, repeatable |
| **DataPart** | `{ type: "data", data: { skill: "x", arguments: {...} } }` | High — machine-to-machine | Structured JSON-RPC calls |
| **`responseSchema`** | `{ text: "...", responseSchema: { price: "number", available: "boolean" } }` | Best-effort — LLM follows schema | Exploratory, conversational |

### How responseSchema flows through the system

```
OpenClaw calls a2a-ingest:
{
  "jsonrpc": "2.0",
  "method": "message/send",
  "params": {
    "message": { "parts": [{ "type": "text", "text": "Site health report?" }] },
    "responseSchema": {
      "pages": "number",
      "leads_7d": "number",
      "issues": "string[]",
      "health_score": "number"
    }
  }
}
        │
        ▼
a2a-ingest extracts responseSchema → injects into args
        │
        ▼
agent-execute passes responseSchema to skill handler
        │
        ▼
FlowPilot's LLM structures its response to match
        │
        ▼
OpenClaw receives:
{
  "pages": 12, "leads_7d": 34,
  "issues": ["Missing meta on /about"],
  "health_score": 87
}
```

**The practical limit:** `responseSchema` is a *suggestion* for chat mode. If the LLM ignores it, use `skill:` prefix for guaranteed structured output. The troubleshooting note in the source is explicit: *"Free-text responses instead of JSON → Use `skill:` prefix for structured calls."*

---

## MCP — The Third Channel

**MCP** is Flowwink's third channel — for external AI clients rather than agent peers. It exposes the same 500+ skill catalog FlowPilot scores internally to Cursor, Claude Desktop, and any MCP-compatible client, over Streamable HTTP with SHA-256-hashed API keys. The `mcp-server` edge function dynamically publishes skills where `mcp_exposed = true`; the admin controls exposure per skill via the shield toggle in the Engine Room UI.

The contrast with A2A is audience, not engine. A2A is agent-to-agent collaboration; MCP is human-to-agent collaboration through external tools. Both invoke the same skill engine underneath — the channel just changes who can call it. [Chapter 12](/builder/12-mcp-deep-dive) owns the full MCP surface, including client configuration.

---

## The Agentic Web — A Hypothesis

*A reading note: this section is a hypothesis about where A2A leads, not shipped architecture. Every primitive it uses exists today. The market it describes does not — yet.* `hypothesis`

Picture procurement in 2027. A manager needs 4,000 industrial components by a fixed date. She types one sentence into FlowPilot. The agent publishes a structured request — spec, quantity, deadline, and a `responseSchema` describing the answer format it needs — to every registered supplier agent. Within a minute, dozens of supplier agents have checked live stock and responded: firm quotes, instant declines, and one `pending_review` where the order value exceeded a supplier agent's autonomy and triggered *their* human-in-the-loop. FlowPilot filters, ranks, and recommends. The manager makes two decisions in three minutes, with a full audit trail. Every step maps to primitives already in this chapter: `responseSchema`, Agent Cards, bearer tokens, `pending_review` as a first-class state, the `a2a_activity` log.

Why wasn't this possible before? EDI has moved structured business messages since the 1970s, APIs since the 2000s — and procurement still looks like portals, emails, and phone calls. The difference is not the wire format. It is **what sits at each end of the wire.**

| Capability | Without agentic AI | With agentic AI |
|------------|-------------------|-----------------|
| **Interpret intent** | Manager must fill in the right fields in the right portal | "We need 4,000 DIN rail clamps by April 28" → agent understands and acts |
| **Autonomous initiative** | System waits to be triggered step by step | Agent decides *how* to solve the objective |
| **Handle unexpected states** | Requires pre-programmed fallback rules | Agent understands `"pending_review"` as a legitimate state and schedules follow-up |
| **Zero integration cost** | EDI requires months of pairwise integration per supplier | New supplier exposes an Agent Card — the agent reads it and knows what to ask |
| **Flexible schemas** | EDI requires strictly pre-agreed message formats | `responseSchema` is a *suggestion* — supplier's LLM does its best to comply |

`responseSchema` is the key primitive. It lets an agent that has never met another agent say: *"I don't know exactly how you respond, but here's the structure I need — do your best."* Structured machine-to-machine negotiation without pre-agreed schemas — the thing EDI could never do. And no central portal required: just two Agent Cards, a bearer token, and a shared JSON-RPC format.

If the hypothesis holds, it generalizes beyond procurement to every market that currently needs a directory, a broker, or a platform in the middle. The humans set the objectives. The agents handle the market. Whether it plays out this way is unproven — but the primitives are shipping now.

---

## Adding a New Peer

The process is simple and requires no code changes — register in the `a2a_peers` table:

1. Register in `a2a_peers` with `name`, `url`, `outbound_token`
2. Generate an inbound token, hash it, store in `inbound_token_hash`
3. Set `capabilities`: `{ "protocol": "jsonrpc", "endpoint": "/a2a/ingest" }`
4. Set `status: "active"`

The peer can now call us and we can call them.

---

## Building A2A-Ready Agents: Best Practices

The vision is compelling. The implementation has sharp edges. Here are the patterns that matter when you're actually building A2A integrations:

### 1. Error Handling and Timeouts

Agents go down, networks fail, LLMs hallucinate. Retry 5xx and timeouts with exponential backoff (max 3 attempts); treat 401/403 as a revoked token — log, alert, never retry; treat a 200 that doesn't match your `responseSchema` as best-effort and extract what you can. **The key rule:** never let a peer's failure crash your own reasoning loop. Wrap every outbound call so a failure degrades to a message your LLM can work with: *"Peer agent unavailable. Proceeding without external input."*

Set explicit timeouts on every call — roughly 30s for structured skill calls, 60s for conversational chat, 120s for complex tasks like QA audits where the agent browses and iterates. If a peer answers `"status": "pending_review"` (their human-in-the-loop), log the pending state and schedule a follow-up — don't poll.

### 2. Schema Versioning

`responseSchema` is a suggestion, not a contract. But your code that *parses* the response needs to be defensive:

- **Always validate** the response against the expected schema before using it
- **Use optional fields** — if a peer adds a field you didn't ask for, ignore it
- **Version your schemas** — when you change what you ask for, bump a version field so peers can distinguish old vs new requests
- **Degrade gracefully** — if the peer returns free text instead of JSON, log the raw response and present it to the admin rather than crashing

### 3. Trust and Authentication

Bearer tokens are the minimum. For production A2A networks:

- **Rotate tokens** on a schedule (90 days minimum). Store hashes, not plaintext
- **Verify Agent Cards** — before trusting a peer, fetch and validate their Agent Card. Check that the skills they claim match what they actually respond to
- **Log everything** — every inbound and outbound A2A call should be logged with timestamp, peer identity, payload hash, and response status. This is your audit trail
- **Allowlist, don't blocklist** — only communicate with explicitly registered peers. Never auto-discover and auto-trust

### 4. Idempotency and Testing

A2A calls get retried — network glitch, timeout, unclear response — so skill handlers with side effects must be idempotent: include a unique `request_id` in every call, and if the receiver has already processed that ID, return the cached response instead of executing again.

And test the integration before production: mock peers for unit tests, contract tests that verify your Agent Card matches what you actually handle, chaos tests (garbage responses, timeouts, HTTP 500 — none should break your loop), and one end-to-end run with two real agents covering the full cycle: call → reason → respond → parse.

---

## What Enterprise A2A Still Needs

Moving from two agents exchanging JSON to enterprise-grade federation requires answers that don't yet exist: a mature standard (Google A2A v0.3.0 is closest, adoption early), agent discovery at scale (something like DNS for agents), compliance-ready audit trails that satisfy procurement law, GDPR data-processing agreements for agent-to-agent flows, and liability rules for when an agent quotes wrong. These need ecosystem-level coordination — standards bodies, community conventions, regulatory input — not one vendor. The handbook tracks this space as it develops.

---

*The future of work isn't one AI doing everything. It's a network of specialized agents collaborating. OpenClaw proved intra-process coordination with session tools. Google standardized inter-organizational communication with the A2A protocol. Flowwink built its own inter-instance layer on Supabase Edge Functions. The pattern is clear — agents need to talk to each other, and the infrastructure is catching up.*

*Next: the current reference loop — FlowPilot dispatch via A2A, OpenClaw inspection via MCP, and triage-driven source fixes. [Agent-Driven Development →](/builder/27-agent-driven-development)*
