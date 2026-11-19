# Interactive Demo Specification — Invoice Processing Simulation

**Principle:** deterministic frontend simulation. No network calls, no randomness, no real clock. Same inputs → same states → fully testable.

**Permanent visible label above the demo:** "Interactive simulation using sample data. No real invoice, AI model or ERP is involved."

## Visitor journey
1. Pick a sample invoice → 2. Press **Next step** to start → 3. Extracted supplier, invoice number, amount, due date appear → 4. Inspect policy-validation results against the four shown rules → 5. Review the human approval step → 6. Approve or reject → 7. See simulated completion and ERP sync result (labelled simulated) → 8. Reset and replay (works mid-flow).

Each numbered step after 1 is one press of the same control. The whole journey is reachable with the keyboard alone and contains no timed transitions.

## Sample data (fictional, labelled)
- **Sample A — clean:** all four rules pass; one approver; recommendation: **approve**.
- **Sample B — policy flag:** total above the sample approval threshold (rule 4) → manager approval required; recommendation: **approve, with manager approval**.
- **Sample C — duplicate:** invoice number already in the sample ledger (rule 3) → flag; recommendation: **reject**.
- **Sample D — incomplete record:** supplier not on the sample approved-supplier list (rule 1) **and** line items do not add up to the total (rule 2) → two flags; recommendation: **reject**.

Rule coverage — every rule must be shown both passing and failing, or it is dead UI:

| Rule | Passes in | Fails in |
|---|---|---|
| 1. Supplier is on the approved list | A, B, C | D |
| 2. Line items sum to the total | A, B, C | D |
| 3. Invoice number unseen in the ledger | A, B, D | C |
| 4. Above threshold needs manager approval | A, C, D | B |

Approving against the recommendation is **allowed** (the visitor is the approver) and recorded in the audit log as "approved against recommendation". Blocking it would leave a dead state and hide the most interesting part of the demo: what a human override looks like on the record.

## Sample policy rules (shown to the visitor)
1. Supplier is on the sample approved-supplier list.
2. Line items add up to the invoice total.
3. Invoice number has not been seen in the sample ledger.
4. Totals above the sample threshold require manager approval.

## State machine
```text
idle -> loaded -> extracting -> extracted -> validating -> validated
     -> awaitingApproval -> (approved | rejected)
     -> syncing -> completed        (approved path)
     -> closed                      (rejected path)
reset: any state -> idle
```
`loaded` is reachable only via `SELECT_SAMPLE`. Nothing moves without an event.

### Event → transition table
`ADVANCE` is dispatched by the step button (the normal path). `STEP_COMPLETE` is dispatched only by the optional auto-play hook and is handled identically. Any event not listed returns the **same state object reference** so `useReducer` bails out (no re-render, no flicker).

| State | Event | Next | Notes |
|---|---|---|---|
| `idle` | `SELECT_SAMPLE` | `loaded` | unknown `sampleId` → unchanged |
| `idle` | `ADVANCE` | `idle` | must pick a sample first |
| `loaded` | `ADVANCE` / `STEP_COMPLETE` | `extracting` | |
| `extracting` | `ADVANCE` / `STEP_COMPLETE` | `extracted` | extraction results populated |
| `extracted` | `ADVANCE` / `STEP_COMPLETE` | `validating` | |
| `validating` | `ADVANCE` / `STEP_COMPLETE` | `validated` | rule results computed here |
| `validated` | `ADVANCE` / `STEP_COMPLETE` | `awaitingApproval` | always requires a human decision |
| `awaitingApproval` | `APPROVE` | `approved` | allowed even when the recommendation is reject |
| `awaitingApproval` | `REJECT` | `rejected` | |
| `approved` | `ADVANCE` / `STEP_COMPLETE` | `syncing` | |
| `syncing` | `ADVANCE` / `STEP_COMPLETE` | `completed` | ERP sync shown as simulated |
| `rejected` | `ADVANCE` | `closed` | |
| `completed`, `closed` | any except `RESET` | unchanged | terminal |
| any | `RESET` | `idle` | clears results, keeps nothing |

### Types (sketch)
```ts
type DemoStatus =
  | 'idle' | 'loaded' | 'extracting' | 'extracted' | 'validating'
  | 'validated' | 'awaitingApproval' | 'approved' | 'rejected'
  | 'syncing' | 'completed' | 'closed';

type DemoEvent =
  | { type: 'SELECT_SAMPLE'; sampleId: SampleId }
  | { type: 'ADVANCE' }        // visitor pressed the step control
  | { type: 'STEP_COMPLETE' }  // optional auto-play only
  | { type: 'APPROVE' }
  | { type: 'REJECT' }
  | { type: 'RESET' };

// Pure: no timers, no Date, no random.
function demoReducer(state: DemoState, event: DemoEvent): DemoState

// Selectors drive the UI, so a disabled button is never a no-op click.
canAdvance(state): boolean
canApprove(state): boolean   // always true in awaitingApproval, by design
recommendation(state): 'approve' | 'reject' | null
```

## File separation
```text
src/features/workflow-demo/
  data/        mock invoices, ledger, rules (plain typed objects)
  state/       pure reducer + selectors  (unit-tested core)
  hooks/useWorkflowDemo.ts   binds the reducer; owns the OPTIONAL auto-play timer
                             (dispatches STEP_COMPLETE only, off by default, cleared on
                             unmount/reset, ~0 delay under prefers-reduced-motion)
  components/  step rail, document preview, extraction panel, rules panel,
               approval panel, audit log, completion panel
```

## UX
- Desktop: step rail left, document preview centre, results right. Mobile: compact sticky step indicator + stacked panels.
- **Stepping is manual by default.** One persistent control sits in the same DOM position through the flow: `Next step` → `Review approval` → `Sync to ERP` → `Close`. Focus stays on it across transitions, so a keyboard user never loses their place and no focus is moved for them.
- Each press reveals that step's result and highlights the matching document region. Nothing changes without a press.
- Audit log uses step counters ("Step 4"), **not timestamps**, so screenshots are stable.
- Status never colour-only: icon + text label.
- Polite `aria-live` region announces the result of the step the visitor just triggered ("Validation complete: 3 of 4 rules passed"). No automatic announcements, no automatic focus moves.
- When the control is not actionable it is `disabled` (and styled), never a live no-op.
- Approve / Reject are real buttons, both enabled in `awaitingApproval`. The panel shows the recommendation; overriding it is recorded, not blocked. Completion screen states ERP sync is simulated.
- Motion via Motion library only (step transitions); no GSAP here.
- Optional auto-play is a Phase 7 nice-to-have, not a requirement: off by default, hidden under `prefers-reduced-motion`, and shipped only after the manual path is complete and passing.

## Tests
- Table-driven reducer tests for every row of the transition table, for all four samples: valid transitions, every ignored invalid transition (asserting **object identity** is preserved), unknown `sampleId`, `RESET` from every state.
- Component tests: approval panel (both buttons enabled), live region text, disabled step control in each state.
- E2E: full journey on all four samples; keyboard-only run; reduced-motion run; reset mid-flow; approve-against-recommendation is logged. The journey contains **no waits** — every step is an explicit click, so there is nothing to flake and no `waitForTimeout` anywhere.
