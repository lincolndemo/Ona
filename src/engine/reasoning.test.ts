import { describe, it, expect } from "vitest";
import { topMatch } from "./match";
import { buildReasoning } from "./reasoning";
import { ENGINEER, TEACHER } from "./fixtures";

function sentenceCount(text: string): number {
  return text.split(".").filter((s) => s.trim().length > 0).length;
}

describe("reasoning", () => {
  it("produces a non-empty paragraph of at most three sentences", () => {
    const scored = topMatch(ENGINEER);
    const text = buildReasoning(ENGINEER, scored);
    expect(text.length).toBeGreaterThan(0);
    expect(sentenceCount(text)).toBeLessThanOrEqual(3);
  });

  it("uses the correct article (an engineer, not a engineer)", () => {
    const scored = topMatch(ENGINEER);
    const text = buildReasoning(ENGINEER, scored);
    expect(text).toContain("an engineer");
    expect(text).not.toContain("a engineer");
  });

  it("names the work the person said they enjoy", () => {
    const scored = topMatch(TEACHER);
    const text = buildReasoning(TEACHER, scored);
    expect(text.toLowerCase()).toContain("teaching others");
  });
});
