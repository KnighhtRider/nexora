# Phase 0 — Foundation and Tooling

**Objective:** an empty, correctly configured app that passes `npm run verify` in CI, deploys a Vercel preview, and has the agent operating system (rules, docs, MCP) in place. **No UI work.**
**Read:** AGENTS.md, docs/PROJECT_BRIEF.md, docs/TESTING.md, docs/STACK_LOCK.md
**Branch prefix:** `phase-0/`   **Tag at approval:** `phase-0-approved`

## Pre-flight (human)
- Confirm greenfield. If an existing repo exists, run the original v2.0 "Phase 0 verification" first: project root, Git status, Node/npm versions, `package.json`, run app, run existing lint/typecheck/tests/build, record baseline errors, never reinstall blindly.
- **Current repo state (2026-11-19):** `git init` has been run but there are **no commits**; the default branch is **`master`**. Rename it to `main` before the first commit (`git branch -M main`) — CI, branch protection and every doc in this pack assume `main`.
- Create the Git repo and Vercel project. Install opencode and confirm `opencode.json` syntax (see README).
- **Scaffold conflict:** this docs pack is already in the repo root, including `README.md`. `create-next-app` refuses to scaffold into a non-empty directory with conflicting files. Scaffold into a temporary directory (e.g. `%TEMP%\nexora-scaffold`), then copy the generated files into the repo root, keeping `AGENTS.md`, `docs/` and `opencode.json`. The root `README.md` becomes the generated project README; the pack index stays at `docs/README.md` (see DECISIONS).

## Tasks
**T0.1 Scaffold.** `create-next-app` (TypeScript, App Router, Tailwind, ESLint, `src/` dir, alias `@/*`). Empty home page with one H1 and `<main id="main">`.
- Accept: `npm run dev` and `npm run build` succeed. Report exact versions installed, and record **First Load JS for `/`** from the build output as the bundle baseline in `docs/STACK_LOCK.md`.
- Files: scaffold output only.

**T0.2 Code quality.** `.nvmrc`, `engines` in package.json, strict tsconfig with `noUncheckedIndexedAccess`, ESLint flat config, Prettier (+ Tailwind plugin), husky + lint-staged, `.gitignore` incl. `.env*` (except `.env.example`), `.env.example`, `src/lib/env.ts` (Zod-validated).
- **`env.ts` must not break `next build`.** Server-only secrets are validated lazily at request time; only variables needed at build are required at build. A missing `RESEND_API_KEY` must never fail `next build` in CI.
- Accept: bad formatting/lint blocked at commit; `npm run lint` (plain `eslint`, since `next lint` is removed in Next 16), `typecheck`, `format:check` pass; a production build succeeds with **no** server env vars set.

**T0.3 Test tooling.** Vitest + jsdom + React Testing Library; Playwright (Chromium first, projects for others added later) + `@axe-core/playwright`; console-guard fixture; one trivial unit test and one smoke E2E (home returns 200, one H1, no console errors).
- Accept: `npm test` and `npm run test:e2e` pass against the production build.

**T0.4 Scripts and CI.** Add scripts exactly as in docs/TESTING.md (`verify`, `verify:full`, …). `.github/workflows/ci.yml`: frozen-lockfile install → verify → Playwright → upload report artifacts. Lighthouse CI wiring may be stubbed (budgets enforced from Phase 3).
- Accept: a PR shows green CI on **Ubuntu** (visual baselines are generated in CI, not on the Windows dev machine — see TESTING.md).

**T0.5 STACK_LOCK.** Generate `docs/STACK_LOCK.md` from the real lockfile (`node -v`, `npm -v`, `npm ls --depth=0`). Do **not** copy version numbers from other documents.
- Accept: file matches lockfile; list of approved-but-not-yet-installed packages marked as such.

**T0.6 Agent OS.** Place AGENTS.md, opencode.json, docs/ pack. Confirm Context7 and Playwright MCP load in opencode. Add short next-step notes in docs/SESSION_HANDOFF.md.
- Accept: a fresh opencode session can quote the non-negotiables from AGENTS.md.

**T0.7 Deploy.** Connect Vercel; confirm preview URL for a PR; set `main` branch protection requiring CI.
- Accept: preview URL live; deployment rollback path noted in DECISIONS.md.

## Out of scope
Any design tokens, fonts, components, 3D, content, forms.

## Exit gate (human approves)
- [ ] Empty app passes `npm run verify` locally **and** in CI.
- [ ] Preview URL live and opened by you.
- [ ] STACK_LOCK.md accurate; baseline recorded (Node, npm, OS).
- [ ] opencode loads AGENTS.md and MCP servers.
- [ ] Tag `phase-0-approved`.
