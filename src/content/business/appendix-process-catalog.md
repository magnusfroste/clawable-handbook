---
title: "Where to Point the Agent First — A Process Catalog"
description: "The thirteen standard business processes, what an agent actually runs today, and which business lever each one pulls."
order: 87
icon: "map"
appendix: true
---

> Chapter eleven gave you the value tiers and the two-dimensions map. This appendix makes it concrete: the standard processes every B2B company runs, what an agent can actually execute in them *today*, and which of the three business levers each one pulls — **more deals, faster and safer cash, or lower cost per function.**

The rows below come from the reference implementation's live coverage map — FlowWink's process catalog, where every process carries a documented maturity level and an agent-coverage table, updated as the platform evolves. `validated` Two levels matter for this appendix: **operational** means the process runs end-to-end and an agent works it through the MCP surface with approval gates; **agent-augmented** means the agent already executes parts of the process autonomously, in production.

| Process | The agent today | Lever |
|---|---|---|
| **Lead-to-Customer** | Agent-augmented: qualifies, scores, enriches, routes — the pipeline builds itself | More deals |
| **Content-to-Conversion** | Agent-augmented: publishes, tracks, diagnoses the funnel from post to pipeline | More deals |
| **Quote-to-Cash** | Operational: drafts quotes, chases signatures, links deal → invoice → payment | Faster, safer cash |
| **Subscribe-to-Renew** | Operational: renewal triggers, proration, the expiring contract that never goes silent | Faster, safer cash |
| **Record-to-Report** | Operational: continuous reconciliation — month-end becomes a state, not an event | Faster, safer cash |
| **Procure-to-Pay** | Operational: three-way match, expense compliance, the invoice that matches no PO | Lower cost |
| **Support-to-Resolution** | Operational: triage, knowledge-base answers, escalation with context attached | Lower cost |
| **Order-to-Delivery** | Operational: order status, inventory signals, SLA watch | Lower cost |
| **Hire-to-Retire** | Operational: recruitment pipeline, document flow, onboarding checklists | Lower cost |
| **Return-to-Refund** | Operational: return → inventory → credit note, connected | Lower cost |
| **Acquire-to-Retire** | Operational: asset register tied to purchasing and accounting | Lower cost |

The sequencing follows directly from chapter eleven: start where the tier-1 value meets the highest agent maturity — **Lead-to-Customer plus the cash lane (Quote-to-Cash, Subscribe-to-Renew)**. That is the corner of the map where the operator earns its first quarter's trust, with findings a CFO can verify against the ledger.

And the risk question has the same answer here as in chapter fourteen: delegation is safe not because you *trust* the agent — because you **verify** it, at a glance, through the peepholes built where the human stands. Every process above is designed around that principle: the agent runs the flow, the human moves the card.

---

## The Living Catalog

This appendix is a snapshot. The full catalog lives in the open — every process documented with its maturity level, its agent-coverage table, its state machines, and (most usefully) its **gap lists**: the parts not yet built, which is where adopters and contributors can create value first.

**[github.com/magnusfroste/flowwink → docs/processes](https://github.com/magnusfroste/flowwink/tree/main/docs/processes)**

The funnel is deliberate: this handbook explains the paradigm, the catalog shows where it runs today, and the gap lists show where you can build. FlowWink is the reference implementation — native agent-first, 300+ skills across 60+ modules — but the process list itself is universal. Map your own stack against it, whatever your platforms are, and you have your deployment plan.

---

*Back to the argument: [Enterprise Outlook →](/business/11-enterprise-outlook) · [Your Role in This →](/business/15-your-role-in-this)*
