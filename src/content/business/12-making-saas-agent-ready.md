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

If that sounds like a technical detail, remember what the shipping container did. Before 1956, loading a ship took a week and an army of longshoremen — every crate a custom problem. The container was not a better crate. It was an *agreement about the box*: one standard shape that every crane, truck, and port in the world could handle. Freight costs collapsed by an order of magnitude, and global trade rearranged itself around the ports that adopted the standard first — while proud harbors that kept hand-loading watched the traffic route around them. MCP is the container for business capability. A vendor shipping an MCP surface is a container port. A vendor shipping proprietary AI features is still hand-loading crates, however impressive the crates.

**Two: Read-write parity.** Many vendors expose read-only MCP tools — the agent can look but not touch. An autonomous operator that cannot act is a dashboard. Demand that the MCP surface covers the operations an agent actually needs to execute: create, update, approve, escalate.

**Three: Schema consistency across models.** A tool that works with one model and fails with another is not a reliable tool. The MCP schemas should validate correctly against strict-model agents — properly typed properties, defined array items, required fields that are actually required. If the schema is loose, ask the vendor to tighten it. This is not a model problem. It is a vendor discipline problem.

In the FlowWink deployment documented in chapter three, the `manage_quote` tool failed mid-negotiation because the platform's quotes table required a `quote_number` field that the tool schema did not auto-generate and did not document as required. The operator caught the error, delivered the pricing in the email body instead, and the customer received a complete answer — but the agent had just discovered a platform bug the vendor did not know existed. Schema inconsistency is invisible until an agent hits it. That is when it becomes your problem, not the vendor's.

**Four: A documented path to agent-readiness.** Ask your vendors: "What is your timeline for making this platform fully agent-operable?" If the answer is a roadmap item more than six months out, you are not planning — you are hoping. The vendors who are serious about agentic operations will have a timeline. The ones who are not will give you AI features that look impressive and do not actually enable autonomous operation.

---

## The Business Case for Vendor Pressure

The MCP ecosystem grew not because vendors volunteered. It grew because customers demanded it. The open-source community built MCP servers for platforms that did not provide them natively. But native support is always superior: better maintained, better documented, aligned with the vendor's own roadmap.

The leverage you have as a customer is greater than you think. Every enterprise renewal in 2026 is an opportunity to add agent-readiness to the evaluation criteria. The vendors who hear it from enough customers will prioritize it. The ones who do not will lose to the ones who do.

This is not a technical demand. It is a procurement demand. And procurement demands change vendor roadmaps faster than any technology blog post.

The full technical specification — how to evaluate an MCP surface, what good looks like, how to test agent compatibility — is in the Builder Edition. For the business reader: put the four requirements on the table, and measure the response.

---

## Running the Vendor Conversation

Putting the demands on the table is the easy part. The strategic work is what happens next: reading the answers, running the clock, and deciding — per system — whether to pressure, bridge, or leave. One reframe first, because it changes the whole conversation: **MCP is a protocol, but a protocol is not what you are negotiating.** What you are negotiating is the right to redesign your own workflows — to move from the automation floor to operator-driven processes on your own data. A vendor who controls that access controls your operating model. That is why this conversation belongs to the leadership team, not to procurement.

### Where to press first

Not all systems deserve equal pressure, and the order is not what most leadership teams assume. Rank by where your tier-1 value lives (chapter eleven), not by which system has the most impressive dashboards:

1. **CRM and sales** — first, for two reasons: your revenue truth lives there, and the CRM market is furthest along (chapter eleven's readiness map), which makes your demands credible and your switching threat real.
2. **Finance, invoicing, and contracts** — the other half of every tier-1 process. Contract lifecycle integrity and AR-to-pipeline correlation require this surface; without it, your operator is blind on the money side.
3. **Operational ERP** — later, deliberately. The heavily-dashboarded production and manufacturing systems are the *automation floor*: rule-based work that is already automated well. Agents add the least there at first — and ERP switching costs are so high that pressure beats threats anyway.

The counterintuitive conclusion: the system with the most "AI features" on its roadmap is often the one where agent access matters least, and vice versa. Sales and finance is where cross-system judgment lives. That is where the door must open first.

### Decoding the answers

What vendors say and what it means are different languages. The translation table:

| The vendor says | What it usually means | Your move |
|---|---|---|
| "We have a comprehensive API" | An API is for developers; an agent needs MCP. This answer offers you an integration project instead of a surface. | "Good — then the MCP layer on top is small. What is the date?" |
| "It's on our roadmap" | Without a quarter attached, this is a deflection, not a commitment. | Ask for the quarter and beta access, in writing, at renewal. |
| "We have security concerns" | Sometimes genuine, always solvable — auth, scopes, and audit logging are known patterns. | "Which concern, specifically, and what is your plan for it?" No specifics = stalling. |
| "Our own AI assistant covers this" | The vendor agent trap, chapter eight: their agent sees only their walls. | "Can *our* operator call *your* tools? That is the question — not whether you have an assistant." |
| "There's no demand for it" | The market disagrees, in working code. | Count the community wrappers on GitHub — the queue outside the door. Unpaid developers do not build bridges to platforms nobody wants to reach. |

### The clock

Vendors respond to calendars, not sentiments. A reasonable sequence, anchored to your renewal cycle:

- **Now:** the four demands go into the RFP or renewal conversation, in writing.
- **90 days:** a dated MCP roadmap, or the vendor has told you something important about their strategy.
- **Two quarters:** read access in beta on your core objects.
- **Twelve months:** production read-write on the objects your tier-1 processes touch.

Miss a gate, and you do not escalate emotionally — you start the parallel track: connect through a community wrapper today (functional, if ungoverned — chapter eight's caveats apply), begin decoupling your data, and shortlist alternatives. You do not need to threaten. **The calendar does the negotiating.**

### Switch, bridge, or stay

The decision is not "is the vendor behind?" — nearly everyone is behind. The decision is whether you are looking at **capability lag** or **strategic closure**, and they deserve opposite responses:

- **Capability lag** — no MCP yet, but engaged, dated roadmap, tolerant of community wrappers: *stay and bridge.* The wrapper buys you operations today and evidence for the next negotiation.
- **Strategic closure** — blocking wrappers in their terms of service, per-action pricing on agent access to *your own data*, shipping their own agent while refusing yours: *start the migration plan.* Not as punishment — as risk management. A vendor whose business model depends on your operator staying blind has told you where this ends.

And when the CFO asks whether this is worth the disruption, the answer comes from chapter eleven's numbers: the tier-1 processes leak €30,000–90,000 per month while the door stays closed. A vendor conversation that shortens that by one quarter pays for itself before the first meeting ends.

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

That second category is not rhetorical. In a June 2026 sweep against a FlowWink instance, an operator called `manage_leads` to update a lead's status. The tool accepted the field, returned success — and never saved it. Score updates worked; status updates evaporated. Every pipeline report downstream of that field would have run on stale data indefinitely. No human had noticed, because humans change lead status from a dropdown that takes a different code path. The finding shipped with reproduction steps; the fix followed within days. That is the pattern to internalize — not that a platform had a bug, but that for the first time, something was in a position to catch it. `validated`

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
