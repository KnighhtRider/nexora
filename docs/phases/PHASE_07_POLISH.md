# Phase 7 — Motion and Responsive Polish

**Objective:** refine layouts, transitions, mobile behaviour and timing — deliberately, with baselines updated on purpose.
**Read:** AGENTS.md, docs/DESIGN_SYSTEM.md (motion, layout), docs/AI_CORE.md (scroll story)
**Branch prefix:** `phase-7/`   **Tag:** `phase-7-approved`

## Tasks
- **T7.1 Responsive audit.** Review every route at 320/375/768/1024/1280/1440/1920; fix overflow, spacing and type issues; touch targets ≥44px.
- **T7.2 Mobile design pass.** Intentional mobile layouts for hero, demo and nav (not compressed desktop).
- **T7.3 Motion consistency.** Apply motion tokens uniformly (durations, easing, distances, stagger limits); remove any element animated by two libraries; one idea per viewport.
- **T7.4 Scroll story tuning.** Timing/easing of Core states; verify no jank on lite tier; Pause control works.
- **T7.5 Reduced-motion audit.** Every route verified with `prefers-reduced-motion: reduce`.
- **T7.6 Page transition/entrance polish** (Motion only; optional; no layout shift).
- **T7.7 Baseline refresh.** Update visual baselines intentionally, one reviewed commit with before/after screenshots.

## Rules
No new features. No new dependencies. Performance budgets must not regress; re-measure after each material change.

## Exit gate (human approves)
- [ ] Before/after screenshots reviewed; baselines updated deliberately.
- [ ] Real-phone check (iOS + Android) of home, demo, nav, forms.
- [ ] Lighthouse/axe re-run; no regression versus Phase 3–6 numbers.
- [ ] Tag `phase-7-approved`.
