// Standalone Personal Branding Coach, reachable from the home-page menu. Users
// can pick any role/path. If they have completed the assessment, branding is
// personalised to the skills they actually hold for whichever path they choose;
// otherwise it's a preview, with a nudge to take the assessment.

import { useMemo, useState } from "react";
import { CAREERS } from "../data/careers";
import { isComplete } from "../data/questions";
import type { SkillsGap } from "../engine/gap";
import { computeGap } from "../engine/gap";
import { topMatch } from "../engine/match";
import { buildBranding } from "../engine/branding";
import type { UserAnswers } from "../data/types";
import { BrandingCoach } from "./BrandingCoach";
import { OnaMark } from "./OnaMark";

interface BrandingPageProps {
  answers: Record<string, unknown>;
  onHome: () => void;
  onStart: () => void;
}

// A preview gap when there is no assessment: treat every prerequisite as still
// to build, since we don't know what the person already holds.
function previewGap(careerId: string): SkillsGap {
  const career = CAREERS.find((c) => c.id === careerId)!;
  return {
    have: [],
    toBuild: career.prerequisiteSkills,
    months: career.baseMonthsAt10hrs,
  };
}

export function BrandingPage({ answers, onHome, onStart }: BrandingPageProps) {
  const completed = isComplete(answers);

  // Their matched career, if the assessment is done — used as the default pick.
  const matchedId = useMemo(
    () => (completed ? topMatch(answers as unknown as UserAnswers).career.id : null),
    [answers, completed],
  );

  const [pickedId, setPickedId] = useState<string>(
    matchedId ?? CAREERS[0].id,
  );

  const { career, branding } = useMemo(() => {
    const career = CAREERS.find((c) => c.id === pickedId)!;
    const gap = completed
      ? computeGap(answers as unknown as UserAnswers, career)
      : previewGap(pickedId);
    return { career, branding: buildBranding(career, gap) };
  }, [pickedId, completed, answers]);

  const isMatch = completed && pickedId === matchedId;

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-6">
      {/* Header */}
      <header className="flex items-center justify-between py-6">
        <button onClick={onHome} className="flex items-center gap-2.5" aria-label="Back to home">
          <OnaMark className="h-8 w-8 text-navy" />
          <span className="text-xl font-bold tracking-tight text-navy">Ona</span>
        </button>
        <button onClick={onHome} className="btn-ghost !px-4 !py-2">
          ← Home
        </button>
      </header>

      <h1 className="text-4xl font-bold tracking-tight text-black">
        Personal branding coach
      </h1>
      <p className="mt-2 text-base text-zinc-500">
        How to show up online so the right people find you. Copy, tweak, post.
      </p>

      {/* Path picker */}
      <div className="card animate-fade-up mt-5 p-5">
        <label className="block">
          <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">
            Brand me for this path
          </span>
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <select
              value={pickedId}
              onChange={(e) => setPickedId(e.target.value)}
              className="flex-1 rounded-xl border border-black/15 bg-white px-4 py-3 text-base text-black outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
            >
              {CAREERS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {isMatch && (
              <span className="rounded-full bg-soft-green px-3 py-1 font-mono text-xs uppercase tracking-wider text-emerald-700">
                Your match
              </span>
            )}
          </div>
        </label>

        <p className="mt-3 text-sm text-zinc-600">
          {completed ? (
            isMatch ? (
              <>Branded around your matched path and the skills from your assessment.</>
            ) : (
              <>Exploring a different path — still using the skills from your assessment.</>
            )
          ) : (
            <>
              This is a preview.{" "}
              <button
                onClick={onStart}
                className="font-semibold text-navy underline underline-offset-4 hover:text-black"
              >
                Take the 5-minute assessment
              </button>{" "}
              to brand around the skills you already have.
            </>
          )}
        </p>
      </div>

      {/* The coach itself */}
      <div className="-mt-2 pb-12">
        <BrandingCoach key={career.id} branding={branding} />
      </div>
    </div>
  );
}
