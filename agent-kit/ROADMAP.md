# ROADMAP.md — the source of all work

**This file is not optional.** Every feature the agent builds flows down
from here. If it isn't on this roadmap, it doesn't get built; if it needs
building, it gets added here first. One item ships per weekly cycle
(see `WEEKLY.md`).

`provisional: true` — the human has not ranked this queue. Re-order it freely.

## North star

01 lets a designer publish any hardware design and get it built without
capital. Buyers join a waitlist with a saved card. The price falls as
the count rises. At the target count, one button sends the order to every
shop in the chain, and buyers fund the run. The spec is
`unknowns/evidence/handoff-spec.md`. The open questions are
`unknowns/register.yaml`. The eight phases below are the long path; the
queue is the next short steps.

## Feature Queue — ordered; top unblocked item ships next

### 1. Pricing curve in core
- **Promise:** `packages/core` exports a tiered price curve with process switch points, and its tests reach 100% branch coverage including property tests for monotonic price and tier boundaries.
- **Evidence:** `pnpm test` output with the coverage table at 100% branches for the curve module.
- **Use case:** Join a waitlist.
- **Scope guard:** No state machine, no payouts, no I/O, no database.
- **Status:** ready

### 2. Vercel backend foundation
- **Promise:** `apps/web` serves `GET /api/health` that reports the git SHA and whether the database answers, and `packages/db` holds a Drizzle schema plus a migration that applies to a fresh Postgres in a test.
- **Evidence:** `pnpm verify` green with a migration test against a throwaway Postgres; the health route's response saved in the PR.
- **Use case:** Start a run.
- **Scope guard:** No tables beyond `designs` and `events`. No payments. No queue.
- **Status:** ready

### 3. Chain graph in core
- **Promise:** `packages/core` exports a chain graph (nodes, ship-to edges) that rejects cycles and orphan nodes, orders nodes for parallel and sequential topologies, and its tests reach 100% branch coverage.
- **Evidence:** `pnpm test` coverage table at 100% branches for the graph module; property tests on random DAGs.
- **Use case:** Start a run.
- **Scope guard:** No state machine, no I/O, no database.
- **Status:** ready

### 4. Fill the thin state pages
- **Promise:** Every one of the 50 states has at least three sourced entries and a published page, and every entry on those pages was read from an opened source page.
- **Evidence:** `pnpm verify` smoke gate with 50 state URLs in the sitemap; the re-check notes saved in `unknowns/evidence/states/`.
- **Use case:** Turn feedback into a record.
- **Scope guard:** No entry without a source page that was opened. No page below three entries.
- **Status:** ready

## Later — candidates, not yet specced

- Real-device check of the scroll video and pinned scenes on iPhone and mid-range Android (register TEC-07).
- Replace the Mixkit footage with our own (register LCH-07).
- More insight guides from the register's research, one per week.
- Home page: add "Learn more" links, the use-case pages, and a real start flow. The CTA buttons point at in-page anchors until those pages exist.
- Real media for the hero: our own footage (shot list in the launch kit).
- Phase 1 rest: empty `api`, `orchestrator`, `agents`, `supplier`, `floor`, `launch` apps; Vercel previews; deploy workflows.
- Phase 2: chain graph, run state machine, serialization, payouts in `packages/core`.
- Phase 3: upload, geometry service, decomposition, quoting engine, DFM agent, waitlist, Stripe SetupIntent.
- Phase 4: orchestrator, purchase orders, labels, charging, failure injection.
- Phase 5: supplier portal, ECR, scorecard, WhatsApp bridge, floor app.
- Phase 6: Stripe Connect payouts, net-60, fault withholding.
- Phase 7: use-case pages, Remotion templates, UGC intake, launch calendar.
- Phase 8: real pilot of the desk token counter.
- Phase 1 rest, revised: `api`, `orchestrator`, and `agents` become Vercel route handlers or functions. Terraform and Cloud Run return only if a phase needs them.
- Issue sync: have `pnpm unknowns:issues` run inside a routine and link every critical and high item.

## Shipped

| Week | Feature | Release | Evidence |
|---|---|---|---|
| 2026-10-12 | Agent kit installed; monorepo; register and tooling; GitHub feedback wiring | none | `pnpm verify` green, see STATUS.md |
| 2026-10-12 | Redesign: Printify-style hook and flow, mega-menu header, scroll-scrubbed video, pinned run, price calculator, state guides, insights | none | `pnpm verify` green with 12 smoke tests; frames at 0%, 12%, 26%, 38% of the scroll |
| 2026-10-12 | Design tokens, `packages/ui`, and the restyled home page | none | `agent-kit/launch/design-compare/` (screenshots at 1280px and 390px, token table); `pnpm verify` green; tokens test keeps `tokens.ts` and `styles.css` in sync |
| 2026-10-12 | Web shell with `/ops/unknowns` | none | `agent-kit/unknowns/evidence/ops-unknowns.png`; 105 rows, 19 after the critical filter; `pnpm verify` green |

## Explicitly not doing

- Payment providers other than Stripe — the spec requires Stripe; changing it needs the human.
- Base-platform-only flows — custom designs are the main path.
- Anything that needs Reagent Defense or ITAR data — blocked by design.

## Queue changes

- 2026-10-12: Queue seeded by the installing agent from the handoff spec. Provisional.
- 2026-10-12: Queue item 1 (web shell) shipped and removed. Item 4 (chain graph) added to keep 3 ready items.
- 2026-10-12: The human chose Vercel for hosting and the backend. The Terraform item was replaced by item 3 (Vercel backend foundation).
- 2026-10-12: Design tokens item shipped and removed. Queue is now pricing curve, Vercel backend foundation, chain graph.
