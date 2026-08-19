# Book 3 — *The Learning Operator* · the standing inbox

> **If you have material for the third handbook, this is the file. Add it at the
> bottom under "Untriaged inbox" and stop there — someone will place it.**
> Everything about Book 3 that is worth keeping lives here or is linked from
> here. Nothing else needs to be searched.

**Status:** in research, no manuscript. Announced in both closings
(Business ch 15, Builder ch 36 — "coming 2027").

---

## What the book is

**The one question:** *once the operator is running well, what do you do with
everything it has learned?* Not whether to deploy — Books 1 and 2 settled that.
This one starts the morning after it works.

**The thesis, from ch 15's own framing:** a system that gets better without
being retrained — it notices a pattern nobody pointed at, builds a skill from
it, tests it against real data, and adds it to its own repertoire. Built on
**Hermes Agent** (NousResearch), where the learning loop is native rather than
bolted on.

**The spine, in one line** (from the harness work, Aug 2026):

> **Every incident becomes a harness component, permanently.**

That is the whole book compressed: a system whose failures turn into
architecture instead of patches, so it hardens with age instead of decaying.

**The reader:** someone already operating an agent in production. Not
persuading, not deploying — compounding. Books 1 and 2 have the persuasion and
the build; this one has no obligation to repeat either.

---

## Material collected (source · status)

| # | Material | Source | Status |
|---|---|---|---|
| 1 | **The two-tiers incident as a full operator-loop story** — agent guessed → human challenged → the *log*, not the agent's account, revealed the cause → fix placed where the decision is made → guardrail makes the silent version impossible. Ends on *"verification found the architecture."* Three logged rounds with timestamps. | `fieldreport-two-tiers-2026-07.md` | **Ready to write.** The principle already shipped in Builder ch 15; the *narrative* is unused and belongs here. |
| 2 | **The evidence ledger** — no self-graded confidence ("a model asked to grade its own certainty will, and it will be wrong in the direction that makes it look useful"); typed observations priced in one reviewable table; the third gate: trust levels gate the *call*, approvals gate the *action*, the ledger gates the *claim*. | `fieldreport-harness-and-evidence-2026-08.md` | **Held — proposed, no code.** Write when it ships; the epistemics are the chapter either way. |
| 3 | **The Curator** — human-gated learning loop: evidence from failures and human-rejected approvals → drafted instruction improvements → staged for approval → applied by follow-through. Bounded (≥3 failures to qualify, 3 proposals/run, 14-day cooldown); skill self-modification pinned to `approve` by policy. | FlowPilot 2.0 (Builder ch 14 has the summary) | **Ready** as mechanism; needs accumulated real corrections to have a *story*. |
| 4 | **Rejection notes as next-round evidence** — the beat where a human's "no, because…" becomes the input that improves the next proposal. The learning loop's most human moment. | Curator design | **Watch** — needs a real logged instance. |
| 5 | **Hardening by simulation** — hollow turns, search counted as work, content amnesia: three operator-quality gaps found by fast-forwarding a week of operation before living it. | FlowPilot 2.0 sim pass | **Ready.** Fits "how do you test a system that changes itself?" |
| 6 | **Proof-week production data** — the 10-day monitored run at a real company. | `fieldreport-flowpilot-proofweek-2026-07.md` | **Pending maturity.** |

---

## Reader demand (measured, not assumed)

From the end-of-book survey, as of August 2026: **three readers who finished the
book said yes to a third handbook.** Requested focus: use cases (2), ROI (1).
Small numbers, but they are the only direct signal we have — and they say the
third book should stay concrete rather than theoretical. Re-check
`book_survey` before outlining.

---

## How material gets here

Two sessions feed this file:

- **The field session** (flowwink-local, or any operator session) appends raw
  entries under *Untriaged inbox* below — no formatting rules, no permission
  needed. A dated heading and what you saw is enough. Larger evidence still
  goes in a `docs/fieldreport-*.md` and gets linked from here.
- **The editor session** triages: moves entries into the table above with a
  source and a status, or rejects them against the kill criteria in
  `editorial-map.md`.

The gate that already earned its keep: **material with an unverified ending
waits.** The two-tiers section shipped only after the third round's log
confirmed the fix. A book about learning from evidence does not get to skip
that step.

---

## Untriaged inbox

*(Append below. Newest at the bottom. Nothing here is committed to the book.)*

