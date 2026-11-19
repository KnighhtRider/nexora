# Cookies and Similar Technologies — Draft for Qualified Review

> **Not for publication.** This inventory is based on the current source tree, not a production browser/network audit. Hosting behavior and jurisdiction-specific requirements remain unverified. No legal template was present in the repository.

**Effective date:** `[EFFECTIVE DATE]`  
**Operator:** `[LEGAL ENTITY NAME]`  
**Website:** `[PRODUCTION DOMAIN]`  
**Privacy contact:** `[PRIVACY CONTACT EMAIL]`

## Current project status

The project decision is no analytics at launch. A source scan found no application analytics SDK, cookie access, or browser storage use in the current app code. This does not establish that the production hosting/CDN, security services or future embedded content set no cookies or similar identifiers.

The application has no consent-management tool configured. Do not describe a consent banner or cookie preference feature unless it is implemented and tested. Before launch, inspect the production site and hosting/provider documentation, then update this inventory.

## Cookie inventory to complete before publication

| Provider/name | Purpose | Type or category | Duration | Required or optional | Status |
|---|---|---|---|---|---|
| `[HOSTING/CDN COOKIE, IF ANY]` | `[VERIFY]` | `[COUNSEL TO CLASSIFY]` | `[VERIFY]` | `[COUNSEL TO DETERMINE]` | Not verified |
| `[SECURITY/FORM PROVIDER COOKIE, IF ANY]` | `[VERIFY AFTER PROVIDER CONFIGURATION]` | `[COUNSEL TO CLASSIFY]` | `[VERIFY]` | `[COUNSEL TO DETERMINE]` | Provider not configured |
| Analytics | None planned at launch | Not applicable if none are deployed | Not applicable | Reconfirm before launch | Project decision: none |

## Choices and legal review

`[QUALIFIED COUNSEL: DETERMINE APPLICABLE COOKIE/DEVICE-STORAGE RULES, WHETHER CONSENT OR A PREFERENCE CONTROL IS REQUIRED, AND THE REQUIRED INFORMATION FOR EACH JURISDICTION.]`

Do not state that a cookie is strictly necessary, exempt, or consented to until the actual technology, purpose and applicable law have been reviewed. If analytics or other optional tracking is later approved, update this page and implement any required consent controls before enabling it.

## Contact

For questions, contact `[PRIVACY CONTACT EMAIL]` or `[LEGAL ENTITY NAME AND POSTAL ADDRESS]`.

### Drafting reference — applicability not determined

- [ICO: Cookies and similar technologies](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/cookies-and-similar-technologies/) — UK-specific guidance; counsel must determine whether it applies to the business and its visitors.
