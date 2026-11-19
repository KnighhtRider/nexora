# Phase 3 — Static Homepage (no 3D)

**Objective:** all eight homepage sections as semantic, responsive HTML. The no-WebGL experience is the baseline; the Core is an enhancement added in Phase 4.
**Read:** AGENTS.md, docs/DESIGN_SYSTEM.md, docs/PAGE_BLUEPRINTS.md (`/`), docs/COPY_DECK.md (homepage), docs/CLAIMS_REGISTER.md
**Prerequisite:** Phases 1 and 2 approved.
**Branch prefix:** `phase-3/`   **Tag:** `phase-3-approved`

## Tasks (one card each; split if >300 lines)
- **T3.1 Hero (HTML only).** H1 + supporting text + two CTAs; reserved fixed-aspect-ratio box for the future Core with the static poster/CSS glow placeholder. H1/CTAs are the LCP.
- **T3.2 Business problem + Platform pillars.** Cards, Concept tags, CTA to `/platform` (route must exist or link omitted until Phase 6).
- **T3.3 How it works.** Four-step sequence; semantic ordered list; responsive layout.
- **T3.4 Demo placeholder region.** Section with heading, mandatory simulation label and an honest static preview (no fake interactivity). Replaced in Phase 5. Must not look broken.
- **T3.5 Use cases + Technology and trust + Closing CTA.**
- **T3.6 Metadata + structured data basics for `/`.**

## Split before use
- **T3.5 →** T3.5a Use cases · T3.5b Technology and trust · T3.5c Closing CTA.

## Rules
- Server Components only unless interaction demands otherwise (document reason).
- Content imported from `src/content`. No hard-coded strings in JSX.
- Entrance reveals are optional here (Motion, subtle); scroll story waits for Phase 4.
- One H1; heading order h1→h2→h3 without skips.

## Tests
E2E smoke on `/`, axe scan, visual baselines at 5 viewports, Lighthouse CI run (mobile preset, production build) recorded with device/browser/network/date.

## Exit gate (human approves)
- [ ] Layout approved on Vercel preview at 375 and 1440.
- [ ] Lighthouse + axe results recorded (targets: Perf ≥90, A11y ≥95, BP ≥95, SEO ≥95; report actuals).
- [ ] Works with JS animation disabled; no console/hydration errors.
- [ ] No placeholder text; all CTAs resolve to real pages.
- [ ] Tag `phase-3-approved`.
