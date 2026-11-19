# Testing Strategy, Budgets and CI

## Pyramid
- **Unit (Vitest + jsdom):** demo reducer, Zod schemas, MDX frontmatter validation, SEO helpers, tier-detection logic, env parsing.
- **Component (React Testing Library):** navigation and mobile menu (focus trap, Escape, focus return), forms, approval panel, Button variants.
- **E2E (Playwright):** home → request-demo journey, form success/failure, demo on all four samples with no waits, mobile menu, 404, every nav link returns 200.
- **Accessibility (axe via Playwright):** zero serious/critical violations on every route + keyboard-only tests for menu, form, demo.
- **Visual regression (Playwright screenshots):** closest thing to pixel-perfect enforcement.
- **Performance (Lighthouse CI):** budgets below, mobile + desktop presets, production build.

## Playwright setup essentials
- Projects: Chromium, Firefox, WebKit, emulated Pixel 7 and iPhone 14.
- Run against the **production build** (`next build` + `next start`), not dev.
- WebGL in headless Chromium needs software rendering flags (e.g. `--use-gl=angle`, `--use-angle=swiftshader`, `--enable-unsafe-swiftshader`) — **confirm current flags via Context7/Playwright docs.**
- **Force fallback:** init script making `getContext('webgl')` / `getContext('webgl2')` return null. Page must remain complete and usable.
- **Reduced motion:** `page.emulateMedia({ reducedMotion: 'reduce' })` → static Core, no scroll-scrubbed motion.
- **Deterministic visuals:** test-only flag (e.g. `?core=static` or `NEXT_PUBLIC_E2E=1`, never active in production) forces static tier; screenshots use `animations: 'disabled'` and mask the canvas.
- Visual viewports: 375×812, 768×1024, 1280×800, 1440×900, 1920×1080.
- **Console guard fixture:** fail any test logging console errors, hydration warnings or unhandled rejections.
- **Link/placeholder guard:** crawl internal links, assert 200, fail on `href="#"`, `lorem ipsum`, `TODO`, `coming soon`.

## Budgets (record device, browser, network profile, build mode and date with every report)
- Lighthouse mobile, production build: Performance ≥90, Accessibility ≥95, Best Practices ≥95, SEO ≥95 — **targets, not guarantees.**
- Lab guide: LCP ≤2.5 s, CLS ≤0.1, TBT ≤200 ms. Real-user Core Web Vitals confirmed after launch.
- JS/3D budgets: see AI_CORE.md. Images: hero poster ≤80 KB; none >200 KB without justification.
- No console errors, hydration errors or failed network requests on any route.

## Scripts (package.json)
`dev`, `build`, `start` · `lint` (`eslint` — `next lint` was removed in Next 16), `typecheck` (`tsc --noEmit`), `format:check` · `test` (Vitest), `test:e2e`, `test:visual`, `test:a11y`
- `verify` = `format:check` + lint + typecheck + unit tests + production build (before every commit/PR)
- `verify:full` = `verify` + E2E + visual. It does **not** re-run `test:a11y`: the axe scan lives inside the E2E suite, so a second pass would rebuild and re-serve the app to run the same test twice. `test:a11y` stays as the focused script for local iteration.

## CI (GitHub Actions, every PR)
`.github/workflows/ci.yml` → `verify` job (frozen-lockfile install → `npm run verify`) then `e2e` job (`playwright install --with-deps chromium` → `npm run test:e2e` → upload `playwright-report/` + `test-results/`). Both on Ubuntu, Node from `.nvmrc`, npm cache on. Branch protection must require both jobs.
- Action versions are pinned to a major: `checkout@v7`, `setup-node@v7`, `upload-artifact@v7` (checked against the GitHub release API on 2026-11-19, not copied from memory).
- **Lighthouse is a stub.** `.lighthouserc.json` holds the budgets above as `warn` assertions and starts the production build on port 3100, but no job runs it: `@lhci/cli` is an unapproved dependency. Wire `lhci autorun` when a task card approves it (Phase 3 gate at the earliest), then flip the assertions from `warn` to `error`.

## Coverage floors
Nobody reads a coverage badge, so set floors only where branch logic is real:
- `src/features/workflow-demo/state/**` — **100 %** branches (the reducer is the product's most testable asset).
- `src/features/contact/schema.ts` — **100 %** branches.
- Everything else — no threshold. Do not add coverage theatre to presentational components.

## Visual regression specifics
- **Chromium only.** Screenshot diffing across WebKit/Firefox is a maintenance sink for a marketing site; those browsers get functional E2E, not pixel diffs.
- **Baselines are generated in CI (Ubuntu), never on a developer machine.** Windows and Linux rasterise fonts differently, so a baseline committed from Windows will fail forever in CI.
- Diffing is viewport-based (375/768/1280/1440/1920) using `animations: 'disabled'`; the canvas is masked or the static tier is forced.

## Device/browser matrix
Chromium, Firefox, WebKit; widths 375/768/1024/1440/1920; one emulated low-end mobile profile; manual pass on real iPhone and Android before launch.
