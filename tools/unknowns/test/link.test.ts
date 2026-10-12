import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, it } from "vitest";
import { linkIssue } from "../src/link";

it("sets the issue number, keeps comments, and appends history", () => {
  const file = join(mkdtempSync(join(tmpdir(), "reg-")), "register.yaml");
  writeFileSync(
    file,
    "# keep me\n- id: PAY-01\n  updated: 2026-10-01\n  history:\n    - {date: 2026-10-01, change: opened, by: agent}\n",
  );
  linkIssue(file, "PAY-01", 7, "2026-10-12");
  const out = readFileSync(file, "utf8");
  expect(out).toContain("# keep me");
  expect(out).toContain("issue: 7");
  expect(out).toContain("Linked GitHub issue #7");
  expect(() => linkIssue(file, "NOPE-01", 1, "2026-10-12")).toThrow("No register item");
});
