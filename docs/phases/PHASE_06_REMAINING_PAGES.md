# Phase 6 — Remaining Pages

**Objective:** every launch route live with original, approved content; forms working; no placeholders.
**Read:** AGENTS.md, docs/PAGE_BLUEPRINTS.md, docs/COPY_DECK.md (approved entries), docs/CLAIMS_REGISTER.md, docs/FORMS_SPEC.md (for T6.7–T6.8)
**Prerequisite:** Phase 2 copy approved for each page before its task starts; email provider decided.
**Branch prefix:** `phase-6/`   **Tag:** `phase-6-approved`

## Tasks (one page per card)
- **T6.1 `/platform`** (SVG overview diagram, three module sections, status labels, human-control notes).
- **T6.2 `/solutions`** (four solution cards).
- **T6.3 `/industries`** (6–8 capability hypotheses; hypothesis wording only).
- **T6.4 `/technology`** (SVG architecture diagram, integration approach, governance, observability, security principles, no certifications).
- **T6.5 `/resources` + MDX pipeline** (index, tag filter working without JS, article template with reading time/TOC/related, three launch articles, draft flag excluded from production).
- **T6.6 `/about`** (mission, vision, principles; no invented people/facts).
- **T6.7 `/request-demo` + `/api/request-demo`** (schema, form states, server validation, honeypot, rate limit, provider integration, dev vs production behaviour, tests).
- **T6.8 `/contact` + `/api/contact`** (same pattern, shared helpers).
- **T6.9 Legal pages** `/privacy`, `/terms`, `/cookies` (approved text; plain layout; footer links).
- **T6.10 System pages** `not-found.tsx`, `error.tsx`, `global-error.tsx`, `loading.tsx` where useful.
- **T6.11 Navigation completion.** All nav/footer/CTA links resolve; remove any temporary omissions from Phase 1/3.

## Split before use
- **T6.5 →** T6.5a MDX pipeline + frontmatter Zod schema + reading-time helper + tests · T6.5b Resources index + tag filter working without JS · T6.5c Article template (TOC, related, reading time) · T6.5d one card per launch article (three).
- **T6.7 →** T6.7a schema + shared form primitives/states · T6.7b `POST /api/request-demo` + provider integration + handler tests · T6.7c page assembly + E2E.

## Rules
Detail routes only when content exists. Do not add sections beyond the blueprint. Do not fake form success in production when delivery isn't configured (503). Copy from `src/content` only.

## Tests
E2E: every nav/footer link returns 200; form success/failure/honeypot; 404 page; link and placeholder guard (`href="#"`, lorem ipsum, TODO, coming soon). axe on every route. Visual baselines for each page.

## Exit gate (human approves)
- [ ] Every route has specific content and a working CTA; no placeholder text.
- [ ] Forms verified end-to-end in preview with the real provider (or documented dev-mode behaviour if provider is Phase 9).
- [ ] Claims register audit passes on all new copy.
- [ ] Tag `phase-6-approved`.
