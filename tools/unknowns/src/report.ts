import { DOMAINS, FIELDS, type Item, isOpen, SEVERITIES } from "./schema";

export interface Report {
  asOf: string;
  total: number;
  byField: Record<string, number>;
  bySeverity: Record<string, number>;
  /** domain -> field -> count */
  grid: Record<string, Record<string, number>>;
  /** phase -> open critical items that block it */
  blockers: Record<number, string[]>;
  stale: string[];
  openCritical: number;
  openHigh: number;
  /** Items found in the last 7 days that did not come from the seed. */
  surprises7d: number;
}

const addDays = (date: string, days: number): string => {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};

export function buildReport(items: Item[], asOf: string): Report {
  const byField: Record<string, number> = Object.fromEntries(FIELDS.map((f) => [f, 0]));
  const bySeverity: Record<string, number> = Object.fromEntries(SEVERITIES.map((s) => [s, 0]));
  const grid: Record<string, Record<string, number>> = {};
  for (const name of Object.values(DOMAINS)) {
    grid[name] = Object.fromEntries(FIELDS.map((f) => [f, 0]));
  }
  const blockers: Record<number, string[]> = {};
  const stale: string[] = [];
  const weekAgo = addDays(asOf, -7);
  let openCritical = 0;
  let openHigh = 0;
  let surprises7d = 0;

  for (const i of items) {
    byField[i.field] = (byField[i.field] ?? 0) + 1;
    const row = grid[i.domain] ?? {};
    row[i.field] = (row[i.field] ?? 0) + 1;
    grid[i.domain] = row;
    if (isOpen(i)) {
      bySeverity[i.severity] = (bySeverity[i.severity] ?? 0) + 1;
      if (i.severity === "critical") {
        openCritical++;
        if (i.blocks_phase !== null) {
          blockers[i.blocks_phase] = [...(blockers[i.blocks_phase] ?? []), i.id];
        }
      }
      if (i.severity === "high") openHigh++;
    }
    if (i.field === "KK" && i.recheck_every) {
      const days = Number.parseInt(i.recheck_every, 10);
      if (addDays(i.updated, days) <= asOf) stale.push(i.id);
    }
    if (i.origin !== undefined && i.origin !== "seed" && i.opened > weekAgo) surprises7d++;
  }
  return {
    asOf,
    total: items.length,
    byField,
    bySeverity,
    grid,
    blockers,
    stale,
    openCritical,
    openHigh,
    surprises7d,
  };
}

export function renderReport(r: Report): string {
  const lines: string[] = [];
  lines.push(`Register as of ${r.asOf}: ${r.total} items`);
  lines.push(`By field:    ${FIELDS.map((f) => `${f} ${r.byField[f]}`).join("  ")}`);
  lines.push(`Open by severity: ${SEVERITIES.map((s) => `${s} ${r.bySeverity[s]}`).join("  ")}`);
  lines.push(`Surprise rate (new non-seed items, 7 days): ${r.surprises7d}`);
  lines.push("", "Coverage (domain x field)");
  for (const [domain, row] of Object.entries(r.grid)) {
    lines.push(
      `  ${domain.padEnd(14)} ${FIELDS.map((f) => `${f} ${String(row[f] ?? 0).padStart(2)}`).join("  ")}`,
    );
  }
  lines.push("", "Open critical items by blocked phase");
  const phases = Object.keys(r.blockers)
    .map(Number)
    .sort((a, b) => a - b);
  if (phases.length === 0) lines.push("  none");
  for (const p of phases) lines.push(`  Phase ${p}: ${(r.blockers[p] ?? []).join(", ")}`);
  lines.push(
    "",
    `Stale KKs past their re-check date: ${r.stale.length ? r.stale.join(", ") : "none"}`,
  );
  return lines.join("\n");
}

export const metricsHeader = "date,open_critical,open_high,surprise_rate_7d,total_items";

export const metricsRow = (r: Report): string =>
  [r.asOf, r.openCritical, r.openHigh, r.surprises7d, r.total].join(",");
