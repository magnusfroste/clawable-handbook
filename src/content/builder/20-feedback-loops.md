---
title: "Feedback Loops"
description: "Growth loops, reflection, and self-healing — how agents compound their capabilities over time."
order: 20
icon: "arrow-path"
---

Agents have memory (chapter 18) — but memory alone is passive storage. This chapter covers what turns it into improvement: **FlowPilot's production feedback loops inside Flowwink**, wired into CRM, content, pipeline, enrichment, and heartbeat operations — the reason a well-designed agent in month six outperforms the same agent in month one, not because the model changed, but because the system learned from real outcomes and fed that learning back into itself.

---

## Five Feedback Loops in Production

Traditional software is a funnel: input → process → output. Agentic software closes the loop — every interaction feeds back, and every iteration is smarter than the last. Five loops run in production.

### Loop 1: Capture & Qualify

When someone interacts with the business, the agent starts working:

1. Contact is created with full source tracking
2. Engagement score calculated based on action type
3. AI analyzes the contact and generates qualification summary
4. Contact appears in pipeline, ranked by score

**Signal strengths:**

| Action | Signal |
|--------|--------|
| Webinar registration | High intent |
| Form submission | High intent |
| Booking | High intent |
| Newsletter subscription | Medium intent |
| Link click | Medium intent |
| Email open | Low intent |
| Page visit | Low intent |

These signals compound. A contact who opened three newsletters, clicked two links, and registered for a webinar has a different profile than someone who filled out a form once.

### Loops 2–5: The Rest of the Circuit

- **Engage & Track** — every interaction is logged and scored; engagement patterns feed the agent's content and outreach decisions.
- **Sell & Convert** — pipeline outcomes flow back: won deals mark customers and log revenue, lost deals feed pattern analysis.
- **Enrich & Understand** — one domain fills a whole company profile, sharpening qualification for every linked contact.
- **Measure & Improve** — each loop emits actionable metrics (leads per source, open rates, win rate) that tell the agent where to focus next.

---

## The Agent's Internal Feedback Loops

Beyond business metrics, the agent has its own feedback mechanisms:

### Reflection

```
reflect()
  │
  ├── Query agent_activity for last 7 days
  ├── Successful actions → positive patterns
  ├── Failed actions → negative patterns
  ├── Identify: what to do more, what to stop, what to try
  ├── Auto-persist top learnings
  └── Return reflection summary
```

The agent literally evaluates its own performance and saves lessons.

### Self-Healing

The quarantine mechanism from chapter 10 (full implementation in chapter 31) is itself a feedback loop: skills with three or more consecutive failures leave the agent's toolkit, their linked automations are disabled, and the healing report lands in the next heartbeat's context. The agent stops repeatedly trying things that don't work — because its own failure history is an input.

### Skill Evolution

```
skill_instruct(skill_name, new_instructions)
  │
  ├── Agent updates skill knowledge based on experience
  ├── New edge cases documented
  ├── Better examples added
  └── Instructions versioned
```

The agent literally rewrites its own skill instructions based on what it learns.

---

## The Compound Effect

Feedback loops compound. The agent that qualifies ten leads in week one saves what it learned; by week eight it carries two months of accumulated patterns, scores leads far more accurately, and starts predicting which ones will convert. The Week 8 agent is fundamentally more capable than the Week 1 agent — not because the model changed, but because the memory and skills evolved. Chapter 16 showed the same compounding in skill self-creation; this is the operational side of the same curve.

---

## The Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| No logging | Can't measure, can't improve | `agent_activity` audit trail |
| No reflection | Agent never evaluates itself | `reflect()` in heartbeat |
| No self-healing | Failures cascade | `runSelfHealing()` auto-quarantine |
| No scoring | Can't prioritize | Engagement scoring system |
| No memory persistence | Learnings lost between sessions | `agent_memory` with embeddings |

---

*The feedback loop is the engine of improvement. Without it, the agent is a static system. With it, the agent is a learning system that gets better every day.*

*Next: stagnation and drift — the two failure modes nobody talks about until week four of production. [Stagnation and Drift →](/builder/21-stagnation-and-drift)*
