import { type Item, isOpen } from "./schema";

export interface IssueDraft {
  id: string;
  title: string;
  body: string;
  labels: string[];
}

const trim = (s: string, n = 80) => (s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s);

/** Open critical and high items that have no GitHub issue yet. */
export function issueDrafts(items: Item[]): IssueDraft[] {
  return items
    .filter((i) => isOpen(i) && i.issue === undefined && ["critical", "high"].includes(i.severity))
    .map((i) => {
      const statement = i.statement.replace(/\s+/g, " ").trim();
      const labels = ["unknown", `domain:${i.domain}`, `severity:${i.severity}`];
      if (i.blocks_phase !== null) labels.push(`phase:${i.blocks_phase}`);
      const body = [
        `Register item **${i.id}** (${i.field}, ${i.severity}).`,
        "",
        statement,
        "",
        `- Owner: ${i.owner}`,
        `- Resolve by: ${i.resolve_by}`,
        `- Blocks phase: ${i.blocks_phase ?? "none"}`,
        `- Next action: ${i.next_action}`,
        `- Done when: ${i.done_when}`,
        "",
        "Source of truth: `agent-kit/unknowns/register.yaml`. Link this issue with",
        `\`pnpm unknowns:link ${i.id} <issue number>\`. Close the issue only when the register item closes.`,
      ].join("\n");
      return { id: i.id, title: `[${i.id}] ${trim(statement)}`, body, labels };
    });
}
