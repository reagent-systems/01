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
| UI | `packages/ui` | `styles.css` (the design system), `tokens.ts`, and components: `Header` with drawer, `Hero`, `BgVideo`, `Reveal`, `CtaBand`, `Footer` | built |
| DB, Core, SDK | `packages/db`, `core`, `sdk` | Schema, domain logic, API client | planned |
| Infra | Vercel project settings | Hosting for web and backend. No Terraform yet | planned |

## Data flow

The path below is the feedback loop that runs today.

1. A person files a GitHub issue from a form in `.github/ISSUE_TEMPLATE/`. The form adds `needs-triage`.
2. The triage routine (`ROUTINES.md`) reads the issue.
3. The routine links register IDs, appends to `unknowns/surprises.md` or `unknowns/register.yaml`, and opens a pull request.
4. CI runs `pnpm verify`, which includes `pnpm unknowns:lint`.
5. `pnpm unknowns:issues` lists open critical and high items with no issue. The routine files them and runs `pnpm unknowns:link <ID> <n>`.
6. `pnpm unknowns:report --record` appends the weekly metrics row to `unknowns/metrics.csv`.

## `apps/web`

Routes mirror the reference site's shape: index pages, `[slug]` detail pages, forms, legal, and generated SEO files.

| Route | Source | Task |
|---|---|---|
| `/` | `app/page.tsx` | Hook hero over a scroll-scrubbed video, proof strip, word-reveal statement, three plain steps, pinned run, price calculator, horizontal process reel, audiences, states, resources, FAQ |
| `/states`, `/states/[state]` | `lib/states.ts`, `generated/states.json` | 50 states listed; a state page publishes at 3 or more sourced entries. Sources, FAQ, and breadcrumbs per page |
| `/insights`, `/insights/[slug]` | `lib/insights.ts` | Four guides with Article structured data |
| `/how-it-works` | `app/how-it-works` | Seven steps, animated chain graph, price break table, fault handling |
| `/processes`, `/processes/[slug]` | `lib/processes.ts` | 11 process pages: CNC, sheet metal, molding, printing, boards, casting, finishing, assembly, testing, packing |
| `/for`, `/for/[slug]` | `lib/audiences.ts` | 8 audience pages, including `/for/manufacturers` for shops |
| `/platforms`, `/platforms/[slug]` | `lib/platforms.ts` | Base platforms |
| `/designs`, `/designs/[slug]` | `lib/designs.ts` | Design pages with a waitlist notice. No invented counts or prices |
| `/compliance` | `app/compliance` | FCC, batteries, export control |
| `/start`, `/contact` | `components/InquiryForm.tsx` | Forms that post to `/api/inquiry` |
| `/api/inquiry` | `app/api/inquiry/route.ts` | Files each submission as a GitHub issue labeled `feedback`, `lead`, `needs-triage` |
| `/terms`, `/privacy`, `/designer-agreement`, `/supplier-agreement` | `components/LegalPage.tsx` | Placeholders marked "needs legal review" |
| `/ops/unknowns` | `app/ops/unknowns` | Operator view of the register. Password gated, noindex |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/opengraph-image`, `/icon.svg`, `/apple-icon.png` | `app/*.ts(x)` | Generated SEO and app files |

Alias routes redirect permanently (`next.config.ts`): `/capabilities`, `/quote`, `/certifications`, `/contracting`, `/join`, and others.

SEO: one `pageMetadata()` per page (canonical, Open Graph, Twitter), JSON-LD for the organization, website, FAQ, services, and breadcrumbs, security headers, a long cache on `/video`, and a smoke gate (`tests/smoke.test.mjs`) that checks every sitemap URL for a title, canonical, description, and one `h1`.

| File | Task |
|---|---|
| `src/proxy.ts` | Gates `/ops/*` behind HTTP Basic auth. Returns 404 when `OPS_PASSWORD` is unset |
| `src/lib/register-view.ts` | Reads `src/generated/register.json`, builds the report |
| `src/lib/site.ts`, `seo.ts` | Site facts, nav, metadata and schema helpers |

`pnpm generate` writes `src/generated/register.json` from `agent-kit/unknowns/register.yaml` before every build, typecheck, and test. The file is gitignored.

## Boundaries

| Boundary | Rule |
|---|---|
| `packages/core` ↔ everything | Core does no I/O. Apps call core; core never calls apps. |
| App ↔ environment | Apps read env only through a schema built on `packages/config`. |
| Register ↔ GitHub | The register file is the source of truth. An issue mirrors an item and carries its ID in the title. |
| Agents ↔ money and drawings | An agent proposes. A human approves. |
