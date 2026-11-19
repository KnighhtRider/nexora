# Phase 5 — Interactive Workflow Demo

**Objective:** the deterministic invoice-processing simulation, fully tested, keyboard accessible, replacing the Phase 3 placeholder.
**Read:** AGENTS.md, docs/DEMO_SPEC.md, docs/DESIGN_SYSTEM.md (motion, components), docs/CLAIMS_REGISTER.md
**Prerequisite:** Phase 4 approved (or at least Phase 3; the demo does not depend on the Core).
**Branch prefix:** `phase-5/`   **Tag:** `phase-5-approved`

## Tasks
- **T5.1 Data.** `data/`: four fictional sample invoices (A clean, B policy flag, C duplicate, D incomplete record — see the rule-coverage table in DEMO_SPEC), sample ledger, approved-supplier list, four policy rules, sample threshold. Plain typed objects; clearly fictional names.
- **T5.2 Pure reducer + selectors.** `state/`: `demoReducer`, `DemoState`, selectors (`canAdvance`, `canApprove`, `recommendation`). No timers/Date/random. Invalid events return the same state reference.
- **T5.3 Reducer tests.** Table-driven: every row of the transition table for all four samples; every ignored invalid transition (asserting object identity); unknown sample id; `RESET` from every state.
- **T5.4 Step control + hook.** `useWorkflowDemo.ts` binds the reducer and owns the *optional* auto-play timer (off by default, `STEP_COMPLETE` only, cleared on unmount/reset, ~0 delay under reduced motion). The `ADVANCE` button is the normal path.
- **T5.5 Presentational components (split across cards).** Step rail, document preview with field highlights, extraction panel, rules panel, approval panel, audit log (step counters, no timestamps), completion panel (states ERP sync is simulated).
- **T5.6 Layout.** Desktop three-column; mobile sticky compact step indicator + stacked panels. Motion library for step transitions only.
- **T5.7 Accessibility.** Polite live region announces the step the visitor triggered; no automatic focus moves; one persistent step control keeps focus across transitions; status = icon + text; Approve/Reject real and both enabled in `awaitingApproval`; keyboard-only completion.
- **T5.8 Mount on homepage.** Replace placeholder; permanent label visible; add `Lite`-Core interplay only if Phase 4 done (Core dims during demo per scroll story).
- **T5.9 Tests.** Component tests (approval panel, live region, disabled control per state); E2E full journey × 4 samples with **no waits**; keyboard-only run; reduced-motion run; reset mid-flow; approve-against-recommendation is logged; visual baselines (static states).

## Split before use
- **T5.5 →** T5.5a step rail + document preview with field highlights · T5.5b extraction panel + rules panel · T5.5c approval panel + audit log + completion panel.
- **T5.9 →** T5.9a component tests · T5.9b E2E for samples A/B · T5.9c E2E for samples C/D + keyboard/reduced-motion/reset.

## Rules
No network calls. No randomness. No claim of real AI/ERP/payment. No GSAP in the demo. If states exceed ~10 or branching grows, propose XState via a decision card — do not add it unasked.

## Exit gate (human approves)
- [ ] All states reachable and recoverable by keyboard alone.
- [ ] Unit + component + E2E green (real output shown).
- [ ] Simulation label always visible; completion screen says ERP sync is simulated.
- [ ] axe clean on the homepage with demo in several states.
- [ ] Tag `phase-5-approved`.
