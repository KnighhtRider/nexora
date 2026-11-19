# Session Handoff

Overwrite the "Current state" block at the end of every session. Keep history short (last 5 sessions).

## Current state
- **Phase:** 0 (not started — no `package.json`, no code)
- **Last completed task:** spec review + correction pass, docs only (2026-11-19)
- **Branch:** none. `git init` done, zero commits, default branch is `master` → rename to `main` before the first commit
- **Last `npm run verify` result:** not run (nothing to build)
- **Preview URL:** none

## Next task
T0.1 — see docs/phases/PHASE_00_FOUNDATION.md. Read the pre-flight first: the scaffold must be generated in a temp directory (this docs pack already occupies the repo root), and the branch must be renamed to `main`.

## Known issues
- The contrast table in DESIGN_SYSTEM was computed from the WCAG relative-luminance formula, not a UI tool. Re-verify in T1.1 and paste the tool output into the task report.
- The static AI Core poster does not exist yet and has no generation procedure beyond "regenerate by hand" (T4.4b). Decide where the file lives (`public/`) and what renders it.
- Six task-card seeds are still too large; each phase file now carries a "Split before use" block. Use it — do not hand a two-day card to an agent.
- T7.6 (page transition polish) and T9.3 (analytics) are optional and must not be started without a decision.

## Decisions pending from the human
Remaining business inputs only (the technical rows are settled in DECISIONS.md): email/CRM provider, analytics at launch, domain + trademark check for NEXORA, the 5–8 reference sites for DESIGN_SYSTEM §9, and who writes the three launch articles and the legal pages.

## History
| Date | Task | Result |
|---|---|---|
| 2026-11-19 | Spec review + correction pass | Fixed two defects that would have broken Phase 1 (`line-strong` failed 1.4.11 at 2.87:1; `--duration-*` generated no utility), closed the demo state-machine gaps, added sample D so all four policy rules are exercised, replaced auto-advance timers with visitor-driven stepping, resolved the Phase 0 bootstrap blockers (branch name, scaffold conflict, build-safe env), settled 9 decisions, added `docs/ARCHITECTURE.md`, split the oversized task cards, and de-duplicated the README. No code changed; no commands run. |
