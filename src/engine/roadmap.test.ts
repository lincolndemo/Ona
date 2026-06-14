import { describe, it, expect } from "vitest";
import { CAREERS } from "../data/careers";
import { computeGap } from "./gap";
import { buildRoadmap } from "./roadmap";
import { answers, ENGINEER } from "./fixtures";

const dataAnalyst = CAREERS.find((c) => c.id === "data_analyst")!;

describe("roadmap", () => {
  it("always returns three phases with milestones", () => {
    const gap = computeGap(ENGINEER, dataAnalyst);
    const phases = buildRoadmap(ENGINEER, dataAnalyst, gap);
    expect(phases).toHaveLength(3);
    for (const phase of phases) {
      expect(phase.milestones.length).toBeGreaterThan(0);
      expect(phase.title.length).toBeGreaterThan(0);
      expect(phase.timeframe).toMatch(/Weeks/);
    }
  });

  it("starts phase one with the career's concrete next step", () => {
    const gap = computeGap(ENGINEER, dataAnalyst);
    const phases = buildRoadmap(ENGINEER, dataAnalyst, gap);
    expect(phases[0].milestones[0]).toBe(dataAnalyst.nextStep);
  });

  it("resolves real resources for a path with a known skill gap", () => {
    const user = answers({ situation: "unemployed", toolsUsed: ["none"] });
    const gap = computeGap(user, dataAnalyst);
    const phases = buildRoadmap(user, dataAnalyst, gap);
    const allResources = phases.flatMap((p) => p.resources);
    expect(allResources.length).toBeGreaterThan(0);
    for (const r of allResources) {
      expect(r.url).toMatch(/^https?:\/\//);
    }
  });

  it("is deterministic", () => {
    const gap = computeGap(ENGINEER, dataAnalyst);
    const a = buildRoadmap(ENGINEER, dataAnalyst, gap);
    const b = buildRoadmap(ENGINEER, dataAnalyst, gap);
    expect(a).toEqual(b);
  });
});
