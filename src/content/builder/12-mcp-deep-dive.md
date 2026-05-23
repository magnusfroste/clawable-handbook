---
title: "MCP: Under the Hood"
description: "How the protocol that connects agents to software actually works — and why it won."
order: 12
icon: "code"
---

> Peter Steinberger, creator of OpenClaw, described MCP as USB-C for AI. Before USB-C existed, every device had a different port. Every cable was purpose-built for one connection. Changing laptops meant changing chargers, adapters, and dongles. USB-C did not make any single device smarter. It made every device compatible with every other device. MCP does the same thing for AI agents and software systems.

The case for autonomous agents rests almost entirely on this protocol. Without it, every agent deployment is a custom integration project. With it, a stock operator can connect to any MCP-compliant platform — Salesforce, HubSpot, FlowWink, your own internal ERP — in hours, not months. Understanding how MCP works is understanding why the agentic stack is deployable now.

Before MCP, connecting an AI agent to a piece of software required building a custom integration for each pair. The agent for your CRM needed to know the CRM's specific API format, its authentication scheme, its error codes, its pagination conventions. If you wanted the same agent to also talk to your invoicing system, you built a second custom integration. Every new platform meant a new bespoke layer. The integrations were fragile, expensive to maintain, and invisible to each other.

MCP ended that. One standard. One protocol. An agent that speaks MCP can connect to any platform that also speaks MCP — immediately, without custom integration work. The FlowWink MCP server that Clawable uses to read leads and create invoices is the same protocol surface that any other MCP-compliant agent could use. The protocol handles the handshake. The agent handles the reasoning.

---

## How a Tool Call Actually Works

An MCP tool is a function with a name, a description, and a schema — a precise specification of what inputs the tool accepts and what structure its output will have. The description is written in natural language, because the agent reads it to understand what the tool does and when to use it. The schema is written in JSON Schema, because the protocol needs to validate that the agent's call is correctly formed before forwarding it to the underlying system.

When Clawable decides to qualify a lead, it does not directly call FlowWink's internal API. It constructs an MCP tool call — a structured JSON object that says: invoke `flowwink__qualify_lead` with these parameters. The MCP server receives the call, validates the parameters against the schema, calls the underlying business logic, and returns a structured response. The agent reads the response, interprets it, and decides what to do next.

This flow — agent constructs call, server validates, business logic executes, response returned — happens dozens of times in a single heartbeat cycle. Each call is independent, logged, and traceable. When something goes wrong, the failure is visible at the protocol layer: was the schema invalid, was the tool unavailable, did the underlying system return an error? The MCP layer does not hide these failures — it surfaces them in a standardized format that the agent can reason about and, in many cases, recover from automatically.

The practical implication is governance: because every tool call is logged at the protocol layer, every autonomous action an agent takes is auditable. Not approximately — exactly. The call, the parameters, the response, the timestamp. That audit trail is what makes the accountability model workable in practice rather than theoretical.

---

## Resources and Observability

MCP tools are write-capable — they can create, update, and delete data. MCP resources are the read-only complement — structured views of the system's current state that an agent can inspect without risk of modification.

FlowWink exposes resources alongside its tools: the current state of the lead pipeline, the list of overdue invoices, the heartbeat status of the agent itself. An agent reading these resources gets a snapshot of the system at a point in time — useful for context before taking action, useful for verification after taking action, and useful for humans reviewing what the agent saw and why it acted as it did.

This is the observability layer. Every autonomous action an agent takes should be legible to the humans who are responsible for the business. Resources make that legibility possible: you can see what the agent read, what it found, and what it concluded. The agent's reasoning is not a black box — it is a chain of tool calls and resource reads that can be reviewed, audited, and replayed.

---

## Beyond Tools: MCP Apps

MCP started as a protocol for tool calls — structured functions an agent can invoke. But the protocol has expanded.

In April 2026, the MCP ecosystem introduced **MCP Apps** — an official extension that allows agents to render interactive UIs (charts, forms, dashboards) inline within compliant chat clients like Claude and ChatGPT. This is not a side project. It is an official protocol extension with its own TypeScript SDK and over 2,000 GitHub stars within weeks of launch.

The strategic implication: MCP is no longer just about what an agent can *do*. It is about what an agent can *show*. A SaaS platform that exposes both tools and apps becomes legible to agents in two dimensions — operational (call this function, get this result) and presentational (render this dashboard, display this form, show this chart). The agent becomes not just an operator but an interface.

For SaaS vendors, this shifts the competitiveness question. It is no longer just "does your platform have an MCP surface?" It is "does your platform expose interactive experiences that agents can present to users?" The platforms building both layers now will serve the transition from human-operated to agent-mediated software. The platforms building only tools will be functional but invisible — the agent can act on your data but cannot show the user what it found in a way they can interact with.

---

## Arazzo — Sequencing Above MCP

MCP defines *what* an agent can call. Arazzo defines *how* calls chain together.

The [Arazzo Specification](https://www.openapis.org/arazzo-specification), published by the OpenAPI Initiative, is the emerging standard for describing multi-step API workflows. Where a regular API specification says "this endpoint exists and accepts these parameters," Arazzo says "to complete this business process, call endpoint A with the output of endpoint B, then conditionally call endpoint C if the response meets condition D."

For agentic systems, this distinction matters:

Without Arazzo, the agent reasons about how to sequence tool calls on every invocation — which introduces inconsistency, latency, and the possibility of taking a subtly different path each time through a process that has a correct sequence.

With Arazzo, proven workflows are stored as specifications. The agent can discover them, execute them deterministically, and even author new ones after completing novel multi-step processes. The workflow becomes a first-class artifact — reviewable, versioned, shareable.

```yaml
# Simplified Arazzo workflow fragment
arazzo: 1.0.0
info:
  title: Lead-to-Contract Workflow
  version: 1.0.0
workflows:
  - workflowId: qualify-and-contract
    summary: Qualify a lead and if scored >80, create a draft contract
    steps:
      - stepId: qualify
        operationId: flowwink__qualify_lead
        successCriteria:
          - condition: $statusCode == 200
        outputs:
          score: $response.body#/score
      - stepId: create-contract
        operationId: flowwink__create_contract
        condition: $steps.qualify.outputs.score > 80
        parameters:
          - name: lead_id
            in: query
            value: $inputs.lead_id
```

**Why this is directly relevant to FlowWink's MCP surface:** The 200+ skills across 60+ modules represent orchestration opportunities — but an agent reasoning freshly about how to sequence invoice creation, contract signing, and CRM status updates on every heartbeat cycle is less reliable than an agent following an Arazzo workflow that encodes the proven sequence. As FlowWink's operation surface matures, Arazzo workflows become the mechanism for crystallizing operational knowledge into reusable, auditable procedures.

**The agent as workflow author:** Nordic APIs reports that AI agents are beginning to author Arazzo workflows themselves — discovering a sequence that works, and persisting it as a formal workflow specification. This closes a loop between agentic execution and documented process: the agent that successfully runs a multi-step recovery procedure can write the Arazzo spec for that procedure, making it available for deterministic replay. This is the self-documenting operator — a thread that runs through the self-learning architecture described in The Learning Operator (Book 3).

Arazzo is not yet required reading for an initial FlowWink deployment. It is the right layer to build toward as the deployment matures from exploratory operation to documented, reproducible process.

---

## Why MCP Won

MCP was not the first attempt at a standard protocol for AI-to-software communication. What made it succeed where earlier attempts did not was timing, tooling, and the decision to make it genuinely open.

The timing: MCP arrived as the agent ecosystem was professionalizing. The early wave of AI demos used brittle custom integrations. By 2025, practitioners building production systems had experienced enough integration failures to be motivated by a standard. The demand was real and the alternatives were costly.

The tooling: mature SDKs in TypeScript and Python, conformance tests, clear error codes, and active development on the specification itself. Not a research-grade whitepaper — production-grade infrastructure, tested in real deployments.

The openness: MCP is not owned by a vendor trying to extract rent from the ecosystem. Any platform can implement it. Any agent framework can speak it. Any business can build on it without a licensing conversation. The ecosystem grows because the incentives align — more MCP servers mean more capable agents, which means more demand for MCP servers. The protocol benefits from network effects without requiring central control.

---

## What It Means for SaaS Vendors

A SaaS platform with a good MCP surface is a platform that agents can use. A SaaS platform without one is a platform that agents cannot use — which, as operator deployments become common, increasingly means a platform that gets bypassed.

The businesses deploying external operators like Clawable are making implicit choices about which platforms are part of their agent-accessible stack. If your invoicing system speaks MCP, the agent can read overdue invoices and trigger reminders. If it does not, the agent works around it — or the business replaces it with one that does.

SaaS vendors who have built for MCP are positioning themselves as components in the agentic stack rather than islands that require manual human operation. The long-term competitive dynamic favors platforms that are legible to agents: they get the workflow integrations, the automation use cases, and the stickiness that comes from being deeply embedded in how the business operates.

FlowWink built its MCP surface before the market demanded it. The consequence is 200+ exposed skills, stable schema definitions, and a running external operator that demonstrates what the platform can do in autonomous operation. That surface — the proof that the platform is genuinely agent-ready — is now part of how FlowWink differentiates itself.

The vendors who build the same surface in 2026 will have it ready when the market expects it in 2027. The vendors who wait for the market to demand it will build it at exactly the moment when it is no longer a differentiator.

---

*Next: [OpenClaw Architecture →](/builder/13-openclaw-architecture)*
