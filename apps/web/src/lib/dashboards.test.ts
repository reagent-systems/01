import { describe, expect, it } from "vitest";
import {
  buyerAction,
  buyerStateText,
  byDue,
  day,
  designerAction,
  money,
  sample,
  shopAction,
} from "./dashboards";

const [waiting, shipped] = sample.buyer.orders;
const [open, reached, fixes] = sample.designer.designs;

describe("buyer rows", () => {
  it("says the state in plain words", () => {
    expect(buyerStateText(waiting!)).toBe("Waiting for 38 more buyers");
    expect(buyerStateText({ ...waiting!, needed: 1 })).toBe("Waiting for 1 more buyer");
    expect(buyerStateText({ ...waiting!, state: "production" })).toBe("In production");
  });
  it("offers Leave before the run and Track after shipping", () => {
    expect(buyerAction(waiting!)).toBe("Leave");
    expect(buyerAction({ ...waiting!, state: "production" })).toBeNull();
    expect(buyerAction(shipped!)).toBe("Track");
    expect(buyerAction({ ...shipped!, state: "delivered" })).toBe("Track");
  });
});

describe("designer rows", () => {
  it("shows Start run only once the waitlist reaches the trigger", () => {
    expect(designerAction(open!)).toBe("Share");
    expect(designerAction({ ...open!, waitlist: 99 })).toBe("Share");
    expect(designerAction({ ...open!, waitlist: 100 })).toBe("Start run");
    expect(designerAction(reached!)).toBe("Start run");
  });
  it("never shows Start run outside an open waitlist", () => {
    expect(designerAction({ ...fixes!, waitlist: 999 })).toBe("Fix");
    expect(designerAction({ ...open!, state: "production", waitlist: 999 })).toBe("View run");
  });
});

describe("shop rows", () => {
  it("maps each state to one action", () => {
    const [offered, inProgress] = sample.shop.jobs;
    expect(shopAction(offered!)).toBe("Accept");
    expect(shopAction({ ...offered!, state: "accepted" })).toBe("Start");
    expect(shopAction(inProgress!)).toBe("Ship");
    expect(shopAction({ ...inProgress!, state: "shipped" })).toBe("Report a problem");
  });
  it("sorts by due date", () => {
    expect(byDue(sample.shop.jobs).map((j) => j.id)).toEqual(["j2", "j1"]);
  });
});

describe("formatting", () => {
  it("formats cents and days", () => {
    expect(money(9900)).toBe("$99.00");
    expect(day("2026-12-15")).toBe("Dec 15");
  });
});
