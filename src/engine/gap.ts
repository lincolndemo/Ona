// Computes the skills gap and an honest time estimate. Current skills come from
// two sources: the transferable skills implied by the person's situation, and
// the tools they reported using. The gap is what the role needs that they do
// not yet hold.

import type { Career, UserAnswers } from "../data/types";
import { SITUATION_SKILLS } from "../data/weights";
import { userHoursNumeric } from "./profile";

export interface SkillsGap {
  have: string[]; // skills the person already holds
  toBuild: string[]; // role prerequisites they do not yet hold
  months: number; // honest learning estimate, scaled to their hours
}

/** Skills the person already holds: situation skills plus tools they have used. */
function currentSkills(user: UserAnswers): string[] {
  const fromSituation = SITUATION_SKILLS[user.situation] ?? [];
  const fromTools = user.toolsUsed.filter((t) => t !== "none");
  return Array.from(new Set([...fromSituation, ...fromTools]));
}

/**
 * A prerequisite counts as held when the person lists it directly, or when a
 * tool they have used names the same thing (so "SQL" covers "basic SQL", and
 * "Power BI" covers the Power BI prerequisite).
 */
function isHeld(prereq: string, held: string[]): boolean {
  const p = prereq.toLowerCase();
  return held.some((skill) => {
    const s = skill.toLowerCase();
    return p === s || p.includes(s);
  });
}

export function computeGap(user: UserAnswers, career: Career): SkillsGap {
  const have = currentSkills(user);
  const toBuild = career.prerequisiteSkills.filter(
    (skill) => !isHeld(skill, have),
  );

  // Base time assumes 10 hours a week; fewer hours honestly means longer.
  const months = Math.max(
    1,
    Math.round(career.baseMonthsAt10hrs * (10 / userHoursNumeric(user))),
  );

  return { have, toBuild, months };
}
