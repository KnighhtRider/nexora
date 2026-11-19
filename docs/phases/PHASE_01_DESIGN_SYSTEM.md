# Phase 1 — Design System Lock

**Objective:** brand foundation approved before any homepage work: tokens, fonts, primitives, nav, footer, hidden gallery, first visual baselines.
**Read:** AGENTS.md, docs/DESIGN_SYSTEM.md, docs/PAGE_BLUEPRINTS.md (navigation section)
**Prerequisite:** Phase 0 approved. Human has filled reference sites in DESIGN_SYSTEM.md §9 (strongly recommended).
**Branch prefix:** `phase-1/`   **Tag:** `phase-1-approved`

## Tasks
**T1.1 Tokens and global styles.** `@theme` block exactly as DESIGN_SYSTEM.md §1; base styles, focus ring, `color-scheme: dark`, reduced-motion base rules, container utilities (max widths, gutters, section padding).
- Accept: no raw hex outside `globals.css`; contrast checks recorded for the pairs listed in the design system (tool + result in the report).

**T1.2 Fonts.** Geist Sans + Geist Mono via `next/font` (confirm licensing and current Next.js integration via Context7). Type-scale utilities per §2.
- Accept: no layout shift on load; only above-the-fold weights preloaded.

**T1.3 Primitives (batch ≤5 per card).** Button, Link, Badge/mono label, Card, Section header, Container. Install approved helpers (`clsx`, `tailwind-merge`, `class-variance-authority`, `lucide-react`).
- Accept: every state in the matrix (default/hover/focus-visible/active/disabled/loading/error) implemented where relevant; unit/component tests for Button variants.

**T1.4 Form primitives.** Input, Textarea, Select, Checkbox with label, helper, error (`aria-describedby`), `line-strong` border.
- Accept: RTL tests for error association; 44px targets.

**T1.5 Navigation and footer.** `src/config/site.ts` (nav, footer, metadata). Sticky header with scroll state, mobile full-screen menu dialog (focus trap, Escape, scroll lock, focus return), skip link, footer with legal links (targets may point to routes created in later phases only if a real placeholder page with honest "in preparation" text exists—otherwise omit the link until Phase 6).
- Accept: Component tests for menu; keyboard-only operation; "Request a Demo" always visible; no dead links.

**T1.6 `/design-system` gallery.** Shows tokens, type scale, all components in all states. `noindex`, and `notFound()` when `VERCEL_ENV === 'production'` — **not** `NODE_ENV`, which is `production` on previews too.
- Accept: gallery renders on preview and in dev; 404 on the production deployment.

**T1.7 Global metadata + first visual baselines.** Base metadata (title template with tagline suffix), `lang`, viewport, theme-color. Playwright visual baselines of the gallery and shell at 375/768/1280/1440/1920 (Chromium).
- Accept: baselines committed; `npm run test:visual` passes.

## Split before use
These cards exceed the 300-line / 5-file limit as written. Split them before handing one to an agent:
- **T1.3 →** T1.3a Button (all variants, loading, tests) · T1.3b Link, Card, Badge/mono label · T1.3c Section header, Container (+ the container utilities from T1.1 get verified here).
- **T1.5 →** T1.5a `config/site.ts` + static Header + skip link · T1.5b mobile full-screen menu dialog (focus trap, Escape, scroll lock, focus return) + component tests · T1.5c Footer.

## Out of scope
Homepage sections, 3D, GSAP, forms, copy beyond nav labels.

## Exit gate (human approves)
- [ ] You reviewed gallery screenshots at 375 and 1440 on the Vercel preview and approve the look.
- [ ] axe: zero serious/critical issues on the gallery and shell; keyboard-only nav works.
- [ ] No horizontal scroll at 320px.
- [ ] `docs/DESIGN_SYSTEM.md` updated to the approved values (it is now law).
- [ ] Tag `phase-1-approved`.
