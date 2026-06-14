// Persona validation suite: a table of "this kind of person should land near
// this path". It guards the career DATA (affinities, motivations, weights) against
// regressions as the library grows — distinct from the unit tests, which guard
// the engine logic. `top` = must be the #1 match; `top3` = must be a strong
// option (within the first three).

import { describe, it, expect } from "vitest";
import { rankCareers } from "./match";
import { answers } from "./fixtures";
import type { UserAnswers } from "../data/types";

interface Persona {
  name: string;
  answers: Partial<UserAnswers>;
  top?: string; // expected #1
  top3?: string; // expected within top 3
}

const PERSONAS: Persona[] = [
  {
    name: "Accountant who loves analysing data",
    answers: {
      situation: "accountant",
      excitingActivities: ["analysing", "organising"],
      bestStatement: "analysing",
      rolePreference: "technical",
      weeklyHours: "10-20",
      toolsUsed: ["Excel", "SQL", "Power BI"],
      motivationsTop3: ["income", "growth", "future_proof"],
      industries: ["fintech"],
      buildPreference: "backend",
    },
    top: "data_analyst",
  },
  {
    name: "Analytical graduate who prefers technical work",
    answers: {
      situation: "graduate",
      excitingActivities: ["analysing"],
      bestStatement: "analysing",
      rolePreference: "technical",
      toolsUsed: [],
      industries: [],
      buildPreference: "not_sure",
    },
    top: "data_analyst",
  },
  {
    name: "Business owner who bridges business and tech",
    answers: {
      situation: "business_owner",
      excitingActivities: ["analysing", "organising", "solving"],
      bestStatement: "organising",
      rolePreference: "hybrid",
      toolsUsed: ["Excel"],
      motivationsTop3: ["growth", "income", "security"],
      industries: ["logistics"],
      buildPreference: "people",
    },
    top: "business_analyst",
  },
  {
    name: "Engineer who loves building software",
    answers: {
      situation: "engineer",
      excitingActivities: ["building", "solving"],
      bestStatement: "building",
      rolePreference: "technical",
      weeklyHours: "20+",
      toolsUsed: ["Python", "GitHub"],
      motivationsTop3: ["income", "remote", "international"],
      buildPreference: "web",
    },
    top: "software_developer",
  },
  {
    name: "Systems-minded engineer drawn to infrastructure",
    answers: {
      situation: "engineer",
      excitingActivities: ["building", "organising"],
      bestStatement: "organising",
      rolePreference: "technical",
      weeklyHours: "20+",
      toolsUsed: ["Python", "GitHub"],
      motivationsTop3: ["income", "international", "future_proof"],
      buildPreference: "backend",
    },
    top3: "cloud_engineer",
  },
  {
    name: "Researcher drawn to security and threats",
    answers: {
      situation: "graduate",
      excitingActivities: ["analysing", "researching", "solving"],
      bestStatement: "researching",
      rolePreference: "technical",
      weeklyHours: "20+",
      toolsUsed: ["Python"],
      motivationsTop3: ["security", "income", "future_proof"],
      industries: ["fintech"],
      buildPreference: "backend",
    },
    top3: "cybersecurity_analyst",
  },
  {
    name: "Organiser who guides teams, non-technical",
    answers: {
      situation: "business_owner",
      excitingActivities: ["organising", "solving", "selling"],
      bestStatement: "organising",
      rolePreference: "non_technical",
      toolsUsed: ["Excel", "Canva"],
      motivationsTop3: ["growth", "income", "entrepreneurship"],
      buildPreference: "people",
    },
    top: "product_manager",
  },
  {
    name: "Teacher who loves teaching, non-technical",
    answers: {
      situation: "teacher",
      excitingActivities: ["teaching", "organising"],
      bestStatement: "teaching",
      rolePreference: "non_technical",
      toolsUsed: ["ChatGPT", "Canva", "Google Workspace"],
      motivationsTop3: ["interest", "flexibility", "growth"],
      industries: ["education"],
      buildPreference: "people",
    },
    top: "ai_trainer",
  },
  {
    name: "Tinkerer who loves testing AI prompts",
    answers: {
      situation: "graduate",
      excitingActivities: ["analysing", "building", "researching"],
      bestStatement: "building",
      rolePreference: "hybrid",
      toolsUsed: ["ChatGPT", "Python"],
      motivationsTop3: ["interest", "remote", "future_proof"],
      industries: ["media"],
      buildPreference: "backend",
    },
    top3: "prompt_engineer",
  },
  {
    name: "Marketing pro who loves data and selling",
    answers: {
      situation: "marketing_professional",
      excitingActivities: ["analysing", "selling", "organising"],
      bestStatement: "selling",
      rolePreference: "non_technical",
      toolsUsed: ["Excel", "Canva", "Google Workspace"],
      motivationsTop3: ["growth", "income", "entrepreneurship"],
      industries: ["ecommerce"],
      buildPreference: "people",
    },
    top: "marketing_analyst",
  },
  {
    name: "Creative who loves designing experiences",
    answers: {
      situation: "graduate",
      excitingActivities: ["designing", "solving", "researching"],
      bestStatement: "designing",
      rolePreference: "hybrid",
      toolsUsed: ["Canva"],
      motivationsTop3: ["interest", "remote", "growth"],
      buildPreference: "web",
    },
    top: "product_designer",
  },
  {
    name: "Freelancer who loves automating workflows",
    answers: {
      situation: "freelancer",
      excitingActivities: ["building", "solving", "organising"],
      bestStatement: "building",
      rolePreference: "hybrid",
      toolsUsed: ["ChatGPT", "Excel"],
      motivationsTop3: ["entrepreneurship", "flexibility", "income"],
      industries: ["ecommerce"],
      buildPreference: "backend",
    },
    top3: "automation_specialist",
  },
  {
    name: "Teacher who loves data about learning",
    answers: {
      situation: "teacher",
      excitingActivities: ["analysing", "teaching", "organising"],
      bestStatement: "analysing",
      rolePreference: "hybrid",
      toolsUsed: ["Excel", "Power BI"],
      motivationsTop3: ["growth", "interest", "future_proof"],
      industries: ["education"],
      buildPreference: "backend",
    },
    top3: "learning_analytics",
  },
];

describe("persona validation", () => {
  for (const persona of PERSONAS) {
    it(persona.name, () => {
      const ranked = rankCareers(answers(persona.answers));
      const ids = ranked.map((r) => r.career.id);
      if (persona.top) {
        expect(ids[0]).toBe(persona.top);
      }
      if (persona.top3) {
        expect(ids.slice(0, 3)).toContain(persona.top3);
      }
    });
  }
});
