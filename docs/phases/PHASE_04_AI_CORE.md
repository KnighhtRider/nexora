# Phase 4 — AI Core

**Objective:** the custom 3D AI Core, proven in isolation against budgets, then integrated into the hero with a purposeful scroll story. Static fallback is already the baseline from Phase 3.
**Read:** AGENTS.md, docs/AI_CORE.md, docs/DESIGN_SYSTEM.md (motion), docs/TESTING.md (WebGL section)
**Prerequisite:** Phase 3 approved. Human approves adding: `three`, `@react-three/fiber`, `@react-three/drei` (only used helpers), `gsap`, `@gsap/react`.
**Branch prefix:** `phase-4/`   **Tag:** `phase-4-approved`

## Tasks
- **T4.1 Dependencies + STACK_LOCK update.** Check peer compatibility (React/R3F/Drei/Three) via Context7 before install. Record exact versions.
- **T4.2 Lab route + stats panel.** `/lab/ai-core` (`notFound()` when `VERCEL_ENV === 'production'`, noindex): fps, draw calls, triangles, tier switcher.
- **T4.3 Tier logic.** `useCoreTier.ts` (feature check, reduced motion, Save-Data, hardwareConcurrency, frame probe, auto-downgrade, `?core=static` test flag). Unit tests with mocked capabilities.
- **T4.4 Client wrapper + fallback + error boundary.** `AiCoreCanvas` dynamic-imports the scene; `AiCoreFallback` poster + CSS glow; context-loss handling.
- **T4.5 Nucleus.** Icosahedron + Fresnel shader.
- **T4.6 Rings + pulses.** Three module rings; shader-driven pulses.
- **T4.7 Lattice.** Instanced points + line segments; lite variant.
- **T4.8 Lifecycle.** Pause off-screen/hidden, dpr caps, disposal, no per-frame React state; Pause animation button.
- **T4.9 Measure.** Record fps, draw calls, triangles, chunk sizes against AI_CORE.md budgets on desktop and a mid-range phone/emulated profile. Adjust scene (not budgets) until met, or report honestly why not.
- **T4.10 Hero integration.** Mount in the reserved hero box; verify LCP remains H1/CTA and CLS 0.
- **T4.11 Scroll story.** GSAP ScrollTrigger (via `useGSAP`) writes progress to `scrollState`; map per AI_CORE.md table; reduced-motion disables it.
- **T4.12 Tests.** Playwright with software-GL flags; forced no-WebGL run; reduced-motion run; visual tests mask canvas / use static flag.

## Split before use
- **T4.4 →** T4.4a client wrapper + dynamic import + tier wiring · T4.4b fallback poster/CSS glow + error boundary + context-loss path.
- **T4.8 →** T4.8a pause (IntersectionObserver + `document.hidden`), disposal on unmount, dpr cap · T4.8b visible Pause animation control (+ its keyboard and reduced-motion behaviour).

## Rules
No postprocessing/bloom. No GLB. No extra 3D objects. No lenis. Do not animate one element with two libraries.

## Exit gate (human approves)
- [ ] Budgets met and measurements recorded (device, browser, network, build mode, date).
- [ ] No-WebGL and reduced-motion paths proven by tests and by you.
- [ ] LCP is HTML; CLS 0; no console errors after navigating away and back (no leaked ScrollTriggers/listeners).
- [ ] You approve the look on desktop and a real phone.
- [ ] Tag `phase-4-approved`.
