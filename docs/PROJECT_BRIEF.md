# NEXORA AI — Project Brief

**Read this first. One page. Keep it current.**

## Product
- **Brand:** NEXORA AI
- **Tagline (brand lock-up only: logo, footer, metadata title suffix):** The Intelligence Behind Business.
- **Homepage H1 (homepage only):** Intelligence that moves business forward.
- **Positioning:** Enterprise AI platform for mid-size and enterprise businesses.
- **Core proposition:** Connect business systems, intelligent agents and automated workflows so organizations turn complex operations into intelligent processes.
- **Primary conversion:** Request a Demo (`/request-demo`).
- **Initial deliverable:** Complete multi-page marketing website with an interactive **simulated** invoice-processing demo and a custom 3D AI Core.
- **Long term:** Evolve toward a functional enterprise AI platform. Not in scope now.

## Modules (all are *proposed capabilities* — never present as shipped)
1. **NEXORA Agents** — task-oriented agents using organizational context and approved tools.
2. **NEXORA Flow** — multi-step orchestration across applications, agents and human decision-makers.
3. **NEXORA Intelligence** — enterprise knowledge retrieval, document understanding, contextual insights.

Status labels used on the site: **Concept**, **In design**. Never "Available" or "Production-ready" until implemented and verified.

## Honesty rules (hard)
- No invented customer logos, testimonials, certifications, case studies, performance metrics, team members, headcount, awards or deployments.
- Forbidden until proven: SOC 2, ISO 27001, GDPR-compliant, HIPAA, "99.9% uptime", "trusted by", "enterprise-grade" (unqualified), "bank-level security".
- The demo is a deterministic frontend simulation: no real LLM, ERP, payment or network call. A permanent label says so.
- Industries and About are written as vision/principles/capability hypotheses ("where NEXORA is designed to help"), never customer outcomes.
- Every factual statement is checked against `docs/CLAIMS_REGISTER.md`.

## Voice
Precise, calm, confident. Banned words: revolutionary, game-changing, cutting-edge, next-gen, seamless, supercharge, unlock.

## Scope boundaries
- No database, authentication or AI API for the marketing site.
- Server-side contact handler only; real delivery requires a configured provider. Never fake success in production.
- No analytics trackers added silently.

## Tech stack
See `docs/STACK_LOCK.md` (generated from the real lockfile in Phase 0). Intended: Next.js App Router, React, TypeScript strict, Tailwind CSS 4 (CSS-first), Three.js + React Three Fiber + Drei, GSAP + ScrollTrigger + `@gsap/react`, Motion, Lucide, React Hook Form + Zod, MDX, Vitest, React Testing Library, Playwright + axe, Lighthouse CI, Vercel. **Version numbers in older docs were unverified; never copy them.**

## Sitemap
Launch routes (all ship with real content): `/`, `/platform`, `/solutions`, `/industries`, `/technology`, `/resources`, `/about`, `/contact`, `/request-demo`, plus `/privacy`, `/terms`, `/cookies`, 404, error pages.
Detail routes (`/platform/agents`, `/solutions/[slug]`, …) are added **only when their content exists**.
Internal-only (404 on the live site; still reachable on previews via `VERCEL_ENV` gating): `/design-system`, `/lab/ai-core`.

## Architecture in one paragraph
Server Components by default. Client Components only for browser interaction, each with a one-line justification. The 3D scene loads through a small Client Component wrapper that dynamically imports the Canvas. All meaning lives in semantic HTML that works without WebGL. Demo data, pure reducer and timers are separate files. Content strings live in `src/content` / `src/config`.

## Workflow
One task per session → task card → branch `phase-N/name` → verify → screenshots → real-results report → human review on Vercel preview → merge → tag at gates. See `AGENTS.md` and `docs/phases/`.
