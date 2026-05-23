---
title: "Making SaaS Agent-Ready"
description: "What you should demand from your SaaS vendors — the short list that matters."
order: 12
icon: "shield-check"
---

> Your vendors will tell you they are building AI. The question is whether they are building agents you can use — or agents that use you.

The detailed architecture of making a SaaS platform agent-ready — MCP server design, tool schema, authentication, error handling, rate limiting — belongs in the Builder Edition. For the business reader, there is one question that matters: what should you demand from the vendors you pay?

---

## What to Demand from Your Vendors

Four requirements. Put them in your RFPs, your renewal conversations, and your vendor scorecards.

**One: MCP surface, not just API.** An API is for developers. An MCP surface is for agents. If your vendor exposes REST endpoints but no MCP server, an agent needs custom middleware to reach them. If the vendor provides MCP natively, any stock agent can read and write to the platform immediately. The difference is weeks of integration work versus a configuration file.

**Two: Read-write parity.** Many vendors expose read-only MCP tools — the agent can look but not touch. An autonomous operator that cannot act is a dashboard. Demand that the MCP surface covers the operations an agent actually needs to execute: create, update, approve, escalate.

**Three: Schema consistency across models.** A tool that works with one model and fails with another is not a reliable tool. The MCP schemas should validate correctly against strict-model agents — properly typed properties, defined array items, required fields that are actually required. If the schema is loose, ask the vendor to tighten it. This is not a model problem. It is a vendor discipline problem.

In the ClawWink deployment documented in chapter three, the `manage_quote` tool failed mid-negotiation because the platform's quotes table required a `quote_number` field that the tool schema did not auto-generate and did not document as required. The operator caught the error, delivered the pricing in the email body instead, and the customer received a complete answer — but the agent had just discovered a platform bug the vendor did not know existed. Schema inconsistency is invisible until an agent hits it. That is when it becomes your problem, not the vendor's.

**Four: A documented path to agent-readiness.** Ask your vendors: "What is your timeline for making this platform fully agent-operable?" If the answer is a roadmap item more than six months out, you are not planning — you are hoping. The vendors who are serious about agentic operations will have a timeline. The ones who are not will give you AI features that look impressive and do not actually enable autonomous operation.

---

## The Business Case for Vendor Pressure

The MCP ecosystem grew not because vendors volunteered. It grew because customers demanded it. The open-source community built MCP servers for platforms that did not provide them natively. But native support is always superior: better maintained, better documented, aligned with the vendor's own roadmap.

The leverage you have as a customer is greater than you think. Every enterprise renewal in 2026 is an opportunity to add agent-readiness to the evaluation criteria. The vendors who hear it from enough customers will prioritize it. The ones who do not will lose to the ones who do.

This is not a technical demand. It is a procurement demand. And procurement demands change vendor roadmaps faster than any technology blog post.

The full technical specification — how to evaluate an MCP surface, what good looks like, how to test agent compatibility — is in the Builder Edition. For the business reader: put the four requirements on the table, and measure the response.

---

## The QA Team You Never Hired

There is something nobody tells you about deploying agents on your operational platforms. You will find out anyway — usually in the first week.

Your agents will find bugs your QA team missed.

Not because your QA team is incompetent. Because your QA team tested what developers thought to test. Agents test what actually matters in production: the operations that move money, close deals, and capture revenue. They call those tools because that is the work they are doing — and when the tool fails, or worse, when the tool *says it succeeded* while doing nothing, the agent notices.

---

In May 2026, a finance operator running on FlowWink called `send_contract_for_signature` on a 422,400 SEK renewal contract. The tool returned `status: success`. The operator filed the finding, marked the task complete.

Then it ran a verification check.

`sent_at: null. accept_token: null.`

Nothing had happened. The contract had not been sent. The signing URL had not been generated. The success message was genuine in the technical sense — the code path had reached a return statement — but the operation had never executed. A handler was missing. The tool had accepted the call, returned a polite confirmation, and left the database exactly as it found it.

A human would have moved on. We are trained to trust confirmation dialogs. When software says "done," we believe it. That is not naivety — it is the only practical way to use software at scale.

The agent checked because it had a different reflex: verify the state you expected to change, not just the message that says it changed. No social trust in the return value. No confirmation bias. Just a direct query to the database: *is what I expected to be true, actually true?*

It was not. And the agent reported exactly why.

---

Over two weeks of operational running, that same fleet found five broken tools. None were read-only tools — no dashboards, no reports, no list operations. Every single one was a write tool: mark invoice paid, send contract for signature, update deal stage, close accounting period. The tools that move money and close deals.

That is not a coincidence. It is selection pressure. Agents find write-tool bugs because agents actually try to write. A passive integration, a reporting dashboard, a human clicking through a UI — none of them call the same sequence of operations at the same depth. Agents do. And when the operation fails silently — when the tool says "done" and the ledger disagrees — the agent is the first system with a reason to notice.

Every bug was reported to the vendor with precise reproduction steps: tool called, arguments passed, return value received, database state observed. Every bug was fixed. Five tools that had been silently misfiring in production, patched in two weeks — not because a QA sprint was scheduled, but because an operator tried to do its job.

---

This is the thing that does not appear in the vendor pitch decks.

Your platforms have tools like these. Tools that return success and do nothing. Tools that accept parameters they silently ignore. Tools that work in the demo environment and fail on the data shape your real customers generate. Every platform has them, because every platform was built by humans under deadline, tested against happy paths, and shipped before anyone thought to ask what happens when an agent calls a tool at 23:00 on a Tuesday to mark a late invoice paid.

You do not know which of your tools are broken, because you do not have anything that checks. Your users click buttons and trust the green checkmark. Your automations fire and report "completed." Nobody queries the database to verify that the thing that was supposed to happen actually happened.

Until an agent does.

---

The CEO question is not "are my vendors building good software?" They are trying. The question is: **"What are my tools telling me is 'done' right now, that isn't?"**

How many contracts in your system are marked "sent for signature" with a null sent_at? How many invoices are marked "processed" with the ledger unchanged? How many deal updates were "saved" to a database that never received the write?

You do not know. You have never had a mechanism to know.

Deploy an agent. Point it at your operational surface. Give it a real objective — not a test, a real task. Watch what it finds. Not because the agent is a tester. Because the agent is trying to do work, and work requires the tools to actually function, and when they do not, the agent will tell you exactly what broke and exactly how.

That is the QA team you never hired. It does not need a salary. It does not need a sprint. It needs a mandate and an MCP surface.

The vendors who understand this are already running agents against their own platforms before they ship. The vendors who do not are waiting for their customers to find the bugs first.

Ask your vendors which category they are in.

---

*Next: [Where the World Is Heading →](/business/13-where-the-world-is-heading)*
