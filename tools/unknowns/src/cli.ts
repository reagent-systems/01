import { appendFileSync, existsSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { issueDrafts } from "./issues";
import { linkIssue } from "./link";
import { lintRegister } from "./lint";
import { loadRegister, REGISTER_PATH, UNKNOWNS_DIR } from "./load";
import { buildReport, metricsHeader, metricsRow, renderReport } from "./report";

const today = () => new Date().toISOString().slice(0, 10);
const [cmd, ...args] = process.argv.slice(2);

function main(): number {
  switch (cmd) {
    case "lint": {
      const items = loadRegister();
      const errors = lintRegister(items, { baseDir: UNKNOWNS_DIR });
      for (const e of errors) console.error(e);
      console.log(`${items.length} items, ${errors.length} errors`);
      return errors.length === 0 ? 0 : 1;
    }
    case "report": {
      const r = buildReport(loadRegister(), today());
      console.log(args.includes("--json") ? JSON.stringify(r, null, 2) : renderReport(r));
      if (args.includes("--record")) {
        const file = resolve(UNKNOWNS_DIR, "metrics.csv");
        if (!existsSync(file)) writeFileSync(file, `${metricsHeader}\n`);
        appendFileSync(file, `${metricsRow(r)}\n`);
      }
      return 0;
    }
    case "issues": {
      console.log(JSON.stringify(issueDrafts(loadRegister()), null, 2));
      return 0;
    }
    case "link": {
      const [id, n] = args;
      const issue = Number(n);
      if (!id || !Number.isInteger(issue) || issue < 1) {
        console.error("usage: link <ITEM-ID> <issue number>");
        return 2;
      }
      linkIssue(REGISTER_PATH, id, issue, today());
      console.log(`${id} -> #${issue}`);
      return 0;
    }
    default:
      console.error("usage: cli.ts lint | report [--json] [--record] | issues | link <ID> <n>");
      return 2;
  }
}

process.exitCode = main();
