# Page Blueprints

Each page has one job, listed sections and **one primary CTA**. Agents must not add unlisted sections without a task card. All copy comes from `docs/COPY_DECK.md` → `src/content/`.

| Route | Job | Sections | Primary CTA |
|---|---|---|---|
| `/` | Make the visitor understand and request a demo | 1 Hero (H1 + Core) · 2 Business problem · 3 Platform pillars · 4 How it works (Connect → Understand → Orchestrate → Improve) · 5 Interactive demo · 6 Use cases · 7 Technology and trust · 8 Closing CTA ("The future of business is intelligent.") | Request a Demo (secondary: Explore the Platform) |
| `/platform` | Explain the three modules | Overview SVG diagram (Agents/Flow/Intelligence around the Core) · one section per module: capabilities, example workflow, what a human controls · status labels (**Concept** / **In design**) | Request a Demo |
| `/solutions` | Map problems to modules | Four cards: document processing, knowledge assistance, workflow automation, operational intelligence — each: problem, approach, modules involved | Request a Demo |
| `/industries` | Show relevance | 6–8 industries as capability hypotheses (finance, logistics, manufacturing, healthcare administration, retail, public sector…). Wording: "where NEXORA is designed to help", never outcomes | Request a Demo |
| `/technology` | Build trust with technical buyers | SVG architecture diagram · integration approach (design, not logo catalog) · governance and human oversight · observability · security principles with **no certification claims** | Request a Demo |
| `/resources` | Authority and SEO | MDX index with tag filter that works without JS · 3 original launch articles · article template (reading time, TOC, related posts) | Request a Demo |
| `/about` | Credibility through clarity | Mission · vision · principles · product philosophy. No invented founders, headcount, awards, locations | Contact / Request a Demo |
| `/contact` | General inquiries | Short form (name, email, subject, message, consent, honeypot) · direct email · response time only if truly honored | Send message |
| `/request-demo` | Convert | Two columns: value summary + form (see FORMS_SPEC.md) · true "what happens next" | Submit request |
| `/privacy` `/terms` `/cookies` | Legal | Plain, readable, reviewed by a qualified person before launch; linked from footer | — |
| 404 / error | Recover | Helpful message, link home and to Request a Demo | Home |
| `/design-system`, `/lab/ai-core` | Internal | Hidden; `notFound()` when `VERCEL_ENV === 'production'`; noindex | — |

## Resources seed content
Three original articles (MDX, frontmatter validated by Zod: `title`, `description`, `date`, `author`, `tags`, `draft`). Topics proposed (human to confirm/write):
1. Why enterprise knowledge stays fragmented, and what retrieval changes.
2. Human-in-the-loop design for automated approvals.
3. From documents to decisions: how invoice-style workflows are structured.

Articles must contain no invented statistics. Claims checked against the register.

## Navigation (single source of truth: `src/config/site.ts`)
Header: Platform · Solutions · Industries · Technology · Resources · About · **Request a Demo** (button). Footer: same groups + Contact, Privacy, Terms, Cookies, tagline.
