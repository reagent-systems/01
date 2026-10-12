import { readFileSync, writeFileSync } from "node:fs";
import { parseDocument } from "yaml";

/** Sets `issue` on one item and adds a history entry. Keeps the file's formatting. */
export function linkIssue(path: string, id: string, issue: number, today: string): void {
  const doc = parseDocument(readFileSync(path, "utf8"));
  const items = doc.contents as unknown as { items: { get(k: string): unknown }[] };
  const node = items.items.find((n) => n.get("id") === id) as
    | { set(k: string, v: unknown): void; get(k: string, keep?: boolean): unknown }
    | undefined;
  if (!node) throw new Error(`No register item ${id}`);
  node.set("issue", issue);
  node.set("updated", today);
  const history = node.get("history", true) as { add(v: unknown): void };
  history.add(
    doc.createNode({ date: today, change: `Linked GitHub issue #${issue}`, by: "agent" }),
  );
  writeFileSync(path, doc.toString({ lineWidth: 100 }));
}
