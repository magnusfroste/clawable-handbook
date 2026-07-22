# Field report: The two tiers of tool metadata (description vs instructions)

**Source:** flowwink-local session (Claude, FlowWink dev), delivered via Magnus 2026-07-22
**Status:** WOVEN 2026-07-22. Round 3 verified same day: `search_web` 17:01:13 (query hit clawable.org via SearXNG) → `write_blog_post` 17:01:41, post grounded and source-linked — only change was the sentence's location. Section lives in Builder ch 15 ("The Two Tiers of Tool Metadata"), one-line pointers in chs 9 and 19, changelog entry filed. Fix commit `e721f407` in flowwink (1083 tests green, synced liteit/autoversio/demo+dev).
**Chapter mapping:** Builder ch 15 (skills ecosystem — the skill-anatomy home) as the section's home; one-line consequence notes in ch 9 (Law 3, lazy loading) and ch 19 (lazy instruction loading) at weave time. Learning Operator edition (Book 3 / Autumn) gets the incident as an operator-loop case with a cross-ref box.

## The finding (log-verified parts)

- Operator asked the FlowChat-driven agent to "write a blog post about agent-ready websites, reference clawable.org." Agent published 24 seconds later (`agent_activity`: single row `write_blog_post` 16:43:23, question at 16:42:59) — no `search_web`, no `scrape_url`, content written from memory. `validated` (activity log)
- First fix (grounding rule added to the skill's **instructions**) did not bite: agent guessed again on retest. `validated` (activity log, round 2)
- Root cause from the prompt compiler itself: skill instructions load lazily ("use skill_read BEFORE executing") — so at the moment the model *chooses* its path, it sees only the tool list with **descriptions**. A rule that lives only in instructions is invisible exactly when it should change the decision. `validated` (architecture, quoted from system prompt)
- Fix: grounding core moved into the **description** (both seed copies); full version stays in instructions for post-selection context. Guardrail extended: cue required in ≥2 description copies, lazy-loading rationale documented in the test. `validated` (commit + tests)
- **Round 3 (pending):** same prompt on autoversio → expect `search_web` (provider searxng) before `write_blog_post` in `agent_activity`. If it still guesses, next lever is scoring/prompt, not more metadata.

## The principle (for Builder ch 15)

**"If it must change what the agent *decides*, it goes in the description; if it changes how the agent *executes*, it goes in the instructions."** Decides = tool choice, research-first policies, "NOT for X" boundaries, first-do-A-then-B. Executes = parameter names, edge cases, error recovery, approval handshakes. Lazy loading is the right design (500 skills × full manuals drowns every prompt — ch 19's math); the split's quiet consequence is the point.

## Draft section

flowwink-local produced a full English draft ("The Two Tiers of Tool Metadata — What the agent sees when it decides is not what it sees when it acts"), including the case (anonymized as "a FlowWink instance"), a what-to-check-when-an-agent-ignores-a-rule list, and an operator-edition box. Draft lives in that session's scratchpad as `handbook-two-tiers.md`; Magnus can paste it here or flowwink-local can re-deliver.

## Editorial gate (agreed 2026-07-22)

Weave when round 3's log is in — the section's own lesson is verify-don't-trust, so it does not ship with an unverified "fixed the behavior" ending. On confirmation: upgrade the case ending to the verified before/after with the log excerpt (24-second guess → search-first run), weave into ch 15 after the skill-anatomy/gating material, add the two one-line cross-refs (ch 9 Law 3, ch 19), changelog entry. If round 3 fails: the finding gets even more interesting (metadata isn't the lever — scoring is) and the section waits for the real ending.
