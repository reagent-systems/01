import { describe, expect, it } from "vitest";
import { questionsFor, summarize, TOTAL_STEPS } from "./onboarding";

describe("onboarding", () => {
  it("has the same number of screens for every role, contact included", () => {
    for (const role of ["designer", "buyer", "shop", "looking"] as const) {
      expect(questionsFor(role).length + 1).toBe(TOTAL_STEPS);
    }
  });

  it("asks only the role question until a role is chosen", () => {
    expect(questionsFor(null).map((q) => q.id)).toEqual(["role"]);
  });

  it("gives every option a unique value within its question", () => {
    for (const role of ["designer", "buyer", "shop", "looking"] as const) {
      for (const q of questionsFor(role)) {
        const values = q.options.map((o) => o.value);
        expect(new Set(values).size).toBe(values.length);
      }
    }
  });

  it("summarizes answers in words, multi-select included", () => {
    const text = summarize({
      role: "shop",
      processes: ["cnc-machining", "sheet-metal"],
      size: "solo",
    });
    expect(text).toContain("I run a shop");
    expect(text).toContain("CNC Machining, Sheet Metal");
    expect(text).toContain("Just me");
  });
});
