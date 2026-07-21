---
title: "MCP: Under the Hood"
description: "How the protocol that connects agents to software actually works — and why it won."
order: 12
icon: "code"
---

> Peter Steinberger, creator of OpenClaw, described MCP as USB-C for AI. Before USB-C existed, every device had a different port. Every cable was purpose-built for one connection. Changing laptops meant changing chargers, adapters, and dongles. USB-C did not make any single device smarter. It made every device compatible with every other device. MCP does the same thing for AI agents and software systems.

The case for autonomous agents rests almost entirely on this protocol. Without it, every agent deployment is a custom integration project. With it, a stock operator can connect to any MCP-compliant platform — Salesforce, HubSpot, FlowWink, your own internal ERP — in hours, not months. Understanding how MCP works is understanding why the agentic stack is deployable now.

One standard. One protocol. An agent that speaks MCP can connect to any platform that also speaks MCP — immediately, without knowing its API format, its authentication scheme, its error codes, or its pagination conventions. The FlowWink MCP server that Clawable uses to read leads and create invoices is the same protocol surface that any other MCP-compliant agent could use. The protocol handles the handshake. The agent handles the reasoning.

---

## How a Tool Call Actually Works

An MCP tool is a function with a name, a description, and a schema — a precise specification of what inputs the tool accepts and what structure its output will have. The description is written in natural language, because the agent reads it to understand what the tool does and when to use it. The schema is written in JSON Schema, because the protocol needs to validate that the agent's call is correctly formed before forwarding it to the underlying system.

When Clawable decides to qualify a lead, it does not directly call FlowWink's internal API. It constructs an MCP tool call — a structured JSON object that says: invoke `flowwink__qualify_lead` with these parameters. The MCP server receives the call, validates the parameters against the schema, calls the underlying business logic, and returns a structured response. The agent reads the response, interprets it, and decides what to do next.

This flow — agent constructs call, server validates, business logic executes, response returned — happens dozens of times in a single heartbeat cycle. Each call is independent, logged, and traceable. When something goes wrong, the failure is visible at the protocol layer: was the schema invalid, was the tool unavailable, did the underlying system return an error? The MCP layer does not hide these failures — it surfaces them in a standardized format that the agent can reason about and, in many cases, recover from automatically.

The practical implication is governance: because every tool call is logged at the protocol layer, every autonomous action an agent takes is auditable. Not approximately — exactly. The call, the parameters, the response, the timestamp. That audit trail is what makes the accountability model workable in practice rather than theoretical.

---

## Two Tools, Five Hundred Skills

A 500-skill surface creates a problem on the *client's* side of the wire: every tool definition the server advertises lands in the client model's context. Ship the full catalog and you have spent tens of thousands of tokens before the agent has read a single business record — most MCP clients have a tool budget, and 512 definitions blow straight through it. Chapter 19 covers this economy for the embedded operator; the MCP surface needs an answer for external clients too.

FlowWink's surface gives the client three postures:

1. **The full list** — every skill as a first-class tool. Right for narrow deployments and tool-picker UIs; wrong for a reasoning loop.
2. **Group filtering** — `?groups=sales,finance` pulls only that toolkit (built-in groups: marketing, sales, operations, support, finance, content). The client curates a subset once, at connection time.
3. **The dispatch pair** — two meta-tools that stand in for the entire catalog: `search_skills(query)` returns the ranked handful of skill definitions relevant to the task, and `execute_skill(name, arguments)` runs the chosen one. The client's model holds *two* tool definitions in context — and can still reach all 512.

The dispatch pair is the interesting one, because of what sits behind it: `search_skills` reuses the **same intent scorer** that narrows the catalog for FlowPilot's heartbeat turns. One scorer, two consumers — the embedded operator gets its ~25 filtered skills per turn, the external client gets its ranked handful per search, and an instruction improved once improves both paths. The convergence story from chapter 15, extended across the wire: the client operates against the full surface without the full surface ever entering its context.

A note on status, because the distinction matters: the dispatch pair is a **best practice, not a standard**. Nothing in the MCP specification defines `search_skills` or `execute_skill` — the protocol happily lets a server advertise all 512 tools and watch the client drown. FlowWink chose the pattern deliberately, and the same two-tool shape keeps appearing across the ecosystem as every large surface hits the same wall — search-then-invoke is where the convention is heading. It has the look of a future standard; today it is a design choice you make on purpose. `hypothesis` on the standardization, `validated` on the mechanism running in production.

---

## Resources and Observability

MCP tools are write-capable — they can create, update, and delete data. MCP resources are the read-only complement — structured views of the system's current state that an agent can inspect without risk of modification.

FlowWink exposes resources alongside its tools: the current state of the lead pipeline, the list of overdue invoices, the heartbeat status of the agent itself. An agent reading these resources gets a snapshot of the system at a point in time — useful for context before taking action, useful for verification after taking action, and useful for humans reviewing what the agent saw and why it acted as it did.

This is the observability layer. Every autonomous action an agent takes should be legible to the humans who are responsible for the business. Resources make that legibility possible: you can see what the agent read, what it found, and what it concluded. The agent's reasoning is not a black box — it is a chain of tool calls and resource reads that can be reviewed, audited, and replayed.

---

## Arazzo — Sequencing Above MCP

MCP defines *what* an agent can call. The [Arazzo Specification](https://www.openapis.org/arazzo-specification), from the OpenAPI Initiative, is the emerging layer above it: proven multi-step sequences stored as reviewable, versioned workflow specs instead of re-reasoned on every run — and agents are beginning to author those specs themselves after completing novel sequences, the self-documenting operator that Book 3 picks up. Not required for an initial deployment; revisit it when your operation surface matures from exploratory to documented process.

---

## Why MCP Won

MCP was not the first attempt at a standard for AI-to-software communication. It won on three things: timing (it arrived just as practitioners had been burned by enough brittle custom integrations to want a standard), tooling (production-grade SDKs, conformance tests, clear error codes — not a research whitepaper), and openness (no vendor extracting rent, so every new MCP server makes agents more capable and the network effect compounds without central control).

---

## What It Means for SaaS Vendors

A platform with a good MCP surface is a platform agents can use; one without is a platform that gets worked around — or replaced. The long-term dynamic favors software that is legible to agents, and FlowWink built its surface before the market asked: 500+ exposed skills, stable schemas, and a running external operator proving the platform in autonomous operation.

---

*Next: [OpenClaw Architecture →](/builder/13-openclaw-architecture)*
