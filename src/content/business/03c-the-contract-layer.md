---
title: "The Contract Layer"
description: "Your lawyers are not slow. They are doing clerical work that was never supposed to be theirs."
order: 3.3
icon: "scale"
---

> A lawyer's judgment is worth every króna you pay for it. The problem is not what they charge per hour. It is how many of those hours are spent doing work that does not require judgment at all.

---

Every company that sells services has a contract problem. Not because their legal function is inadequate. Because the contract process was designed around the assumption that every agreement is different — and most of them are not.

A two-year managed-services renewal for an existing customer. Same product. Same pricing structure. Same terms. Same counterparty. Someone still opens last year's PDF, updates the dates, copies the price from the account record, adjusts the end date, and sends it for signature. If they remember. If they notice the contract is expiring. If the finance system happened to flag it before the customer's silence became an unanswered phone call.

That process is not slow because lawyers are slow. It is slow because a judgment-intensive profession is spending most of its time on clerical work — the data entry that precedes the five minutes of actual legal review.

---

## The Three Layers

Not all contracts are equal. The ones that consume legal bandwidth fall into three categories, and the work that belongs in each is different.

**Layer one — standard renewal.** A known customer. A known product. Pre-approved terms that have not changed. The agent detects the trigger — an expiry date crossing a threshold, a deal reaching renewal stage, an invoice payment unblocking a stalled account — identifies the correct standard template, populates it with the counterparty's details and the current pricing from live CRM data, and routes it for e-signature. Time to completion: minutes. Legal involvement: none. The lawyer already reviewed this agreement when the template was approved. The terms have not changed. The populated fields are facts from a database, not judgments about risk.

**Layer two — customer-requested deviation.** The customer wants modified payment terms. Extended liability coverage. A different termination window. The agent populates the standard template, marks the deviating clauses explicitly, and routes the package to the lawyer: here is the standard, here is what the customer is asking for, here is the delta. The lawyer reviews the delta — not the document. Review time: eight minutes, not ninety.

**Layer three — new agreement pattern.** A deal type the company has not contracted before. A new market with jurisdiction-specific requirements. A strategic partnership with non-standard IP arrangements. The lawyer drafts. The result becomes the new template. Layer three happens once. Layers one and two run forever after.

The agent's role in this model is not to replace legal judgment. It is to ensure that legal judgment is applied only where legal judgment is required — and that everything else is handled before the lawyer opens the document.

---

## The Experiment

In May 2026, we deliberately removed the contract templates from the system.

The scenario was a standard renewal: Apex Nordic, an existing managed-services customer, two-year extension at 211,200 SEK per year. The renewal contract existed in the database as a metadata record — counterparty, value, dates, status — but the body was empty. No template was linked. The previous contracts for the same customer were also empty, created as records at deal close but never populated with text.

We sent one operator in with a mandate to complete the renewal.

There was no template to retrieve. There was no historical agreement to extract. What the operator had was this: a counterparty name and email, a contract value, a two-year term, and the context that this was a managed-services engagement for business system administration. It generated a complete twelve-section förvaltningsavtal in Swedish.

The structure was legally sound — parties, background, scope, term, services, pricing, payment terms, intellectual property, confidentiality, liability cap, termination, governing law, signatures. The commercial terms were standard for the sector. The confidentiality period, the termination notice, the liability ceiling, the payment schedule — each one was within the range a lawyer reviewing the document would recognize as appropriate.

The operator then caught two of its own typos during a proofreading pass and corrected them.

It populated the contract record. It sent it for signature. The signing URL was confirmed active.

---

## What the Placeholders Mean

In the parties section, three fields read: `[to be filled in]` — to be filled in. Registered address. Organisation number. Named signatory.

Those are not gaps in the agent's output. They are the boundary of its knowledge, represented explicitly.

The agent knew the counterparty's email address and contact name. It did not know their registered organisational number — because that field did not exist in the CRM record. It wrote what it could verify and flagged what it could not, with a marker a reviewer could find in thirty seconds.

A human drafter making the same assumptions and leaving them implicit would have been more dangerous, not less. A contract with an incorrect org.nr is a legal problem. A contract with `[to be filled in]` in the org.nr field is a to-do list. The agent produced the latter because it understood the difference between "I know this" and "I am inferring this."

The lawyer's task with this draft: confirm three fields, verify the liability cap reflects the correct contract year, sign off. Estimated time: eight minutes.

Without the operator: draft from blank document. Pull last year's contract. Update manually. Estimated time: ninety minutes — on a good day.

The experiment was designed to test degraded conditions — no templates, no history. That is not the normal state. Normal operations have templates, and templates reduce the lawyer's involvement on a standard renewal to effectively zero. The experiment established the floor: even at worst-case baseline, the agent produces a legally competent draft that a lawyer can finalise in a fraction of the time it would take to draft from scratch.

---

## The CEO Calculation

Take your company's last twelve months of contract renewals. Count them. Standard renewals — existing customers, existing products, pre-approved terms — are probably sixty to eighty percent of that number.

Each one took someone a few hours. Gathering the account details. Opening the template. Populating the fields. Getting the signature routed. Following up when the signing link expired. Filing the executed copy. Some of those hours belonged to legal. Some to account management. Some to finance. None of it required the expertise of the people doing it.

Now run the number in reverse. What does one hour of legal time cost? Multiply by the hours your lawyers spent on standard renewals last year. That is not the cost of contracts. That is the cost of using legal expertise to do data entry.

The companies that have restructured this are not cutting legal headcount. They are redirecting it. The lawyers who were spending thirty percent of their time populating standard renewals are now spending that thirty percent on layer-three work — new agreement patterns, strategic negotiations, complex deviation reviews. The work that requires legal judgment. The work that was waiting in the queue while the standard renewals were being typed.

---

## The Prerequisite

The three-layer model only works if layer one is populated.

That means a template library: one approved standard agreement per product line, reviewed by legal, stored in the operating system, linked to the deal type that triggers its use. The agent needs to know which template applies to which renewal. It cannot infer that from first principles — not reliably, not at scale.

When we ran the stress test without templates, the agent generated a complete document from context alone. That is an impressive demonstration of what the floor looks like. But the floor is not the target. The target is a process so reliable that a standard renewal never requires a human decision at all — just a legal sign-off that was already given when the template was approved.

Build the template library once. The agent runs it forever.

Every standard renewal handled without legal involvement is not a cost saving. It is a redirection of the most expensive expertise in your business toward the work that actually requires it. The contracts are the same. The customer experience is the same. The legal protection is the same.

The only thing that changes is how many hours a lawyer spends reading text that says the same thing it said last year.

---

## The Unsigned Engagement

A contract does not become a liability the moment it is drafted incorrectly. It becomes a liability the moment it is never signed.

In May 2026, a consulting engagement with a major automotive company had been running for thirty-three days. Two senior DevOps consultants on site. One platform engineer at sixty percent. Invoices accumulating. Work product delivered. No signed contract.

The engagement had been agreed. The contract had been drafted — a complete twelve-section document covering scope, pricing, IP ownership, confidentiality, termination, and governing law. It was sitting in the system with one status: `pending_signature`. Nobody had sent it. Nobody had noticed it had not been sent.

An operator swept the contract layer.

It read the contract, confirmed the document was complete and ready to execute, and sent it for signature. A signing URL was generated and dispatched to the counterparty contact. An email went out — professional, direct, with the link and a clear explanation that the engagement had been running without a formal agreement in place. A deal record was created in the CRM to make the 1,800,000 SEK visible to the pipeline. A critical finding was filed: thirty-three days of billable work without legal basis.

Total time: one sweep.

The point is not the contract. The point is that the unsigned contract was invisible to every other system in the business. The finance system saw no alert — there was no invoice yet. The CRM saw no problem — the deal had not been formally opened. The calendar saw no flag — there was no missed deadline, just an absence of one. The only place where "a contract exists, work has started, and no one has confirmed it is signed" is a problem is inside an agent that holds the contract layer, the CRM, and the calendar simultaneously and knows what the combination implies.

A workflow monitors events. A signed contract is an event. An unsigned contract is not an event. It is a silence. And silence has no webhook.

---

## The Prerequisite
