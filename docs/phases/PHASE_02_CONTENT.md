# Phase 2 — Content Foundation (human-led, runs in parallel with Phase 1)

**Objective:** approved words and claims before pages are built. Agents assist with drafts but do not approve content.
**Read:** docs/COPY_DECK.md, docs/CLAIMS_REGISTER.md, docs/PAGE_BLUEPRINTS.md
**Branch prefix:** `phase-2/`   **Tag:** `phase-2-approved`

## Tasks
**T2.1 Homepage copy deck.** Review/edit the drafted entries in COPY_DECK.md (word limits respected). Human approves.
**T2.2 Claims register.** Extend CLAIMS_REGISTER.md for every statement in the approved homepage copy; remove or rewrite anything marked NEEDS PROOF.
**T2.3 Remaining page copy decks.** One entry per section for platform, solutions, industries, technology, about, contact, request-demo (draft now, approve before Phase 6).
**T2.4 Article outlines.** Three original launch articles outlined; authors assigned; no invented statistics.
**T2.5 Legal drafts.** Privacy, Terms, Cookies drafted from templates; flagged for review by a qualified person before launch (Phase 9).
**T2.6 Decisions.** Resolve open questions (email/CRM, analytics, domain, trademark check for NEXORA) and log in DECISIONS.md.
**T2.7 Content scaffolding (agent task).** Create typed content modules in `src/content/` (e.g. `home.ts`) that mirror the approved copy deck 1:1, and the MDX frontmatter Zod schema + reading-time helper with unit tests.
- Accept: no copy text exists outside `src/content`/`src/config`; schema tests pass.

## Exit gate (human approves)
- [ ] Homepage copy deck approved; every claim mapped to the register.
- [ ] No forbidden claim or banned word present.
- [ ] Trademark/domain check status recorded (even if "pending").
- [ ] Tag `phase-2-approved`.
