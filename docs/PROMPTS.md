# Ready-to-paste prompts (opencode)

**Kickoff (Phase 0, first session):**
```text
Read AGENTS.md and docs/PROJECT_BRIEF.md, then docs/phases/PHASE_00_FOUNDATION.md.
This is a greenfield repo. Do task T0.1 only.
First list the exact commands and files you will create, then wait for my OK.
Do not install anything not in the approved list: <list>.
After the work run npm run verify and report real output.
```

**UI task:**
```text
Task card attached. Read only the docs it lists. Use tokens only.
Build <component or section>. Match the reference: <screenshot or description>.
Before reporting done: run npm run verify, screenshot at 375 and 1440, check keyboard and
reduced motion, and list anything that differs from the target.
```

**Bug fix:**
```text
Bug: <what happens>. Expected: <what should happen>. Steps: <1,2,3>.
Find the root cause before editing. Show me the cause and the smallest fix.
Add a regression test. Do not change unrelated code.
```

**Review pass (fresh session or different model):**
```text
Review this diff against AGENTS.md and docs/DESIGN_SYSTEM.md. List violations by severity:
raw colors, missing focus states, a11y issues, unnecessary client components, leaked
listeners, unapproved dependencies, invented claims. Do not edit; only report.
```

**Session close:**
```text
Update docs/SESSION_HANDOFF.md: done, next, known issues, decisions. Log any decision in
docs/DECISIONS.md. Then give the final report: changed files, commands, real results, open issues.
```

**Never write** "make it look super cool and premium". Give a reference, token names, measurements, and what to avoid.
