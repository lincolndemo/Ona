import { describe, it, expect } from "vitest";
import { CAREERS } from "../data/careers";
import { rankCareers, scoreCareer, topMatch } from "./match";
import { roleScore } from "./profile";
import { answers, ENGINEER, TEACHER } from "./fixtures";

describe("matching engine", () => {
  it("is deterministic: same answers always give the same result", () => {
    const a = topMatch(ENGINEER);
    const b = topMatch(ENGINEER);
    expect(a.career.id).toBe(b.career.id);
    expect(a.total).toBe(b.total);
  });

  it("returns exactly one top career, and it is the highest scored", () => {
    const ranked = rankCareers(ENGINEER);
    expect(ranked[0].career.id).toBe(topMatch(ENGINEER).career.id);
    for (let i = 1; i < ranked.length; i++) {
      expect(ranked[i - 1].total).toBeGreaterThanOrEqual(ranked[i].total);
    }
  });

  it("ranks every career in the library", () => {
    expect(rankCareers(ENGINEER)).toHaveLength(CAREERS.length);
  });

  it("matches a teacher who wants to teach to the AI Trainer path", () => {
    expect(topMatch(TEACHER).career.id).toBe("ai_trainer");
  });

  it("matches a builder with time to the Software Developer path", () => {
    expect(topMatch(ENGINEER).career.id).toBe("software_developer");
  });

  it("keeps every total score within 0..1", () => {
    for (const career of CAREERS) {
      const { total } = scoreCareer(ENGINEER, career);
      expect(total).toBeGreaterThanOrEqual(0);
      expect(total).toBeLessThanOrEqual(1);
    }
  });

  it("scores role orientation: exact=1, hybrid=0.7, clash=0.2", () => {
    const tech = CAREERS.find((c) => c.id === "software_developer")!; // technical
    const hybrid = CAREERS.find((c) => c.id === "business_analyst")!; // hybrid
    const nonTech = CAREERS.find((c) => c.id === "product_manager")!; // non_technical

    expect(roleScore(answers({ rolePreference: "technical" }), tech)).toBe(1.0);
    expect(roleScore(answers({ rolePreference: "technical" }), hybrid)).toBe(0.7);
    expect(roleScore(answers({ rolePreference: "technical" }), nonTech)).toBe(0.2);
  });
});
