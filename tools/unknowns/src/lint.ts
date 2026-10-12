import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { DOMAINS, FIELDS, type Item, METHODS, ORIGINS, SEVERITIES } from "./schema";

const DATE = /^\d{4}-\d{2}-\d{2}$/;
const ID = /^([A-Z]+)-(\d{2})$/;
const DURATION = /^\d+d$/;

const nonEmpty = (v: unknown): v is string => typeof v === "string" && v.trim() !== "";

export interface LintOptions {
  /** Directory that evidence paths resolve against. */
  baseDir: string;
  /** Overrides existsSync, for tests. */
  exists?: (path: string) => boolean;
}

/** Returns one message per violation of knowledge-map.md section 2.3. */
export function lintRegister(items: Item[], opts: LintOptions): string[] {
  const errors: string[] = [];
  const exists = opts.exists ?? existsSync;
  const seen = new Set<string>();
  const prefixes = new Set(Object.keys(DOMAINS));

  for (const item of items) {
    const at = (msg: string) => errors.push(`${item.id ?? "?"}: ${msg}`);
    const m = ID.exec(item.id ?? "");
    if (!m) {
      at("id must look like PAY-07");
      continue;
    }
    if (seen.has(item.id)) at("duplicate id");
    seen.add(item.id);
    const prefix = m[1] as string;
    if (!prefixes.has(prefix)) at(`unknown domain code ${prefix}`);
    else if (DOMAINS[prefix] !== item.domain) at(`domain must be ${DOMAINS[prefix]}`);

    if (!(FIELDS as readonly string[]).includes(item.field)) at(`field must be one of ${FIELDS}`);
    if (!(SEVERITIES as readonly string[]).includes(item.severity)) at("invalid severity");
    if (!nonEmpty(item.statement)) at("statement is empty");
    if (!nonEmpty(item.owner)) at("owner is required (rule 1)");
    if (!nonEmpty(item.done_when)) at("done_when is required (rule 1)");
    if (!nonEmpty(item.next_action)) at("next_action is required");
    if (typeof item.confidence !== "number" || item.confidence < 0 || item.confidence > 1)
      at("confidence must be 0 to 1");
    if (
      item.blocks_phase !== null &&
      !(Number.isInteger(item.blocks_phase) && item.blocks_phase >= 1 && item.blocks_phase <= 8)
    )
      at("blocks_phase must be 1 to 8 or null");
    if (!DATE.test(item.opened ?? "") || !DATE.test(item.updated ?? ""))
      at("dates must be YYYY-MM-DD");
    else if (item.updated < item.opened) at("updated is before opened");
    if (!Array.isArray(item.evidence)) at("evidence must be a list");
    if (!Array.isArray(item.history) || item.history.length === 0)
      at("history needs at least one entry");
    if (item.origin !== undefined && !(ORIGINS as readonly string[]).includes(item.origin))
      at(`origin must be one of ${ORIGINS}`);
    if (item.issue !== undefined && !(Number.isInteger(item.issue) && item.issue > 0))
      at("issue must be a positive integer");

    const methods = String(item.resolve_by ?? "").split("+");
    if (!methods.every((x) => (METHODS as readonly string[]).includes(x)))
      at(`resolve_by must join values of ${METHODS} with +`);

    for (const ev of item.evidence ?? []) {
      if (/^https?:\/\//.test(ev)) continue;
      if (!exists(resolve(opts.baseDir, ev))) at(`evidence file missing: ${ev}`);
    }

    if (item.field === "KK") {
      if ((item.evidence ?? []).length === 0) at("a KK needs evidence (rule 2)");
      if (!DURATION.test(item.recheck_every ?? "")) at("a KK needs recheck_every like 90d");
      if (methods.includes("legal")) {
        if (!nonEmpty(item.lawyer_answer) || !exists(resolve(opts.baseDir, item.lawyer_answer)))
          at("a legal item closes only with a saved lawyer_answer (rule 7)");
      }
    }
    if (item.field === "ACCEPTED") {
      if (!nonEmpty(item.accepted_limit)) at("ACCEPTED needs accepted_limit (rule 5)");
      if (!DATE.test(item.review_by ?? "")) at("ACCEPTED needs review_by (rule 5)");
    }
  }
  return errors;
}
