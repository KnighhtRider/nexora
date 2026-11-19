# NEXORA AI — Documentation Pack (v3.0, for opencode / any coding agent)

**Date:** 18 November 2026
**Supersedes:** Final Specification v2.0 and the Spec Review / Gap Analysis / Build Playbook v3.0 (this pack merges both; where they differ, this pack wins).
**Status:** Product direction approved. Repository exists but contains no application code yet (docs only, Phase 0 not started) — this pack still assumes a **greenfield** app.

## What is in this pack

```
AGENTS.md                      Always-loaded agent rules (opencode reads this automatically)
opencode.json                  opencode config: instructions + MCP servers (verify syntax, see below)
README.md (repo root)          Project README: what this is, commands, where to look
docs/
  README.md                    This index
  PROJECT_BRIEF.md             What NEXORA is, audience, modules, honesty rules
  ARCHITECTURE.md              Target `src/` tree, module boundaries, import rules
  DESIGN_SYSTEM.md             Tokens, type, spacing, grid, components, motion
  PAGE_BLUEPRINTS.md           Job, sections and CTA for every route
  AI_CORE.md                   3D Core spec, tiers, budgets, lifecycle
  DEMO_SPEC.md                 Invoice simulation: states, reducer, UX, tests
  FORMS_SPEC.md                Request-demo / contact forms and server handling
  TESTING.md                   Test pyramid, Playwright setup, budgets, CI
  COPY_DECK.md                 Copy template + drafted homepage copy
  CLAIMS_REGISTER.md           Allowed / needs-proof / forbidden claims
  STACK_LOCK.md                Template; generated from the real lockfile in Phase 0
  DECISIONS.md                 Dated log of locked decisions
  SESSION_HANDOFF.md           Updated at the end of every session
  TASK_CARD_TEMPLATE.md        One-task-per-session format
  PROMPTS.md                   Ready-to-paste prompts for opencode
  DEFINITION_OF_DONE.md        Checklist for every task
  phases/PHASE_00 … PHASE_09   Phase-wise plans with task cards and exit gates
```

## Phase map (old → new)

The v2.0 spec had 8 phases (0–7). The playbook reorders them to reduce risk. **Use this 10-phase plan.**

| New | Name | v2.0 equivalent |
|---|---|---|
| 0 | Foundation and tooling | Phase 0 (expanded) |
| 1 | Design system lock | Phase 1 |
| 2 | Content foundation (human-led, can run parallel to 1) | new |
| 3 | Static homepage (no 3D) | Phase 2, part 1 |
| 4 | AI Core | Phase 2, part 2 |
| 5 | Workflow demo | Phase 4 (moved earlier) |
| 6 | Remaining pages | Phase 3 |
| 7 | Motion and responsive polish | Phase 5 |
| 8 | Hardening: SEO, a11y, security, testing | Phase 6 |
| 9 | Launch | Phase 7 |

## How to use with opencode

1. Create the repo, copy this pack in (`AGENTS.md`, `opencode.json`, `docs/`).
2. **Do not run `/init` in opencode** — it would overwrite `AGENTS.md`.
3. Start a **fresh session per task**. Paste the kickoff prompt from `docs/PROMPTS.md`, with a filled task card from `docs/TASK_CARD_TEMPLATE.md`.
4. opencode loads `AGENTS.md` automatically. Docs listed in `opencode.json` `instructions` are also loaded; keep that list short (context cost). Everything else is read only when a task card names it.
5. After each task: agent reports real command output, you open the Vercel preview, then merge. Tag at every phase gate (`phase-N-approved`).
6. Use a different session (or model) for review passes.

> **Verify before relying on it:** opencode's config keys (`instructions`, `mcp`) and MCP package names change between releases. Check https://opencode.ai/docs and each MCP server's README, then adjust `opencode.json`.

## Honest expectations

Nobody can promise a site that "never breaks" or is "pixel-perfect" from a description. This pack turns taste into measurable rules (tokens, grids, budgets) and puts automated gates (typecheck, unit, E2E, axe, visual regression, Lighthouse CI) between the agent and `main`. Lighthouse numbers are **targets to measure, not guaranteed scores.**

## Defaults assumed (change in `docs/DECISIONS.md` if you disagree)

| # | Decision | Default |
|---|---|---|
| 1 | Repo | Greenfield |
| 2 | Fonts | Geist Sans + Geist Mono via `next/font` (Inter dropped) |
| 3 | Primary button fill | `#2563EB` with `#F5F7FB` text; `#3478F6` only for accents, glows, large text |
| 4 | Animation ownership | CSS → micro-interactions; Motion → components; GSAP+ScrollTrigger → homepage scroll story only; **no Lenis at launch** |
| 5 | 3D | Procedural AI Core, no GLB, three device tiers |
| 6 | Demo state | Pure `useReducer`; XState only if flow exceeds ~10 states |
| 7 | Contact | Route Handler + Zod + honeypot + rate limit; provider decided before Phase 6 |
| 8 | Analytics | None at launch (revisit in Phase 9) |
| 9 | Legal pages | Drafted from templates, reviewed by a qualified person before launch |
| 10 | Resources | Three original MDX articles at launch |
| 11 | Package manager | npm, committed lockfile |
| 12 | Agent | opencode |

## Open questions you still owe the plan

1. Email/CRM that receives demo requests?
2. Analytics at launch: yes/no, which tool?
3. Do you own the domain? Has "NEXORA" been trademark-checked?
4. Who writes/approves the three launch articles and legal pages?
5. 5–8 reference websites you love (needed to make the design target concrete — see `DESIGN_SYSTEM.md` §9)?
6. Confirm Geist-only fonts.
