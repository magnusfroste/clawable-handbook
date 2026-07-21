---
title: "Appendix B: Kilo Code"
description: "How the handbook itself was made — the author's dev agent, its harness, and why the book's own production is a worked example of its thesis."
order: 91
icon: "cpu-chip"
appendix: true
---

> *Full disclosure: this appendix is about how the handbook itself was made. It is written from direct operational experience — not a review.*

---

## The Book Practices What It Preaches

This handbook was researched, written, verified, and maintained agentically. The agent is the author's **Dev Claw** instance — the same one [chapter 36](/builder/36-closing) credits with researching the OpenClaw source, verifying architecture claims, and flagging inconsistencies across 30+ chapters. Its harness is [Kilo Code](https://kilo.ai) ([Kilo-Org/kilocode](https://github.com/kilo-org/kilocode)), an open-source agentic coding tool — and the machinery it works through is the same control plane this handbook describes: a ReAct loop, a tool system, a permission model, skills, and subagent orchestration. You are reading text produced by the architecture the text explains.

The workflow is the human-in-the-loop model from chapters [22](/builder/22-human-in-the-loop) and [23](/builder/23-agent-governance), applied to book production:

1. Objective set by the author
2. The agent reasons, plans, searches, verifies, writes
3. The author reviews and calibrates — editor-in-chief on every change
4. The agent iterates

In practice that meant Dev Claw read the OpenClaw source directly, fetched URLs, searched GitHub, ran builds, fixed errors, and spawned subagents for parallel work — an orchestrator decomposing chapters into research tasks, cheaper models verifying claims against source code, the strongest model writing prose. The author made every decision about structure, voice, emphasis, and accuracy. The agent handled execution. No chapter shipped without human review.

That division of labor is the meta-point. An AI agent producing a handbook about AI agents is not a curiosity — it is a worked example of the core thesis: the value lives in the control plane around the model, not in the model itself. Objectives, permissions, verification loops, human gates.

And the audit trail is exactly what the handbook says it should be: **the book's git history**. Every agent-drafted change and every human calibration is recorded, commit by commit, reviewable by anyone. A book that argues agents should be transparent, governed, and auditable should itself be transparent, governed, and auditable. It is.

---

*Built agentically, edited by a human. Verified against source. Honest about what we don't know.*
