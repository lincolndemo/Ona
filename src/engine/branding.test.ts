import { describe, it, expect } from "vitest";
import { CAREERS } from "../data/careers";
import { computeGap } from "./gap";
import { buildBranding } from "./branding";
import { answers } from "./fixtures";

const dataAnalyst = CAREERS.find((c) => c.id === "data_analyst")!;
const user = answers({ situation: "unemployed", toolsUsed: ["none"] });

describe("branding coach", () => {
  it("names the matched career in the headline", () => {
    const b = buildBranding(dataAnalyst, computeGap(user, dataAnalyst));
    expect(b.headline).toContain(dataAnalyst.name);
  });

  it("returns exactly three posts and some tips", () => {
    const b = buildBranding(dataAnalyst, computeGap(user, dataAnalyst));
    expect(b.posts).toHaveLength(3);
    expect(b.tips.length).toBeGreaterThan(0);
  });

  it("uses the correct article for a vowel-led career (an AI Trainer)", () => {
    const aiTrainer = CAREERS.find((c) => c.id === "ai_trainer")!;
    const b = buildBranding(aiTrainer, computeGap(user, aiTrainer));
    expect(b.bio).toContain("an AI Trainer");
  });

  it("is deterministic", () => {
    const gap = computeGap(user, dataAnalyst);
    expect(buildBranding(dataAnalyst, gap)).toEqual(buildBranding(dataAnalyst, gap));
  });
});
