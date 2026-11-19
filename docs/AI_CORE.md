# AI Core Specification

**Concept:** a luminous, layered intelligence nucleus — engineered, not decorative; a precise instrument that visualizes the three modules and reacts to the page narrative. It is the only 3D object on the site.

## Composition (full tier)
- **Nucleus:** icosahedron (detail 3–4), custom Fresnel-edge shader in `brand` + `cyan`, slow internal noise, soft emissive pulse. No texture files.
- **Three orbital rings:** thin line geometries, one per module (Agents, Flow, Intelligence). Data pulses travel via a shader uniform, not a CPU loop.
- **Outer lattice:** ~180 nodes + nearest-neighbour connections on a sphere shell: one instanced points object + one line-segments object.
- **Glow:** additive sprite or shader halo. **No EffectComposer bloom at launch**; revisit only with measurements.
- **Interaction:** pointer parallax ≤ ~6°; touch devices get gentle idle rotation only.
- Procedural only. GLB later requires Draco/Meshopt + KTX2.

## Scroll story (progress 0→1, written by GSAP to a plain mutable object read in `useFrame`; never `setState` on scroll)
| Progress | Section | Core behaviour |
|---|---|---|
| 0.00–0.15 | Hero | Calm idle, rings aligned, pulses slow |
| 0.15–0.30 | Problem | Lattice drifts apart, desaturates, rings desynchronize (fragmentation) |
| 0.30–0.50 | Pillars | Rings light up one at a time per module |
| 0.50–0.70 | How it works | Rings align; pulses run Connect→Understand→Orchestrate→Improve |
| 0.70–0.85 | Demo | Core dims and shrinks to give the demo focus |
| 0.85–1.00 | Closing | Core reassembles and brightens behind the closing headline |

## Device tiers
| Tier | When | Scene |
|---|---|---|
| **static** | No WebGL, `prefers-reduced-motion`, `Save-Data`, failed frame probe, or test flag | Pre-rendered WebP poster (≤80 KB) + CSS radial glow. Identical content |
| **lite** | Phones, low-core (`hardwareConcurrency`), slow probe | ~60 lattice nodes, no halo sprite, dpr ≤1.25, 30–45 fps cap, reduced pulses, no postprocessing |
| **full** | Capable desktops | Complete scene, dpr ≤2 |

Detection: feature check + `prefers-reduced-motion` + `navigator.hardwareConcurrency` + quick frame-time probe. If measured below target for 2 s, downgrade automatically.

## Performance budgets (measure; adjust only with evidence)
- LCP element is the H1/CTA (HTML). The 3D chunk loads after first paint (idle callback or intersection).
- 3D chunk ≤250 KB gzipped (import only what is used from three/drei). Initial route JS excl. 3D ≤130 KB gzipped.
- Draw calls ≤30. Triangles ≤100k (full), ≤30k (lite).
- 60 fps desktop; ≥45 fps on a mid-range phone in lite.
- Zero layout shift: canvas container has a fixed aspect ratio; poster occupies the same box.

## Lifecycle and safety (checklist)
- [ ] Client Component wrapper dynamically imports the Canvas (`ssr: false` only legal there).
- [ ] Pause render loop off-screen (IntersectionObserver) and when `document.hidden`; resume on return.
- [ ] Handle `webglcontextlost` / `webglcontextrestored`; on loss show poster.
- [ ] Dispose geometries, materials, textures on unmount; `useGSAP` scope kills ScrollTriggers.
- [ ] No per-frame React state; refs + uniforms only.
- [ ] Error boundary renders the static fallback.
- [ ] Canvas `aria-hidden="true"`; meaning carried by HTML text.
- [ ] Visible **Pause animation** button.

## Isolated development
Build and tune at `/lab/ai-core` (`notFound()` when `VERCEL_ENV === 'production'`, noindex — not `NODE_ENV`, see DECISIONS) with a stats panel (fps, draw calls, triangles) and a tier switcher. Integrate into the hero **only after** budgets are met.

## Files
```text
src/features/ai-core/
  AiCoreCanvas.tsx     client wrapper, dynamic import, tier selection
  AiCoreScene.tsx      scene composition
  parts/Nucleus.tsx Rings.tsx Lattice.tsx Halo.tsx
  shaders/             fresnel and pulse shaders
  scrollState.ts       mutable progress object written by GSAP
  useCoreTier.ts       capability + frame-probe logic
  AiCoreFallback.tsx   poster + CSS glow
  index.ts
```
Create files only when needed (e.g. no `Halo.tsx` if lite-only decisions drop it).
