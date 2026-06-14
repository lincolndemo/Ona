// Builds a personalised, deterministic learning roadmap: three phases that take
// the person from foundations to a shipped portfolio project and first
// applications. Timeframes scale to the honest months estimate, so the plan
// reflects the hours the person actually has.

import type { Career, Resource, RoadmapPhase, UserAnswers } from "../data/types";
import {
  COMMUNITY_RESOURCES,
  JOB_RESOURCES,
  resourcesFor,
} from "../data/resources";
import { portfolioProjectFor } from "../data/roadmapContent";
import type { SkillsGap } from "./gap";

function humanList(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

function dedupeResources(resources: Resource[], cap = 3): Resource[] {
  const seen = new Set<string>();
  const out: Resource[] = [];
  for (const r of resources) {
    if (seen.has(r.url)) continue;
    seen.add(r.url);
    out.push(r);
    if (out.length === cap) break;
  }
  return out;
}

function gatherResources(skills: string[]): Resource[] {
  return dedupeResources(skills.flatMap((s) => resourcesFor(s)));
}

/** Three week-ranges that together span the honest months estimate. */
function timeframes(months: number): [string, string, string] {
  const totalWeeks = Math.max(3, months * 4);
  const a = Math.max(1, Math.round(totalWeeks / 3));
  const b = Math.max(a + 1, Math.round((totalWeeks * 2) / 3));
  return [`Weeks 1–${a}`, `Weeks ${a + 1}–${b}`, `Weeks ${b + 1}–${totalWeeks}`];
}

export function buildRoadmap(
  _user: UserAnswers,
  career: Career,
  gap: SkillsGap,
  projectOverride?: string,
): RoadmapPhase[] {
  // What to learn — the gap if there is one, otherwise deepen the core skills.
  const toLearn = gap.toBuild.length > 0 ? gap.toBuild : career.prerequisiteSkills;
  const firstSkills = toLearn.slice(0, 2);
  const laterSkills = toLearn.slice(2);
  const project = projectOverride ?? portfolioProjectFor(career.id);
  const [t1, t2, t3] = timeframes(gap.months);

  const phase1: RoadmapPhase = {
    id: "foundations",
    title: "Foundations",
    timeframe: t1,
    focus: `Get moving and learn the basics of ${humanList(firstSkills)}.`,
    milestones: [
      career.nextStep,
      `Learn the fundamentals of ${humanList(firstSkills)} with one focused resource each.`,
      "Set a fixed weekly study slot and protect it.",
    ],
    resources: gatherResources(firstSkills),
  };

  const phase2: RoadmapPhase = {
    id: "build",
    title: "Build for real",
    timeframe: t2,
    focus:
      laterSkills.length > 0
        ? `Round out ${humanList(laterSkills)} and start building.`
        : "Go deeper on your core skills and start building.",
    milestones: [
      laterSkills.length > 0
        ? `Work through ${humanList(laterSkills)}.`
        : "Deepen your core skills with a harder tutorial or course.",
      `Start your portfolio project: ${project}`,
      "Share your progress publicly and ask one person for feedback.",
    ],
    resources: dedupeResources([
      ...gatherResources(laterSkills),
      ...COMMUNITY_RESOURCES,
    ]),
  };

  const phase3: RoadmapPhase = {
    id: "prove",
    title: "Get visible and apply",
    timeframe: t3,
    focus: "Finish your proof of work and start putting yourself forward.",
    milestones: [
      "Finish and publish your portfolio project with a short write-up of what it shows.",
      "Update your CV and LinkedIn around this one project and skill set.",
      "Apply to three roles or pitch one client, and ask for feedback on every no.",
    ],
    resources: dedupeResources([...JOB_RESOURCES, ...COMMUNITY_RESOURCES]),
  };

  return [phase1, phase2, phase3];
}
