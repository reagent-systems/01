# AGENTS.md — the binding contract

In effect whenever code in this repo is touched, by agent or human.
When this conflicts with intuition, this wins.

## Commands

```sh
pnpm build      # build
pnpm test       # tests
pnpm lint       # lint / format check
pnpm verify     # full health gate — must pass before any push
```

Requires Node 22 and pnpm 10.

## Invariants — never regress these

Source spec: `unknowns/evidence/handoff-spec.md`. Open questions: `unknowns/register.yaml`.

1. `packages/core` does no network or database calls. It carries full unit tests and 100% branch coverage.
2. Every app reads env vars through one zod schema built on `packages/config`. No secrets in the repo.
3. The run is an explicit state machine in `packages/core`. Every transition writes an event. The event log is the source of truth.
4. Every orchestrator step is idempotent and safe to retry. No double charges, no lost events.
5. Buyers save a card with a Stripe SetupIntent and are charged at trigger. Never use card authorizations to hold funds.
6. An agent output that changes money or a drawing needs human approval. Log every agent action.
7. Never overwrite a design file. Version every file.
8. Block ITAR-marked uploads. Reagent Defense work does not run on this platform.
9. Legal, payments, product-liability, securities, and export-control questions stop work. Flag them in the register. Do not guess. Only a lawyer's written answer closes a legal item.
10. A phase does not pass while a critical register item in its domains is open.
11. No invented testimonials, reviews, or user counts anywhere in the product.

## Landmine map

| Area | Why it bites |
|---|---|
| `agent-kit/unknowns/register.yaml` | Never delete an item or reuse an ID. Close it. Edit with `pnpm unknowns:link` or by hand, then run `pnpm unknowns:lint`. |
| `agent-kit/unknowns/evidence/` | Holds the source spec and map. Treat as read-only. Biome and the placeholder gate skip it. |
| Reference site `ferrera-tooling-website.vercel.app` | Copy the design system only. Never copy its name, logo, text, phone, address, videos, or images. Never link to it. |
| Ferrera Tooling customer data, pricing, supplier lists | Belongs to an employer. It never enters the register or the repo. |
| UI copy | No microcopy, subtitles, badges, pills, or toasts beyond the section patterns in the spec. |
| `.claude/ralph-loop.local.md` | Runtime state. Gitignored. Never commit it. |

## House style

- Match the surrounding code's idiom, naming, and comment density.
- No demo scaffolding, no leftover diagnostics, no dead flags.
- Comments state constraints the code can't show — never narration.
- User-facing copy states the thing plainly; no reassurance microcopy.

## Process rules

- Branch from `main`; never commit to it directly.
- Ask the human before: choosing the final brand name or domain, choosing a payment provider other than Stripe, spending money on any service, or posting anything public.
- Pick the default for choices with a clear default. Note it in `DEVLOG.md` or the decision log below.
- `pnpm verify` green before every push. Flaky gate → fix or
  quarantine in the same PR; never route around it.
- After adding/removing/renaming source files, run the stack's
  regeneration step (project gen, lockfile, tidy) and commit the result.
- Commit at boundaries; message says what changed and cites evidence.
- Docs move with behavior — same commit or PR.
- Report outcomes faithfully; failing is failing, with output.

## Decision log

| Date | Decision | Why |
|---|---|---|
| 2026-10-12 | Product name is `01`. The spec's `Forge` placeholder is dropped. | The human named it. LCH-01 stays open for the domain and final sign-off. |
| 2026-10-12 | The kit lives in `agent-kit/`, not `/kit`. The register lives in `agent-kit/unknowns/`. | The kit's own files name `agent-kit/`. The spec allows the kit's location. |
| 2026-10-12 | Linter is Biome. Tests are Vitest. TypeScript is 5.9. | One tool per job. Spec says pick one and keep it. |
| 2026-10-12 | Workspaces: `apps/*`, `packages/*`, `tools/*`. Only `packages/config` and `tools/unknowns` exist so far. | Empty stub packages add noise. Each roadmap item creates what it needs. |
| 2026-10-12 | `PAY-01` loads as a KU, not a KK. | The seed says verify current Stripe docs. A claim with no verified source is a KU. |
| 2026-10-12 | Feedback becomes GitHub issues. Critical and high register items get an issue; the issue number is stored in the item's `issue` field. | The human wants routines to run feedback through issues. See `ROUTINES.md`. |
