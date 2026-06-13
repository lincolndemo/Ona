// Turns raw answers into the normalised values the scorer needs, and holds the
// six sub-scores. Every function here is pure: the same inputs always produce
// the same output, which keeps the recommendation deterministic and testable.

import type { Career, UserAnswers } from "../data/types";
import {
  DIFFICULTY_REQUIRED_HOURS,
  HOURS_NUMERIC,
} from "../data/weights";
import type { SubScoreKey } from "../data/weights";

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function unique<T>(items: T[]): T[] {
  return Array.from(new Set(items));
}

/** Representative weekly-hours number for the band the user selected. */
export function userHoursNumeric(user: UserAnswers): number {
  return HOURS_NUMERIC[user.weeklyHours];
}

/**
 * thinking (0–1): how much the work the user enjoys overlaps with the work the
 * role rewards. Overlap of selected styles, with a small bonus when the single
 * best-fit statement also lands in the role.
 */
export function thinkingScore(user: UserAnswers, career: Career): number {
  const careerStyles = career.thinkingStyles;
  if (careerStyles.length === 0) return 0;
  const userStyles = unique(user.excitingActivities);
  const overlap = userStyles.filter((s) => careerStyles.includes(s)).length;
  let score = Math.min(overlap / careerStyles.length, 1);
  if (careerStyles.includes(user.bestStatement)) {
    score += 0.15;
  }
  return clamp(score, 0, 1);
}

/**
 * role (0–1): how well the user's technical / non-technical / hybrid leaning
 * matches the role's orientation. Exact match scores best, hybrid bridges, and
 * a straight technical-vs-non-technical clash scores lowest.
 */
export function roleScore(user: UserAnswers, career: Career): number {
  if (user.rolePreference === career.roleOrientation) return 1.0;
  if (user.rolePreference === "hybrid" || career.roleOrientation === "hybrid") {
    return 0.7;
  }
  return 0.2;
}

/**
 * background (0–1): whether the user's current field is one the role draws on.
 */
export function backgroundScore(user: UserAnswers, career: Career): number {
  return career.backgroundAffinity.includes(user.situation) ? 1.0 : 0.4;
}

/**
 * feasibility (0–1): whether the user's weekly hours can carry the difficulty
 * of the path.
 */
export function feasibilityScore(user: UserAnswers, career: Career): number {
  const required = DIFFICULTY_REQUIRED_HOURS[career.difficulty];
  return clamp(userHoursNumeric(user) / required, 0, 1);
}

/**
 * readiness (0–1): tools the user has already touched plus their self-rated
 * computer skill, weighted towards tools.
 */
export function readinessScore(user: UserAnswers, career: Career): number {
  const toolFraction =
    career.tools.length === 0
      ? 1
      : career.tools.filter((t) => user.toolsUsed.includes(t)).length /
        career.tools.length;
  const skillFraction = user.computerSkill / 10;
  return clamp(0.6 * toolFraction + 0.4 * skillFraction, 0, 1);
}

/**
 * motivation (0–1): overlap between the user's top three motivations and what
 * the role tends to serve.
 */
export function motivationScore(user: UserAnswers, career: Career): number {
  const overlap = user.motivationsTop3.filter((m) =>
    career.motivationFit.includes(m),
  ).length;
  return clamp(overlap / 3, 0, 1);
}

export type SubScores = Record<SubScoreKey, number>;

/** All six sub-scores for one career, each between 0 and 1. */
export function subScores(user: UserAnswers, career: Career): SubScores {
  return {
    thinking: thinkingScore(user, career),
    role: roleScore(user, career),
    background: backgroundScore(user, career),
    feasibility: feasibilityScore(user, career),
    readiness: readinessScore(user, career),
    motivation: motivationScore(user, career),
  };
}
