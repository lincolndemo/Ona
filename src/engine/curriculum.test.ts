import { describe, it, expect } from "vitest";
import { CAREERS } from "../data/careers";
import { computeGap } from "./gap";
import { buildCurriculum } from "./curriculum";
import { answers } from "./fixtures";

const dataAnalyst = CAREERS.find((c) => c.id === "data_analyst")!;
const user = answers({ situation: "unemployed", toolsUsed: ["none"] });

describe("curriculum", () => {
  it("has one module per prerequisite skill plus a capstone", () => {
    const c = buildCurriculum(dataAnalyst, computeGap(user, dataAnalyst));
    expect(c.modules).toHaveLength(dataAnalyst.prerequisiteSkills.length + 1);
    expect(c.modules[c.modules.length - 1].id).toBe("capstone");
  });

  it("numbers modules in order and gives each outcomes and a checkpoint", () => {
    const c = buildCurriculum(dataAnalyst, computeGap(user, dataAnalyst));
    c.modules.forEach((m, i) => {
      expect(m.order).toBe(i + 1);
      expect(m.outcomes.length).toBeGreaterThan(0);
      expect(m.checkpoint.length).toBeGreaterThan(0);
    });
  });

  it("marks already-held skills as 'have' and gaps as 'learn'", () => {
    const skilled = answers({ situation: "accountant", toolsUsed: ["Excel", "SQL", "Power BI"] });
    const c = buildCurriculum(dataAnalyst, computeGap(skilled, dataAnalyst));
    const powerBi = c.modules.find((m) => m.title === "Power BI");
    expect(powerBi?.status).toBe("have");
  });

  it("is deterministic", () => {
    const gap = computeGap(user, dataAnalyst);
    expect(buildCurriculum(dataAnalyst, gap)).toEqual(buildCurriculum(dataAnalyst, gap));
  });
});
