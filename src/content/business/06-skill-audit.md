---
title: "The Skill Audit"
description: "Why every agent deployment needs one — and what it means if you skip it."
order: 6
icon: "clipboard-check"
---

> The gap between what your SaaS *can* do and what an agent *can reach* is not a technical problem. It is a surface problem. And until you map it, you are deploying blind.

Most agent programs that fail do not fail because the model was wrong or the architecture was off. They fail because the agent was pointed at a business it could only see partially — and nobody checked the field of vision before going live.

An agent runs on what it can reach. If a capability is not exposed through a standardized protocol like MCP, it does not exist from the agent's perspective. The agent cannot see it, cannot use it, cannot work around its absence. It simply is not there.

This creates a deployment risk that is invisible until the agent is already live and its findings feel thin. The agent ran. It found what it could find. And because what it could not find was invisible, nobody knew to ask why the results felt incomplete.

---

## Why the Audit Step Exists

The skill audit answers one question before you deploy: **what can your agent actually reach?**

Not what the vendor says is "AI-ready." Not what shows up in the marketing deck. What capabilities are exposed through callable operations that an autonomous agent can invoke without a human clicking a button?

The answer for most stacks is: fewer than you assume, and in different places than you expect.

CRUD operations — read a lead, update an invoice, create an order — are almost always there. What tends to be missing is the layer above: operations that span modules, operations that require context to be meaningful, operations where the *combination* of data from two systems produces the insight. Your CRM knows who your leads are. Your invoicing system knows who has paid. Neither system exposes an operation that says: *this lead is at risk because the parent account has an overdue invoice in a different system.*

That cross-system blindness is not a defect in any single platform. It is the structural gap that makes the skill audit necessary. Every SaaS is built to serve human operators who can see across systems intuitively. Agents need the surface mapped explicitly.

---

## What the Audit Tells You

A skill audit — the detailed version is in the Builder Edition — produces three buckets of understanding:

**Fully operational** — tools the agent can call, receive structured responses from, and act on reliably. These are your deployment-ready capabilities.

**Partially exposed** — tools that exist but carry schema or permission constraints that limit how agents can use them. Fixable, but they require attention before autonomous deployment.

**Absent** — capabilities that no single-platform surface can provide, because they require cross-system awareness. This is where an external orchestrator layer — an agent that reads multiple platforms simultaneously — becomes necessary.

The point is not to achieve perfect coverage before deploying. The point is to know where the blind spots are before the agent's first run, so you can distinguish between "the agent found nothing of concern" and "the agent could not see the area where the concern lives."

---

## The Principle

You cannot fix a gap you have not mapped. And you cannot trust an agent's outputs if you do not know where its vision ends.

The skill audit is not a research project. It is the single deployment prerequisite that separates informed deployment from wishful deployment. Builder Edition contains the complete walkthrough: how to run it tool by tool, how to interpret the results, and how to build the agent configuration around what you find.

What your systems can expose, you now understand. The next question is what operator you put inside the layer that reads them.

---

*Next: [Choose Your Operator →](/business/07-choose-operator)*
