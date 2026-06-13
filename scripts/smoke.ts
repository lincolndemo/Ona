// Quick engine smoke test (not a shipped artifact): verifies determinism and a
// couple of sane matches. Run via esbuild bundle + node.

import type { UserAnswers } from "../src/data/types";
import { rankCareers, topMatch } from "../src/engine/match";
import { buildReasoning } from "../src/engine/reasoning";
import { computeGap } from "../src/engine/gap";

const teacherWantsTeaching: UserAnswers = {
  motivationsTop3: ["interest", "flexibility", "growth"],
  situation: "teacher",
  education: "degree",
  yearsExperience: "5_10",
  weeklyHours: "5-10",
  learningStyle: ["videos", "community"],
  pace: "moderate",
  computerSkill: 6,
  toolsUsed: ["ChatGPT", "Canva", "Google Workspace"],
  hasLaptop: true,
  internet: "good",
  excitingActivities: ["teaching", "organising"],
  bestStatement: "teaching",
  rolePreference: "non_technical",
};

const builderWantsCode: UserAnswers = {
  motivationsTop3: ["income", "remote", "international"],
  situation: "engineer",
  education: "degree",
  yearsExperience: "under_2",
  weeklyHours: "20+",
  learningStyle: ["projects"],
  pace: "fast",
  computerSkill: 8,
  toolsUsed: ["Python", "GitHub"],
  hasLaptop: true,
  internet: "excellent",
  excitingActivities: ["building", "solving"],
  bestStatement: "building",
  rolePreference: "technical",
};

function report(name: string, user: UserAnswers) {
  const a = topMatch(user);
  const b = topMatch(user);
  const deterministic = a.career.id === b.career.id && a.total === b.total;
  const gap = computeGap(user, a.career);
  console.log(`\n=== ${name} ===`);
  console.log("top:", a.career.name, "score:", a.total.toFixed(4));
  console.log("deterministic:", deterministic);
  console.log("reasoning:", buildReasoning(user, a));
  console.log("gap.have:", gap.have.join(", "));
  console.log("gap.toBuild:", gap.toBuild.join(", "));
  console.log("months:", gap.months);
  console.log(
    "ranking:",
    rankCareers(user)
      .slice(0, 3)
      .map((s) => `${s.career.name}(${s.total.toFixed(3)})`)
      .join("  >  "),
  );
}

report("Teacher → teaching, non-technical", teacherWantsTeaching);
report("Engineer → building, technical, 20+ hrs", builderWantsCode);
