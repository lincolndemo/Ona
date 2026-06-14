import { describe, it, expect } from "vitest";
import { topMatch } from "./match";
import { explainMatch } from "./breakdown";
import { WEIGHTS } from "../data/weights";
import { ENGINEER, TEACHER } from "./fixtures";

describe("match breakdown", () => {
  it("returns all six weighted dimensions, each with a note", () => {
    const scored = topMatch(ENGINEER);
    const items = explainMatch(ENGINEER, scored);
    expect(items).toHaveLength(Object.keys(WEIGHTS).length);
    for (const item of items) {
      expect(item.note.length).toBeGreaterThan(0);
      expect(item.score).toBeGreaterThanOrEqual(0);
      expect(item.score).toBeLessThanOrEqual(1);
      expect(item.weight).toBeGreaterThan(0);
    }
  });

  it("orders dimensions by contribution (weight × score), highest first", () => {
    const scored = topMatch(ENGINEER);
    const items = explainMatch(ENGINEER, scored);
    for (let i = 1; i < items.length; i++) {
      const prev = items[i - 1].weight * items[i - 1].score;
      const cur = items[i].weight * items[i].score;
      expect(prev).toBeGreaterThanOrEqual(cur);
    }
  });

  it("matches the sub-scores the engine actually used", () => {
    const scored = topMatch(TEACHER);
    const items = explainMatch(TEACHER, scored);
    for (const item of items) {
      expect(item.score).toBe(scored.subScores[item.key]);
    }
  });
});
