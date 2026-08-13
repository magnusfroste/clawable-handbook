---
title: "Inside FlowPilot"
description: "The embedded agent architecture — what native agentic design looks like when the agent lives inside the platform."
order: 14
icon: "bolt"
---

> The previous chapter covered the external operator — what it takes to deploy and govern an agent that lives above your stack. This one covers the other half. An agent that lives *inside* the platform it operates.

The Business Edition maps the embedded vs. external decision at a strategic level. FlowPilot is embedded depth made concrete — the reference implementation of what it means to build natively agentic rather than bolt on an agent after the fact.

FlowPilot is FlowWink's built-in operator — shipped as the platform's flagship **opt-in module**, not hardwired into it. The stack layers cleanly: the platform (skills, modules, event bus) is always on; **FlowChat**, the chat surface, is always on; FlowPilot is the operator layer on top, driving the same reasoning loop FlowChat uses — the difference is who initiates the turn, a human typing or the heartbeat acting on an objective. Switch it off and the platform loses autonomy, not capability. It runs on the same database, the same authentication layer, and the same runtime as the rest of the platform. An external operator reads FlowWink through the 500+ skill MCP surface. FlowPilot reads the database directly.

For a builder, the architectural details matter because they determine what the agent can and cannot do. Three consequences follow from the depth.

---

## Three Things Depth Buys

**Sub-millisecond latency.** When FlowPilot needs to check whether a lead has any associated open invoices, it queries the database in the same call. No HTTP round-trip. No serialization overhead. The consequence is practical: proactive workflows that would be too slow over MCP are trivial inside the platform.

**Context an external operator cannot see.** The FlowWink MCP surface exposes 500+ skills — comprehensive but still a surface. FlowPilot sees every table, every row, every row-level security policy that governs human users. When a customer's history spans CRM, billing, support, and content, FlowPilot holds the full record in one reasoning context. An external operator holds what the MCP surface returns.

**Runtime skill evolution.** FlowPilot can register a new skill, update an existing one, or retire one that no longer fits — at runtime, without a deployment. When FlowWink's MCP surface adds a new tool, FlowPilot can examine it on the next heartbeat cycle and decide whether to incorporate it. The skill registry is not a config file that humans maintain. It is state the agent manages as part of operating — with one hard exception, covered below: changing a skill's *own instructions* is always human-gated.

---

## FlowPilot 2.0 — What the Embedded Loop Learned From Hermes (July 2026)

The defining engineering problem of the embedded half is time. An external session-based agent that hits an approval gate simply retries in-session, on the next turn. An embedded cron-driven operator's "next turn" is the next heartbeat — minutes or hours later, in a fresh context, with no memory of the chain it was walking. FlowPilot 2.0 (July 2026) closed that gap by adopting three patterns from Hermes Agent — the loop-first architecture the industry converged on for embedded domain agents. *(Design doc: `docs/architecture/flowpilot-2.0.md` in the FlowWink repo.)*

**Follow-through.** The audit that triggered 2.0 found a silent failure mode worth internalizing: 24 approved-but-never-executed actions had accumulated in the approval queue. A human had said yes — payroll payments, bulk emails, expense bookings — and nothing ever came back to run them. The external agent never hits this (it retries in-session); the cron-driven operator hit it structurally. The fix is a deterministic pre-pass at the start of every heartbeat that finds fresh approved actions and completes them. The general lesson: in a heartbeat architecture, approval is not the end of the chain — something has to come back.

The harder half arrived when resumption grew from *completing one approved action* into *continuing a paused multi-step chain* — the harness chapter's H11. A proof run caught the failure mode before customers did: handed a partially completed plan, the model re-ran steps that had already succeeded. Half of them were not idempotent. The fix is fail-closed by construction — a resume directive is emitted only when **every** completed step is provably idempotent, checked against an allowlist rather than inferred; anything else pauses and surfaces for review rather than guessing. The rule worth carrying: **resumption is safe exactly as far as your idempotency guarantees reach, and not one step further.** Where they end, a human belongs.

**Pipeline collapse.** Known multi-step chains — the bookkeeping sweep, month-end invoicing — are collapsed into single composite skills that run deterministically in-process: Hermes's "zero-context-cost turns." The reasoning loop invokes one skill; the chain no longer depends on the agent hand-walking seven steps across heartbeats with the state held in context. One invariant makes this safe by construction: a composite is never a way around a stricter gate on an inner skill — an approve-gated step inside the chain makes the composite queue and report, not bypass.

**Hardening by simulation.** Before the patterns went live, a fast-forward simulation of multi-day operation exposed three operator-quality gaps no unit test would catch: *hollow turns* (a cycle with active objectives that ends having executed nothing — now rescued by one bounded completion pass), *search counted as work* (a cycle that only searched the catalog looked productive — fixed at the root), and *content amnesia* (six near-identical blog titles in six simulated days — the heartbeat context now shows recent output titles). Scoreboard: baseline two artifacts in three days with one hollow turn; after hardening, five for five days, zero hollow, differentiated content. Simulate the week before you live it.

**The Skill Curator — a human-gated learning loop.** Daily, the Curator reads the evidence trail (failed executions, human-rejected approvals with notes, negative outcomes), drafts improved instructions for the worst-offending skills, and stages the changes for human approval. The agent proposes; the human is editor-in-chief; the follow-through pass applies what gets approved. Skill self-modification is pinned to the approve level by policy — the one trust dial that never opens implicitly, in any posture. This is the Hermes learning loop with a governance boundary drawn where a production business needs it: the system improves itself, but never silently.

---

## Why This Is the Other Half, Not the Whole

Embedded depth and external breadth are the two halves of the federated architecture. Neither makes the other redundant.

FlowPilot handles the work that needs deep context and low latency inside FlowWink. Clawable handles the work that requires reading across FlowWink, Fortnox, a support desk, and a data warehouse at the same time. The handshake between them — FlowPilot answering an A2A call from Clawable with the same depth it brings to its own heartbeat — is where federated execution starts to look like an operating system for the business.

The 2028 enterprise will run both. A native agent in every platform that can afford one, plus an external orchestrator holding the cross-system view. The platforms that ship only one half will be operating at a disadvantage against customers who chose platforms that ship both.

---

This chapter is the map. The chapters that follow open the hood on each system that makes the depth real: the skills ecosystem (15), skill self-creation (16), intent scoring (17), memory tiers (18), and the token economy (19).

---

*Next: the atomic unit of agent capability — what a skill actually is and how 500+ of them stay organized. [The Skills Ecosystem →](/builder/15-skills-ecosystem)*
