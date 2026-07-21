---
title: "Human-in-the-Loop"
description: "The decision framework for when agents should act autonomously vs. when humans should approve."
order: 22
icon: "user-group"
---

## The Autonomy Spectrum

Autonomy isn't binary. It's a spectrum running from full human control to full autonomy — **approve** (block until a human confirms), through **notify** (execute, then report), to **auto** (execute silently, log to activity). Every skill sits somewhere on that line, and placing it deliberately is the design work of this chapter. The canonical placement table below shows where real skills land.

---

## The Decision Tree

When designing an agentic system, every skill needs to be placed on the autonomy spectrum. Here's the decision framework:

```
Is the action reversible?
  │
  ├── NO → requires_approval = true
  │        (newsletter send, delete content, financial actions)
  │
  └── YES → Is the cost significant?
              │
              ├── YES → requires_approval = true
              │        (paid ad campaigns, large data exports)
              │
              └── NO → Could it damage reputation?
                        │
                        ├── YES → requires_approval = true
                        │        (public-facing content, social posts)
                        │
                        └── NO → Does it affect other people?
                                  │
                                  ├── YES → requires_approval = true
                                  │        (user management, team changes)
                                  │
                                  └── NO → AUTONOMOUS
                                           (research, drafting, analysis,
                                            scoring, reporting)
```

---

## The Four Trust Levels

FlowPilot implements four execution modes, not two. The binary `requires_approval` flag is the simplified view. Mapping rule: `approve` = `requires_approval: true`; `auto` and `notify` = `requires_approval: false` (with different post-action reporting behavior). The full implementation has:

| Tier | Value | Behavior |
|------|-------|----------|
| **Auto** | `auto` | Execute silently, log to activity |
| **Notify** | `notify` | Execute, then send report to admin |
| **Approve** | `approve` | Block execution until admin confirms |
| **Blocked** | `blocked` | Disabled — excluded from skill scoring entirely |

### Why Graduated Levels?

The binary model creates a false choice: either the agent waits for human approval on everything useful, or it acts silently on everything. **Notify** breaks the deadlock.

A blog draft is not dangerous — but the admin probably wants to know it happened. With `notify`, the agent creates the draft immediately (no blocking) and sends a summary to the Activity Feed. The admin reviews at their convenience. If they don't like it, they delete it. No harm done.

A newsletter send is irreversible — 10,000 people will receive it. That requires `approve`: the agent queues it, the admin must explicitly confirm. And `blocked` is the circuit breaker: a skill taken out of service disappears from the agent's skill scoring entirely — it cannot even be considered.

```
auto:    Act → Log
notify:  Act → Log → Notify admin
approve: Queue → Wait → Admin confirms → Act → Log
```

---

## The Approval Workflow

When `requires_approval = true`:

```
Agent decides to act
       │
       ▼
agent-execute checks requires_approval
       │
       ├── true → Log as pending_approval
       │          Return 202 to agent
       │          Admin sees in Activity Feed
       │          Admin approves → re-execute
       │          Admin rejects → log rejection
       │
       └── false → Execute immediately
                   Log result to agent_activity
```

**Key detail:** The agent receives a 202 (accepted, pending approval) response. It knows the action was queued, not executed. It can tell the user "I've drafted the newsletter and it's waiting for your approval."

---

## The tool_policy Override

Beyond per-skill trust tiers, FlowPilot implements a **global policy override** stored in `agent_memory`:

```json
{
  "key": "tool_policy",
  "category": "system",
  "value": {
    "blocked_skills": ["send_newsletter", "execute_payment"],
    "forced_approve": ["write_blog_post"],
    "forced_auto": ["qualify_lead"]
  }
}
```

This lets operators temporarily adjust agent behavior without editing skill definitions:

| Use Case | tool_policy action |
|----------|--------------------|
| "Pause all outbound communications this week" | Add email/newsletter skills to `blocked_skills` |
| "I'm monitoring everything right now" | Move all content skills to `forced_approve` |
| "I trust the agent completely on CRM" | Move CRM skills to `forced_auto` |
| "Something went wrong — freeze the agent" | Block all skills except read-only |

The policy is checked before skill execution and takes precedence over the skill's default tier. It's temporary by design — the admin removes it when the situation resolves.

---

## Real-World Autonomy Decisions

This is the canonical placement table — where production skills actually land on the spectrum, and why:

| Skill | Trust Tier | Rationale |
|-------|------------|-----------|
| `search_web` | `auto` | No cost, no risk, read-only |
| `qualify_lead` | `auto` | Analysis, no external impact |
| `analytics_report` | `auto` | Read-only, informational |
| `write_blog_post` | `notify` | Creates content, admin wants to know |
| `memory_write` | `notify` | Modifies agent state |
| `a2a_message` | `notify` | External agent communication |
| `generate_content_proposal` | `notify` | Multi-channel content plan |
| `execute_newsletter_send` | `approve` | Irreversible, reaches real people |
| `update_settings` | `approve` | Affects entire site |
| `manage_product` | `auto` | Internal data management |
| `book_appointment` | `auto` | Low risk, customer-initiated |

---

## The Three Layers of Operation

Different layers have different autonomy levels:

| Layer | Trigger | Autonomy Level |
|-------|---------|----------------|
| **Visitor Layer** | User message in public chat | Low — read-only + booking |
| **Admin Operate Layer** | Admin command | Medium — drafts + suggestions |
| **Automation Layer** | System event or schedule | High — with approval gates |

The visitor layer is the most restricted. Visitors can browse content, book appointments, and search the knowledge base. They can't modify anything.

The admin layer is more capable. The admin agent can draft content, analyze data, and suggest actions. But destructive actions require approval.

The automation layer is the most autonomous. The heartbeat can execute plan steps, run automations, and analyze performance. But even here, destructive actions are gated.

---

## Expanding Autonomy Over Time

For new deployments, autonomy is earned in phases — observer, assistant, operator, director. Chapter 24 owns that rollout and the management practice behind it.

The human doesn't disappear in this system; their role shifts from executing tasks to setting objectives and reviewing what the agent proposes. Chapter 24 develops the full director-not-operator theme.

---

## The Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Full autonomy on everything | One bad hallucination = disaster | Approval gates on destructive actions |
| Approval on everything | Agent can't operate autonomously | Graduated autonomy based on risk |
| No approval workflow | Admin can't review pending actions | Activity Feed with approve/reject |
| Binary autonomy | All-or-nothing approach | Four-level trust model (auto/notify/approve/blocked) |
| No tool_policy | Can't temporarily adjust behavior | Global policy override in agent_memory |

---

*The goal is not maximum autonomy. The goal is appropriate autonomy — enough to be useful, not so much that it's dangerous. The decision tree helps you find that balance.*

*Next: who is responsible when the agent makes a decision — and how organizations are restructuring around agents. [Agent Governance →](/builder/23-agent-governance)*
