import { describe, expect, it } from "vitest";
import { isOperator } from "./ops-auth";

const basic = (user: string, pass: string) => `Basic ${btoa(`${user}:${pass}`)}`;

describe("isOperator", () => {
  it("accepts the right password under any user name", () => {
    expect(isOperator(basic("kyle", "s3cret"), "s3cret")).toBe(true);
    expect(isOperator(basic("", "s3cret"), "s3cret")).toBe(true);
  });

  it("keeps colons inside the password", () => {
    expect(isOperator(basic("a", "p:w"), "p:w")).toBe(true);
  });

  it("rejects a wrong password, a missing header, bad base64, and a missing config", () => {
    expect(isOperator(basic("a", "nope"), "s3cret")).toBe(false);
    expect(isOperator(null, "s3cret")).toBe(false);
    expect(isOperator("Basic %%%", "s3cret")).toBe(false);
    expect(isOperator("Bearer x", "s3cret")).toBe(false);
    expect(isOperator(basic("a", ""), undefined)).toBe(false);
    expect(isOperator(basic("a", ""), "")).toBe(false);
  });
});
