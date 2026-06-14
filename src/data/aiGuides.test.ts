import { describe, it, expect } from "vitest";
import { CAREERS } from "./careers";
import { aiGuideFor } from "./aiGuides";

describe("AI guides", () => {
  it("provides a complete guide for every career", () => {
    for (const career of CAREERS) {
      const g = aiGuideFor(career.id);
      expect(g.careerId).toBe(career.id);
      expect(g.role.length).toBeGreaterThan(0);
      expect(g.uses.length).toBeGreaterThanOrEqual(3);
      expect(g.learn.length).toBeGreaterThanOrEqual(2);
      expect(g.caution.length).toBeGreaterThan(0);
    }
  });

  it("gives learn items valid resource links where present", () => {
    for (const career of CAREERS) {
      for (const item of aiGuideFor(career.id).learn) {
        expect(item.skill.length).toBeGreaterThan(0);
        expect(item.why.length).toBeGreaterThan(0);
        if (item.resource) expect(item.resource.url).toMatch(/^https?:\/\//);
      }
    }
  });

  it("falls back gracefully for an unknown career", () => {
    const g = aiGuideFor("does_not_exist");
    expect(g.careerId).toBe("does_not_exist");
    expect(g.uses.length).toBeGreaterThan(0);
  });
});
