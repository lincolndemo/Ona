import { describe, it, expect } from "vitest";
import { CAREERS } from "./data/careers";
import { computeGap } from "./engine/gap";
import { buildReasoning } from "./engine/reasoning";
import { buildRoadmap } from "./engine/roadmap";
import { buildCurriculum } from "./engine/curriculum";
import { buildBranding } from "./engine/branding";
import { topMatch } from "./engine/match";
import { renderResultDoc } from "./pdf";
import { ENGINEER } from "./engine/fixtures";

describe("result PDF", () => {
  it("renders a multi-page document without throwing", () => {
    const scored = topMatch(ENGINEER);
    const gap = computeGap(ENGINEER, scored.career);
    const doc = renderResultDoc({
      career: scored.career,
      reasoning: buildReasoning(ENGINEER, scored),
      gap,
      roadmap: buildRoadmap(ENGINEER, scored.career, gap),
      curriculum: buildCurriculum(scored.career),
      branding: buildBranding(scored.career, gap),
    });
    // A real, multi-page document.
    expect(doc.getNumberOfPages()).toBeGreaterThanOrEqual(2);

    // Produces valid PDF bytes (the %PDF- signature every PDF starts with).
    const bytes = new Uint8Array(doc.output("arraybuffer"));
    expect(bytes.byteLength).toBeGreaterThan(1000);
    const signature = String.fromCharCode(...bytes.subarray(0, 5));
    expect(signature).toBe("%PDF-");
  });

  it("renders for every career without throwing", () => {
    for (const career of CAREERS) {
      const gap = computeGap(ENGINEER, career);
      expect(() =>
        renderResultDoc({
          career,
          reasoning: "Test reasoning.",
          gap,
          roadmap: buildRoadmap(ENGINEER, career, gap),
          curriculum: buildCurriculum(career),
          branding: buildBranding(career, gap),
        }),
      ).not.toThrow();
    }
  });
});
