// Turns the six sub-scores behind a match into a human-readable breakdown — what
// each dimension measured for this person, its weight, and its 0–1 score. Used by
// the "Why this match" panel so the recommendation is transparent, not a black box.

import type {
  Motivation,
  ThinkingStyle,
  UserAnswers,
  WeeklyHours,
} from "../data/types";
import { WEIGHTS } from "../data/weights";
import type { SubScoreKey } from "../data/weights";
import type { ScoredCareer } from "./match";

export interface BreakdownItem {
  key: SubScoreKey;
  label: string;
  weight: number; // 0..1
  score: number; // 0..1
  note: string;
}

const LABELS: Record<SubScoreKey, string> = {
  thinking: "Thinking style",
  role: "Role preference",
  background: "Background",
  feasibility: "Time to learn",
  readiness: "Tool readiness",
  motivation: "Motivation",
};

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

const HOURS_LABELS: Record<WeeklyHours, string> = {
  "2-5": "2–5",
  "5-10": "5–10",
  "10-20": "10–20",
  "20+": "20+",
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

function humanRole(o: string): string {
  return o === "non_technical" ? "non-technical" : o;
}

function list(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

function noteFor(key: SubScoreKey, user: UserAnswers, scored: ScoredCareer): string {
  const c = scored.career;
  switch (key) {
    case "thinking": {
      const matched = Array.from(new Set(user.excitingActivities))
        .filter((s) => c.thinkingStyles.includes(s))
        .map((s) => STYLE_LABELS[s]);
      if (matched.length > 0) {
        return `You enjoy ${list(matched)} — work this role rewards.`;
      }
      if (c.thinkingStyles.includes(user.bestStatement)) {
        return `Your best-fit choice, ${STYLE_LABELS[user.bestStatement]}, matches this role.`;
      }
      return "This role leans on work styles you didn't pick as favourites.";
    }
    case "role":
      if (user.rolePreference === c.roleOrientation) {
        return `You wanted ${humanRole(c.roleOrientation)} work, and this role is exactly that.`;
      }
      if (user.rolePreference === "hybrid" || c.roleOrientation === "hybrid") {
        return `Close to the mix you wanted — this role is ${humanRole(c.roleOrientation)}.`;
      }
      return `You leaned ${humanRole(user.rolePreference)}, but this role is ${humanRole(c.roleOrientation)}.`;
    case "background": {
      const sit = SITUATION_LABELS[user.situation] ?? "your field";
      return c.backgroundAffinity.includes(user.situation)
        ? `Your background as a ${sit} transfers well here.`
        : `Your background as a ${sit} isn't a typical feeder — not a blocker, just a smaller boost.`;
    }
    case "feasibility": {
      const hrs = HOURS_LABELS[user.weeklyHours];
      return scored.subScores.feasibility >= 0.9
        ? `Your ${hrs} hours a week comfortably fit this path.`
        : `At ${hrs} hours a week this path is a stretch — doable, but slower.`;
    }
    case "readiness": {
      const tools = c.tools.filter((t) => user.toolsUsed.includes(t));
      return tools.length > 0
        ? `You've already used ${list(tools)} — a real head start.`
        : "You're starting this role's tools largely from scratch — that's normal.";
    }
    case "motivation": {
      const matched = user.motivationsTop3
        .filter((m) => c.motivationFit.includes(m))
        .map((m) => MOTIVATION_LABELS[m]);
      return matched.length > 0
        ? `It serves ${list(matched)}, which you ranked highly.`
        : "It serves goals other than your top three.";
    }
  }
}

/** The six dimensions behind a match, ordered by how much each contributed. */
export function explainMatch(user: UserAnswers, scored: ScoredCareer): BreakdownItem[] {
  const keys = Object.keys(WEIGHTS) as SubScoreKey[];
  return keys
    .map((key) => ({
      key,
      label: LABELS[key],
      weight: WEIGHTS[key],
      score: scored.subScores[key],
      note: noteFor(key, user, scored),
    }))
    .sort((a, b) => b.weight * b.score - a.weight * a.score);
}
