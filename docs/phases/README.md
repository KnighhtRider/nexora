# Phase Index

Work strictly in order. A phase is approved only when `npm run verify` is green **and** the human has reviewed the Vercel preview. Tag each approval.

| Phase | File | Gate tag |
|---|---|---|
| 0 Foundation and tooling | PHASE_00_FOUNDATION.md | phase-0-approved |
| 1 Design system lock | PHASE_01_DESIGN_SYSTEM.md | phase-1-approved |
| 2 Content foundation (parallel with 1) | PHASE_02_CONTENT.md | phase-2-approved |
| 3 Static homepage | PHASE_03_STATIC_HOMEPAGE.md | phase-3-approved |
| 4 AI Core | PHASE_04_AI_CORE.md | phase-4-approved |
| 5 Workflow demo | PHASE_05_WORKFLOW_DEMO.md | phase-5-approved |
| 6 Remaining pages | PHASE_06_REMAINING_PAGES.md | phase-6-approved |
| 7 Motion and responsive polish | PHASE_07_POLISH.md | phase-7-approved |
| 8 Hardening | PHASE_08_HARDENING.md | phase-8-approved |
| 9 Launch | PHASE_09_LAUNCH.md | phase-9-approved, v1.0.0 |

Each task in a phase file is a **task card seed**: expand it with `docs/TASK_CARD_TEMPLATE.md` before giving it to the agent (≈300 changed lines, ≤5 files, one task per session). Where a seed is still too large, the phase file carries a **Split before use** block — use it. Do not hand a two-day card to an agent and hope.
