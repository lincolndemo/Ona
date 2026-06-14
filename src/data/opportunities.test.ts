import { describe, it, expect } from "vitest";
import { OPPORTUNITIES, filterOpportunities } from "./opportunities";

describe("opportunity directory", () => {
  it("every entry has a valid https url and a known type", () => {
    const types = new Set([
      "job",
      "remote",
      "freelance",
      "scholarship",
      "internship",
      "certification",
    ]);
    for (const o of OPPORTUNITIES) {
      expect(o.url).toMatch(/^https:\/\//);
      expect(types.has(o.type)).toBe(true);
    }
  });

  it("filters by category", () => {
    const certs = filterOpportunities("certification");
    expect(certs.length).toBeGreaterThan(0);
    expect(certs.every((o) => o.type === "certification")).toBe(true);
  });

  it("keeps general and career-relevant entries when filtering by career", () => {
    const forCloud = filterOpportunities("all", "cloud_engineer");
    // No entry that is specific to other careers only should appear.
    for (const o of forCloud) {
      expect(o.careers.length === 0 || o.careers.includes("cloud_engineer")).toBe(true);
    }
  });

  it("lists career-specific entries before general ones", () => {
    const forSecurity = filterOpportunities("certification", "cybersecurity_analyst");
    const firstGeneralIndex = forSecurity.findIndex((o) => o.careers.length === 0);
    const lastSpecificIndex = forSecurity
      .map((o) => o.careers.includes("cybersecurity_analyst"))
      .lastIndexOf(true);
    if (firstGeneralIndex !== -1 && lastSpecificIndex !== -1) {
      expect(lastSpecificIndex).toBeLessThan(firstGeneralIndex);
    }
  });
});
