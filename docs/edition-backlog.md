# Edition Backlog — Material Awaiting a Future Edition

From the exhaustive 12-month inbox sweep (July 2026, ~1,075 threads,
frostiemails@gmail.com). Ranked findings that passed triage but were held
out of the July launch edition for pacing/energy reasons. All are
newsletter-reported — verify primary sources before use, per evidence
discipline.

**Woven into the July edition already:** Meta-Harness (builder ch 35,
verified against arXiv 2603.28052), agent cost governance / FT cost-capping
(business ch 11 + budget boundary in ch 14), Capgemini trust decline
(ch 14), MIT warm-negotiator tournament (ch 14), Anthropic April platform
cutoff (ch 7), BCG AI at Work 2026 (chs 11, 15), all-four-payment-giants
(ch 13).

> **Book 3 material does not belong in this file.** *The Learning Operator*
> has its own home: `docs/book3-inbox.md`. This backlog is for the two
> published editions only.

## For August (strongest candidates)

0b. ~~The named harness (H1–H11) + the Trace~~ **WOVEN 2026-08-13** into Builder
    chs 5/11/14 — see the field report. Remaining: nothing for Builder; the
    "every incident becomes a harness component" line is Book 3's spine. flowwink-local named and mapped
    the harness the same day this session added the harness bridge to Builder
    ch 5 — independently. Weavable now: the component map as the concrete
    instantiation of "harness = control plane"; the ruling that the harness is
    a platform primitive (not a module feature) consumed by internal AND
    external agents; "the harness is model-agnostic — swapping the model
    changes the engine, not the chassis"; "every incident becomes a harness
    component, permanently"; and H6 — objectives close on evidence from the
    activity log, never on model prose (verify-don't-trust as architecture).
    Hold the Trace as `partial` (data layer shipped, product surface next) and
    the H11 double-fire war story for ch 14's follow-through section.
    See `docs/fieldreport-harness-and-evidence-2026-08.md`.

0d. ~~Organizational readiness — the broken nerve thread~~ **JUDGED & WOVEN 2026-08-21.** Three of five passages taken (ch 9 the mirror, ch 6 the CSO parallel + embryo ordering, ch 7 the shadow-AI cure); the nerve-thread image DROPPED as a fourth telling of what chs 2/5/8 already own. No new chapter. Draft retained in `docs/fieldreport-nerve-thread-2026-08.md`. Original entry below for the record:

0d-orig. **Organizational readiness — the broken nerve thread.** A full chapter
    draft from flowwink-local, triaged out of the Book 3 inbox because it
    answers what must be true *before* an operator can run. Best material:
    the nerve-thread image ("five systems is not five problems, it is one" →
    "a severed agent is not a stupid one"), the mirror line ("an agent does
    not smooth things over — every unanswered question becomes visible in its
    behaviour"), the CSO parallel (readiness and mature infosec are one
    project, not two), the shadow-AI cure (make the sanctioned path better,
    not forbidden), and embryo-before-master-data as a deployment sequence.
    Homes: ch 6 (the information-layer equivalent of the skill audit — the
    clearest gap), ch 9 (organizational failure), ch 12 (vendor side).
    Client identifiers removed 2026-08-21 (Magnus's call) — the case is a
    generic five-system company and must stay one. **One call left: weave into
    chs 6/9/12, or a `06b-` readiness chapter?** Swedish draft — needs
    rewriting, not translating. See `docs/fieldreport-nerve-thread-2026-08.md`.

0c. **The evidence ledger — the third gate.** Trust levels gate the *call*,
    approval requests gate the *action*, the evidence ledger gates the
    *claim*. Typed observations priced in one reviewable table
    (`human.entered` 0.95 → `model.inference` 0.25, `contradiction` 0) and the
    rule that makes it work: **no self-graded confidence** — "a model asked to
    grade its own certainty will, and it will be wrong in the direction that
    makes it look useful." Motivating bug is perfect drift-frame material
    (enrichment overwriting a rep's notes with an `og:description`, a verified
    phone with a regex hit). **GATED: proposed, no code written** — weave when
    it ships, or tag `hypothesis` explicitly. Also the substantive reply to
    the Olaf Paap authority/Sub-Origin thread (write-path half only).

0a. ~~The two tiers of tool metadata~~ **WOVEN 2026-07-22** (Builder ch 15
    "The Two Tiers of Tool Metadata" + ch 9/19 pointers) — round 3 verified
    the ending same day. Remaining for Book 3: the incident retold as a
    full operator-loop story (guess → challenge → log → fix → guardrail).
    See `docs/fieldreport-two-tiers-2026-07.md`.

00. **EXPERIMENT — Live Proof II: the seams between vendors.** The book's
    strongest remaining proof to produce. The April 19 finding was
    cross-MODULE (seams inside one platform, one data model — ch 8 now
    frames this honestly: "consider what vendor boundaries hide between
    five"). The cross-system equivalent is a prediction the book makes —
    and it is runnable, not just arguable: point Clawable at FlowWink
    PLUS a second live surface simultaneously (Fortnox via the community
    MCP servers named in ch 8, or any real second system) and log the
    first true cross-vendor finding — e.g. an unpaid invoice in system A
    correlated with a stalled deal in system B. Wider, darker seams, no
    shared schema → expect the finding to be larger, not smaller. Natural
    order to flowwink-local session once the proof week ends (~Jul 22);
    operator infra already running. Homes: ch 3 gets a fifth act or ch 8
    gets its closing proof; TL;DR + canonical numbers updated if a
    headline figure emerges. Until run: everything stays hypothesis-tagged.

0. **FlowPilot 2.0 proof weeks** — a 10-day production monitoring of
   FlowPilot running live at www.liteit.se (flowwink-local session,
   started ~Jul 12). First real longitudinal data on an embedded operator
   in production: follow-through completion rate, composite-pipeline runs,
   Curator proposals accepted/rejected, hollow-turn rate. Natural homes:
   builder ch 14 (2.0 section gets its production numbers), business ch 11
   (the value equation gets embedded-operator evidence). This is the
   book's own verification-funnel answer: don't claim it — log it.
   **Day-1 intake landed:** `docs/fieldreport-flowpilot-proofweek-2026-07.md`
   — findings 1–6 accepted for the August pass (Curator's first live cycle
   with the rejection-note-feeds-next-round beat; lived-in memory/175 rows;
   self-audit 404 — gated on closing the fix loop; dial inheritance proof;
   hollow-turn 2/3+1 → 5/5+0; fleet security sweep). Finding 7 (naming as
   drift) held, sidebar at most. Await days 2–10 before weaving.
1. **Sierra's monolith counterargument** — "if you want a multi-agent
   system so each team can own an agent, you're shipping your org chart."
   The builder track (ch 33 ClawClass) presents swarms without this
   counterweight; adding the tension makes the swarm argument stronger.
   Also: outcome-based pricing for high-value agent work.
2. **The verification funnel / evaluation gap** (MIT Sloan/Demirer via FT
   + VentureBeat "evaluation gap", Carl Franzen, Jul 10 2026): +300% output →
   +30% outcomes; human review is the choke point. NBER: ~90% of firms
   report zero measurable AI productivity impact over 3 years. VB Pulse
   (Jun 2026, n=157, directional): 50% shipped an agent that passed internal
   evals yet caused a customer-facing failure; 66% moving to zero-human
   deployment while only 5% fully trust the evals that would gate it; big
   enterprises fastest AND failing most (70%/54%). Article's prescriptions
   (autonomy expands by risk not ambition; earned zero-human; every incident
   becomes a regression test) = ch 14's mandate layer + the 2.0 Curator,
   independently arrived at. Quantifies the auditability flex. Candidates:
   business ch 8/12/14, builder ch 30. URL:
   venturebeat.com/orchestration/enterprise-ai-is-entering-an-evaluation-gap-agents-are-gaining-autonomy-faster-than-companies-can-verify-them
3. **Singapore IMDA agentic governance framework** — govern at the tool
   layer, not the prompt layer; measure the *override rate* (too low =
   rubber-stamping); logs must live where the agent cannot edit them.
   Business ch 14 / builder governance.
4. **Ramp's legibility pattern** — finance rejected codegen as black box;
   agent biased toward Excel formulas because the output is inspectable by
   the human who owns the number. Plus shadow-mode → review-agent →
   promotion deployment ladder. Builder loop-engineering material.
5. **Clean-ERP advantage** (AIM/Gartner): disciplined master data = 6–12
   months ahead on agentic deployment; successful AI orgs invest 4x more
   in data quality; the "context layer" land grab (Celonis/Ikigai, SAP
   Signavio). External validation of the FlowWink premise + knowledge
   hygiene thread. Business ch 6/12.
6. **NVIDIA SLM-fleet paper** — fine-tuned 1.5–10B models match LLMs on
   narrow agent tasks at 10–30x less compute; right-sizing per task as an
   economics argument (distinct from sovereignty). Builder ch 7/19.
7. **Shadow-agent sprawl** (Menlo/RecOS/ModelOp): 68% of employees use
   free-tier AI via personal accounts, 57% paste sensitive data; govern by
   workflow (green/amber/red), not by tool. Business ch 8/14.
8. **Management = routing + sensemaking + accountability** (Sisney):
   automate routing, keep sensemaking human, keep accountability
   individual; "AI-native" companies that cut management cut sensemaking by
   mistake. Business ch 9/15.
9. **Deep-agents pattern language** — living-runbook prompt, planning tool,
   role-carded sub-agents, filesystem as shared memory. OpenClaw already
   embodies it; the builder track could teach it as named vocabulary.
10. **"Most agent failures are workflow failures"** (INVENEW) — the
    permission gradient ("create a draft" < "send the email") and the
    tolerance question: can this workflow tolerate what the agent gets
    wrong? Builder ch 30/31.

7. **The agent web gets an economy** (Cloudflare pay-per-request bot
   traffic, via The Atlas Jul 10; + JPMorgan on-prem AI via Bussmann
   briefing Jul 11): machine traffic becomes a paying customer class —
   pairs with ch 13's payment giants and the agent-readable thesis;
   JPMorgan on-prem = sovereignty proof for ch 11's reflection and
   ch 15's data question. Also: Microsoft/AWS "FDE" (forward-deployed
   engineers) = the market naming loop-engineering-adjacent work.

## Standing patterns to watch

- Agent **unit economics** is the market's biggest blind spot → the
  handbook now leads on it (ch 11/14); keep extending.
- **Verification as bottleneck** — accumulating quantitative support.
- **Operational context as moat** — market converging on the FlowWink
  thesis; claim it loudly before it becomes conventional wisdom.
- **Monolith vs swarm** — live debate; builder track should host it.
