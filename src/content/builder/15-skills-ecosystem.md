---
title: "The Skills Ecosystem"
description: "Skills as knowledge containers — how agents learn, evolve, and share capabilities."
order: 15
icon: "puzzle-piece"
---

In the previous chapters we've described what an agent *is* (chapter 1), how it *wakes up and acts* (the heartbeat, chapter 10), and *what rules govern its behavior* (the 10 laws, chapter 9). But we haven't answered a more basic question: **what can it actually do?**

Skills are the answer. Skills are the atomic unit of capability — each one teaches the agent a new thing it's able to accomplish. Without skills, the heartbeat loop has nothing meaningful to execute. The laws constrain behavior, but skills define what behavior is even possible.

Think of it this way: SOUL.md is the agent's character. The heartbeat is its daily routine. Skills are its job description.

---

## What Is a Skill?

In agentic architecture, a skill is the atomic unit of capability. It contains:

1. **What it does** — Name and description
2. **When to use it** — Routing rules (Use when / NOT for)
3. **How to call it** — JSON schema (OpenAI function-calling format)
4. **How to think about it** — Rich instructions (edge cases, decision tables, examples)
5. **Where it runs** — Handler string (edge/module/db/webhook/a2a)
6. **Who can use it** — Scope (internal/external/both)
7. **Whether it needs approval** — Safety gate

```json
{
  "name": "qualify_lead",
  "description": "AI-powered lead qualification. Use when: new lead needs scoring. NOT for: existing customers.",
  "handler": "edge:qualify-lead",
  "scope": "internal",
  "requires_approval": false,
  "instructions": "When qualifying a lead:\n1. Check company domain for enrichment\n2. Score based on: job title (seniority), company size, industry match\n3. Generate a 2-sentence qualification summary\n4. If score > 70, suggest creating a deal\n5. Always link to existing company if domain matches",
  "tool_definition": {
    "type": "function",
    "function": {
      "name": "qualify_lead",
      "description": "Qualify a lead with AI analysis",
      "parameters": {
        "type": "object",
        "properties": {
          "lead_id": { "type": "string", "description": "UUID of the lead" },
          "context": { "type": "string", "description": "Additional context for qualification" }
        },
        "required": ["lead_id"]
      }
    }
  }
}
```

---

## The Skill Lifecycle

Skills go through a lifecycle that mirrors how an employee learns:

```
Create → Instruct → Test → Enable → Use → Reflect → Improve → Disable
  │         │        │       │       │       │         │          │
  │         │        │       │       │       │         │          └─ Quarantine
  │         │        │       │       │       │         └─ Update instructions
  │         │        │       │       │       └─ Self-assessment
  │         │        │       │       └─ Execution + logging
  │         │        │       └─ Available to agent
  │         │        └─ Validation
  │         └─ Rich knowledge added
  └─ Basic definition registered
```

### Creation

Skills can be created:
- **By developers** — Via admin UI or database migration
- **By the agent itself** — Via `skill_create` tool (defaults to `requires_approval = true`)
- **By skill packs** — Bundled installation

### Instruction

The `skill_instruct` tool lets the agent (or admin) add rich knowledge:

```
skill_instruct("qualify_lead", "
When qualifying leads from the tech industry:
- Weight company size more heavily (startups = higher score)
- Check if they have a GitHub presence (developer-friendly signal)
- Look for recent funding announcements (budget availability)

Edge cases:
- Personal email domains (gmail, yahoo): score capped at 40
- Government agencies: always requires manual review
- Existing customer contacts: route to account management instead
")
```

### Self-Healing

Skills with 3+ consecutive failures are automatically quarantined. The agent can't use them until an admin re-enables them. This prevents cascading failures.

---

## Skill Budget Management

With 500+ skills, the token budget gets tight. The system compresses skill definitions dynamically in three tiers — full, compact, drop — as the context fills up, re-evaluated on every iteration of the reasoning loop. Chapter 19 covers the mechanism in full as part of the token economy.

**The implication for the skill system:** popular skills stay available, unused skills get dropped. This creates a natural selection pressure — skills the agent finds useful survive, skills it doesn't use get pruned.

---

## Skill Packs

Skills can be bundled into packs for easy installation. Each pack groups related capabilities for a specific business function:

| Pack | Skills Included |
|------|-----------------|
| **Content Marketing Pack** | research_content, write_blog_post, generate_content_proposal, send_newsletter |
| **CRM Nurture Pack** | add_lead, qualify_lead, manage_deal, enrich_company |

Packs are installed via `skill_pack_install` and create the skills in the database. The agent can discover available packs via `skill_pack_list`.

As of July 2026, FlowPilot's library and the MCP surface are one and the same: a single shared catalog of 500+ skills, one set of metadata, two consumers. The embedded operator scores them per heartbeat turn; the external agent searches them over MCP — through the same intent scorer, exposed as the `search_skills`/`execute_skill` dispatch pair (chapter 12), so an external client reaches all 500+ skills while holding just two tool definitions in context. The convergence is the payoff of Law 2 — when the fix is always better metadata, an instruction improved once serves every agent that will ever call the skill, embedded or external. The catalog is organized by business function; a new deployment typically starts with the Content Marketing + CRM Nurture packs, then adds E-Commerce and Analytics as the business grows.

---

## Skill Gating — Capability Before Permission

There's a layer that runs *before* trust levels: **skill gating**. Gating is about whether a skill is even available to the agent, not whether it requires approval.

A skill is gated when its prerequisites aren't met. The most common gate: **missing integration credentials**.

```
send_newsletter skill:
  Gate: Email integration has valid API key configured
  → API key present: skill is visible to agent
  → API key missing: skill is invisible (not loaded into prompt)
```

The agent never sees a gated skill. It doesn't try to call it and fail — it simply isn't offered the tool. This prevents a class of errors where the agent attempts to use a capability that has no backend to run it.

### Common Gates

| Gate Type | Condition | Example |
|-----------|-----------|---------|
| **Integration key** | Valid API key configured | `send_newsletter` requires email provider key |
| **Module enabled** | Module is active for this instance | `book_appointment` requires Booking module |
| **Feature flag** | Admin has enabled the feature | `execute_payment` requires Payments enabled |
| **Role scope** | Caller has required permissions | Internal skills invisible in visitor scope |
| **Environment** | Correct deployment environment | Debug skills only in development |

The mechanics are simple: when skills load for a session, anything with an unmet prerequisite — missing API key, disabled module — is filtered out before the prompt is assembled. The agent never fails, retries, or generates confusing error logs over a capability that has no backend, and skill instructions never need to say "check if X is configured before calling Y."

Gating is a compile-time constraint. Trust levels are a runtime constraint. Both are necessary.

---

## The OpenClaw Pattern: File vs. Database

OpenClaw uses file-based `SKILL.md` files with automatic discovery. Flowwink uses database-driven skills with admin UI management. Both follow the same concept — a skill is a knowledge container — but the implementation differs significantly:

| Aspect | OpenClaw (File) — verified from source | FlowWink (Database) — implementation |
|--------|-----------------------------------------|--------------------------------------|
| Discovery | File auto-discovery (`skills/*/SKILL.md`) | DB table query |
| Storage | Markdown files on disk | PostgreSQL rows |
| Modification | Edit file, restart/reload | Hot-reloadable (no restart) |
| Admin UI | No (terminal-first) | Yes (Skill Hub page) |
| Multi-instance | No (single user) | Yes (RLS per instance) |
| Versioning | Git | Database history |
| Loading | Lazy: model reads `SKILL.md` on demand | Full tool definitions injected per session |
| Registry | ClawHub marketplace | Shared 500+ skill catalog (one metadata set, embedded + external consumers) |

Both patterns work. The file-based approach is simpler for personal use. The database approach is necessary for business operations.

---

## The Skill as Teacher

The most important insight: **a skill is not just a tool definition. It's a teaching instrument.**

The `instructions` field is how you teach the agent your domain. Without it, the agent will use the tool based on the description alone — and it will make mistakes.

```
Without instructions:
  Agent: "I'll qualify this lead." → Checks name, gives random score

With instructions:
  Agent: "I'll qualify this lead." → Checks company domain, enriches
         company data, scores based on job title seniority, generates
         2-sentence summary, suggests creating deal if score > 70
```

The difference is not the tool. The difference is the knowledge.

Chapter 24 shows the management view of this same principle: skill instructions as the training material you update when the agent underperforms.

---

*Skills are the vocabulary of the agent. The richer the vocabulary, the more nuanced the agent's actions. Invest in skill instructions the way you'd invest in employee training.*

*Next: how agents evolve beyond their initial configuration by creating their own skills. [Skill Self-Creation →](/builder/16-skill-self-creation)*
