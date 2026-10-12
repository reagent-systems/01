# Architecture

01 is a TypeScript monorepo for a hardware crowd-build platform. It uses pnpm workspaces and Turborepo. Three parts exist today; the rest are planned in `ROADMAP.md` and specified in `unknowns/evidence/handoff-spec.md`.

| Part | Folder | Task | State |
|---|---|---|---|
| Config | `packages/config` | Zod env schema helper shared by every app | built |
| Unknowns tools | `tools/unknowns` | Lints and reports the register; drafts and links GitHub issues | built |
| Agent kit | `agent-kit/` | Process files, register, evidence, launch kit | built |
| Web | `apps/web` | Next.js 16 app. Home page and `/ops/unknowns` today; designer app and buyer pages planned | `/ops/unknowns` built |
| Supplier | `apps/supplier` | Node-graph portal for shops | planned |
| Floor | `apps/floor` | Expo app for scans | planned |
| API | `apps/api` | Node service on Cloud Run | planned |
| Orchestrator | `apps/orchestrator` | Runs the chain state machine | planned |
| Agents | `apps/agents` | Negotiation, DFM, ECR agents | planned |
| Launch | `apps/launch` | Remotion reels | planned |
| UI, DB, Core, SDK | `packages/ui`, `db`, `core`, `sdk` | Tokens, schema, domain logic, API client | planned |
| Infra | `infra/terraform` | Google Cloud resources | planned |

## Data flow

The path below is the feedback loop that runs today.

1. A person files a GitHub issue from a form in `.github/ISSUE_TEMPLATE/`. The form adds `needs-triage`.
2. The triage routine (`ROUTINES.md`) reads the issue.
3. The routine links register IDs, appends to `unknowns/surprises.md` or `unknowns/register.yaml`, and opens a pull request.
4. CI runs `pnpm verify`, which includes `pnpm unknowns:lint`.
5. `pnpm unknowns:issues` lists open critical and high items with no issue. The routine files them and runs `pnpm unknowns:link <ID> <n>`.
6. `pnpm unknowns:report --record` appends the weekly metrics row to `unknowns/metrics.csv`.

## `apps/web`

| File | Task |
|---|---|
| `src/proxy.ts` | Gates `/ops/*` behind HTTP Basic auth. Returns 404 when `OPS_PASSWORD` is unset |
| `src/lib/ops-auth.ts` | Constant-time password check |
| `src/lib/register-view.ts` | Reads `src/generated/register.json`, builds the report |
| `src/app/ops/unknowns/` | Stats, domain × field grid, blockers by phase, filterable register table |

`pnpm generate` writes `src/generated/register.json` from `agent-kit/unknowns/register.yaml` before every build, typecheck, and test. The file is gitignored.

## Boundaries

| Boundary | Rule |
|---|---|
| `packages/core` ↔ everything | Core does no I/O. Apps call core; core never calls apps. |
| App ↔ environment | Apps read env only through a schema built on `packages/config`. |
| Register ↔ GitHub | The register file is the source of truth. An issue mirrors an item and carries its ID in the title. |
| Agents ↔ money and drawings | An agent proposes. A human approves. |
