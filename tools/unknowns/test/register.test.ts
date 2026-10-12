import { describe, expect, it } from "vitest";
import { issueDrafts } from "../src/issues";
import { lintRegister } from "../src/lint";
import { loadRegister, REGISTER_PATH, UNKNOWNS_DIR } from "../src/load";
import { buildReport } from "../src/report";
import type { Item } from "../src/schema";

const base: Item = {
  id: "PAY-99",
  field: "KU",
  domain: "payments",
  statement: "Who absorbs late chargebacks?",
  severity: "critical",
  blocks_phase: 6,
  confidence: 0.2,
  current_answer: null,
  evidence: [],
  resolve_by: "research+legal",
  owner: "agent",
  next_action: "Read the docs.",
  done_when: "A written rule exists.",
  opened: "2026-10-01",
  updated: "2026-10-01",
  history: [{ date: "2026-10-01", change: "opened", by: "agent" }],
};
const lint = (items: Item[], exists = () => true) => lintRegister(items, { baseDir: "/x", exists });

describe("the committed register", () => {
  it("passes lint", () => {
    expect(lintRegister(loadRegister(REGISTER_PATH), { baseDir: UNKNOWNS_DIR })).toEqual([]);
  });
});

describe("lintRegister", () => {
  it("accepts a valid open item", () => {
    expect(lint([base])).toEqual([]);
  });

  it("rejects a duplicate id and a wrong domain", () => {
    const errors = lint([base, { ...base, domain: "legal" }]);
    expect(errors).toContain("PAY-99: duplicate id");
    expect(errors).toContain("PAY-99: domain must be payments");
  });

  it("requires owner and done_when", () => {
    const errors = lint([{ ...base, owner: "", done_when: " " }]);
    expect(errors.join("\n")).toMatch(/owner is required/);
    expect(errors.join("\n")).toMatch(/done_when is required/);
  });

  it("requires evidence and a re-check date on a KK", () => {
    const errors = lint([{ ...base, field: "KK", resolve_by: "research" }]);
    expect(errors.join("\n")).toMatch(/needs evidence/);
    expect(errors.join("\n")).toMatch(/recheck_every/);
  });

  it("flags evidence files that do not exist", () => {
    const item = {
      ...base,
      field: "KK" as const,
      resolve_by: "research",
      recheck_every: "90d",
      evidence: ["evidence/a.md"],
    };
    expect(lint([item], () => false).join("\n")).toMatch(/evidence file missing/);
    expect(lint([item])).toEqual([]);
  });

  it("closes a legal item only with a lawyer answer", () => {
    const item = {
      ...base,
      field: "KK" as const,
      recheck_every: "90d",
      evidence: ["evidence/a.md"],
    };
    expect(lint([item]).join("\n")).toMatch(/lawyer_answer/);
    expect(lint([{ ...item, lawyer_answer: "evidence/answer.pdf" }])).toEqual([]);
  });

  it("requires a limit and review date on an accepted risk", () => {
    const errors = lint([{ ...base, field: "ACCEPTED" }]);
    expect(errors.join("\n")).toMatch(/accepted_limit/);
    expect(errors.join("\n")).toMatch(/review_by/);
  });

  it("rejects a bad id, phase, and issue number", () => {
    expect(lint([{ ...base, id: "pay7" }])[0]).toMatch(/id must look like/);
    expect(lint([{ ...base, blocks_phase: 9 }]).join("\n")).toMatch(/blocks_phase/);
    expect(lint([{ ...base, issue: 0 }]).join("\n")).toMatch(/issue must be/);
  });
});

describe("buildReport", () => {
  const items: Item[] = [
    base,
    {
      ...base,
      id: "PAY-98",
      severity: "high",
      blocks_phase: null,
      origin: "surprise",
      opened: "2026-10-10",
      updated: "2026-10-10",
    },
    {
      ...base,
      id: "PAY-97",
      field: "KK",
      recheck_every: "10d",
      evidence: ["e"],
      resolve_by: "research",
    },
  ];

  it("counts open items and phase blockers", () => {
    const r = buildReport(items, "2026-10-12");
    expect(r.openCritical).toBe(1);
    expect(r.openHigh).toBe(1);
    expect(r.blockers[6]).toEqual(["PAY-99"]);
    expect(r.byField.KK).toBe(1);
    expect(r.grid.payments?.KU).toBe(2);
  });

  it("lists stale KKs and counts recent non-seed items", () => {
    const r = buildReport(items, "2026-10-12");
    expect(r.stale).toEqual(["PAY-97"]);
    expect(r.surprises7d).toBe(1);
    expect(buildReport(items, "2026-10-12").surprises7d).toBe(1);
    expect(buildReport(items, "2026-11-30").surprises7d).toBe(0);
  });
});

describe("issueDrafts", () => {
  it("drafts issues for open critical and high items without a link", () => {
    const drafts = issueDrafts([
      base,
      { ...base, id: "PAY-98", issue: 12 },
      { ...base, id: "PAY-97", severity: "medium" },
      { ...base, id: "PAY-96", field: "KK" },
    ]);
    expect(drafts.map((d) => d.id)).toEqual(["PAY-99"]);
    expect(drafts[0]?.labels).toEqual([
      "unknown",
      "domain:payments",
      "severity:critical",
      "phase:6",
    ]);
    expect(drafts[0]?.title).toMatch(/^\[PAY-99\]/);
  });
});
