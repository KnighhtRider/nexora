# Session Handoff

Overwrite the "Current state" block at the end of every session. Keep history short (last 5 sessions).

## Current state
- **Phase:** 0 (in progress — 5 of 7 tasks done)
- **Last completed task:** T0.5 Stack lock — `docs/STACK_LOCK.md` verified against the real lockfile: 21 direct packages, all listed; `@testing-library/dom` added as an auto-installed peer; baseline JS re-measured (unchanged at 170.4 gz / 146.9 br)
- **Branch:** `main` — one commit (`Doc prep`, upstream `origin/master`); T0.1–T0.5 work is **uncommitted**
- **Last `npm run verify` result:** **exit 0** — format:check, lint, typecheck, 10/10 unit tests, production build
- **Last `npm run verify:full` result:** **exit 0** — adds `test:e2e` 2/2 and `test:visual` (no `@visual` tests yet)
- **CI:** workflow written and Prettier-valid, **never executed**. Nothing has been pushed, so there is no run to point at.
- **Preview URL:** none

## Next task
T0.6 — Agent OS: confirm `AGENTS.md` + `opencode.json` are complete, that Context7 and Playwright MCP load in opencode, and that a fresh session can quote the non-negotiables. T0.7 (push, Vercel, branch protection) is the human's; it is also what finally exercises CI.

## Known issues
- **CI has never run.** The first push/PR is the real test of `.github/workflows/ci.yml`. Expect the first failure, if any, to be environment-specific (e.g. Chrome sandbox flags or the `node-version-file` manifest lookup), not logic.
- **`main` tracks `origin/master`**, a branch that does not exist on `main`'s history line. Repoint or rename on the remote before enabling branch protection.
- **Playwright binaries are not in the lockfile.** A fresh clone needs `npx playwright install chromium`; CI does it with `--with-deps`.
- **Lighthouse is a stub.** `.lighthouserc.json` exists but nothing runs it — `@lhci/cli` is not installed and needs a task card.
- **Baseline JS is 170.4 KB gz / 146.9 KB br with an empty page.** Budget revised to ≤240 KB gz for `/` excluding 3D; final figure fixed at the Phase 3 gate.
- `eslint@9.39.5` resolves as deprecated per npm. Do not jump to ESLint 10 until `eslint-config-next` supports it.
- Markdown formatting is intentionally not enforced (`.prettierignore`). `opencode.json` is excluded too — the harness rewrites it.
- `next dev` appends a `<!-- BEGIN:nextjs-agent-rules -->` block to `AGENTS.md` on every run. Commit it; do not delete it.
- The static AI Core poster still has no owner or generation procedure (T4.4b).

## Decisions pending from the human
Business inputs only: email/CRM provider, analytics at launch, domain + trademark check, the 5–8 reference sites for DESIGN_SYSTEM §9, and authors for the three launch articles and the legal pages. Plus: approve pushing T0.1–T0.4 so CI can run.

## History
| Date | Task | Result |
|---|---|---|
| 2026-11-19 | T0.5 Stack lock | Re-ran `node -v` (26.13.0), `npm -v` (11.20.0), `npm ls --depth=0` (21 direct packages) and diffed against the table: no drift, nothing missing, nothing extra. Added `@testing-library/dom@10.4.2` (auto-installed peer, absent from `package.json`), a legend for the `— not installed` rows, the verify/CI surface, and the real OS (`Windows 10 Pro 10.0.19045`, not "Windows 11"). Re-measured the baseline: 170.4 KB gz / 146.9 KB br, identical after the dark-only CSS change. |
| 2026-11-19 | T0.4 Scripts and CI | `verify` = format:check → lint → typecheck → test → build; `verify:full` = verify → e2e → visual (a11y is inside the e2e suite, so it is not rebuilt twice). Both run locally: exit 0, `verify:full` 4/4 Playwright tests. `.github/workflows/ci.yml`: Ubuntu, `.nvmrc` node, npm cache, `verify` job then `e2e` job with `--with-deps chromium` and report artifacts on `always()`. Action majors checked against the GitHub release API. `.lighthouserc.json` stub with `warn` budgets; no job runs it. |
| 2026-11-19 | T0.3 Test tooling | Vitest 5.1.1 + jsdom 31 + RTL 16.3.3 (`vitest.config.mts`), Playwright 1.65.1 + `@axe-core/playwright` 4.14.0 (production build on port 3100, console/network guard fixture). `@types/node` raised `^20` → `^26` because Vitest 5 rejects the scaffold's stale types. First axe run **failed** on real contrast (H1 + label were `text-neutral-50` on a white background for light-mode visitors) — fixed by making the baseline dark-only per DESIGN_SYSTEM. Also fixed a false negative: `reuseExistingServer` was serving a stale build, now always false. `test` 10/10, `test:e2e` 2/2, `test:a11y` 1/1. |
| 2026-11-19 | T0.2 Code quality | `.nvmrc` (26.13.0) + `engines` (node ≥22, npm ≥10); `noUncheckedIndexedAccess` on; ESLint gained `no-explicit-any` (error), `no-non-null-assertion` (warn), `no-console` (allow warn/error), `eqeqeq`; Prettier 3.10 with `prettier-plugin-tailwindcss` bound to `globals.css`; husky + lint-staged pre-commit; `.env.example` + `!.env.example`; `src/lib/env.ts` parses lazily so `next build` needs no secrets. Verified a staged `: any` is rejected (exit 1) and the file reverted. |
| 2026-11-19 | T0.1 Scaffold | Scaffolded in a temp directory and merged into the repo root, branch renamed `master` → `main`, deps installed with `npm ci`, boilerplate replaced with one H1 + `main#main`. Build compiled in 11.5 s; lint exit 0; dev server 200. Measured baseline JS 170.4 KB gz / 146.9 KB br; AI Core budget revised with evidence. |
| 2026-11-19 | Spec review + correction pass | Fixed two defects that would have broken Phase 1 (`line-strong` failed 1.4.11 at 2.87:1; `--duration-*` generated no utility), closed the demo state-machine gaps, replaced auto-advance timers with visitor-driven stepping, settled 9 decisions, added `docs/ARCHITECTURE.md`, split the oversized task cards. Docs only. |
