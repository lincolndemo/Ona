// Shared domain types for Ona's deterministic matching engine.
// These are referenced by data files, the engine, and the components.

export type ThinkingStyle =
  | "solving"
  | "building"
  | "analysing"
  | "teaching"
  | "designing"
  | "organising"
  | "selling"
  | "researching";

export type RoleOrientation = "technical" | "non_technical" | "hybrid";

export type Motivation =
  | "income"
  | "remote"
  | "growth"
  | "security"
  | "entrepreneurship"
  | "interest"
  | "flexibility"
  | "international"
  | "future_proof";

export type Difficulty = "low" | "medium" | "high";

export type WeeklyHours = "2-5" | "5-10" | "10-20" | "20+";

export type Pace = "fast" | "moderate" | "flexible";

export type Internet = "poor" | "fair" | "good" | "excellent";

export interface RealityCheck {
  typicalDay: string;
  toolsUsed: string;
  technicalShare: string;
  commonFrustrations: string;
  salaryRangeNGN: string; // monthly, placeholder — VERIFY before launch
  remotePotential: string;
}

export interface Career {
  id: string;
  name: string;
  category: RoleOrientation;
  oneLiner: string;
  roleOrientation: RoleOrientation;
  thinkingStyles: ThinkingStyle[];
  backgroundAffinity: string[]; // current-situation ids that transfer well
  difficulty: Difficulty;
  baseMonthsAt10hrs: number;
  motivationFit: Motivation[];
  prerequisiteSkills: string[];
  tools: string[]; // matched against tools the user has tried
  realityCheck: RealityCheck;
  nextStep: string;
}

export interface Resource {
  label: string;
  url: string;
}

export interface RoadmapPhase {
  id: string;
  title: string;
  timeframe: string; // e.g. "Weeks 1–4"
  focus: string;
  milestones: string[];
  resources: Resource[];
}

export interface BrandingPost {
  title: string;
  prompt: string;
}

export interface Branding {
  headline: string;
  bio: string;
  posts: BrandingPost[];
  tips: string[];
}

export interface AiLearnItem {
  skill: string;
  why: string;
  resource?: Resource;
}

// "AI for my path" — how AI shows up in a given field: its role, what to use it
// for day to day, and what AI skills are worth learning to get ahead.
export interface AiGuide {
  careerId: string;
  role: string; // the role AI plays in this field
  uses: string[]; // concrete ways to use AI in this field
  learn: AiLearnItem[]; // AI skills worth learning for this field
  caution: string; // an honest caveat
}

export type OpportunityType =
  | "job"
  | "remote"
  | "freelance"
  | "scholarship"
  | "internship"
  | "certification";

export interface Opportunity {
  id: string;
  title: string;
  org: string;
  type: OpportunityType;
  url: string;
  blurb: string;
  careers: string[]; // career ids it suits; empty means it suits everyone
  audience: "nigeria" | "africa" | "global";
  cost: "free" | "paid" | "mixed";
}

// A specialisation branch within a module — e.g. Front-end / Back-end / Mobile
// for a developer — each listing concrete language and tool options.
export interface CurriculumTrack {
  name: string;
  blurb: string;
  options: string[];
}

export interface CurriculumModule {
  id: string;
  title: string;
  summary: string; // why this module matters
  topics: string[]; // concrete things to learn
  tracks?: CurriculumTrack[]; // optional branches with their own options
  resources: Resource[];
  project: string; // a hands-on checkpoint
}

export interface Curriculum {
  careerId: string;
  intro: string;
  modules: CurriculumModule[];
}

// A specialisation within a career: either a technical "track" (e.g. front-end,
// back-end, mobile) or an industry "domain" (e.g. healthcare, logistics). It
// carries the signals that favour it and the content that tailors the result.
export interface SubPath {
  id: string;
  name: string;
  blurb: string;
  kind: "track" | "domain";
  // Signals — any overlap raises this sub-path's score for a person.
  industries?: string[];
  situations?: string[];
  motivations?: Motivation[];
  thinkingStyles?: ThinkingStyle[];
  buildPreference?: string[];
  // Tailoring.
  project: string; // niche portfolio / capstone project
  modules?: CurriculumModule[]; // niche modules inserted before the capstone
}

export type FlagTone = "good" | "note" | "caution";

export interface Flag {
  tone: FlagTone;
  title: string;
  detail: string;
}

export interface UserAnswers {
  motivationsTop3: Motivation[]; // ranked, top first
  situation: string;
  education: string;
  yearsExperience: string;
  weeklyHours: WeeklyHours;
  learningStyle: string[];
  pace: Pace;
  computerSkill: number; // 1 to 10
  toolsUsed: string[];
  hasLaptop: boolean;
  internet: Internet;
  excitingActivities: ThinkingStyle[];
  bestStatement: ThinkingStyle;
  rolePreference: RoleOrientation;
  industries: string[]; // sectors the person is drawn to
  buildPreference?: string; // reserved; no longer asked (track is chosen at the result)
}
