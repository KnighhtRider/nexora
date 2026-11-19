# Task Card Template

Copy, fill in, paste into a fresh opencode session.

```text
Task: <one sentence>
Phase: <N>   Branch: phase-N/<short-name>
Goal / user outcome:
Read first: AGENTS.md, docs/<only what is needed>
Files to create or edit (expected):
Out of scope (do not touch):
Design target: <reference screenshot, token names, breakpoints>
Acceptance criteria:
  - [ ] behavior 1
  - [ ] behavior 2
  - [ ] keyboard and screen-reader behavior
  - [ ] reduced-motion behavior
  - [ ] no new dependencies (or approved list: ...)
Tests required: <unit / component / e2e / visual>
Verification: npm run verify, plus screenshots at 375 and 1440
Size limit: about 300 changed lines, 5 files
Report format: changed files, commands, real results, open issues
```

Rules: one task per session; fresh chat per task; if the agent loops or invents, stop, revert, and tighten the card instead of arguing.
