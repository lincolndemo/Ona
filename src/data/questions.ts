// The six assessment sections, expressed as a flat ordered list of questions.
// One question renders per screen. Each question maps to a single field on
// UserAnswers, so the engine reads answers without any per-question glue code.

import type { UserAnswers } from "./types";

export type QuestionType =
  | "rank3" // multi-select, then the top three are ranked
  | "single" // pick exactly one
  | "multi" // pick one or more
  | "slider" // numeric scale
  | "boolean"; // yes / no

export interface Option {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  section: number;
  sectionTitle: string;
  field: keyof UserAnswers;
  type: QuestionType;
  prompt: string;
  help?: string;
  options?: Option[];
  min?: number;
  max?: number;
}

export const QUESTIONS: Question[] = [
  // Section 1 — Motivation
  {
    id: "motivations",
    section: 1,
    sectionTitle: "Motivation",
    field: "motivationsTop3",
    type: "rank3",
    prompt: "What is pulling you towards a career in technology?",
    help: "Pick the ones that matter, then we will ask you to rank your top three.",
    options: [
      { value: "income", label: "Higher income" },
      { value: "remote", label: "Remote work" },
      { value: "growth", label: "Career growth" },
      { value: "security", label: "Job security" },
      { value: "entrepreneurship", label: "Entrepreneurship" },
      { value: "interest", label: "Interest in technology" },
      { value: "flexibility", label: "Flexible work" },
      { value: "international", label: "International opportunities" },
      { value: "future_proof", label: "Future-proof skills" },
    ],
  },

  // Section 2 — Background
  {
    id: "situation",
    section: 2,
    sectionTitle: "Background",
    field: "situation",
    type: "single",
    prompt: "What best describes your current situation?",
    options: [
      { value: "secondary_student", label: "Secondary school student" },
      { value: "university_student", label: "University student" },
      { value: "graduate", label: "Graduate" },
      { value: "teacher", label: "Teacher" },
      { value: "civil_servant", label: "Civil servant" },
      { value: "healthcare_professional", label: "Healthcare professional" },
      { value: "business_owner", label: "Business owner" },
      { value: "accountant", label: "Accountant" },
      { value: "banker", label: "Banker" },
      { value: "engineer", label: "Engineer" },
      { value: "sales_professional", label: "Sales professional" },
      { value: "marketing_professional", label: "Marketing professional" },
      { value: "freelancer", label: "Freelancer" },
      { value: "unemployed", label: "Unemployed" },
      { value: "other", label: "Other" },
    ],
  },
  {
    id: "education",
    section: 2,
    sectionTitle: "Background",
    field: "education",
    type: "single",
    prompt: "What is your highest level of education?",
    options: [
      { value: "secondary", label: "Secondary" },
      { value: "diploma", label: "Diploma" },
      { value: "degree", label: "Degree" },
      { value: "postgraduate", label: "Postgraduate" },
    ],
  },
  {
    id: "yearsExperience",
    section: 2,
    sectionTitle: "Background",
    field: "yearsExperience",
    type: "single",
    prompt: "How many years of work experience do you have?",
    options: [
      { value: "none", label: "None" },
      { value: "under_2", label: "Under 2 years" },
      { value: "2_5", label: "2 to 5 years" },
      { value: "5_10", label: "5 to 10 years" },
      { value: "over_10", label: "Over 10 years" },
    ],
  },

  // Section 3 — Learning capacity
  {
    id: "weeklyHours",
    section: 3,
    sectionTitle: "Learning capacity",
    field: "weeklyHours",
    type: "single",
    prompt: "How many hours a week can you realistically give to learning?",
    options: [
      { value: "2-5", label: "2 to 5 hours" },
      { value: "5-10", label: "5 to 10 hours" },
      { value: "10-20", label: "10 to 20 hours" },
      { value: "20+", label: "20 or more hours" },
    ],
  },
  {
    id: "learningStyle",
    section: 3,
    sectionTitle: "Learning capacity",
    field: "learningStyle",
    type: "multi",
    prompt: "How do you learn best?",
    help: "Pick all that apply.",
    options: [
      { value: "videos", label: "Videos" },
      { value: "reading", label: "Reading" },
      { value: "projects", label: "Projects" },
      { value: "coaching", label: "Coaching" },
      { value: "community", label: "Community learning" },
    ],
  },
  {
    id: "pace",
    section: 3,
    sectionTitle: "Learning capacity",
    field: "pace",
    type: "single",
    prompt: "What pace suits you?",
    options: [
      { value: "fast", label: "Fast" },
      { value: "moderate", label: "Moderate" },
      { value: "flexible", label: "Flexible" },
    ],
  },

  // Section 4 — Technical readiness
  {
    id: "computerSkill",
    section: 4,
    sectionTitle: "Technical readiness",
    field: "computerSkill",
    type: "slider",
    prompt: "How would you rate your computer skills?",
    help: "1 means beginner, 10 means very confident.",
    min: 1,
    max: 10,
  },
  {
    id: "toolsUsed",
    section: 4,
    sectionTitle: "Technical readiness",
    field: "toolsUsed",
    type: "multi",
    prompt: "Which of these tools have you used before?",
    help: "Pick all that apply.",
    options: [
      { value: "Excel", label: "Excel" },
      { value: "SQL", label: "SQL" },
      { value: "Power BI", label: "Power BI" },
      { value: "Python", label: "Python" },
      { value: "ChatGPT", label: "ChatGPT" },
      { value: "GitHub", label: "GitHub" },
      { value: "Canva", label: "Canva" },
      { value: "Google Workspace", label: "Google Workspace" },
      { value: "Microsoft 365", label: "Microsoft 365" },
      { value: "none", label: "None of these" },
    ],
  },
  {
    id: "hasLaptop",
    section: 4,
    sectionTitle: "Technical readiness",
    field: "hasLaptop",
    type: "boolean",
    prompt: "Do you own a laptop?",
  },
  {
    id: "internet",
    section: 4,
    sectionTitle: "Technical readiness",
    field: "internet",
    type: "single",
    prompt: "How reliable is your internet?",
    options: [
      { value: "poor", label: "Poor" },
      { value: "fair", label: "Fair" },
      { value: "good", label: "Good" },
      { value: "excellent", label: "Excellent" },
    ],
  },

  // Section 5 — Thinking style
  {
    id: "excitingActivities",
    section: 5,
    sectionTitle: "Thinking style",
    field: "excitingActivities",
    type: "multi",
    prompt: "Which kinds of work genuinely excite you?",
    help: "Pick all that apply.",
    options: [
      { value: "solving", label: "Solving problems" },
      { value: "building", label: "Building products" },
      { value: "analysing", label: "Analysing information" },
      { value: "teaching", label: "Teaching others" },
      { value: "designing", label: "Designing experiences" },
      { value: "organising", label: "Organising projects" },
      { value: "selling", label: "Selling solutions" },
      { value: "researching", label: "Researching ideas" },
    ],
  },
  {
    id: "bestStatement",
    section: 5,
    sectionTitle: "Thinking style",
    field: "bestStatement",
    type: "single",
    prompt: "Which one of these fits you best?",
    help: "Choose the single statement that feels most like you.",
    options: [
      { value: "solving", label: "I like to solve problems" },
      { value: "building", label: "I like to build products" },
      { value: "analysing", label: "I like to analyse information" },
      { value: "teaching", label: "I like to teach others" },
      { value: "designing", label: "I like to design experiences" },
      { value: "organising", label: "I like to organise projects" },
      { value: "selling", label: "I like to sell solutions" },
      { value: "researching", label: "I like to research ideas" },
    ],
  },

  // Section 6 — Role preference
  {
    id: "rolePreference",
    section: 6,
    sectionTitle: "Role preference",
    field: "rolePreference",
    type: "single",
    prompt: "What kind of role appeals to you?",
    help: "Many people succeed in technology without writing code.",
    options: [
      { value: "technical", label: "Technical — I want to build and code" },
      {
        value: "non_technical",
        label: "Non-technical — I want to work around technology, not in code",
      },
      { value: "hybrid", label: "Hybrid — a mix of both" },
    ],
  },

  // Section 7 — Direction (drives the specialisation / sub-path)
  {
    id: "industries",
    section: 7,
    sectionTitle: "Direction",
    field: "industries",
    type: "multi",
    prompt: "Which industries interest you?",
    help: "Pick any that appeal — this helps us suggest a focus within your path.",
    options: [
      { value: "fintech", label: "Fintech / banking" },
      { value: "health", label: "Health" },
      { value: "logistics", label: "Logistics / supply chain" },
      { value: "education", label: "Education" },
      { value: "agriculture", label: "Agriculture" },
      { value: "ecommerce", label: "E-commerce / retail" },
      { value: "government", label: "Government / public sector" },
      { value: "media", label: "Media / entertainment" },
      { value: "other", label: "Not sure yet / something else" },
    ],
  },
  {
    id: "buildPreference",
    section: 7,
    sectionTitle: "Direction",
    field: "buildPreference",
    type: "single",
    prompt: "What kind of work pulls you most?",
    help: "There's no wrong answer — 'not sure' is fine.",
    options: [
      { value: "web", label: "Websites & web apps" },
      { value: "mobile", label: "Mobile apps" },
      { value: "backend", label: "Servers, APIs & data" },
      { value: "people", label: "Working with people, content & ideas" },
      { value: "not_sure", label: "Not sure yet" },
    ],
  },
];

export const TOTAL_QUESTIONS = QUESTIONS.length;

/** Whether a single question has a valid answer. */
export function isAnswered(question: Question, value: unknown): boolean {
  switch (question.type) {
    case "single":
      return typeof value === "string" && value.length > 0;
    case "multi":
      return Array.isArray(value) && value.length > 0;
    case "rank3":
      return Array.isArray(value) && value.length === 3;
    case "slider":
      return typeof value === "number";
    case "boolean":
      return typeof value === "boolean";
  }
}

/** Whether every question has been answered — i.e. a result can be produced. */
export function isComplete(answers: Record<string, unknown>): boolean {
  return QUESTIONS.every((q) => isAnswered(q, answers[q.field]));
}
