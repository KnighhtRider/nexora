# Stack Lock

**Status: TEMPLATE. Generated in Phase 0 task T0.5 from the real lockfile. Do not hand-write version numbers or copy them from older documents.**

Produce with: `node -v`, `npm -v`, `npm ls --depth=0`, then fill the table. Agents may not upgrade, add or remove a package without a task card.

| Package | Installed version | Purpose | Approved in task | Date |
|---|---|---|---|---|
| next | | Framework | T0.1 | |
| react / react-dom | | UI | T0.1 | |
| typescript | | Language | T0.1 | |
| tailwindcss | | Styling (CSS-first) | T0.1 | |
| three | | 3D engine | T4.x | |
| @react-three/fiber | | React renderer for three | T4.x | |
| @react-three/drei | | 3D helpers (import only what is used) | T4.x | |
| gsap | | Scroll story | T4.x | |
| @gsap/react | | useGSAP cleanup | T4.x | |
| motion | | Component transitions | T1.x | |
| lucide-react | | Icons | T1.x | |
| react-hook-form, zod, @hookform/resolvers | | Forms | T6.x | |
| clsx, tailwind-merge, class-variance-authority | | UI primitives | T1.x | |
| @next/mdx *(build-time compile; decided in Phase 2 — see DECISIONS)*, gray-matter, @tailwindcss/typography | | Articles | T6.x | |
| vitest, jsdom, @testing-library/react | | Unit / component tests | T0.3 | |
| @playwright/test, @axe-core/playwright | | E2E / a11y / visual | T0.3 | |
| @lhci/cli | | Lighthouse CI | T0.4 / T8.x | |
| eslint, eslint-config-next, prettier, prettier-plugin-tailwindcss, husky, lint-staged | | Quality | T0.2 | |
| resend (optional) | | Email delivery | T6.x (if chosen) | |

Excluded at launch: lenis, xstate, any postprocessing library, any analytics SDK, any database/auth, and any key-value store (form rate limiting uses hosting-layer rules — see DECISIONS).

Environment: Node version (`.nvmrc`): __ · npm: __ · OS tested: __

## Bundle baseline (`next build` output — First Load JS for `/`)

Recorded at T0.1 and re-checked at every phase gate. The AI Core budget (≤130 KB gz initial JS excluding 3D) is meaningless if nobody measures the baseline before Phase 4.

| Phase | First Load JS `/` | 3D chunk | Date | Notes |
|---|---|---|---|---|
| 0 (scaffold) | | — | | baseline, no features |
| 1 | | — | | |
| 3 | | — | | homepage complete, no 3D |
| 4 | | | | |
| 8 | | | | |
