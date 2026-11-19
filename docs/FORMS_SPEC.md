# Forms Specification — Request Demo and Contact

## Request-demo fields
- Full name (required) · Work email (required, valid) · Company (required) · Job title (optional)
- Company size (select: 1–50, 51–200, 201–1000, 1000+)
- Areas of interest (checkboxes: Agents, Flow, Intelligence, Not sure yet)
- What would you like to improve? (optional, max 1000 chars)
- Consent (required): agreement to be contacted, linked to privacy policy
- Honeypot (visually hidden, `tabindex=-1`, `autocomplete=off`)

## Contact fields
Name, email, subject, message, consent, honeypot.

## Architecture
- One shared Zod schema per form in `src/features/contact/schema.ts`; React Hook Form on client **and** the same schema on the server. Server never trusts client.
- Submission via Route Handlers `POST /api/request-demo` and `POST /api/contact`. **(Decided 2026-11-19: Route Handlers only. Do not introduce Server Actions for these forms — it would invalidate the handler tests and change the CSP/progressive-enhancement story.)**
- Server steps: check content type and body size → parse JSON → Zod validate → silently accept and discard honeypot hits → rate limit → send via configured provider → map every failure to a safe message.
- **Rate limiting: hosting-layer rules (Vercel WAF), no key-value store and no dependency.** Document the rule (window, limit, key) in the task report. The handler still calls `lib/rate-limit.ts` (`checkRateLimit(key)`), which returns `ok` unconditionally at launch so the 429 branch stays testable by stubbing that module; the real enforcement is the platform rule. Revisit only if the platform rules prove insufficient (new dependency + decision card).
- Optional bot challenge (e.g. Cloudflare Turnstile) must be checked against the CSP before enabling.
- Env vars (all in `.env.example`, validated by `src/lib/env.ts`): `CONTACT_PROVIDER`, `RESEND_API_KEY` (if Resend), `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
- **No provider configured:** development → log sanitized payload, return success with a visible "development mode" note. **Production → 503 with a clear message. Never fake success.**
- Store nothing beyond email delivery. Do not log message bodies or personal data.

## UX states
idle · field error (inline via `aria-describedby`, summary at top with focus) · submitting (button disabled + spinner, inputs preserved) · success (focus moves to success heading, explains what happens next) · server error (retry button, inputs preserved, alternative contact email shown).

## Tests
Zod schema unit tests (valid/invalid/edge), component tests for states, E2E success + failure + honeypot, server handler tests for 400/413/429/503 (429 via a stubbed `lib/rate-limit.ts`; the live rule is verified once in preview and recorded in the task report).
