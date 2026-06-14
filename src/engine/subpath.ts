// Picks a specialisation (sub-path) within the already-matched career. This is a
// second, post-match layer: the top career is chosen exactly as before, then the
// best-fitting sub-path is scored deterministically from the person's answers
// (industries and build preference weigh most, with background, motivations and
// thinking style as support).

import type { Career, SubPath, UserAnswers } from "../data/types";
import { subPathsFor } from "../data/subpaths";

export interface ScoredSubPath {
  subPath: SubPath;
  score: number;
}

function overlap<T>(a: T[] = [], b: T[] = []): number {
  return a.filter((x) => b.includes(x)).length;
}

export function scoreSubPath(user: UserAnswers, sub: SubPath): number {
  let score = 0;
  score += 3 * overlap(user.industries, sub.industries); // strongest signal
  if (sub.buildPreference?.includes(user.buildPreference)) score += 3;
  if (sub.situations?.includes(user.situation)) score += 2;
  score += 1.5 * overlap(user.motivationsTop3, sub.motivations);
  score += 1 * overlap(user.excitingActivities, sub.thinkingStyles);
  return score;
}

/** Sub-paths ranked best-first; stable on data order for ties. */
export function rankSubPaths(user: UserAnswers, career: Career): ScoredSubPath[] {
  return subPathsFor(career.id)
    .map((subPath) => ({ subPath, score: scoreSubPath(user, subPath) }))
    .sort((a, b) => b.score - a.score);
}

/** The best-fitting sub-path, or null if the career has none authored. */
export function pickSubPath(user: UserAnswers, career: Career): SubPath | null {
  return rankSubPaths(user, career)[0]?.subPath ?? null;
}

const INDUSTRY_LABELS: Record<string, string> = {
  fintech: "fintech and banking",
  health: "health",
  logistics: "logistics and supply chain",
  education: "education",
  agriculture: "agriculture",
  ecommerce: "e-commerce and retail",
  government: "the public sector",
  media: "media and entertainment",
  other: "your chosen field",
};

const BUILD_LABELS: Record<string, string> = {
  web: "building websites and web apps",
  mobile: "building mobile apps",
  backend: "servers, APIs and data",
  people: "working with people, content and ideas",
  not_sure: "a bit of everything",
};

const SITUATION_LABELS: Record<string, string> = {
  healthcare_professional: "healthcare professional",
  banker: "banker",
  accountant: "accountant",
  business_owner: "business owner",
  teacher: "teacher",
  civil_servant: "civil servant",
  engineer: "engineer",
  freelancer: "freelancer",
  graduate: "graduate",
};

/** A short, honest sentence for why this sub-path suits the person. */
export function subPathReason(user: UserAnswers, sub: SubPath): string {
  const industryMatch = (user.industries ?? []).find((i) => sub.industries?.includes(i));
  if (industryMatch) {
    return `Your interest in ${INDUSTRY_LABELS[industryMatch] ?? "this field"} points you here.`;
  }
  if (sub.buildPreference?.includes(user.buildPreference) && user.buildPreference !== "not_sure") {
    return `You said you're drawn to ${BUILD_LABELS[user.buildPreference]}, which fits this focus.`;
  }
  if (sub.situations?.includes(user.situation)) {
    return `Your background as a ${SITUATION_LABELS[user.situation] ?? "professional"} transfers straight into this niche.`;
  }
  if (overlap(user.motivationsTop3, sub.motivations) > 0 || overlap(user.excitingActivities, sub.thinkingStyles) > 0) {
    return "It lines up with what you said you enjoy and value.";
  }
  return "A strong, in-demand focus to start with — and you can switch it below.";
}
