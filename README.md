# 01

[![CI](https://github.com/reagent-systems/01/actions/workflows/ci.yml/badge.svg)](https://github.com/reagent-systems/01/actions/workflows/ci.yml)

**Design hardware without capital.**

A designer publishes a design. Buyers join a waitlist and save a card. The price falls as the count rises. At the target count, one button sends the order to every shop in the chain at once. Buyers fund the run. The designer pays with design time.

01 is the Printify model for products that need more than one manufacturer. Printify standardizes the product. 01 standardizes the process: every custom design breaks into parts, every part into processes, and every shop declares the processes it runs.

> **Status: foundation.** The repo has the process kit, the register of open questions, the web shell, and the GitHub feedback loop. The product itself is not built yet. [`STATUS.md`](agent-kit/STATUS.md) states what works, with evidence.

## How a run works

1. **Publish.** A designer uploads STEP, STL, DXF, Gerber, and BOM files. The geometry service reads each part. The DFM agent proposes a parts tree with a process and a material per part.
2. **Quote.** Each part gets a price estimate from geometry, process, and quantity. Real shop quotes replace estimates before trigger.
3. **Wait.** Buyers join the waitlist and save a card. Nothing is charged. A buyer can leave at no cost before trigger.
4. **Trigger.** The designer or an operator presses "Start run". The orchestrator confirms every node, charges every buyer, sends a purchase order to every shop, and issues a serial code for every part.
5. **Build.** Floor staff scan each part at each step. A bad part routes to the node that made it. A confirmed fault withholds payment for that part.
6. **Ship.** The last node ships to buyers. Buyers see one tracking view.

The full spec is [`handoff-spec.md`](agent-kit/unknowns/evidence/handoff-spec.md).

## What is in the repo

| Path | What it is |
|---|---|
| `apps/web` | Next.js 16 app: 34 routes (how it works, processes, audiences, platforms, designs, compliance, start, contact, legal), forms that file GitHub issues, and the operator page `/ops/unknowns` |
| `packages/ui` | Design tokens and components shared by every app |
| `packages/config` | Zod environment schema helper |
| `tools/unknowns` | Lints, reports, and links the register to GitHub issues |
| `agent-kit/` | The operating system for agents and people: process files, the register, evidence |
| `.github/` | CI, nightly check, issue forms, labels, Dependabot |

Planned: `apps/supplier`, `apps/floor`, `apps/launch`, `packages/core`, `packages/db`, `packages/sdk`. See [`ROADMAP.md`](agent-kit/ROADMAP.md).

## Quick start

You need Node 22 and pnpm 10.

```sh
pnpm install
pnpm verify                # lint, typecheck, tests, register lint, kit check
OPS_PASSWORD=dev pnpm --filter @01/web dev
```

Open <http://localhost:3000>. The operator page is <http://localhost:3000/ops/unknowns>. Any user name works; the password is the value of `OPS_PASSWORD`. Without `OPS_PASSWORD` the page returns 404.

| Command | Does |
|---|---|
| `pnpm verify` | Full health gate. Must pass before every push |
| `pnpm lint` / `pnpm format` | Biome check / fix |
| `pnpm unknowns:lint` | Validates the register against its rules |
| `pnpm unknowns:report` | Counts by field, domain, and severity; blockers by phase; stale facts |
| `pnpm unknowns:issues` | Drafts GitHub issues for open critical and high items |
| `pnpm unknowns:link <ID> <n>` | Stores an issue number on a register item |

## What we do not know

Open questions live in [`register.yaml`](agent-kit/unknowns/register.yaml): 105 items across 15 domains, each with an owner, a severity, and a `done_when` line. The method is in [`knowledge-map.md`](agent-kit/unknowns/evidence/knowledge-map.md). A critical item blocks its phase. Legal items close only with a lawyer's written answer.

## Feedback and automation

Feedback becomes a GitHub issue through one of five forms: Feedback, Surprise, Unknown, Bug, Roadmap request. A scheduled routine triages each issue, links it to register items, and opens a pull request. Another routine ships one roadmap item a week. The prompts are in [`ROUTINES.md`](agent-kit/ROUTINES.md).

## For agents

Read [`agent-kit/ROUTING.md`](agent-kit/ROUTING.md) first. The binding contract is [`agent-kit/AGENTS.md`](agent-kit/AGENTS.md). Run `pnpm verify` before every push.

## Security

Report vulnerabilities through [GitHub Security Advisories](https://github.com/reagent-systems/01/security/advisories/new). Never open a public issue for one. See [`SECURITY.md`](agent-kit/SECURITY.md).

---

Built by Reagent Systems.
