# VERIFICATION.md — one command answers "is this repo healthy"

`pnpm verify` runs, in order:

1. Lint / format check — `pnpm lint`
2. Build — `pnpm build`
3. Tests — `pnpm test`
4. Register — `pnpm unknowns:lint` (knowledge-map.md section 2.3 rules)
5. Kit — `sh verify/kit-placeholders.sh` (no unfilled placeholder in `agent-kit/`)

## Rules

- CI runs **the same command** as local. No CI-only logic.
- A gate that can't run in some environment **skips loudly**, never
  passes silently.
- New behavior lands with its gate in the same PR whenever feasible.
- A feature's completion promise (ROADMAP.md) should be backed by a gate
  here whenever it can be — evidence that keeps proving itself beats
  evidence produced once.
- Fixing a flaky or broken gate is always in scope, for any task.
