import { buildReport, loadRegister } from "@01/unknowns";
import { describe, expect, it } from "vitest";
import { items, registerReport } from "./register-view";

describe("register view", () => {
  it("serves exactly the register on disk", () => {
    expect(items).toEqual(loadRegister());
  });

  it("reports the same counts as pnpm unknowns:report", () => {
    expect(registerReport("2026-10-12")).toEqual(buildReport(loadRegister(), "2026-10-12"));
  });
});
