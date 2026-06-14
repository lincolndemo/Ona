// Personal Branding Coach: turns the matched career and skills gap into ready-to-
// use branding copy — a headline, an about/bio paragraph, a posting plan, and
// tips. Deterministic and copy-ready; no model calls.

import type { Branding, Career, SubPath } from "../data/types";
import { portfolioProjectFor } from "../data/roadmapContent";
import type { SkillsGap } from "./gap";

function article(word: string): string {
  return /^[aeiou]/i.test(word) ? "an" : "a";
}

function humanList(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

function stripPeriod(text: string): string {
  return text.replace(/\.\s*$/, "");
}

export function buildBranding(
  career: Career,
  gap: SkillsGap,
  subPath?: SubPath | null,
): Branding {
  // What they are actively learning shapes the story; fall back to core skills.
  const focusSkills = (gap.toBuild.length > 0 ? gap.toBuild : career.prerequisiteSkills).slice(0, 3);
  const firstSkill = focusSkills[0] ?? "the fundamentals";
  const project = subPath?.project ?? portfolioProjectFor(career.id);
  // Brand around the specialisation when there is one — it's sharper and more
  // hireable than the generic career title.
  const name = subPath?.name ?? career.name;
  const descriptor = subPath?.blurb ?? career.oneLiner;
  const an = article(name);

  const headline = `Aspiring ${name} · ${stripPeriod(descriptor)} · Learning in public`;

  const bio = [
    `I'm building toward a career as ${an} ${name}. ${descriptor}`,
    `Right now I'm focused on ${humanList(focusSkills)}, and I'm documenting the journey as I build ${project}.`,
    `Always glad to connect with people learning the same things — or hiring for them.`,
  ].join("\n\n");

  const posts = [
    {
      title: "Introduce your why",
      prompt: `Write a short post on why you're moving into ${name} work and what you hope to build. People follow journeys, not résumés.`,
    },
    {
      title: "Learn in public",
      prompt: `Each week, post one thing you learned — start with ${firstSkill}. Teaching what you just learned proves it and grows an audience.`,
    },
    {
      title: "Show your work",
      prompt: `When you finish ${project}, post it: what you built, what was hard, and what you'd do next. This is the post that gets you noticed.`,
    },
  ];

  const tips = [
    "Pick one platform and be consistent there — LinkedIn is where most Nigerian tech hiring happens — before spreading yourself thin.",
    "Use a clear photo and the same name everywhere, so someone who meets you once can actually find you again.",
    "Engage before you broadcast: leave a thoughtful comment on a few posts for every one you publish.",
    "Show proof, not just certificates. A finished project beats a list of courses every time.",
  ];

  return { headline, bio, posts, tips };
}
