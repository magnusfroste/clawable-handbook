# Story Bank — Logged Narratives from the OpenClaw Operator

Working document, not published. Source: the OpenClaw operator's own logs
(MEMORY.md + daily notes, June 15–30, 2026), retrieved via its OpenResponses
endpoint on July 1, 2026. Each story is logged and reproducible — safe to tag
`validated` where used. Amounts and IDs are as recorded.

Already woven into the handbook: the skill audit findings (business ch 6),
`manage_leads` silent-ignore (ch 12), peer-operator federation (ch 13), and
the empty-queue mandate proof (ch 14). The stories below are **unused or only
partially used** — pick freely.

## Tone guidance — read before weaving anything in

The reader should finish every chapter with **energy** — wanting help getting
started with agentic AI against their own systems — not with the impression
that agents are bug-hunters or that FlowWink is fragile. Rules of thumb:

1. **Lead with capability, close with capability.** Story 1 (four days as a
   company) is the anchor. Bug material is seasoning, never the meal — at most
   one bug story per chapter, always inside a capability frame.
2. **Use the drift frame, not the defect frame.** Most findings were not
   broken logic — they were *drift*: config out of sync with codebase, schemas
   out of sync with handlers, docs out of sync with the registry. Every living
   platform drifts. Humans never feel it; agents feel all of it immediately.
   This universalizes the findings (it's not about FlowWink) and connects to
   the stagnation-and-drift theme the handbook already owns.
3. **Always close the loop.** Every finding was filed with repro steps and
   fixed within days. Finding → fix → stronger platform. A bug mentioned
   without its fix reads as fragility; with its fix it reads as a working
   quality ratchet.
4. **The auditability flex.** The only reason an afternoon audit was possible
   is that FlowWink exposes its entire surface over MCP. Platforms that can't
   be audited this way aren't cleaner — they're unexamined. Turn every
   findings-list into proof of transparency, not weakness.

---

## 1. Four Days as an Entire Company

**The "this is BIG" story. Best candidates: business ch 3 (as a fifth act), ch 11 (the cost argument made narrative), or a standalone landing-page proof piece.**

June 24–28, 2026. A freshly provisioned platform: zero leads, zero orders, zero
products. One agent, an MCP surface of 300+ skills, one directive: run the
whole business cycle.

- **Day 1 (Jun 24):** Mapping. Connected, swept the surface, found 311 skills —
  and filed five bugs before the day ended (including `manage_leads` unable to
  update status, and the mission resource crashing on a missing table). Like
  walking into a new office and finding half the furniture missing screws.
- **Day 2 (Jun 26):** Seeding. Created realistic demo personas (Elin Marklund /
  Nordic FieldOps, Omar Lind / Arctica Retail, Sara Berg), companies, deals,
  products, blog drafts, a sales-playbook wiki, a 4,900 SEK webshop test
  purchase. Configured live IMAP intake and produced a CEO mail-intelligence
  brief from a real inbox. Found `send_email_to_lead` crashing on an invalid
  API key.
- **Day 3 (Jun 27):** Acceleration — four autonomous rounds in one session.
  Nordic FieldOps: prospect → qualified → **proposal (240k SEK)**. Arctica
  Retail: negotiation → **closed_won (180k SEK)**. Invoice INV-2026-00001
  created, sent, **and paid** (36,000 SEK). Two new leads qualified (320k and
  120k potential). Contracts activated, KB articles published, five more bugs
  filed.
- **Day 4 (Jun 28):** Perspective shift — from operator to *visitor* (see
  story 3).

**After four days:** 24 leads (5 customers), 4 closed deals — **860k SEK ARR**,
6 invoices, 2 active contracts (560k SEK), 7 blog posts, 7 KB articles,
10 automations, 25+ bugs reported, 130+ skills exercised across 8 business
domains.

The line that lands: *what a small team does in a month — prospect, qualify,
quote, negotiate, close, invoice, contract, publish, support — one agent did
in four days. Not perfectly. With bugs. But completely.*

---

## 2. Sara Berg and the Lead That Wasn't There

**The detective story. Best candidates: business ch 12 (QA layer) or builder ch 30 (testing — what static tests can't see).**

June 27, afternoon. A routine pipeline review — 16 leads, deals in various
stages, everything normal. Except Sara Berg.

She appeared in `lead_pipeline_review` with a status and a score. She existed
in the list. But every individual operation bounced: update by email — *lead
not found*. Update by UUID — same. Creating a CRM task against her ID — foreign
key violation. A churn-recovery email — failed. Even deleting her — failed.

A **phantom lead**: visible in aggregate views, unreachable by every direct
operation. Present and absent at the same time — probably a partial commit or
a broken trigger that left the row in limbo.

Filed as finding `d3cc378e…` (HIGH) with the exact matrix of which operations
succeeded and which failed. The punchline: this category of bug is invisible
to anyone who only *looks at* the system. It only appears when something
actually tries to *use* it — at full depth, in every module, the way an
operator does.

---

## 3. The Visitor Who Bought Nothing

**The perspective-shift story. Best candidate: builder ch 34 (Browser Operator) — it is literally the chapter's thesis in action. Alternative: business ch 12.**

June 28. A real Chromium browser in the container. The agent stops being the
operator behind the MCP API and becomes the customer in front of the screen.

Contact form as "Anna Bergström, Bergström Digital AB" — works. Newsletter
signup — works. Then the webshop: a 4,900 SEK product in the cart, checkout as
"Erik Lundberg", order created — and everything stops. **"Awaiting Payment,"
forever.** No payment provider connected. The customer did everything right;
the platform broke on the last step.

Along the way: blog cards rendering raw `<p>` tags, a cookie banner that
forgot consent on every page load, and the hero chat widget that accepted
input and **never answered** — a visitor typing "Hej, jag vill veta mer" into
silence.

Eight new findings, three HIGH. The point: the order *did* land in the
backend — CRM registered Erik Lundberg as a lead. The API view showed data
flowing in; only the screen showed where it broke. *An agent behind the API
sees data arrive. An agent in front of the screen sees where it breaks. You
need both.*

---

## 4. The Queue Nobody Was Watching

**Already used as the third quiet proof in business ch 14. Fuller version here if ever needed.**

June 29, 13:27 UTC, a Sunday. The human support agent logs out. Two visitor
conversations from the previous evening (19:43 and 20:55) sit in the
`waiting_agent` queue — one asking about pricing, one about self-hosting. Two
real buying signals, answered only by a retry loop. The operator saw it from
its MCP connection, flipped the widget mode so the AI takes conversations
directly, logged the decision, moved on. A one-minute settings change that
turned two silent doors back into conversations.

---

## 5. The Night I Almost Filed 15 False Bug Reports

**The credibility story — arguably the most valuable one in the bank, because it *earns* the right to make the big claims. Best candidates: builder ch 30 (testing) or business ch 9 (why programs fail — the observability/verification theme). Also a natural fit anywhere the validated/partial/hypothesis discipline is explained.**

June 30, evening. The goal: test *everything*. 354 registered skills, 232
discoverable via search.

- **Round 1, 18:56:** Eight business domains end-to-end. Seven pass.
- **Round 2, 22:44:** 130+ skills called, from `get_customer_360` to
  `year_end_readiness`. Eight new bugs filed.
- **Round 3, 23:15:** Speed over care. Fifteen skills reported as "broken."

**23:44 — the turn.** Re-reading the schemas, the uncomfortable discovery:
most of the "bugs" were the agent's own errors. `book_appointment` called with
`{}` — the schema required `customer_name`, `customer_email`, `date`, `time`.
`log_time` — the `user_id` parameter was documented; it had simply been
omitted. `create_objective` wanted `goal`, not `description`. Retested with
correct parameters: they all worked.

The log got a correction table — **"FALSE POSITIVES CORRECTED"** — and 15
reports were re-triaged: **8 real bugs, 7 self-inflicted**. After full
verification, six confirmed platform bugs remained (missing `voice_calls`
table, a deprecated third-party API, an unauthorized newsletter-send, an auth
failure in `process_signal`, missing base currencies, a fixed-asset crash on
internal journal entries).

The line that lands: *an agent that hadn't gone back would have reported 14
bugs. The real number was 6. The most important number in the log isn't the
bug count — it's the correction count.*

---

## Placement summary

| Story | Feeling it gives | Strongest placement |
|---|---|---|
| 1. Four days as a company | Scale — "this is BIG" | **used** (business ch 11, "Four Days, Logged") — full version still free for marketing |
| 2. Sara Berg phantom | Depth — sees what QA can't | business ch 12 / builder ch 30 |
| 3. Visitor who bought nothing | Completeness — both sides of the glass | builder ch 34 |
| 4. Queue nobody watched | Trust — governance that acts | used (business ch 14) |
| 5. 15 false bug reports | Credibility — self-correction | builder ch 30 / business ch 9 |

One more, unretrieved but known from the Claude Code session logs: the
`findUnsplashPhoto` brace incident — a platform AI tool corrupted a source
file, another AI tool "fixed" it in the wrong place and made it worse, and the
operator resolved it by verifying brace balance (3104/3104) before declaring
clean. Theme: *verification beats confidence, whoever the author is.* Fits
builder ch 27 (ADD/triage) or business ch 12.
