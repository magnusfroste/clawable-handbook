---
title: "Managing the Agent"
description: "How to configure objectives, calibrate autonomy, and give effective feedback — the operational practices that separate a reliable agent from an expensive experiment."
order: 24
icon: "building-office"
---

## Objectives, Not Tasks

The single most common misconfiguration in production agent deployments is task-level instruction where objective-level instruction is needed.

```
❌  "Write a blog post about AI trends"
✅  "Increase blog output to 4 posts per month, maintaining >30% open rate"

❌  "Send a newsletter on Friday"
✅  "Maintain newsletter cadence — surface performance data and propose content weekly"
```

Tasks micromanage the agent's execution. Objectives give the agent autonomy to determine the best approach, which is where autonomous reasoning produces value. If you specify the steps, you are writing a workflow. Write objectives and let the heartbeat handle the rest.

In OpenClaw terms: objectives live in `HEARTBEAT.md` as standing instructions the agent reads each cycle. Skills are the execution primitives. The agent decides which skills to invoke and in what order — you decide what success looks like.

---

## Review, Not Approval

The approval gate (`requires_approval: true` on a skill) is a safety control for high-consequence, low-frequency actions — not a general practice. If you find yourself approving the majority of agent outputs, the configuration is wrong.

The operational distinction:

| Mode | When to use | Example |
|---|---|---|
| **Autonomous** | Low consequence, any frequency | Memory categorization, analytics reads, draft creation |
| **Approval gate** | Irreversible or high consequence | External email campaigns, bulk CRM modification, deletion |
| **Human-initiated only** | Sensitive or regulatory | Customer commitments, pricing changes, compliance actions |

Review retrospectively. Read the Activity Feed. Catch patterns. Update the skill instructions when the agent makes a class of error repeatedly — that is more effective than approving every instance individually.

---

## Skill Instructions Are the Training Material

The `instructions` field on each skill is the primary lever for improving agent behavior. Rich, specific instructions produce reliable outputs. Vague instructions produce inconsistent ones.

```typescript
// Weak
instructions: "Write a blog post"

// Strong
instructions: `Write an SEO-optimized blog post following these constraints:
- Length: 800-1200 words
- Structure: H2 sections, one takeaway per section
- Tone: direct, no superlatives, no "revolutionize" or "transform"
- Always include a concrete example in section 2
- End with a single clear CTA, not a list
- Target keyword must appear in H1, first paragraph, and one H2`
```

When the agent underperforms on a specific skill, read the instructions before touching the model configuration. Most performance issues are instruction issues.

---

## Expanding Autonomy Over Time

Autonomy should be calibrated to observed performance, not assumed on day one. The operational path:

```
Week 1–2:   Observer mode — agent analyzes, reads, learns. No write operations.
Week 3–4:   Assistant mode — agent drafts, proposes. Human approves everything.
Month 2:    Operator mode — requires_approval: false on proven skills. Weekly review.
Month 3+:   Director mode — agent proposes strategy, executes plans, reports outcomes.
```

The transition from each mode to the next is a management decision backed by observed behavior — not a configuration toggle you flip on a schedule. An agent that has made three errors in the same skill domain stays on approval gates longer. An agent that has executed 200 lead qualifications with consistent judgment earns autonomous operation.

Track this in `AGENTS.md`. Document which skills are fully autonomous, which are gated, and why. That file is version history for the trust relationship between the agent and the team that runs it.

---

## When the Agent Gets Something Wrong

Every agent will get something wrong. The question is whether you have built enough observability to catch it and the right mechanisms to prevent recurrence.

The triage decision for any agent error:

```
Error observed
    │
    ├── Isolated incident (edge case, bad input)?
    │   → Log it. No action required unless it recurs.
    │
    ├── Skill instruction gap (agent lacked guidance for this case)?
    │   → Update skill instructions. Add explicit handling for this pattern.
    │
    ├── Soul misalignment (agent's values led it wrong)?
    │   → Update SOUL.md or AGENTS.md operating rules.
    │
    └── Structural capability gap (agent hit a limit of its MCP surface)?
        → Add or fix the tool. Not an agent calibration issue.
```

The worst response to an agent error is restricting autonomy across the board. That turns the agent into a workflow with overhead. Diagnose the specific layer that failed and fix that layer.

---

*Agent management is calibration work, not supervision work. The agent runs. You keep it aligned with the business it serves. Done well, you spend an hour a week on it. [Production Patterns →](/builder/25-production-patterns)*
