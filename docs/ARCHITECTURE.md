# Architecture — NEXORA AI site

**Scope:** the marketing site only. No database, no auth, no AI API, no background jobs. If a task card asks for any of those, stop: it is out of scope for v1.

Nothing in this tree exists until its task card says so. This file describes the target, not the current state.

## 1. Target tree

```text
src/
  app/                          Route segment files ONLY. Thin. No business logic.
    layout.tsx                  html/body, fonts, skip link, Header, Footer, metadata base
    page.tsx                    homepage = composition of sections/
    globals.css                 single @theme block (design tokens) + base layer
    (legal)/privacy/page.tsx
    (legal)/terms/page.tsx
    (legal)/cookies/page.tsx
    platform/page.tsx  solutions/  industries/  technology/
    resources/page.tsx  resources/[slug]/page.tsx
    about/page.tsx  contact/page.tsx  request-demo/page.tsx
    api/request-demo/route.ts  api/contact/route.ts
    not-found.tsx  error.tsx  global-error.tsx  loading.tsx
    design-system/page.tsx      preview-only
    lab/ai-core/page.tsx        preview-only
    sitemap.ts  robots.ts  opengraph-image.tsx

  components/
    ui/                         Primitives with no domain knowledge: Button, Input,
                                Textarea, Select, Checkbox, Card, Badge, Alert, Spinner
    layout/                     Header, MobileMenu, Footer, SkipLink, Container, Section
    sections/                   Homepage sections: Hero, Problem, Pillars, HowItWorks,
                                DemoSection, UseCases, Trust, ClosingCta

  features/                     One folder per interactive feature; self-contained
    workflow-demo/              data/ state/ hooks/ components/ types.ts index.ts
    ai-core/                    AiCoreCanvas, AiCoreScene, parts/, shaders/, scrollState,
                                useCoreTier, AiCoreFallback, index.ts
    contact/                    schema.ts, form components, submit.ts, index.ts

  content/                      All copy, one module per page: home.ts, platform.ts,
                                solutions.ts, industries.ts, technology.ts, about.ts,
                                contact.ts, requestDemo.ts, legal.ts, nav is in config/
  config/                       site.ts (nav, footer, metadata, base URL), demo constants
  lib/                          env.ts, seo.ts, cn.ts, mdx.ts, rate-limit.ts, reading-time.ts
```

There is no `types/` dumping ground, no `utils/` grab bag, no `hooks/` shared folder. A hook belongs to the feature that needs it; a utility belongs to `lib/` and must be used by at least two callers.

## 2. Dependency direction (the only rule that matters)

```text
app/  ->  components/ui           (props only, no domain knowledge)
app/  ->  components/layout, components/sections  ->  content/, lib/
app/  ->  features/               ->  content/, config/, lib/
```

- `content/` and `config/` import **nothing** from `components/`, `features/` or `app/`. They are plain typed data.
- `lib/` imports nothing from `features/`, `components/` or `app/`.
- `components/ui/` imports nothing from `features/` or `content/`. A primitive that needs copy is not a primitive.
- **`features/` never imports `app/`.** Never reach into a route file for a constant.
- **Two features never import each other.** Shared code moves to `lib/` or `components/ui/`. If you are tempted, the split is wrong.
- `app/` files may import anything. `app/page.tsx` composes; it does not implement.

### Import rules
- Alias only: `@/components/ui/Button`, never `../../components/ui/Button`.
- A feature's public surface is its `index.ts`. `@/features/workflow-demo/state/reducer` from outside the feature is a review failure; export it from the index instead.
- No barrel file in `app/`.

## 3. Server / client boundary

Server Components are the default. `'use client'` is allowed only for: state, effects, event handlers, browser APIs.

- `'use client'` must never appear in `src/app/**` route files. Pages stay server; the client leaf is imported into them.
- Every `'use client'` file carries a one-line comment giving the reason. Reviewers check this first.
- `dynamic(() => import(...), { ssr: false })` is legal only inside a Client Component (the AI Core wrapper).
- The `'use client'` boundary is pushed as low as possible: `DemoSection` (server) renders `<WorkflowDemo />` (client), not the whole page.
- Never pass non-serialisable values across the boundary (functions, class instances, three.js objects).

## 4. Where does this file go?

| You are writing… | It goes in | Notes |
|---|---|---|
| A new page | `app/<route>/page.tsx` | Composition only; sections import from `content/` |
| A marketing string | `content/<page>.ts` | Never inline in JSX |
| Nav/footer/URL | `config/site.ts` | Single source of truth for links |
| A button/input/card | `components/ui/` | No domain knowledge, no copy |
| A homepage section | `components/sections/` | Server component unless it needs interaction |
| Header, footer, mobile menu | `components/layout/` | |
| Demo data, reducer, demo UI | `features/workflow-demo/` | Reducer stays pure; no React import in `state/` |
| 3D scene code | `features/ai-core/` | Never imported by a server component directly |
| Form schema + form components | `features/contact/` | One schema shared by client and server |
| Env parsing | `lib/env.ts` | The only place `process.env` is read |
| Two-caller helper | `lib/` | One caller → keep it local |

## 5. Data flow for the two interactive features

**Workflow demo** — `data/` (plain objects) → `state/` (pure reducer + selectors) → `hooks/useWorkflowDemo` (binds reducer, owns the optional auto-play timer) → `components/` (presentational, receive state + callbacks). No component imports `data/` directly; it receives typed props. The reducer imports nothing but its own types.

**AI Core** — `AiCoreCanvas` (client, dynamic import, tier) → `AiCoreScene` (composition) → `parts/` + `shaders/`. Scroll progress is a plain mutable object written by GSAP in `useGSAP` and read in `useFrame`; React state never enters the render loop. `AiCoreFallback` is rendered by an error boundary and by the static tier.

## 6. Naming and file conventions

- Components: `PascalCase.tsx`, one component per file, named export (`export function Button`).
- Hooks: `useThing.ts` in the owning feature.
- Non-component modules: `camelCase.ts`.
- Tests: colocated as `thing.test.ts(x)` next to the unit under test. E2E lives in `tests/e2e/`, not in `src/`.
- Types: `type`/`interface` colocated with the module that owns them; no global `types.ts` except inside a feature.
- No `any`, no non-null assertion without a one-line reason comment.

## 7. Enforcement

- **Enforced by tooling today:** TypeScript strict + `noUncheckedIndexedAccess` stops most accidental coupling at the type level; `npm run verify` catches the rest of the regressions.
- **ESLint (add in T0.2):** a `no-restricted-imports` override on `src/features/**` banning `@/app/*`, plus one on `src/lib/**` and `src/content/**` banning `@/features/*` and `@/components/*`.
- **Not enforced mechanically:** the feature↔feature ban and the "no copy in JSX" rule are review items. A 20-line Vitest test that walks `src/features/*` and asserts no import string contains another feature's name is a cheap, dependency-free way to enforce the first; add it in Phase 8 if review keeps missing it. Do **not** add `dependency-cruiser` or `eslint-plugin-boundaries` without an approved task card.
- **Review prompt:** the "Review pass" prompt in `docs/PROMPTS.md` already lists unnecessary client components and leaked listeners. Add "wrong layer / illegal import direction" to that list when you run it.
