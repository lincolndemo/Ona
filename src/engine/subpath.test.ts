import { describe, it, expect } from "vitest";
import { CAREERS } from "../data/careers";
import { subPathsFor } from "../data/subpaths";
import { pickSubPath, rankSubPaths, subPathReason } from "./subpath";
import { buildCurriculum } from "./curriculum";
import { answers } from "./fixtures";

const dev = CAREERS.find((c) => c.id === "software_developer")!;
const dataAnalyst = CAREERS.find((c) => c.id === "data_analyst")!;

describe("sub-path picker", () => {
  it("authors at least one sub-path for every career", () => {
    for (const career of CAREERS) {
      expect(subPathsFor(career.id).length).toBeGreaterThanOrEqual(1);
    }
  });

  it("offers front-end, back-end and mobile as developer specialisations", () => {
    const ids = subPathsFor("software_developer").map((s) => s.id);
    expect(ids).toEqual(expect.arrayContaining(["frontend", "backend", "mobile"]));
  });

  it("picks healthcare analytics for a healthcare background interested in health", () => {
    const user = answers({ situation: "healthcare_professional", industries: ["health"] });
    expect(pickSubPath(user, dataAnalyst)?.id).toBe("health_analytics");
  });

  it("is deterministic and ranks best-first", () => {
    const user = answers({ industries: ["fintech"], situation: "banker" });
    const a = rankSubPaths(user, dataAnalyst);
    const b = rankSubPaths(user, dataAnalyst);
    expect(a.map((s) => s.subPath.id)).toEqual(b.map((s) => s.subPath.id));
    for (let i = 1; i < a.length; i++) {
      expect(a[i - 1].score).toBeGreaterThanOrEqual(a[i].score);
    }
  });

  it("always gives a non-empty reason", () => {
    const user = answers();
    const sub = pickSubPath(user, dataAnalyst)!;
    expect(subPathReason(user, sub).length).toBeGreaterThan(0);
  });
});

describe("sub-path tailors the curriculum", () => {
  it("inserts the sub-path's niche module and points the capstone at its project", () => {
    const mobile = subPathsFor("software_developer").find((s) => s.id === "mobile")!;
    const curriculum = buildCurriculum(dev, mobile);
    const ids = curriculum.modules.map((m) => m.id);

    // The niche module is present...
    expect(ids).toContain("dev_mobile_mod");
    // ...before the capstone...
    expect(ids.indexOf("dev_mobile_mod")).toBeLessThan(ids.indexOf("capstone"));
    // ...and the capstone now targets the niche project.
    const capstone = curriculum.modules.find((m) => m.id === "capstone")!;
    expect(capstone.project).toBe(mobile.project);
  });
});
