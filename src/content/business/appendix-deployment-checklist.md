---
title: "Appendix: Deployment Checklist"
description: "The go-live checklist for an external operator deployment — what to verify before the operator starts acting on your business."
order: 92
icon: "clipboard-document-list"
appendix: true
---

> A checklist is a form of respect — for the people who will read the operator's findings, and for the business data it will touch. The operator runs autonomously. You are responsible for what it does.

The builder edition carries an infrastructure-level checklist — Supabase, edge functions, RLS, cron jobs. This version is different. It assumes the operator runtime (an OpenClaw instance on ClawClass, or equivalent) is already running somewhere. What it checks is whether the operator is ready to be *given* a business.

Four phases, one go/no-go table.

---

## Phase 1 — Pre-Connect

Done before the operator sees your data.

- [ ] **MCP surface audited.** You have walked every tool the target platform exposes. For each tool: does it return consistent structured output? Does its schema validate under strict models (GPT-4.1, not just Claude)? Are there tools the business requires that do not exist? (See chapter 5.)
- [ ] **Gap list recorded.** The tools that are missing, broken, or ambiguous are written down. You know which gaps the platform vendor will fix and which gaps the operator must work around.
- [ ] **Authentication scoped.** The operator authenticates with its own account or API key — not a human's shared credentials. The scope of the key matches the skills the operator is allowed to call.
- [ ] **Approval tiers assigned.** Every skill in the operator's registry has an explicit trust level: `auto` (low-stakes, logged), `notify` (medium, logged + announced), or `approve` (high, queued for human sign-off). No skill inherits a default — every one is a decision.
- [ ] **Agent Manager named.** One person has been assigned the Agent Manager role. They have read chapters 15 and 16. They know what they are signing up for.

---

## Phase 2 — Wire-Up

The operator's identity is written and the runtime is connected.

### Workspace Files

- [ ] **SOUL.md written** — operator's personality, values, tone, boundaries. Reviewed by a human (not just generated and accepted).
- [ ] **AGENTS.md written** — operating rules, approval policies, escalation behavior, what happens at edge cases.
- [ ] **HEARTBEAT.md written** — the autonomous cycle checklist. What the operator checks, in what order, with what reporting format.
- [ ] All three files are in a git repository the business controls. Changes are tracked.

### Runtime

- [ ] Heartbeat schedule configured — appropriate cadence for the business (every 30 minutes for active, every 6–12 hours for background).
- [ ] Memory directory exists and is writable. Daily files will be created here. A curated long-term file is set up empty.
- [ ] Log destination is configured — findings are written somewhere the Agent Manager will actually read (Slack, email, dashboard, dedicated report doc).
- [ ] Operator can be paused from one command. The Agent Manager knows the command.

---

## Phase 3 — First Week (Shadow Mode)

The operator runs, but does not yet act on anything high-stakes.

- [ ] **All medium- and high-stakes skills set to `approve`** for the first week, regardless of final configuration. The operator proposes actions; a human reviews each one before it runs.
- [ ] **Daily review scheduled.** The Agent Manager reads each day's findings within 24 hours. Not weekly — daily, for week one.
- [ ] **At least one intentional failure tested.** Break a skill on purpose, or feed the operator an ambiguous input. Verify the operator fails gracefully, logs the failure, and does not silently produce a confident wrong answer.
- [ ] **First-week retrospective.** End of week seven days of findings are reviewed together. Which findings were useful? Which were noise? Which were wrong? Adjust `AGENTS.md` accordingly.

---

## Phase 4 — Graduated Autonomy

Over the next 4–8 weeks, skills move from `approve` to `notify` to `auto` as trust is earned.

- [ ] Low-stakes skills (reading data, drafting summaries, logging findings) move to `auto` after two weeks of clean behavior.
- [ ] Medium-stakes skills (sending notifications, updating deal stages) move to `notify` after three weeks of clean behavior.
- [ ] High-stakes skills (deleting records, sending invoices, modifying financial data) remain `approve`, indefinitely. These are deliberately not delegated.
- [ ] The Agent Manager's cadence moves from daily to weekly (see chapter 16).

---

## Go / No-Go Criteria

Before the operator is given full autonomous scope, every one of these must be true:

| Check | Requirement |
|-------|-------------|
| First 10 heartbeat cycles completed | All succeeded or failed gracefully; no silent errors |
| No stuck approve-queue backlog | Every pending approval has been reviewed and actioned |
| SOUL.md read by a human | Someone who is not you knows what the operator values |
| Failure recovery tested | A skill was broken intentionally; quarantine worked |
| Pause command known | The Agent Manager can stop the operator in one step |
| At least one finding acted upon | The operator produced a real finding that changed something in the business |

If any row fails, do not proceed. Fix the failing row first. The cost of waiting a week is small. The cost of an autonomous operator acting on a business it does not yet understand is large.

---

## Emergency Procedures

Know these before you need them.

**Immediate pause.** The Agent Manager has a one-command pause. For an OpenClaw deployment, this is typically a `tool_policy` update that blocks all skills, or disabling the heartbeat cron.

**Review recent actions.** Every action the operator has taken in the last 24 hours is readable from the activity log. Know where that log lives. Know how to filter it by time range.

**Revoke credentials.** If the operator's behavior has become uninterpretable and the pause is not sufficient, revoke the API key or auth token it uses against the target platform. The operator is now isolated; you can investigate without risk.

**Postmortem.** Every emergency produces a memo: what happened, what the operator did, what was broken in its configuration, what has been changed to prevent recurrence. The memo lives in the workspace repository, next to SOUL.md and AGENTS.md. The operator reads it on its next cycle.

---

*A deployment that skips this checklist will run. It may even produce useful findings for several weeks. What it will not do is remain trustworthy as the business evolves. The checklist is the difference between a demonstration and a deployment.*
