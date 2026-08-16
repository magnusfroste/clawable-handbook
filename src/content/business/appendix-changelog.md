---
title: "Revision History"
description: "What changed in each edition — the handbook is operated the way the systems it describes are: continuously, with a log."
order: 88
icon: "arrow-path"
appendix: true
---

> This handbook is a living document, reviewed monthly with fast patches for major ecosystem changes. This page is its activity log — **for both editions**, Business and Builder. If the systems we describe keep an audit trail, so should we.

---

## August 2026 Edition

**The harness edition.** The industry settled on a word for what this handbook has argued since the first edition — and the reference platform mapped its own, component by component. Both landed in the book the same month.

- **The Harness gets its own chapter** (Builder 5b): the material outgrew the control-plane chapter within a day of landing there, so it was broken out — the industry's vocabulary shift, the eleven-component map, the three rulings, and the component most teams skip, plus a closing three-move plan (draw the map, assign every new behaviour to a component, close the verification gap first). The foreword's core path now opens with it: it is the map of all the other machine chapters. Chapter numbering elsewhere is untouched.
- **The harness, named — eleven components** (Builder chs 5, 11, 14): the reference platform mapped its own harness component by component, and the map is now in the book as something to measure your own system against — loop, skill selection, context assembly, memory, policy, verification, self-correction, escalation, learning, observability, resumption. With it come three rulings that generalize: the harness is a platform primitive (not a feature of the agent module), it is model-agnostic by construction (swapping engines changes the engine, not the chassis), and **every incident becomes a harness component, permanently** — the harness hardens with age instead of decaying. Chapter 11 gains the Trace, the read model that turns "why did the agent do that?" from hand-written SQL into a surface — and makes *"audit the agent the way you audit an employee"* real rather than a slogan. Chapter 14 gains the resumption rule a proof run bought: a paused chain resumes only where every completed step is provably idempotent; where the guarantees end, a human belongs.
- **The 1.5-gigabyte signal** (foreword, *Why I Built This*): the author's origin note now names what he actually saw in late 2024 — one of Meta's small edge models running on his own Mac, Wi-Fi off, answering a bank quant's hardest questions at a children's birthday party. The file was 1.5 gigabytes. By 2025 the shape had appeared in full: models that could act, not just answer. Fact-checked before shipping: the 1.5-gigabyte class of Meta weights arrived in the autumn of 2024, so the note says late 2024 — which also makes the arc tighter: the signal in the autumn, full-time from January.
- **Housekeeping the reader never sees, and would notice if we skipped it:** chapter counts reconciled across every surface — both landing pages, the front page's edition cards and MCP pitch, and the repository README. Two of the numbers had been wrong since July, on pages the month's changes never touched. A handbook that argues for auditing across boundaries should survive being audited across its own.

## July 2026 Edition

**The launch edition — and the audit that followed it.** The handbook went public in July, and the month split cleanly in two: everything written to make it ready, and everything the first readers, the author included, found once it was.

- **New logged evidence throughout.** A real audit of a freshly provisioned instance (ch 6); the logged `manage_leads` silent-failure case (ch 12); a third quiet proof for the mandate layer — the empty support queue (ch 14); and "Four Days, Logged": one operator running a business cycle from zero to 860,000 SEK ARR (ch 11).
- **New strategic frames for the business track.** The MCP adoption spectrum and the Two Dimensions map — vertical agents vs horizontal operators × rule-work vs judgment-work (ch 11); "Running the Vendor Conversation," the leadership playbook for vendor pressure (ch 12); "The Post-SaaS Question," explicitly hypothesis-tagged (ch 13); the four expectations of AI ranked by evidence, with cost-cutting last (ch 11); the Fixed-Cost Workhorse and the CFO principle behind it (ch 11); the knowledge question — what the agent reaches must also be understandable (ch 6); the process catalog appendix; and "Eighteen Months In" (ch 15), the vision tableau built entirely from mechanisms the book had already proved.
- **The value thread made explicit** (chs 9, 11, 15): surfaced value versus realized value, the operator-value equation, and the receiving organization — the distinction every later value claim in the book has to declare.
- **Market signals, each given one home and a date.** The $60B Anysphere acquisition as the control-plane thesis getting its price tag; BCG's *AI at Work 2026*; all four payment giants shipping agentic-payment programs; the enterprise cost-capping wave ("an agent is a meter that runs"); Capgemini's trust curve and MIT's warm negotiator; the June model shutdowns and April's platform cutoff as twin lessons in operator architecture; and the Meta-Harness paper's empirical result.
- **"The Labs Came From the Other Side"** (ch 7): all three frontier labs now ship their own agent layer, plus xAI by acquisition and Microsoft shipping agentic mode inside Office — with the direct answer to the question a reader is entitled to ask: if the giants all ship agents, why does this book run on OpenClaw?
- **The OpenClaw origin story corrected** (ch 1, builder foreword, TL;DR, glossary): launched quietly in November 2025, took off in January 2026, roughly half a million systems worldwide — and OpenAI did not just adopt the architecture, it hired its creator to build agent systems across its product teams.
- **The book became instrumented.** Its own MCP surface — list, read and search every chapter — plus `llms.txt` and raw markdown; browser-native listen buttons; one-tap chapter feedback; and an end-of-book survey with NPS, interest in a third handbook, and an optional named note the reader can consent to publish. The readers became research input for the book being researched.
- **The platform the builder book describes caught up with itself.** FlowWink *is* the Business Operating System, agent-agnostic, with FlowPilot as its flagship opt-in module — every inverted claim fixed, the FlowChat layer introduced, the trust model corrected to four levels. FlowPilot 2.0 adopted three Hermes patterns (follow-through, pipeline collapse, the human-gated Skill Curator); the embedded library and the MCP surface converged into one shared catalog; and a recount from the shipped artifact set the real numbers — **512 skills across 68 modules** — with the heartbeat becoming a per-instance cadence dial once production measured what always-on reasoning actually costs.
- **"Two Tools, Five Hundred Skills"** (builder chs 12, 15, 17, 19): how an external client reaches a 500-skill catalog while holding two tool definitions in context — search-then-invoke, running on the same intent scorer as the embedded operator. Declared honestly as a best practice, not a standard.
- **"The Two Tiers of Tool Metadata"** (builder ch 15): what the agent sees when it *decides* is not what it sees when it *acts*, so a rule that lives only in lazily-loaded instructions is invisible exactly when it should change the decision. Proven by a three-round logged case — and shipped only after the third round verified the ending, because a section about verify-don't-trust does not get an unverified conclusion.
- **The harness bridge** (builder ch 5, both glossaries): through 2026 the industry settled on a word for everything this book calls the control plane — the *harness*. The book was betting on it before the word arrived; the industry naming it is the thesis being accepted.
- **The launch-week re-read** (all sixteen business chapters): the author read the book cover to cover after publishing and the editor swept behind him — some thirty findings fixed. The recurring theme is boundary vocabulary, now honest end to end: cross-*module* is the logged April proof, cross-*domain* the May tests, cross-*system* the architecture's promise. Every retold story names its first telling; the Norrvind Motors thread finally closes on day thirty-three; the scenario customers are consistent across every chapter; and chapter five's claim that the external operator "reacts; it does not initiate" — which contradicted the book's own central proof — is gone. The findings motto arrived with it (ch 15): *the day it finds ten problems is a better day than the day it finds none.*
- **Three audits the reader never sees.** An accessibility pass translated developer vocabulary into business language across both tracks, prompted by early-reader feedback — the evidence unchanged, only the language moved closer to the reader. A repetition audit gave every mechanism exactly one home chapter, with acknowledged backrefs everywhere else. And a dead-weight audit asked one question of the builder track — *does this drive the reader's build forward?* — then cut about 10,000 words that didn't: market-watching, speculative narrative, twice-taught defenses, rotting price tables. Every logged proof and war story stayed. The editorial checklist gained a standing rot guard.

## June 2026 Edition

- **Live Proof extended** with Act III (the stressed morning) and Act IV (the long game — the 18.3x invoice cascade, tracked across seven weeks).
- **ClawStack renamed ClawClass** across the handbook, matching the project's rename.
- **Live Proof skill counts** synced with the platform's expanding MCP surface.

## May 2026 — First Edition

- Initial publication: sixteen chapters plus appendices. The April 19 detection proof, the operation proofs, the architecture decisions, the failure modes, the mandate layer, and the ninety-day path.

---

*Every change lands in the public repository with a commit history — the full audit trail is at [github.com/magnusfroste](https://github.com/magnusfroste).*
