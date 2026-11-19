# Phase 8 — Hardening: SEO, Accessibility, Security, Testing

**Objective:** everything measurable is measured, recorded and passing; production-ready quality gates enforced in CI.
**Read:** AGENTS.md, docs/TESTING.md, docs/DESIGN_SYSTEM.md (imagery/OG), docs/CLAIMS_REGISTER.md
**Branch prefix:** `phase-8/`   **Tag:** `phase-8-approved`

## Tasks
- **T8.1 SEO.** Per-page metadata and canonical URLs, `sitemap.ts`, `robots.ts` (internal routes excluded/noindex), JSON-LD (`Organization`, `WebSite`, `Article`) built from trusted data, manifest and favicon set.
- **T8.2 OG images.** `next/og` single template → per-page branded share cards.
- **T8.3 Security headers.** `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`/`frame-ancestors`; HSTS on Vercel production; CSP in **report-only** first (allow `'self'`, `next/font` self-hosted assets, WebGL/worker sources, nothing else). Verify no console violations.
  - **CSP strategy (decided):** stay in report-only for v1 unless a nonce is explicitly accepted. Next injects inline bootstrap scripts, so enforcing CSP means either `'unsafe-inline'` for scripts (near-worthless) or a nonce via `proxy.ts` — and a nonce **forces dynamic rendering on every route**, giving up static generation for the whole site. Record whichever path is taken in `DECISIONS.md` before switching to enforce.
- **T8.4 Accessibility.** axe clean on all routes; keyboard-only tests for menu, forms, demo; screen-reader smoke test notes; contrast re-check.
- **T8.5 Full Playwright matrix.** Chromium, Firefox, WebKit, Pixel 7 and iPhone 14 emulation; forced no-WebGL; reduced motion; console guard; link/placeholder guard.
- **T8.6 Lighthouse CI.** Budgets from docs/TESTING.md enforced on production build (mobile + desktop); record device, browser, network profile, build mode, date.
- **T8.7 Dependency and secret audit.** `npm audit` review, unused dependency check, confirm no secrets in repo/client bundle.
- **T8.8 Image/asset audit.** `next/image` everywhere, size budgets met, no CLS.
- **T8.9 Preview-only routes.** Confirm `/design-system` and `/lab/ai-core` return 404 on the production deployment and stay reachable on preview and dev (gated on `VERCEL_ENV`, per DECISIONS).

## Exit gate (human approves)
- [ ] All targets measured and recorded (report actuals, even if below targets, with a plan).
- [ ] CI enforces verify:full and Lighthouse budgets.
- [ ] CSP report-only shows no violations from legitimate resources.
- [ ] `/sitemap.xml`, `/robots.txt`, OG images verified.
- [ ] Tag `phase-8-approved`.
