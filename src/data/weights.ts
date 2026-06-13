// Scoring weights and mapping tables for the matching engine.
// Editing these tunes the recommendation without touching engine logic.

import type { Difficulty, WeeklyHours } from "./types";

export const WEIGHTS = {
  thinking: 0.3,
  role: 0.2,
  background: 0.15,
  feasibility: 0.15,
  readiness: 0.1,
  motivation: 0.1,
} as const;

export type SubScoreKey = keyof typeof WEIGHTS;

// Map a weekly-hours band to a representative number of hours.
export const HOURS_NUMERIC: Record<WeeklyHours, number> = {
  "2-5": 3.5,
  "5-10": 7.5,
  "10-20": 15,
  "20+": 25,
};

// Map a career's difficulty to the weekly hours the path realistically needs.
export const DIFFICULTY_REQUIRED_HOURS: Record<Difficulty, number> = {
  low: 5,
  medium: 10,
  high: 16,
};

// Transferable skills a person likely already holds, derived from their
// current situation. Used by the skills-gap readout.
export const SITUATION_SKILLS: Record<string, string[]> = {
  teacher: [
    "communication",
    "facilitation",
    "assessment",
    "research",
    "curriculum design",
  ],
  accountant: ["numeracy", "attention to detail", "financial analysis", "Excel"],
  banker: ["numeracy", "customer handling", "compliance awareness", "Excel"],
  marketing_professional: [
    "communication",
    "campaign planning",
    "copywriting",
    "audience insight",
  ],
  sales_professional: [
    "communication",
    "persuasion",
    "relationship building",
    "negotiation",
  ],
  civil_servant: [
    "administration",
    "policy awareness",
    "documentation",
    "organisation",
  ],
  healthcare_professional: [
    "attention to detail",
    "care",
    "record keeping",
    "communication",
  ],
  engineer: ["problem solving", "technical reasoning", "mathematics"],
  business_owner: [
    "decision making",
    "operations",
    "customer insight",
    "budgeting",
  ],
  graduate: ["learning ability", "research", "writing"],
  university_student: ["learning ability", "research"],
  secondary_student: ["learning ability"],
  freelancer: ["self management", "client handling", "communication"],
  unemployed: [],
  other: [],
};
