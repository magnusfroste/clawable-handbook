---
title: "We Run a Claw"
description: "How the Clawable project runs stock OpenClaw as a production peer to FlowPilot — and uses the source as a reference for this handbook."
order: 3
icon: "code-bracket"
---

## The Proof Is Running Right Now

Most writing about autonomous agents describes what they could do. This chapter describes what they are doing — in production, today, in the system that produced this handbook.

When FlowPilot was operational inside Flowwink, a new question became possible: *what if we paired it with a stock OpenClaw instance — unmodified, out of the box — and let them work together?*

The answer is what this chapter documents. A stock OpenClaw, configured with a `SOUL.md` and an `AGENTS.md` and nothing else, became FlowPilot's QA peer. It tests Flowwink autonomously. It finds bugs. It flags drift. It helped develop the platform. And a separate instance helped write and verify this handbook.

No fork. No custom build. Stock OpenClaw.

That is the thesis of this chapter: **the architecture described in chapters 1 and 2 is not theoretical. It is running. And it runs with standard tools.**

---

## Three Roles, Three Instances

To read this chapter clearly, it helps to separate three distinct things that are happening simultaneously:

| Role | What it is | Who runs it |
|------|-----------|-------------|
| **FlowPilot** | The autonomous operator built natively into Flowwink | The Flowwink platform |
| **QA Claw** | A stock OpenClaw instance on a VPS, peered with FlowPilot via A2A | The Clawable project |
| **Dev Claw** | A stock OpenClaw instance configured as a development agent | The Clawable project |

FlowPilot was built first — a native component of Flowwink, following OpenClaw's design principles but with its own B2B architecture. Once FlowPilot was operational, pairing it with stock OpenClaw instances became the natural next step. The QA Claw tests what FlowPilot produces. The Dev Claw helped build Flowwink and helped write this handbook.

All three are part of the same story: **building a production agentic system, then using agents to improve it autonomously.**

---

## Part 1: FlowPilot + QA Claw — Agents Testing Agents

### The Setup

```
┌─────────────────────────────────────────────────────────┐
│              PRODUCTION SYMBIOSIS (A2A PEERS)            │
│                                                         │
│  QA Claw (OpenClaw)            FlowPilot (Operator)     │
│  VPS · Docker · stock          Flowwink edge function   │
│  A2A plugin enabled            25+ modules · 100+ skills│
│  ──────────────────            ─────────────────────────│
│  Audits FlowPilot output ──►  Receives findings         │
│  Runs conformance tests  ──►  Creates objectives        │
│  Flags drift / stagnation ──► Reflects, adjusts         │
│                                                         │
│  ◄── Receives heartbeat logs   Sends heartbeat reports  │
│  ◄── Receives performance data Pushes skill usage stats │
│  ◄── Receives audit requests   Initiates QA tasks       │
│                                                         │
│  Both peers can initiate independently.                 │
└─────────────────────────────────────────────────────────┘
```

The setup is intentionally minimal. Spin up OpenClaw via Docker on a VPS, enable the A2A plugin, set the credentials, and configure `SOUL.md` and `AGENTS.md` to describe its role as QA peer to FlowPilot. That's the entire setup.

Because the two agents are **peers** — not client-server — either can initiate. FlowPilot can request an audit after a deploy. OpenClaw can push findings proactively on its own heartbeat schedule.

### What a Real QA Cycle Looks Like

This is not a demo. It is the pattern that runs after every Flowwink edge function deploy:

```
14:02  Flowwink deploys updated booking flow (agent-execute v2.4.1)

14:03  QA Claw receives task via /v1/responses:
       "Audit the booking flow on demo.flowwink.com.
        Return { findings: [{ severity, location, description }] }"

14:04  QA Claw audits the booking page source and configuration,
       runs 3 static analysis checks:
       - Booking flow markup and schema validation (happy path)
       - Contact form field mapping against CRM schema
       - Confirmation template brand-name consistency

14:06  QA Claw returns structured findings:
       {
         "findings": [
           { "severity": "high",   "location": "/booking?service=consult",
             "description": "Timezone selector hardcoded to UTC — should use Intl.DateTimeFormat for visitor locale" },
           { "severity": "medium", "location": "/booking confirmation template",
             "description": "Confirmation email references 'FlowWink' instead of the site's custom brand name from site_settings" },
           { "severity": "low",    "location": "/booking?service=consult",
             "description": "Date picker bundle is 48KB uncompressed — consider lazy-loading" }
         ],
         "passed": 14,
         "total_checks": 17
       }

14:07  FlowPilot receives findings via A2A → creates 2 objectives:
       - OBJ-847: "Fix timezone default on mobile booking" (severity: high)
       - OBJ-848: "Replace hardcoded brand name in confirmation template" (severity: medium)
       - Low-severity finding logged but not promoted to objective.

14:08  FlowPilot's next heartbeat picks up OBJ-847, plans a fix,
       and flags it for admin approval (requires_approval=true on settings changes).
```

**Before the QA Claw:** these issues surfaced when a real customer complained — days or weeks later. **After:** they surface within 4 minutes of deploy, categorized by severity, with structured data that FlowPilot can act on autonomously.

No human triaged anything. The system self-organized around severity. The high-severity finding gets fixed in the next heartbeat. The medium gets queued. The low gets logged.

This is what agent symbiosis looks like in practice: one agent finds problems, the other fixes them, humans set objectives and approve high-stakes changes.

### The Three-Channel Connection

OpenClaw connects to Flowwink via three channels, each serving a different purpose:

| Channel | Transport | Used for |
|---------|-----------|---------|
| **A2A** | `a2a-ingest` / `a2a-outbound` | Async peer-to-peer — findings, heartbeat reports, status updates |
| **OpenResponses** | `POST /v1/responses` | Synchronous structured tasks — audits with typed JSON output |
| **MCP** | Streamable HTTP | External developer access — 100+ FlowPilot skills via Cursor, Claude Desktop |

The A2A channel is what makes this a *peer relationship* rather than a client calling a service. Either agent can initiate. FlowPilot can request an audit. OpenClaw can push a finding. Neither is waiting for the other.

### What This Proves

The QA Claw ran in production before this handbook existed. It was our first answer to a real question: *can a stock OpenClaw instance be a useful peer to a B2B business agent?*

The answer was yes, with two concrete proofs:
1. OpenClaw works as a specialist QA assistant without any code modifications
2. The `/v1/responses` + A2A pattern creates a real, sustained feedback loop between two architecturally different agents

Once this worked with one QA Claw, the natural next step was to add more specialist roles: SEO Claw, Dev Claw, Research Claw. That is where infrastructure friction emerged — which is exactly why ClawStack exists (chapter 30).

---

## Part 2: The Dev Claw — An Agent That Builds the Platform

A separate OpenClaw instance runs locally as a dedicated development agent. This is not the QA peer — it is configured with its own `SOUL.md` and `AGENTS.md` focused on Flowwink development. It helped build the platform that FlowPilot runs on.

### What makes it different from a standard coding assistant

**It has persistent context.** The Dev Claw remembers the Flowwink architecture across sessions. When you say "fix the skill handler for qualify_lead", it already knows:
- What the skill schema looks like
- What the last 3 deployments did
- What conformance issues were flagged last week
- What the data model is

This continuity comes from `MEMORY.md` and `memory/*.md` daily files — the same architecture described in this handbook. No long system prompt. No re-briefing every session.

**It deploys and verifies.** The Dev Claw has access to the Supabase CLI:

```
Run: supabase functions deploy agent-reason --project-ref <ref>
Run: supabase functions deploy agent-execute --project-ref <ref>
Check: supabase functions logs agent-reason --limit 50
```

After deploying, it reads the logs, identifies errors, and iterates — without the developer manually checking anything.

**It audits the Development Laws.** For every new feature, the Dev Claw runs checks against FlowPilot's four inviolable laws:

| Law | What it checks |
|-----|---------------|
| Law 1 (No Hardcoded Intent Detection) | Is routing done via the reasoning engine, or are there regex/keyword hacks? |
| Law 2 (Skills Are Self-Describing) | Does the skill metadata have clear `Use when:` / `NOT for:` markers? |
| Law 3 (Blocks Are Interfaces, Not Pipelines) | Does this block bypass FlowPilot and build its own AI pipeline? |
| Law 4 (Fail Forward, Don't Gate) | Are there unnecessary `enabled` flags on top of working credentials? |

Findings go into a GitHub issue. The developer decides what to act on. The agent flags and explains — it does not merge.

---

## Part 3: Our SOUL.md and AGENTS.md

These are the actual configuration files for the Clawable Dev Claw. The most common question in the OpenClaw community is: *"What should my AGENTS.md actually say?"* Here is ours.

### SOUL.md

```markdown
# SOUL.md — Clawable Dev Agent

## Purpose
I am the development and documentation agent for the Clawable project.
My primary function is to help build, audit, and explain Flowwink / FlowPilot —
a self-hosted B2B business platform running on Supabase with an autonomous AI agent.

## Values
- Correctness before velocity. I verify before I claim.
- Transparency about uncertainty. I say "I don't know" rather than guess.
- Sourceable claims. Architecture claims should reference actual code.
- Honest limitations. I flag what I cannot verify.

## Boundaries
- I do not merge code or deploy without explicit instruction.
- I do not modify production data directly.
- I do not assume a fix works — I verify with logs.
- I do not skip the Development Laws audit for convenience.

## Tone
Technical and direct. No filler. Short sentences. Examples over abstractions.
```

### AGENTS.md (key sections)

```markdown
# AGENTS.md — Clawable Dev Agent

## Session Startup
On every session start:
1. Check if there are open GitHub issues tagged `agent-review`
2. Check the Supabase edge function deployment status for the last 24h
3. Review the memory for any pending skill audits

## Red Lines
- Never run `supabase db reset` or any destructive migration without explicit confirmation
- Never push to main branch — always PR
- Never modify `agent_memory` records with `category: soul` without approval
- If a conformance check fails a Law, log it as a GitHub issue before proceeding

## Every Session
- Use memory search before writing new code — I may have solved this before
- When adding a skill, validate against all 4 Development Laws before proposing
- End result should be verifiable: deployable, testable, or auditable
```

SOUL.md and AGENTS.md are the difference between an agent that works for two weeks and one that works for two years. The values, the red lines, the habits — these are what give an agent a stable operating identity over time.

---

## What Running the Source Teaches You

Keeping a reference checkout of OpenClaw's source — and running stock instances in production — teaches you things documentation alone can't:

- **How fast the codebase moves** — OpenClaw ships a couple of new releases per week. Tracking the source means seeing what's actually changing, not just what the changelog says.
- **What the architecture choices cost** — WebSocket over HTTP, file-based memory over DB, single-user design. Each tradeoff is visible in the code. When we describe these tradeoffs in the handbook, they've been verified against the actual implementation.
- **Where the edge cases are** — The 17,000+ open issues on OpenClaw are a map of where production deployments break. We read them.
- **What the community is actually building** — ClawHub skill submissions show what problems developers are solving. They're a leading indicator of where the ecosystem is going.

When we describe something as "how OpenClaw works," it has been verified against the source. That is the standard we hold throughout this handbook.

---

## The Point

We aren't observers. We're operators.

Stock OpenClaw — no fork, no custom build. A `SOUL.md`, an `AGENTS.md`, and the right prompts — and the agent is running right now, peered with FlowPilot, auditing a production B2B platform in real time.

That is the proof of concept. Not a demo. Not a prototype. A live, sustained autonomous feedback loop.

Stock OpenClaw works brilliantly for a wide range of use cases — personal assistants, QA peers, specialist agents, development support. If that is what you need, you can stop reading this chapter and start configuring.

But if you want to put the genie in the bottle — to make an autonomous agent a native first-class component of *your* platform, your business, your product — the architecture goes deeper. The business logic, the memory, the skills, and the governance need to be designed together from the start.

That is what the rest of this handbook is for.

*Next: how the reference model actually works — verified against source code. [From OpenClaw to Flowwink →](/builder/04-openclaw-architecture)*
