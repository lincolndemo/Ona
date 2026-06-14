// Shared test fixtures. Not a test file (no .test suffix), so Vitest ignores it.

import type { UserAnswers } from "../data/types";

const base: UserAnswers = {
  motivationsTop3: ["income", "remote", "growth"],
  situation: "graduate",
  education: "degree",
  yearsExperience: "under_2",
  weeklyHours: "10-20",
  learningStyle: ["projects"],
  pace: "moderate",
  computerSkill: 6,
  toolsUsed: ["Excel"],
  hasLaptop: true,
  internet: "good",
  excitingActivities: ["analysing", "solving"],
  bestStatement: "analysing",
  rolePreference: "technical",
  industries: ["fintech"],
  buildPreference: "backend",
};

export function answers(overrides: Partial<UserAnswers> = {}): UserAnswers {
  return { ...base, ...overrides };
}

// A teacher who wants to teach, non-technically.
export const TEACHER = answers({
  motivationsTop3: ["interest", "flexibility", "growth"],
  situation: "teacher",
  weeklyHours: "5-10",
  toolsUsed: ["ChatGPT", "Canva", "Google Workspace"],
  excitingActivities: ["teaching", "organising"],
  bestStatement: "teaching",
  rolePreference: "non_technical",
  industries: ["education"],
  buildPreference: "people",
});

// An engineer who wants to build, technically, with plenty of time.
export const ENGINEER = answers({
  motivationsTop3: ["income", "remote", "international"],
  situation: "engineer",
  weeklyHours: "20+",
  computerSkill: 8,
  toolsUsed: ["Python", "GitHub"],
  excitingActivities: ["building", "solving"],
  bestStatement: "building",
  rolePreference: "technical",
  industries: ["fintech"],
  buildPreference: "mobile",
});
