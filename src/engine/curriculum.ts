// Builds a followable curriculum from the matched career: one module per
// prerequisite skill, in order, plus a capstone. Each module carries learning
// outcomes, free resources and a checkpoint. Modules the person likely already
// holds are marked so they can move faster through them. Deterministic.

import type { Career, Curriculum, CurriculumModule } from "../data/types";
import { resourcesFor } from "../data/resources";
import { portfolioProjectFor } from "../data/roadmapContent";
import type { SkillsGap } from "./gap";

function capitalise(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function slug(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function buildCurriculum(career: Career, gap: SkillsGap): Curriculum {
  const skillModules: CurriculumModule[] = career.prerequisiteSkills.map(
    (skill, i) => ({
      id: slug(skill),
      order: i + 1,
      title: capitalise(skill),
      focus: `${capitalise(skill)} is one of the building blocks this role runs on.`,
      outcomes: [
        `Understand what ${skill} is and where a ${career.name} uses it.`,
        `Practise ${skill} on one small, real example.`,
        `Produce something small that shows ${skill}.`,
      ],
      resources: resourcesFor(skill),
      status: gap.toBuild.includes(skill) ? "learn" : "have",
      checkpoint: `You can point to one thing you made that uses ${skill}.`,
    }),
  );

  const capstone: CurriculumModule = {
    id: "capstone",
    order: skillModules.length + 1,
    title: "Capstone project",
    focus: "Bring the modules together into one piece of proof an employer can see.",
    outcomes: [
      `Build ${portfolioProjectFor(career.id)}.`,
      "Write a short note on what it shows and what was hard.",
      "Publish it publicly and add it to your CV and LinkedIn.",
    ],
    resources: [],
    status: "learn",
    checkpoint: "Your capstone is finished, public and linked from your profile.",
  };

  return { modules: [...skillModules, capstone] };
}
