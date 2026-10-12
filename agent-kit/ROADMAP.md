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

### 1. Web shell with the unknowns page
- **Promise:** `apps/web` builds under `pnpm build`, and `/ops/unknowns` renders the register as a filterable table and a domain × field grid whose counts equal `pnpm unknowns:report --json`.
- **Evidence:** `pnpm verify` green; a test that compares page data to the report; a screenshot of the page.
- **Use case:** Close an unknown.
- **Scope guard:** No design tokens, no public pages, no auth provider beyond a single operator password gate, no deploy.
- **Status:** ready

### 2. Design tokens from the reference site
- **Promise:** `packages/ui/tokens` holds the colors, fonts, sizes, spacing, radii, and motion timings read from the reference site's computed CSS, and a side-by-side screenshot test of the home page at 1280px and 390px shows matching layout, type, and color.
- **Evidence:** Token file, desktop and mobile screenshot pairs, a diff report saved under `agent-kit/launch/`.
- **Use case:** Publish a design.
- **Scope guard:** Design system only. No Ferrera name, logo, text, phone, address, video, or image. No link to it. No pages beyond the home page.
- **Status:** ready

### 3. Pricing curve in core
- **Promise:** `packages/core` exports a tiered price curve with process switch points, and its tests reach 100% branch coverage including property tests for monotonic price and tier boundaries.
- **Evidence:** `pnpm test` output with the coverage table at 100% branches for the curve module.
- **Use case:** Join a waitlist.
- **Scope guard:** No state machine, no payouts, no I/O, no database.
- **Status:** ready

### 4. Terraform for staging
- **Promise:** `terraform validate` and `terraform plan` pass for `infra/terraform` with Cloud Run `api`, `orchestrator`, `agents`, Cloud SQL Postgres 16 on private IP, Cloud Storage, Pub/Sub, Secret Manager, and Artifact Registry in a `staging` project.
- **Evidence:** `terraform plan` output saved in the PR.
- **Use case:** Start a run.
- **Scope guard:** Staging only. No prod project. No apply without the human.
- **Status:** blocked on a GCP staging project ID and billing from the human

## Later — candidates, not yet specced

- Phase 1 rest: empty `api`, `orchestrator`, `agents`, `supplier`, `floor`, `launch` apps; Vercel previews; deploy workflows.
- Phase 2: chain graph, run state machine, serialization, payouts in `packages/core`.
- Phase 3: upload, geometry service, decomposition, quoting engine, DFM agent, waitlist, Stripe SetupIntent.
- Phase 4: orchestrator, purchase orders, labels, charging, failure injection.
- Phase 5: supplier portal, ECR, scorecard, WhatsApp bridge, floor app.
- Phase 6: Stripe Connect payouts, net-60, fault withholding.
- Phase 7: use-case pages, Remotion templates, UGC intake, launch calendar.
- Phase 8: real pilot of the desk token counter.
- Issue sync: have `pnpm unknowns:issues` run inside a routine and link every critical and high item.

## Shipped

| Week | Feature | Release | Evidence |
|---|---|---|---|
| 2026-10-12 | Agent kit installed; monorepo; register and tooling; GitHub feedback wiring | none | `pnpm verify` green, see STATUS.md |

## Explicitly not doing

- Payment providers other than Stripe — the spec requires Stripe; changing it needs the human.
- Base-platform-only flows — custom designs are the main path.
- Anything that needs Reagent Defense or ITAR data — blocked by design.

## Queue changes

- 2026-10-12: Queue seeded by the installing agent from the handoff spec. Provisional.
