# NEXORA AI — Design System (initial proposal → law after Phase 1 approval)

Premium, futuristic, minimal, cinematic. Dark-first. Calm precise instrument, not a showreel.
All tokens live in one `@theme` block in `src/app/globals.css` (Tailwind CSS 4, CSS-first). **Raw hex in components is a review failure.**

## 1. Tokens

```css
@import 'tailwindcss';

@theme {
  /* surfaces */
  --color-page: #080b12;
  --color-surface: #101725;
  --color-elevated: #172235;
  --color-surface-hover: #162033;      /* card hover only; never a page background */
  --color-scrim: rgb(5 7 10 / 0.72);   /* full-screen menu, modal overlay */

  /* text */
  --color-fg: #f5f7fb;
  --color-fg-muted: #98a5b8;
  --color-fg-faint: #6f7d92;           /* page background ONLY — fails AA on surface/elevated */

  /* lines */
  --color-line: #253247;
  --color-line-strong: #5c6e8c;        /* ≥3:1 on all three surfaces (WCAG 1.4.11) */

  /* brand */
  --color-brand: #3478f6;
  --color-brand-solid: #2563eb;
  --color-brand-solid-hover: #1e56d6;
  --color-brand-solid-active: #1d4ed8;
  --color-cyan: #20c9e8;
  --color-focus: #20c9e8;              /* own name so it can diverge from cyan later */

  /* status */
  --color-success: #34d399;
  --color-warning: #fbbf24;
  --color-danger: #f87171;

  /* radii */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 20px;

  /* motion */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-smooth: cubic-bezier(0.65, 0, 0.35, 1);
  --duration-fast: 120ms;
  --duration-base: 200ms;
  --duration-slow: 320ms;
  --duration-scene: 600ms;

  /* type scale — see §2 for where each role is used */
  --text-display-xl: clamp(2.75rem, 1.2rem + 6.2vw, 6.5rem);
  --text-display-xl--line-height: 1.02;
  --text-display-xl--letter-spacing: -0.04em;
  --text-display-xl--font-weight: 600;

  --text-display-l: clamp(2.25rem, 1.3rem + 3.6vw, 4.25rem);
  --text-display-l--line-height: 1.06;
  --text-display-l--letter-spacing: -0.03em;
  --text-display-l--font-weight: 600;

  --text-h2: clamp(1.75rem, 1.2rem + 1.8vw, 2.75rem);
  --text-h2--line-height: 1.15;
  --text-h2--letter-spacing: -0.02em;
  --text-h2--font-weight: 600;

  --text-h3: 1.375rem;
  --text-h3--line-height: 1.3;
  --text-h3--font-weight: 600;

  --text-lead: 1.25rem;
  --text-lead--line-height: 1.6;

  --text-small: 0.875rem;
  --text-small--line-height: 1.5;

  --text-label: 0.75rem;
  --text-label--line-height: 1;
  --text-label--letter-spacing: 0.12em;
  --text-label--font-weight: 500;
}

/* `--duration-*` is NOT a Tailwind theme namespace: the variables above are emitted
   as CSS variables but generate no utility. Declare the utilities explicitly. */
@utility duration-fast { transition-duration: var(--duration-fast); }
@utility duration-base { transition-duration: var(--duration-base); }
@utility duration-slow { transition-duration: var(--duration-slow); }
@utility duration-scene { transition-duration: var(--duration-scene); }

html { color-scheme: dark; }
```

### Namespace rule
Only these prefixes generate utilities in Tailwind 4: `--color-*`, `--font-*`, `--text-*`, `--font-weight-*`, `--tracking-*`, `--leading-*`, `--spacing-*`, `--radius-*`, `--shadow-*`, `--blur-*`, `--ease-*`, `--animate-*`, `--breakpoint-*`, `--container-*`, `--aspect-*`. Anything else (notably `--duration-*` and any `--z-*`) is a plain CSS variable that needs an `@utility` or `var()`. Also: do **not** redefine Tailwind's own `--ease-in-out`; that silently changes every `ease-in-out` in the project. Use `--ease-smooth`.

Original v2.0 mapping: Background→`page`, Surface→`surface`, Elevated→`elevated`, Primary blue→`brand`, Cyan→`cyan`, Primary text→`fg`, Secondary text→`fg-muted`, Border→`line`.

### Contrast (computed with WCAG 2.1 relative luminance — re-measure in Phase 1 with a contrast tool and record the numbers)
| Pair | Ratio | Verdict |
|---|---|---|
| `fg` on `brand-solid` | 4.82:1 | passes AA normal text — this is the primary button fill |
| `fg` on `brand-solid-hover` / `-active` | 5.83 / 6.25:1 | passes. Hover must **darken**; lightening to `#3b7df6` drops it to 3.59:1 |
| `fg` on `brand` | 3.79:1 | **fails AA text** — icons, glows, large text, accent lines only |
| `fg-muted` on `page` / `surface` / `elevated` | 7.88 / 7.18 / 6.39:1 | passes everywhere |
| `fg-faint` on `page` / `surface` / `elevated` | 4.71 / 4.29 / 3.82:1 | **page only**, non-essential text |
| `line` on `page` | 1.52:1 | decorative dividers only |
| `line-strong` on `page` / `surface` / `elevated` | 3.81 / 3.47 / 3.09:1 | passes 1.4.11 on all three — the only legal choice for form borders |
| `focus` on `page` | 9.92:1 | focus ring |

`line-strong` was `#4a5b78` in the first draft and measured **2.87:1 on `page`** (2.61 on `surface`, 2.32 on `elevated`) — it failed 1.4.11 exactly where the spec required it. Do not revert it. Status colors are never the only signal: always pair with an icon and a text label.

### Visual rules
- Gradients: exactly one hero glow (brand→cyan, low opacity) and one thin accent line. No rainbow, no animated gradient text.
- Elevation = 1px `line` border + very subtle inner top highlight. No heavy drop shadows. No heavy glass blur.
- Focus ring: 2px `focus` outline, 2px offset, on every interactive element via `:focus-visible`.
- Icons: Lucide only, one stroke width. Diagrams: hand-built SVG in brand style. No stock photos, no AI stock imagery, no random particles. No fake team photos or logos.
- State fills: primary button hover/active use `brand-solid-hover` / `brand-solid-active`; cards hover to `surface-hover` and `line-strong`. There is no legal way to darken a fill inline — if a state token is missing, stop and ask.

## 2. Typography
**Geist Sans** (headings + body) and **Geist Mono** (technical labels) via `next/font`, `display: swap`, variable weights, preload above-the-fold weights only. Confirm licensing/integration in Phase 1.

| Role | Utility | Spec |
|---|---|---|
| Display XL (hero H1) | `text-display-xl` | clamp `2.75rem → 6.5rem`, lh 1.02, ls -0.04em, wt 600 |
| Display L (section) | `text-display-l` | clamp `2.25rem → 4.25rem`, lh 1.06, ls -0.03em, wt 600 |
| H2 | `text-h2` | clamp `1.75rem → 2.75rem`, lh 1.15, wt 600 |
| H3 | `text-h3` | 1.375rem, lh 1.3, wt 600 |
| Body L (lead) | `text-lead` | 1.25rem, lh 1.6, `fg-muted` |
| Body | `text-base` | 1rem, lh 1.625 (Tailwind default; no token needed) |
| Small | `text-small` | 0.875rem, lh 1.5 |
| Mono label | `text-label font-mono` | 0.75rem, uppercase, ls 0.12em |
| Prose max line | — | 68 characters (`max-w-[68ch]` is the one permitted arbitrary value) |

Body copy uses `leading-relaxed`/`leading-normal` (1.625/1.5) rather than a bespoke 1.65; do not add a token for a 0.025 difference. Every role above exists as a real utility because it is declared in `@theme` — do not hand-write `text-[clamp(...)]` in a component.

## 3. Spacing, grid, breakpoints
- 4px base. Allowed steps: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160.
- Section padding: 64 mobile / 96 tablet / 128 desktop (160 for hero and closing CTA).
- Max widths: content 1280, text-heavy pages 1080, article body 720.
- Gutters: 20 mobile / 32 tablet / 48 desktop.
- Grid: 12 columns ≥1024, 8 at 768, 4 below. Gap 24 (32 desktop).
- Breakpoints: 640, 768, 1024, 1280, 1536.
- Touch targets ≥44×44. No horizontal scroll from 320px.
- Z-index: content 0, sticky nav 40, mobile menu 50, modal 60, toast 70, skip-link 100.

## 4. Component inventory and state matrix
Build once in `components/ui`; show all in hidden `/design-system` (noindex, `notFound()` when `VERCEL_ENV === 'production'`); snapshot it. Each interactive component defines: default, hover, focus-visible, active, disabled, loading, error (where relevant).

- **Button:** primary (`brand-solid`), secondary (outlined), ghost, link; sizes md/lg; icon leading/trailing; loading spinner.
- **Link:** inline (underline offset); nav link with `aria-current="page"`.
- **Input / Textarea / Select / Checkbox:** always a visible label; helper text; error text linked via `aria-describedby`; `line-strong` border.
- **Card:** `surface` + 1px `line`; optional hover border brighten.
- **Badge / mono label:** technical labels, demo statuses, **Concept / In design** tags.
- **Section header:** eyebrow, headline, lead.
- **Navigation:** sticky header gaining border+background after scroll; desktop links; **Request a Demo always visible**; mobile menu = full-screen dialog with focus trap, Escape to close, scroll lock, focus return.
- **Footer:** link groups, tagline, legal links, no dead social icons.
- **Skip link:** first focusable, jumps to `#main`.
- **Toast / inline alert:** form results.

## 5. Motion
- Enter distance 16–32px, 320–600ms, `ease-out-expo`. Stagger ≤60ms per item, ≤6 items.
- Hover/focus: 120–200ms; opacity, color, border, small transforms only.
- Animate `transform` and `opacity` only. Never width/height/top/left.
- One idea per viewport: don't combine parallax, reveal, counter and 3D change.

**Ownership (prevents conflicts):**
| Owner | Responsible for |
|---|---|
| CSS | hover, focus, active, simple fades |
| Motion (`motion/react`) | mount/unmount, layout transitions, menu open/close, demo step transitions |
| GSAP + ScrollTrigger via `useGSAP` | homepage scroll story and scroll→3D progress bridge only |
| Lenis | **not used at launch**; add only with measured need and proof ScrollTrigger works with it |

Never animate the same element with two libraries.
**Reduced motion:** remove parallax and scroll-scrubbed motion; instant or opacity-only transitions; static Core.
**Pause animation:** visible control for any continuous motion longer than 5s (WCAG 2.2.2).

## 6. Layout behaviour
- Mobile is intentionally designed, not compressed desktop: stacked panels, compact sticky step indicator for the demo, simplified Core (lite/static).
- Sticky header: transparent at top, border + `page` background (opaque enough for contrast) after scroll.

## 7. Imagery and social
- OG images generated with `next/og` from one template (Phase 8). Favicon set + manifest.
- Hero poster fallback: WebP ≤80 KB. No image >200 KB without justification. `next/image` with explicit dimensions.

## 8. Design target process
Phase 1 produces `/design-system` gallery + baseline screenshots at 375, 768, 1280, 1440, 1920. Human approves screenshots before homepage work.

## 9. Reference sites (HUMAN TO FILL — needed to make the target concrete)
List 5–8 sites (e.g. Linear, Vercel, Stripe, Anthropic, Palantir) and what to borrow from each (spacing rhythm, type contrast, motion restraint).

| Site | Borrow | Avoid |
|---|---|---|
| | | |
