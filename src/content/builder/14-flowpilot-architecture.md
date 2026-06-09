---
title: "Inside FlowPilot"
description: "The embedded agent architecture — what native agentic design looks like when the agent lives inside the platform."
order: 14
icon: "cpu-chip"
---

> The previous chapter covered the external operator — what it takes to deploy and govern an agent that lives above your stack. This one covers the other half. An agent that lives *inside* the platform it operates.

Chapter five mapped the embedded vs. external decision at a strategic level. FlowPilot is embedded depth made concrete — the reference implementation of what it means to build natively agentic rather than bolt on an agent after the fact.

FlowPilot is FlowWink's native agent. It runs on the same database, the same authentication layer, and the same runtime as the rest of the platform. An external operator reads FlowWink through a 250+ skill MCP surface. FlowPilot reads the database directly.

For a builder, the architectural details matter because they determine what the agent can and cannot do. Three consequences follow from the depth.

---

## Three Things Depth Buys

**Sub-millisecond latency.** When FlowPilot needs to check whether a lead has any associated open invoices, it queries the database in the same call. No HTTP round-trip. No serialization overhead. The consequence is practical: proactive workflows that would be too slow over MCP are trivial inside the platform.

**Context an external operator cannot see.** The FlowWink MCP surface exposes 250+ skills — comprehensive but still a surface. FlowPilot sees every table, every row, every row-level security policy that governs human users. When a customer's history spans CRM, billing, support, and content, FlowPilot holds the full record in one reasoning context. An external operator holds what the MCP surface returns.

**Runtime skill evolution.** FlowPilot can register a new skill, update an existing one, or retire one that no longer fits — at runtime, without a deployment. When FlowWink's MCP surface adds a new tool, FlowPilot can examine it on the next heartbeat cycle and decide whether to incorporate it. The skill registry is not a config file that humans maintain. It is state the agent manages as part of operating.

---

## Why This Is the Other Half, Not the Whole

Embedded depth and external breadth are the two sides of the architecture from chapter ten. Neither makes the other redundant.

FlowPilot handles the work that needs deep context and low latency inside FlowWink. Clawable handles the work that requires reading across FlowWink, Fortnox, a support desk, and a data warehouse at the same time. The handshake between them — FlowPilot answering an A2A call from Clawable with the same depth it brings to its own heartbeat — is where federated execution starts to look like an operating system for the business.

The 2028 enterprise will run both. A native agent in every platform that can afford one, plus an external orchestrator holding the cross-system view. The platforms that ship only one half will be operating at a disadvantage against customers who chose platforms that ship both.

---

*Builder edition: the full architectural treatment of FlowPilot — memory tiers, skill system internals, concurrency, self-healing, trust gates — lives in the builder handbook, chapter 13. This operator edition captures only what the business leader needs to understand the hybrid story.*

---

*Next: [Making SaaS Agent-Ready →](/business/15-making-saas-agent-ready)*
