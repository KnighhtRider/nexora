# Stack Lock

**Status: verified against the installed lockfile on 2026-11-19 (Phase 0, T0.5).**

Produced with `node -v`, `npm -v`, `npm ls --depth=0`. Re-generate after any approved install. Agents may not upgrade, add or remove a package without a task card.

Verified on 2026-11-19: `npm ls --depth=0` reports **21 direct packages** and every one is in the table below. Nothing installed is missing from the table and nothing in the table is installed but unlisted. `@testing-library/dom` is listed as well, because React Testing Library declares it as a **peer** dependency that npm auto-installs — it is required for the install to be complete yet never appears in `package.json`.

Rows marked `— not installed` are **approved by a later task card but deliberately absent**: they are named so an agent knows the choice is already made and does not re-litigate it. Adding one still requires the card that owns it.

| Package | Installed version | Purpose | Approved in task | Date |
|---|---|---|---|---|
| next | 16.4.6 | Framework (Turbopack default) | T0.1 | 2026-11-19 |
| react / react-dom | 19.3.0 / 19.3.0 | UI | T0.1 | 2026-11-19 |
| typescript | 5.9.3 | Language | T0.1 | 2026-11-19 |
| tailwindcss | 4.3.3 | Styling (CSS-first) | T0.1 | 2026-11-19 |
| @tailwindcss/turbopack | 4.3.3 | Tailwind loader for Turbopack (scaffold default; no PostCSS config in this project) | T0.1 | 2026-11-19 |
| eslint / eslint-config-next | 9.39.5 / 16.4.6 | Quality | T0.1 | 2026-11-19 |
| @types/node / @types/react / @types/react-dom | 26.6.6 / 19.3.0 / 19.3.0 | Types (`@types/node` raised to `^26` in T0.3: Vitest 5 requires `^22 || >=24`, and the runtime is Node 26) | T0.1 / T0.3 | 2026-11-19 |
| three | — not installed | 3D engine | T4.x | |
| @react-three/fiber | — not installed | React renderer for three | T4.x | |
| @react-three/drei | — not installed | 3D helpers (import only what is used) | T4.x | |
| gsap | — not installed | Scroll story | T4.x | |
| @gsap/react | — not installed | useGSAP cleanup | T4.x | |
| motion | — not installed | Component transitions | T1.x | |
| lucide-react | — not installed | Icons | T1.x | |
| clsx, tailwind-merge, class-variance-authority | — not installed | UI primitives | T1.x | |
| react-hook-form, @hookform/resolvers | — not installed | Forms (zod is already installed) | T6.x | |
| @next/mdx, gray-matter, @tailwindcss/typography | — not installed | Articles | T6.x | |
| vitest, jsdom, @testing-library/react | 5.1.1 / 31.0.1 / 16.3.3 | Unit / component tests | T0.3 | 2026-11-19 |
| @playwright/test, @axe-core/playwright | 1.65.1 / 4.14.0 | E2E / a11y / visual | T0.3 | 2026-11-19 |
| @testing-library/dom | 10.4.2 | Peer of `@testing-library/react` — auto-installed by npm, absent from `package.json` by design | T0.3 | 2026-11-19 |
| @lhci/cli | — not installed | Lighthouse CI | T0.4 / T8.x | |
| prettier, prettier-plugin-tailwindcss, husky, lint-staged | 3.10.1 / 0.8.1 / 9.1.7 / 17.6.1 | Quality | T0.2 | 2026-11-19 |
| zod | 4.6.7 | Server env validation now; form schemas in T6.x (Zod 4 API: `z.email()`, not `z.string().email()`) | T0.2 | 2026-11-19 |
| resend (optional) | — not installed | Email delivery | T6.x (if chosen) | |

Excluded at launch: lenis, xstate, any postprocessing library, any analytics SDK, any database/auth, and any key-value store (form rate limiting uses hosting-layer rules — see DECISIONS).

## Environment
Node `v26.13.0` (`.nvmrc` pins `26.13.0`) · npm `11.20.0` · `engines`: node `>=22.0.0`, npm `>=10.0.0` · OS tested: Windows 10 Pro 10.0.19045 (dev machine).
CI target: `ubuntu-latest`, Node from `.nvmrc`, as written in `.github/workflows/ci.yml` — **not yet executed** (no push as of 2026-11-19).

## Tooling notes
- `npm run lint` is `eslint` (flat config). `next lint` no longer exists in Next 16.
- `npm run format:check` covers code and config only. Markdown is excluded in `.prettierignore` on purpose: `proseWrap: always` would reflow the whole docs pack. Adopting it is its own task card.
- A pre-commit hook runs `lint-staged` (eslint --fix + prettier on staged TS/TSX; prettier on staged JSON/CSS/MJS). Verified: it rejects a non-fixable `@typescript-eslint/no-explicit-any` error.
- `src/lib/env.ts` parses lazily. `getServerEnv()` throws on malformed values; `getContactDelivery()` never throws and is what the form routes must use to reach the 503 path.
- Tests: `npm test` (Vitest, jsdom, `src/**/*.test.{ts,tsx}`), `npm run test:watch`, `npm run test:e2e` (Playwright, Chromium), `npm run test:a11y` (`--grep @a11y`), `npm run test:visual` (`--grep @visual --pass-with-no-tests`, so it is green until snapshots exist).
- Playwright runs against a production build on port 3100 and **never reuses an existing server**. A reused server silently tests an older build; the failure mode is a wrong green, so the extra build time is accepted.
- Browser binaries are not in `package-lock.json`. A fresh machine needs `npx playwright install chromium` after `npm ci`.
- `vitest.config.mts` is `.mts` because the project has no `"type": "module"`; Vite's upcoming native config loader warns about ESM syntax inside a `.ts` config.
- `tests/e2e/**` disables `react-hooks/rules-of-hooks`: Playwright's fixture callback is named `use` and is not a React hook.
- `npm run verify` = `format:check` + `lint` + `typecheck` + `test` + `build`. `npm run verify:full` adds `test:e2e` + `test:visual`; the axe scan runs inside the e2e suite, so `verify:full` deliberately does not repeat it.
- CI is `.github/workflows/ci.yml`: `verify` job, then `e2e` job on Ubuntu with `--with-deps chromium` and report artifacts. Actions are pinned to majors (`checkout@v7`, `setup-node@v7`, `upload-artifact@v7`).

## Known dependency issues
- `npm` reports `eslint@9.39.5` as deprecated ("This version is no longer supported"). The scaffold pins `^9`. Do not upgrade to ESLint 10 without a task card — `eslint-config-next@16.4.6` must support it first.
- `@tailwindcss/turbopack` is the Tailwind integration for this scaffold; there is **no** `postcss.config.*` and no `tailwind.config.*`. The `@theme` block in `globals.css` is the only configuration surface (see DESIGN_SYSTEM.md).
- `next.config.ts` ships with `cacheComponents: true` and `partialPrefetching: true` (scaffold defaults). Both affect caching semantics — re-read them before adding any dynamic route or `use cache` usage.

## Bundle baseline (`next build` — measured by parsing the scripts referenced in the prerendered `/` HTML, gzip level 9 and Brotli)

Vercel serves Brotli, so `br` is what users actually download; `gz` is what most tools report. Record both. The AI Core budget is meaningless if nobody measures the baseline before Phase 4.

| Phase | First Load JS `/` (gz) | (br) | 3D chunk | Date | Notes |
|---|---|---|---|---|---|
| 0 (scaffold) | **170.4 KB** | **146.9 KB** | — | 2026-11-19 | empty page: React 19 + Next 16 runtime + Tailwind CSS 3.9 KB gz. Re-measured at T0.5 after the dark-only CSS and the a11y colour fix: identical JS, CSS 3.9 gz / 3.5 br. |
| 1 | | | — | | |
| 3 | | | — | | homepage complete, no 3D |
| 4 | | | | | |
| 8 | | | | | |
