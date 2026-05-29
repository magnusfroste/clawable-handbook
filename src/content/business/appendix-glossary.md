---
title: "Appendix: Glossary"
description: "The operator-edition vocabulary — what every term in this handbook means, in the order a business leader will encounter it."
order: 91
icon: "book-open"
appendix: true
---

The builder edition carries a wider technical vocabulary. This glossary covers only the terms a business leader needs to read, direct, and govern an external operator.

---

## Agents and Roles

| Term | Definition |
|------|------------|
| **Agent** | Software that reads its context, decides what to do, and acts — without being triggered each time by a human. The unit the handbook refers to throughout. |
| **Agent Manager** | The human role responsible for setting objectives, monitoring the operator's behavior, and recalibrating when stagnation or drift appears. Term coined by Harvard Business Review, February 2026. |
| **External Operator** | An agent that sits *above* a SaaS platform and reads it through a standardized protocol. Clawable, in this handbook, is the reference external operator. |
| **Native Agent** | An agent built *inside* a SaaS platform, sharing its database and runtime. FlowPilot, inside FlowWink, is the reference native agent. |
| **Federation** | Two or more agents coordinating — an external operator delegating deep work to a native agent, or agents from different businesses transacting with each other. Enabled by the A2A protocol. |

---

## Protocols and Surfaces

| Term | Definition |
|------|------------|
| **MCP (Model Context Protocol)** | The standardized layer that makes a SaaS platform legible to an agent. Exposes tools and schemas the agent can call. If a capability is not in MCP, the agent cannot reach it. |
| **A2A (Agent-to-Agent)** | The protocol that lets one agent call another and receive a structured response. How an external operator delegates to a native agent. |
| **Skill** | A single callable capability the operator can invoke — qualify a lead, create an invoice, publish a post. Each skill has a description, a schema, and a trust level. |
| **MCP Surface** | The full set of tools a platform exposes to agents. FlowWink's MCP surface is 200+ skills at the time of writing. |

---

## Identity and Memory

| Term | Definition |
|------|------------|
| **SOUL.md** | The file that defines the operator's personality — voice, tone, style. Loaded every session. |
| **AGENTS.md** | The file that defines how the operator works — operating rules, mandate boundaries, priorities, what to escalate. The governance document. |
| **HEARTBEAT.md** | The file that defines what the operator does on its autonomous cycle, when nobody is asking. |
| **Heartbeat** | The scheduled cycle the operator runs on its own — reads objectives, checks system state, acts on what it finds, goes back to sleep. Typical cadence: 30 minutes to a few hours. |
| **Daily Memory** | The operator's working journal. One file per day, dated. Raw log of what happened. |
| **Long-term Memory** | A curated file that records what mattered across sessions. The operator distills daily memory into it during its own cycles. |

---

## Governance

| Term | Definition |
|------|------------|
| **Approval Gate** | A configuration that pauses the operator before a high-risk action and requires human approval. Every skill carries a trust level: `auto`, `notify`, or `approve`. |
| **McKinsey Four-Layer Model** | Accountability framework: Design (who built the skill), Deploy (who authorized it), Operate (who monitors it), Review (who audits it). From *Trust in the Age of Agents* (March 2026). |
| **Stagnation** | A long-term failure mode where the operator stops learning and settles into repetitive output. Caused by memory saturation, checklist ossification, no external stimulation. |
| **Drift** | A long-term failure mode where the operator's behavior shifts away from its original design over time. Caused by reflection-loop bias, content exposure, soul mutation. |

---

## Maturity Levels

| Term | Definition |
|------|------------|
| **L1 Reachable** | Platform exposes MCP. Basic CRUD works. Agent can answer questions and execute explicit commands. |
| **L2 Operable** | Full business skills exposed. Descriptions are briefings, schemas are tight. Agent can run end-to-end workflows. |
| **L3 Resilient** | Observability, idempotency, self-healing. Agent can run autonomously on a heartbeat. |
| **L4 Federation-Ready** | A2A, event subscriptions, absence-detection primitives. Agent can participate in a multi-agent network. |

---

## Platforms Referenced

| Term | Definition |
|------|------------|
| **OpenClaw** | The open-source agent runtime Peter Steinberger released in 2025. The reference architecture for identity-as-files, heartbeat-as-cron, memory-as-markdown. |
| **ClawClass** | The multi-tenant deployment layer that runs multiple OpenClaw operators side by side on shared infrastructure. Where Clawable lives in production. |
| **Clawable** | The reference external operator in this handbook. An OpenClaw instance deployed on ClawClass that reads FlowWink via MCP. |
| **FlowWink** | The self-hosted business operating system used as the reference platform throughout this handbook. Combines CRM, ERP, and CMS in one data model — deal pipeline, quote-to-cash, accounting, contracts, content publishing, HR. Comparable to Odoo but built natively for the agent era. |
| **FlowPilot** | FlowWink's native agent — runs embedded inside the platform, on the same database and runtime. |

---

*If a term appears in the handbook and is not defined here, it is either too specific to the builder edition to carry operator-level meaning, or it is an ecosystem reference with its own documentation. The goal of this glossary is to make the operator-edition text self-contained for a business reader.*
