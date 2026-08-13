# Field report: the named harness + the evidence ledger

**Source:** flowwink-local (Claude, FlowWink dev lead) — architecture docs authored in the
clawable-quiet period. Swept from the flowwink repo by the editor session 2026-08-13
(926 commits since Jul 22; 9 new architecture docs).
**Status:** intake — NOT woven. Gates noted per finding.

---

## Finding 1 — `docs/architecture/agent-harness.md` (2026-07-23) · mostly SHIPPED

The same-day convergence: this session added the harness bridge to Builder ch 5 on
2026-07-23 (commit `1f5455c`); flowwink-local dated its own harness doc the *same day*,
with the trigger "'harness' has become the industry frame for production agents; FlowWink
already has one, unnamed and scattered." Two sessions, no coordination, same conclusion.

**What it contains that the handbook does not:**

- **The component map (H1–H11)** — the harness named part by part: loop, skill selection,
  context assembly, memory, policy/guardrails, verification, self-correction, escalation
  (HIL), learning, observability, resumption. Ten of eleven shipped. This is the concrete
  instantiation of ch 5's "harness = control plane". `validated`
- **Design ruling: the harness is a PLATFORM primitive, not a module feature.** It lives in
  `_shared/`, is consumed by the internal operator *and* by external agents through the MCP
  gateway, and must never sit behind the FlowPilot toggle. Same law as the skill catalog
  convergence (ch 15) — extended from the catalog to the machinery. `validated`
- **"The harness is model-agnostic. Every component sits between the model and the world,
  so swapping the model changes the engine, not the chassis."** — ch 7's model-agnostic
  argument, stated architecturally.
- **"Every incident becomes a harness component, permanently."** Each bug class hardened one
  component plus a CI guardrail. The book's incident→guardrail pattern (ch 15's two-tiers
  case) generalised into a build law.
- **H6 Verification: "objectives close on evidence from `agent_activity`, never on model
  prose."** Verify-don't-trust as *architecture*, not discipline. Strongest single line for
  chs 20/21/30.
- **H10 → the Trace (next build):** a read model over the activity log — trigger → context
  loaded → skills surfaced (and why each ranked) → model chose → each policy guard
  (passed/gated/escalated) → verified outcome. Framed as making real the promise "audit the
  agent the way you audit an employee." Builder ch 11 home; business ch 14 accountability
  angle. `partial` — data layer shipped, product surface is the next build.
- **H11 Resumption war story:** the Phase-4 proof caught a double-fire — a model re-ran
  completed non-idempotent steps. Fix: a resume directive is emitted ONLY when every
  completed step is idempotent (fail-closed allowlist), else `needs_review`/paused, and a
  paused run is legible in the Trace. Extends ch 14's follow-through section. `validated`

**Weave gate:** shipped rows are weavable now; the Trace must be described as the next build
(`partial`), not as a live surface.

---

## Finding 2 — `docs/architecture/evidence-ledger.md` (2026-08-04) · PROPOSED, no code

Provenance and confidence for agent-written *claims*. This is the closest thing anyone has
put on the table to the gap this session named on Aug 10 in the Olaf Paap exchange
("fragment-level provenance at reasoning time — nobody has an answer"). It answers the
*write-path* half, not the authority-reconstruction half — be precise about that.

- **The motivating bug, from their own code:** `enrich_company` overwrites a rep's typed
  notes with the site's `og:description`, and a human-verified phone number with the first
  phone-shaped regex hit. Nothing records where any of it came from. Universal drift, not
  FlowWink weakness — every CRM enrichment does this. `validated`
- **The line:** "A confidently wrong fact about a customer is worse than a blank field,
  because nobody can tell it is wrong."
- **The rule — no self-graded confidence:** "a model asked to grade its own certainty will,
  and it will be wrong in the direction that makes it look useful." So no tool accepts a
  confidence score. A tool reports *what it observed* (a typed `evidence_kind`); the
  platform prices it in one weights table in code, reviewable in a diff. Same instinct as
  Law 1: the decision belongs to an inspectable mechanism, not a per-call judgement.
- **Typed observations, priced:** `human.entered` 0.95 · `registry.official` 0.95 ·
  `customer.self_reported` 0.85 · `document.extracted` 0.75 · `site.structured` 0.60 ·
  `vendor.enrichment` 0.50 · `web.cited` 0.40 · `site.text_pattern` 0.30 ·
  `model.inference` 0.25 · `contradiction` 0.
- **The new axis for the book:** trust levels gate the **call**; approval requests gate the
  **action**; the evidence ledger gates the **claim**. The handbook currently has the first
  two only.

**Weave gate:** status is *proposed, no code written*. Do not present as shipped. Either
hold for the edition where it ships, or weave the *principle* explicitly tagged
`hypothesis` / "design ruling, not yet built".

---

## Finding 3 — smaller, held

- `work-queue.md` (2026-08-01, proposed): durable task rows with due time, lease and attempt
  count instead of a cron job per feature. Relevant to builder chs 10/11 if it ships.
- `recurring-value-model.md` (COMPLETE): a price is `(amount, cadence, term, quantity)`, not
  a scalar — dimensions inherited quote→contract→subscription. Business ch 12 angle: what an
  agent must be able to reason about before it can operate commercial processes.
- `ownership-and-coverage.md` (shipped 2026-08-07): who owns a record, how ownership travels
  down the chain, how a colleague covers without anything being moved. Mandate/scoping
  angle (business ch 14, builder ch 22).
- `docs/contracts/se/privat-ai-drift.md`: a Swedish contract template for private AI
  operations — sovereignty lane material for the post series, not the book.
