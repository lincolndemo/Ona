// Builds the reasoning paragraph deterministically from the two sub-scores that
// contributed most to the chosen career. Each contributing dimension fills a
// fixed sentence template, and the sentences join into a paragraph of at most
// three. No model calls: the same answers always produce the same wording.

import type {
  Motivation,
  RoleOrientation,
  ThinkingStyle,
  UserAnswers,
  WeeklyHours,
} from "../data/types";
import type { SubScoreKey } from "../data/weights";
import type { ScoredCareer } from "./match";

const STYLE_LABELS: Record<ThinkingStyle, string> = {
  solving: "solving problems",
  building: "building products",
  analysing: "analysing information",
  teaching: "teaching others",
  designing: "designing experiences",
  organising: "organising projects",
  selling: "selling solutions",
  researching: "researching ideas",
};

const MOTIVATION_LABELS: Record<Motivation, string> = {
  income: "higher income",
  remote: "remote work",
  growth: "career growth",
  security: "job security",
  entrepreneurship: "entrepreneurship",
  interest: "interest in technology",
  flexibility: "flexible work",
  international: "international opportunities",
  future_proof: "future-proof skills",
};

const SITUATION_LABELS: Record<string, string> = {
  secondary_student: "secondary school student",
  university_student: "university student",
  graduate: "graduate",
  teacher: "teacher",
  civil_servant: "civil servant",
  healthcare_professional: "healthcare professional",
  business_owner: "business owner",
  accountant: "accountant",
  banker: "banker",
  engineer: "engineer",
  sales_professional: "sales professional",
  marketing_professional: "marketing professional",
  freelancer: "freelancer",
  unemployed: "person between roles",
  other: "professional",
};

const HOURS_LABELS: Record<WeeklyHours, string> = {
  "2-5": "2 to 5",
  "5-10": "5 to 10",
  "10-20": "10 to 20",
  "20+": "20 or more",
};

export function humanRole(orientation: RoleOrientation): string {
  if (orientation === "non_technical") return "non-technical";
  return orientation;
}

export function humanSituation(situation: string): string {
  return SITUATION_LABELS[situation] ?? "professional";
}

/** "a" or "an" for the given word, so the reasoning reads naturally. */
function article(word: string): string {
  return /^[aeiou]/i.test(word) ? "an" : "a";
}

/** Joins a list as "a", "a and b", or "a, b and c". */
function humanList(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

function matchedStyles(user: UserAnswers, scored: ScoredCareer): ThinkingStyle[] {
  const careerStyles = scored.career.thinkingStyles;
  const matched = Array.from(new Set(user.excitingActivities)).filter((s) =>
    careerStyles.includes(s),
  );
  if (matched.length === 0 && careerStyles.includes(user.bestStatement)) {
    return [user.bestStatement];
  }
  return matched;
}

function matchedMotivations(user: UserAnswers, scored: ScoredCareer): Motivation[] {
  return user.motivationsTop3.filter((m) =>
    scored.career.motivationFit.includes(m),
  );
}

function sentenceFor(
  key: SubScoreKey,
  user: UserAnswers,
  scored: ScoredCareer,
): string | null {
  switch (key) {
    case "thinking": {
      const styles = matchedStyles(user, scored).map((s) => STYLE_LABELS[s]);
      if (styles.length === 0) return null;
      return `This role rewards the kind of work you said you enjoy, ${humanList(
        styles,
      )}.`;
    }
    case "role":
      return `It sits in the ${humanRole(
        scored.career.roleOrientation,
      )} space you preferred, so the day to day matches how you want to work.`;
    case "background": {
      if (!scored.career.backgroundAffinity.includes(user.situation)) {
        return null;
      }
      const situation = humanSituation(user.situation);
      return `Your background as ${article(situation)} ${situation} already carries skills this role values.`;
    }
    case "feasibility":
      return `It fits the ${HOURS_LABELS[user.weeklyHours]} hours a week you have available.`;
    case "readiness":
      return "You have already used some of the tools this role depends on, so you are not starting from zero.";
    case "motivation": {
      const motivations = matchedMotivations(user, scored).map(
        (m) => MOTIVATION_LABELS[m],
      );
      if (motivations.length === 0) return null;
      return `It serves what you ranked highest, ${humanList(motivations)}.`;
    }
  }
}

/**
 * The reasoning paragraph: up to three sentences, drawn from the highest
 * contributing sub-scores. Sentences that have nothing concrete to say (for
 * example a background that does not actually transfer) are skipped, and the
 * next contributor fills the gap.
 */
export function buildReasoning(user: UserAnswers, scored: ScoredCareer): string {
  const keys = (Object.keys(scored.contributions) as SubScoreKey[])
    .filter((key) => scored.contributions[key] > 0)
    .sort((a, b) => scored.contributions[b] - scored.contributions[a]);

  const sentences: string[] = [];
  for (const key of keys) {
    const sentence = sentenceFor(key, user, scored);
    if (sentence) sentences.push(sentence);
    if (sentences.length === 3) break;
  }

  // The spec aims for two or three sentences; keep at least two when possible.
  return sentences.slice(0, 3).join(" ");
}
