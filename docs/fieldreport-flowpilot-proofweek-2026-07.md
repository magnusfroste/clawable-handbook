# Field report — FlowPilot 2.0 proof week (liteit), intake for the editor

**From:** flowwink-local session (Claude, FlowWink dev lead) · **Date:** 2026-07-13
**Status:** INTAKE — not chapter copy. Editor triages; accept/reject/reshape per the
editorial rules. Everything below is first-hand production evidence from
`www.liteit.se` (the real company instance), collected the day the proof week started.

**Why this exists:** CLAUDE.md already flags the liteit monitoring as *August-edition
material* and notes ch 14 documents follow-through / pipeline-collapse / the Curator.
This is the **early evidence** those chapters are waiting for — day-1 of the 10-day run,
so numbers will deepen. Tagged `validated` / `partial` / `hypothesis` per house rule.
Framed drift-not-defect, loop-closed, one bug per idea.

---

## 1. The learning loop ran live — the Curator's first real cycle `validated`
**Serves:** builder ch 16 (skill self-creation) · ch 20 (feedback loops) · business ch 4c
(contract layer) / the value thread.

The Skill Curator (Phase 3) ran against the instance's real failure history and, in one
pass, **observed 85 skills and staged 3 instruction-improvement proposals** into
`/admin/approvals` — each rationale matching a genuine failure mode it saw in the logs:
- `manage_journal_entry` — agents tried to *delete* posted entries (should void), booked
  into closed periods, passed voucher numbers where a UUID was expected.
- `record_churn_reason` — free-text synonyms instead of the skill's declared enum values.
- `query_flowtable` — aggregating on guessed field names instead of discovering the schema.

Human review (me, standing in as editor-in-chief): **2 approved, 1 rejected with a note**
— the rejection said *"wrong discovery tool; use `list_flowtable_tables`"*, and that note
is now evidence the Curator's next round reads. Follow-through applied the two approved
edits to the live catalog within one 5-minute cycle.

**The beat for the book:** the agent proposes, the human edits, the correction compounds
into every future run. This is *operator value = findings × the rate humans act on them*
made mechanical — and safe: skill self-modification is pinned to human approval even in
the most autonomous ("proving") posture. It never rewrites its own contracts unwatched.

## 2. Memory is lived-in, not decorative `validated`
**Serves:** builder ch 18 (memory architecture) · business ch 14 (mandate layer).

On the real instance: **175 memory rows.** `soul` / `identity` / `agents` all present.
Every cycle the operator writes self-reflections, outcome-learning entries, and records
its own content output. The `identity` object carries explicit **boundaries** — *cannot
send email or delete data or touch RLS or move money without approval*. The mandate isn't
only in the code; it's written into who the agent believes it is.

## 3. The operator audited its own catalogue and found a real bug `validated` (drift frame)
**Serves:** business ch 3 (live proof) · builder ch 30 (testing).

Unprompted, the daily self-reflection logged: *"`send_webinar_reminders` fails — edge
function returned HTTP 404"* and *"317 skills never used — consider disabling or
promoting."* Textbook drift (a function/deploy out of sync, universal), surfaced by the
agent reasoning about itself.

**Loop closed same day:** the 404 was one edge function that had never been deployed to
the instance (the code existed in the repo; the deploy step was the gap). Deployed it —
and, checking the rest of the fleet, found the same drift on all four instances and
deployed there too. Verified: `{"success":true, "errors":[]}` on every instance. The
agent flagged it, a one-line fix cleared it fleet-wide, and the sweep now runs clean.
Finding → repro → fixed in one session.

## 4. Dial inheritance — you can't escalate privilege by wrapping `validated`
**Serves:** business ch 14 (mandate layer) · builder ch 14.

A pipeline-collapse composite (the daily bookkeeping sweep) **never bypasses a stricter
gate on an inner skill.** Set `manage_journal_entry` to *approve* and the whole sweep
stops auto-booking, queues everything for a human, and reports why. Governance composes
downward: the safe default wins even when a convenience wrapper sits on top. A concrete
mechanism for the "mandate makes autonomy trustworthy" thesis.

## 5. The hollow-turn fix — a before/after from a repeatable harness `validated`
**Serves:** builder ch 30 (testing agents).

Fast-forward simulation scoreboard: **baseline 2 artefacts across 3 simulated days with 1
hollow turn** (the agent declared an intention and stopped without executing) → after the
fix, **5/5 days delivered, 0 hollow.** The fix is an outcome check, not hardcoded routing:
a cycle with active objectives that executed no business skill gets one bounded corrective
pass. Demonstrates testing autonomy by fast-forwarding heartbeats, not just unit tests.

## 6. Auditability flex — the security sweep `validated`
**Serves:** wherever the "a stack that can't be audited is unexamined" line lives.

Whole-fleet security sweep in one session: **RLS on every table, zero SECURITY DEFINER
functions missing `search_path`, no secrets in git.** One control-plane hole found (a
permissive write policy on `agent_automations` that let any authenticated user edit the
operator's automations) and **closed the same session**, verified across all five
instances. The point isn't "it had a hole" — every system does. It's that the hole was
*findable and fixable over SQL/MCP in minutes.* The auditability is the feature.

## 7. Naming as drift `partial` — editor's call, likely a sidebar at most
Two wire renames shipped this week: the `resume` module → `consultants` (it collided with
the résumé/CV artefact), and the operator's approval-continuation `flowpilot-resume` →
`follow-through` (collided with that same résumé noun *and* read like a user-toggle rather
than engine plumbing). Lesson if it's useful: name for the *action*, and rename the wire
*before* it freezes across the fleet — after that, fix the story, not the identifier.

---

### Housekeeping for the editor
- Proof week is **day 1 of ~10** — items 1–3 will have richer numbers by the August pass
  (completed-approved-actions/week, incident count, more Curator rounds).
- Everything here is on `www.liteit.se`, a real company, real posture (`proving`), not a demo.
- Canonical facts already match CLAUDE.md (300+ skills / 60+ modules, converged catalogue).
  One live number to note: the instance's gated-skill surface is **270** (trust notify/approve).
