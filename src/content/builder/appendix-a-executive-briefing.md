---
title: "Appendix A: Architecture Quick Reference"
description: "The four-layer stack, five production patterns, and key file conventions — the reference sheet for building OpenClaw-inspired autonomous agents."
order: 90
icon: "code-bracket-square"
appendix: true
---

## The Four-Layer Stack

Every autonomous agent in this handbook converges on the same architecture:

```
┌─────────────────────────────────────────┐
│  SURFACES (I/O)                         │
│  Chat · Admin UI · API · Webhooks · Voice│
│  How the agent communicates             │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│  REASONING CORE                         │
│  Prompt compiler · ReAct loop           │
│  Tool router · Budget manager           │
│  How the agent thinks and calls tools   │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│  CAPABILITY LAYER                       │
│  Skills · Memory tiers · Objectives     │
│  Workflows · A2A · Automations          │
│  What the agent can do and remember     │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│  INFRASTRUCTURE & GOVERNANCE            │
│  Scheduling · Concurrency · Isolation   │
│  Observability · Approval gates · Audit │
│  Where uptime, safety, accountability live│
└─────────────────────────────────────────┘
```

---

## Core File Conventions (OpenClaw)

| File | Purpose | Who edits |
|---|---|---|
| `SOUL.md` | Agent identity, values, tone, hard limits | Agent manager |
| `AGENTS.md` | Operating rules, tool permissions, scope | Agent manager |
| `HEARTBEAT.md` | Recurring objectives and check schedule | Agent manager |
| `USER.md` | Context about the human/organization served | Agent manager |
| `memory/*.md` | Accumulated working knowledge | Agent (auto-written each cycle) |
| `skills/*.md` | Skill definitions with instructions | Developer / agent (self-created) |

All files are plain text, version-controlled, readable without tooling. The governance principle: any human with repo access can understand the agent's complete operational state in under five minutes.

---

## Five Production Patterns

### 1. Specialist QA Agent

Use OpenClaw as a dedicated auditor for your own SaaS or internal tools.

- `SOUL.md` focused on "what good looks like" for the target system
- Expose a typed `/v1/responses` task returning structured findings: `{ findings: [{ severity, location, description, recommendation }] }`
- Trigger after deploys or content changes; store results as objectives
- The FlowPilot + QA Claw loop in chapter 27 shows this in production

### 2. Native Business Operator (FlowPilot Pattern)

Apply the soul + heartbeat + skill architecture to a self-hosted business platform.

- Agent is a first-class component, not a plugin
- One Supabase instance per business (RLS enforced)
- Skills cover every business-critical operation (lead qualify, invoice approve, content publish)
- Agent runs the platform autonomously; human sets direction via objectives

### 3. Role-Based Swarm (ClawStack)

Multiple specialist agents as services on shared infrastructure:

- One agent per role: QA Claw, Dev Claw, Research Claw, Support Claw
- Each has isolated `SOUL.md` / `AGENTS.md` and scoped skill set
- ClawStack provisions containers, TLS, routing, A2A wiring
- Delegation via `/v1/responses` (top-down) and A2A (peer-to-peer)
- **Key principle:** one agent per role, not one model doing everything

### 4. Orchestrated Fleet (Paperclip)

Add a coordination layer above individual agents:

- Paperclip connects to agents via OpenResponses and A2A
- Acts as Delegator: sets objectives, enforces budgets and approval gates
- Individual agents remain independently operable; orchestration is additive
- Maps directly to the responsibility chain: Delegator → Operator → Agent

### 5. Hardened Perimeter (NemoClaw / DefenseClaw)

Wrap any agent in security and governance layers:

- **NemoClaw** — sandboxing via OpenShell, policy-based access control, RTX hardware integration
- **DefenseClaw** — skill scanning, action blocking, OWASP-aligned audit logging
- Apply the patterns directly to your own agent: sandbox, explicit allowlists, append-only audit trail

---

## Key Architectural Decisions

| Decision | Options | When to choose each |
|---|---|---|
| **Agent location** | Embedded (inside platform) vs External (via MCP) | Embedded: you own the codebase, need sub-ms access. External: cross-platform, faster to deploy |
| **Memory backend** | File-based (OpenClaw) vs DB-based (pgvector) | Files: single-user, human-readable. DB: multi-tenant, semantic search needed |
| **Skill storage** | File-based registry vs DB-driven | Files: simple, version-controlled. DB: hot-reload, agent self-creation |
| **Model routing** | Single provider vs LiteLLM proxy | Single: simpler. LiteLLM: model-agnostic, cost routing, fallback |
| **Approval gates** | Per-skill (`requires_approval`) vs per-action | Per-skill for configuration, per-action for runtime decisions |
| **Scheduling** | Cron-based heartbeat vs event-driven | Cron: predictable, auditable. Event: lower latency, harder to govern |

---

## Skill Schema Minimum

```typescript
{
  name: string,               // snake_case, unique
  description: string,        // what the skill does — used by the model to decide when to invoke
  parameters: {               // JSON Schema, strict — GPT-4.1 validates hard
    type: "object",
    properties: {
      [key: string]: {
        type: string,
        description: string,  // required — model uses this to fill the field
        // For arrays: always include items: { type: "..." }
      }
    },
    required: string[]
  },
  requires_approval: boolean, // true = human must confirm before execution
  scope: "internal" | "external",
  instructions: string        // the agent's training material for this skill
}
```

Common failure: array properties without `items` definition. Claude tolerates it. GPT-4.1 rejects the tool call entirely. Always define `items`.

---

## Read Path for Builders

| Goal | Chapters |
|---|---|
| Understand the architecture | 01, 02, 03, 04 |
| Build the reasoning core | 09, 10, 17, 19 |
| Build skills and memory | 12, 15, 16, 18 |
| Production hardening | 11, 25, 29, 30, 31, 32 |
| Agent-to-agent coordination | 26, 27, 28 |
| Multi-agent infrastructure | 33, 34 |
| Governance and calibration | 22, 23, 24 |
