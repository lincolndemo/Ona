// Serves the authored, career-specific curriculum. Curricula are content
// (src/data/curricula.ts); this just looks one up with a safe generic fallback
// for any career that has not been authored yet.

import type { Career, Curriculum, SubPath } from "../data/types";
import { CURRICULA } from "../data/curricula";
import { resourcesFor } from "../data/resources";
import { portfolioProjectFor } from "../data/roadmapContent";

function genericCurriculum(career: Career): Curriculum {
  return {
    careerId: career.id,
    intro: `A starting path for ${career.name}. Work through each skill in order, then build the capstone.`,
    modules: [
      ...career.prerequisiteSkills.map((skill, i) => ({
        id: `skill-${i}`,
        title: skill.charAt(0).toUpperCase() + skill.slice(1),
        summary: `${skill} is one of the building blocks this role runs on.`,
        topics: [
          `Understand what ${skill} is and where it's used`,
          `Practise ${skill} on a small, real example`,
        ],
        resources: resourcesFor(skill),
        project: `Make something small that shows ${skill}.`,
      })),
      {
        id: "capstone",
        title: "Capstone project",
        summary: "Bring the skills together into one piece of proof an employer can see.",
        topics: ["Plan it", "Build it", "Publish it"],
        resources: [],
        project: `Build ${portfolioProjectFor(career.id)}.`,
      },
    ],
  };
}

export function buildCurriculum(career: Career, subPath?: SubPath | null): Curriculum {
  const base = CURRICULA[career.id] ?? genericCurriculum(career);
  if (!subPath) return base;

  // Tailor to the sub-path: insert its niche modules before the capstone and
  // point the capstone at the niche project.
  const capstoneIdx = base.modules.findIndex((m) => m.id === "capstone");
  const insertAt = capstoneIdx === -1 ? base.modules.length : capstoneIdx;

  const modules = [...base.modules];
  if (subPath.modules?.length) {
    modules.splice(insertAt, 0, ...subPath.modules);
  }

  const tailored = modules.map((m) =>
    m.id === "capstone" ? { ...m, project: subPath.project } : m,
  );

  return {
    careerId: base.careerId,
    intro: `${base.intro} Tailored to ${subPath.name}.`,
    modules: tailored,
  };
}
