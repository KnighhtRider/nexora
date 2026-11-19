# NEXORA AI — marketing site

Marketing website for NEXORA AI, with a deliberately **simulated** invoice-processing demo and a procedural 3D "AI Core".

> **Status: pre-implementation.** This repository currently contains the specification pack only — no `package.json`, no application code, no build. Phase 0 is not started. Everything below describes the target, not the current state.

## What this is

- A multi-page marketing site: `/`, `/platform`, `/solutions`, `/industries`, `/technology`, `/resources`, `/about`, `/contact`, `/request-demo`, plus legal pages.
- A deterministic, frontend-only demo (no network call, no LLM, no ERP) that carries a permanent simulation label.
- NEXORA Agents, Flow and Intelligence are **proposed modules**, labelled *Concept*. No customer logos, testimonials, certifications or metrics are used anywhere on the site.

## Stack

Next.js (App Router) · React · TypeScript strict · Tailwind CSS 4 (CSS-first, no `tailwind.config.js`) · Three.js + React Three Fiber · GSAP + ScrollTrigger · Motion · Lucide · React Hook Form + Zod · Vitest · Playwright + axe · Lighthouse CI · Vercel.

Exact versions are recorded in [`docs/STACK_LOCK.md`](docs/STACK_LOCK.md) after the scaffold. **Do not upgrade or add a dependency without an approved task card.**

## Commands (available from T0.1 / T0.4 onward)

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` / `npm run start` | Production build and serve |
| `npm run lint` · `npm run typecheck` · `npm run format:check` | Static checks (`eslint` — `next lint` no longer exists in Next 16) |
| `npm test` | Unit and component tests (Vitest) |
| `npm run test:e2e` · `test:a11y` · `test:visual` | Playwright suites against the production build |
| `npm run verify` | format + lint + typecheck + unit + production build — run before every task is reported done |
| `npm run verify:full` | `verify` + E2E + a11y + visual |

## Read in this order

1. [`AGENTS.md`](AGENTS.md) — the rules every agent session must follow (auto-loaded by opencode).
2. [`docs/PROJECT_BRIEF.md`](docs/PROJECT_BRIEF.md) — one page: what the product is, honesty rules, scope.
3. [`docs/SESSION_HANDOFF.md`](docs/SESSION_HANDOFF.md) — where the last session stopped and what comes next.
4. [`docs/phases/`](docs/phases/) — the 10-phase plan and the task cards.
5. [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — target `src/` tree and import rules.
6. Everything else in [`docs/README.md`](docs/README.md) — design system, page blueprints, demo spec, forms, testing, claims register.

## Rules that are not negotiable

Work one task per session. Run `npm run verify` and report real output. Never invent customers, metrics, certifications or team members — check [`docs/CLAIMS_REGISTER.md`](docs/CLAIMS_REGISTER.md) before writing copy. Never present the demo as real AI, ERP or payment activity.
