import { describe, it, expect } from "vitest";
import { CAREERS } from "../data/careers";
import { buildCurriculum } from "./curriculum";

describe("curriculum", () => {
  it("provides an authored curriculum for every career", () => {
    for (const career of CAREERS) {
      const c = buildCurriculum(career);
      expect(c.careerId).toBe(career.id);
      expect(c.intro.length).toBeGreaterThan(0);
      expect(c.modules.length).toBeGreaterThanOrEqual(4);
    }
  });

  it("gives every module topics, a project, and valid resource links", () => {
    for (const career of CAREERS) {
      for (const m of buildCurriculum(career).modules) {
        expect(m.title.length).toBeGreaterThan(0);
        expect(m.topics.length).toBeGreaterThan(0);
        expect(m.project.length).toBeGreaterThan(0);
        for (const r of m.resources) {
          expect(r.url).toMatch(/^https?:\/\//);
        }
      }
    }
  });

  it("breaks the developer path into front-end, back-end and mobile tracks", () => {
    const dev = CAREERS.find((c) => c.id === "software_developer")!;
    const moduleWithTracks = buildCurriculum(dev).modules.find((m) => m.tracks);
    expect(moduleWithTracks).toBeDefined();
    const names = moduleWithTracks!.tracks!.map((t) => t.name.toLowerCase());
    expect(names.some((n) => n.includes("front-end"))).toBe(true);
    expect(names.some((n) => n.includes("back-end"))).toBe(true);
    expect(names.some((n) => n.includes("mobile"))).toBe(true);
  });

  it("names multiple languages for the developer, not just Python", () => {
    const dev = CAREERS.find((c) => c.id === "software_developer")!;
    const text = JSON.stringify(buildCurriculum(dev));
    for (const lang of ["JavaScript", "TypeScript", "Java", "Kotlin", "Swift", "Dart"]) {
      expect(text).toContain(lang);
    }
  });

  it("is deterministic", () => {
    const dev = CAREERS.find((c) => c.id === "software_developer")!;
    expect(buildCurriculum(dev)).toEqual(buildCurriculum(dev));
  });
});
