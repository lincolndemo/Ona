import { describe, it, expect } from "vitest";
import { CAREERS } from "../data/careers";
import { computeGap } from "./gap";
import { answers } from "./fixtures";

const dataAnalyst = CAREERS.find((c) => c.id === "data_analyst")!;

describe("skills gap", () => {
  it("counts a tool as covering the matching prerequisite (SQL → basic SQL)", () => {
    const gap = computeGap(
      answers({ situation: "accountant", toolsUsed: ["SQL", "Power BI"] }),
      dataAnalyst,
    );
    expect(gap.toBuild).not.toContain("basic SQL");
    expect(gap.toBuild).not.toContain("Power BI");
  });

  it("lists prerequisites the person lacks as skills to build", () => {
    const gap = computeGap(
      answers({ situation: "unemployed", toolsUsed: ["none"] }),
      dataAnalyst,
    );
    expect(gap.toBuild).toContain("Power BI");
    expect(gap.toBuild.length).toBeGreaterThan(0);
  });

  it("includes situation skills and used tools in what they have", () => {
    const gap = computeGap(
      answers({ situation: "teacher", toolsUsed: ["Excel", "none"] }),
      dataAnalyst,
    );
    expect(gap.have).toContain("communication"); // from teacher situation skills
    expect(gap.have).toContain("Excel"); // from tools
    expect(gap.have).not.toContain("none"); // 'none' is filtered out
  });

  it("scales the estimate honestly: fewer hours means more months", () => {
    const few = computeGap(answers({ weeklyHours: "2-5" }), dataAnalyst);
    const many = computeGap(answers({ weeklyHours: "20+" }), dataAnalyst);
    expect(few.months).toBeGreaterThan(many.months);
    expect(many.months).toBeGreaterThanOrEqual(1); // never below 1
  });
});
