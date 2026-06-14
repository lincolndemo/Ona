// Standalone "AI for my Path" page, reachable from the home menu. Users pick any
// path to see how AI applies to it. If they've completed the assessment, it
// defaults to their matched career.

import { useMemo, useState } from "react";
import { CAREERS } from "../data/careers";
import { aiGuideFor } from "../data/aiGuides";
import { isComplete } from "../data/questions";
import { topMatch } from "../engine/match";
import type { UserAnswers } from "../data/types";
import { AiForPath } from "./AiForPath";
import { PageNav } from "./PageNav";

interface AiForPathPageProps {
  answers: Record<string, unknown>;
  onHome: () => void;
  onStart: () => void;
  onOpenBranding: () => void;
  onOpenOpportunities: () => void;
}

export function AiForPathPage({
  answers,
  onHome,
  onStart,
  onOpenBranding,
  onOpenOpportunities,
}: AiForPathPageProps) {
  const completed = isComplete(answers);
  const matchedId = useMemo(
    () => (completed ? topMatch(answers as unknown as UserAnswers).career.id : null),
    [answers, completed],
  );

  const [pickedId, setPickedId] = useState<string>(matchedId ?? CAREERS[0].id);
  const career = CAREERS.find((c) => c.id === pickedId)!;
  const guide = aiGuideFor(pickedId);

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-6 pb-12">
      <PageNav
        onHome={onHome}
        onOpenOpportunities={onOpenOpportunities}
        onOpenBranding={onOpenBranding}
      />

      <h1 className="text-4xl font-bold tracking-tight text-black">AI for my path</h1>
      <p className="mt-2 text-base text-zinc-500">
        How AI shows up in a field, what to use it for, and what to learn to get
        ahead.
      </p>

      <div className="card animate-fade-up mt-5 p-5">
        <label className="block">
          <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">
            Show AI for this path
          </span>
          <select
            value={pickedId}
            onChange={(e) => setPickedId(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-base text-black outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
          >
            {CAREERS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        {!completed && (
          <p className="mt-3 text-sm text-zinc-600">
            <button
              onClick={onStart}
              className="font-semibold text-navy underline underline-offset-4 hover:text-black"
            >
              Take the assessment
            </button>{" "}
            to land on the path that fits you.
          </p>
        )}
      </div>

      <AiForPath key={career.id} guide={guide} careerName={career.name} />
    </div>
  );
}
