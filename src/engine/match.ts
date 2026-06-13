// Scores every career against the answers and returns them ranked. The top
// entry is the recommendation. The full ranking is kept available internally
// but only the top career is shown to the person.

import { CAREERS } from "../data/careers";
import type { Career, UserAnswers } from "../data/types";
import { WEIGHTS } from "../data/weights";
import type { SubScoreKey } from "../data/weights";
import { subScores } from "./profile";
import type { SubScores } from "./profile";

export interface ScoredCareer {
  career: Career;
  total: number;
  subScores: SubScores;
  /** Each sub-score multiplied by its weight, i.e. its share of the total. */
  contributions: Record<SubScoreKey, number>;
}

export function scoreCareer(user: UserAnswers, career: Career): ScoredCareer {
  const subs = subScores(user, career);
  const keys = Object.keys(WEIGHTS) as SubScoreKey[];

  const contributions = {} as Record<SubScoreKey, number>;
  let total = 0;
  for (const key of keys) {
    const contribution = WEIGHTS[key] * subs[key];
    contributions[key] = contribution;
    total += contribution;
  }

  return { career, total, subScores: subs, contributions };
}

/**
 * Rank every career by total score, highest first. The sort is stable on the
 * career library order, so ties resolve deterministically.
 */
export function rankCareers(
  user: UserAnswers,
  careers: Career[] = CAREERS,
): ScoredCareer[] {
  return careers
    .map((career) => scoreCareer(user, career))
    .sort((a, b) => b.total - a.total);
}

/** The single recommended career for these answers. */
export function topMatch(
  user: UserAnswers,
  careers: Career[] = CAREERS,
): ScoredCareer {
  return rankCareers(user, careers)[0];
}
