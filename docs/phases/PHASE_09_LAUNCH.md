# Phase 9 — Production Launch

**Objective:** live site on the real domain, real contact delivery, monitoring, verified rollback.
**Read:** AGENTS.md, docs/FORMS_SPEC.md, docs/TESTING.md, docs/CLAIMS_REGISTER.md
**Branch prefix:** `phase-9/`   **Tag:** `phase-9-approved` then `v1.0.0`

## Human-owned prerequisites
Trademark and domain check for NEXORA complete · legal pages reviewed by a qualified person · analytics/consent decision made · email provider account and sender domain (SPF, DKIM) ready.

## Tasks
- **T9.1 Domain and redirects.** Connect domain; HTTPS valid; www/apex redirect correctly.
- **T9.2 Real contact delivery.** Configure provider env vars in Vercel; production test submission received; 503 path tested with provider disabled in a preview.
- **T9.3 Analytics/consent.** Implement only if decided (consent-aware, privacy-friendly); otherwise confirm none present. Update cookies/privacy text to match reality.
- **T9.4 CSP enforcement.** Move from report-only to enforced after clean report period.
- **T9.5 Monitoring.** Vercel logs access confirmed; optional Sentry only if approved.
- **T9.6 Claims audit.** Search entire site and content for forbidden claims/banned words; resolve every hit.
- **T9.7 Final QA.** Full E2E, a11y, visual and Lighthouse runs recorded; real iPhone, real Android, Safari, Firefox; keyboard-only and screen-reader smoke.
- **T9.8 Rollback plan.** Document how to promote the previous Vercel deployment.
- **T9.9 Post-launch smoke test.** Every route, demo, form, mobile menu on production.

## Launch checklist
- [ ] Trademark + domain; HTTPS; redirects
- [ ] Real email delivery verified with a production submission
- [ ] Legal pages reviewed; analytics/consent decided and implemented
- [ ] `sitemap.xml`, `robots.txt`, canonicals, OG images, favicons, manifest verified; `/lab`, `/design-system` return 404
- [ ] Security headers verified; CSP enforced
- [ ] Claims audit clean
- [ ] Full test/Lighthouse runs recorded (device, browser, network, build mode, date)
- [ ] Manual device/browser checks done
- [ ] 404 and error pages tested; monitoring confirmed; rollback written down
- [ ] Post-launch smoke test passed

## After launch
Track real-user Core Web Vitals (lab scores are not field data). New work (detail routes, more articles, platform features) starts as new phases with new task cards.
