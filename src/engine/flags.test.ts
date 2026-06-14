import { describe, it, expect } from "vitest";
import { CAREERS } from "../data/careers";
import { computeGap } from "./gap";
import { buildFlags } from "./flags";
import { answers, ENGINEER } from "./fixtures";

const softwareDev = CAREERS.find((c) => c.id === "software_developer")!;

function flagsFor(user = ENGINEER, career = softwareDev) {
  return buildFlags(user, career, computeGap(user, career));
}

describe("coaching flags", () => {
  it("always returns at least one flag, never more than four", () => {
    const flags = flagsFor();
    expect(flags.length).toBeGreaterThanOrEqual(1);
    expect(flags.length).toBeLessThanOrEqual(4);
  });

  it("warns when the person has no laptop", () => {
    const user = answers({ hasLaptop: false });
    const flags = flagsFor(user);
    expect(flags.some((f) => f.tone === "caution" && /laptop/i.test(f.title))).toBe(
      true,
    );
  });

  it("cautions when weekly hours are tight for a hard path", () => {
    const user = answers({ weeklyHours: "2-5", rolePreference: "technical" });
    const flags = flagsFor(user, softwareDev);
    expect(flags.some((f) => f.tone === "caution" && /hours/i.test(f.title))).toBe(
      true,
    );
  });

  it("gives a positive flag when the person is well set up", () => {
    const flags = flagsFor(ENGINEER, softwareDev);
    expect(flags.some((f) => f.tone === "good")).toBe(true);
  });

  it("orders cautions before positives", () => {
    const user = answers({ hasLaptop: false, weeklyHours: "20+", computerSkill: 8 });
    const flags = flagsFor(user);
    const firstGood = flags.findIndex((f) => f.tone === "good");
    const lastCaution = flags.map((f) => f.tone).lastIndexOf("caution");
    if (firstGood !== -1 && lastCaution !== -1) {
      expect(lastCaution).toBeLessThan(firstGood);
    }
  });
});
