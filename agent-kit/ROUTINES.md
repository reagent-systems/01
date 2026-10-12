# ROUTINES.md — scheduled agent work and the feedback-to-issue loop

A routine is a saved prompt that fires on a schedule and starts a fresh
agent session in this repo. Each prompt is short. The intelligence lives in
the kit files, so a routine points at them. Create a routine from
claude.ai/code/routines or ask an agent to create it with the prompts below.

Every routine session starts with `.claude/hooks/session-start.sh`, which
runs `pnpm install`. Every routine ends by running `pnpm verify` and
reporting in `TONE.md` voice. A routine never posts publicly, spends money,
merges to `main`, or closes a legal item.

## How feedback becomes issues

1. Anyone files an issue from a form: **Feedback**, **Surprise**, **Unknown**, **Bug**, or **Roadmap request**. Each form adds `needs-triage`.
2. The `feedback-triage` routine reads every open issue with `needs-triage`.
3. For each issue it decides one outcome and comments the result, naming the IDs:

| Issue is | Action | Labels on the issue |
|---|---|---|
| A surprise | Append an entry to `unknowns/surprises.md`, then convert it to a register item | `surprise`, `unknown` |
| A question or blind spot | Add a register item (`origin: issue`, `issue: <n>`) with owner, `done_when`, severity | `unknown`, `domain:*`, `severity:*` |
| Evidence about an existing item | Add the file to `unknowns/evidence/`, update the item's history and confidence | `unknown` |
| A feature request | Add it to `ROADMAP.md` "Later", or the queue if it has a one-sentence promise and a use case | `roadmap` |
| A bug | Label `bug`; ask for steps if missing (`needs-repro`) | `bug` |
| A vulnerability | Stop. Do not discuss it in public. Tell the human | `security` |

4. It removes `needs-triage` and adds `accepted`, `needs-repro`, or `wontfix` with one sentence of why. It never closes an issue silently.
5. Register changes go on a branch `triage/<date>` and one pull request. The PR body lists each issue and the IDs it touched. The PR carries `Closes #n` only when the issue is fully handled.
6. The register points back: item field `issue: <n>`. Every open critical and high item has an issue. Run `pnpm unknowns:issues` for the missing ones, file each with the GitHub tools (title, body, labels from the draft), then `pnpm unknowns:link <ID> <n>`.

A register item and its issue close together. A legal item closes only with a lawyer's written answer.

## The routines

Create each as a fresh session per run, in this repo's environment.

### feedback-triage — weekdays

```
Run the feedback-triage routine in agent-kit/ROUTINES.md for reagent-systems/01.
Triage every open issue labeled needs-triage. Obey agent-kit/AGENTS.md and TONE.md.
Open one PR on branch triage/<today>. Do not merge.
```

Suggested schedule: `CRON_TZ=<your zone> 47 8 * * 1-5`.

### weekly-cycle — Mondays

```
Run the weekly cycle in agent-kit/WEEKLY.md for reagent-systems/01.
Take the top unblocked item in agent-kit/ROADMAP.md. Stop at the PR; do not merge or tag.
If the queue is empty or blocked, refill it and report why.
```

Suggested schedule: `CRON_TZ=<your zone> 3 9 * * 1`. Runs after the triage routine has merged or left its PR open.

### unknowns-weekly — Fridays

```
Run the weekly unknowns loop from agent-kit/unknowns/evidence/knowledge-map.md section 3
for reagent-systems/01. Steps: run pnpm unknowns:report --record; pick the top five open items
by severity and phase proximity and write next actions; run one discovery method from section 4
against one search zone, rotating zones; re-check every stale KK; convert new entries in
unknowns/surprises.md to items; file issues for critical and high items that lack one.
Open one PR on branch unknowns/<today>. Do not close legal items.
```

Suggested schedule: `CRON_TZ=<your zone> 21 15 * * 5`.

### ci-watch — optional, daily

```
List open issues labeled ci-failure in reagent-systems/01. Reproduce with pnpm verify on main.
Fix the cause on a branch and open a PR. If it cannot be reproduced, comment with the run link
and the output. Do not skip or quarantine a test.
```

The nightly workflow files one `ci-failure` + `needs-triage` issue when `pnpm verify` fails on `main`.

## Rules for every routine

- Read `agent-kit/ROUTING.md` first. Follow the file it names.
- One PR per run. Branch from `main`. `pnpm verify` green before push.
- Update `STATUS.md`, `DEVLOG.md`, and the register in the same PR as the change.
- Report to the human only what needs them: a blocker, a decision, a legal flag.
- Issue and PR bodies end with the Claude attribution footer.
