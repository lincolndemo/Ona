// Top-level flow controller: landing → assessment → result. Answers and the
// current question index are mirrored to localStorage so a refresh resumes.
// The matching engine runs client-side and is fully deterministic.

import { useEffect, useMemo, useState } from "react";
import { Landing } from "./components/Landing";
import { Assessment } from "./components/Assessment";
import { Recommendation } from "./components/Recommendation";
import { Flags } from "./components/Flags";
import { SkillsGap } from "./components/SkillsGap";
import { Roadmap } from "./components/Roadmap";
import { Curriculum } from "./components/Curriculum";
import { BrandingCoach } from "./components/BrandingCoach";
import { BrandingPage } from "./components/BrandingPage";
import { OpportunityScanner } from "./components/OpportunityScanner";
import { NextStep } from "./components/NextStep";
import { EmailCapture } from "./components/EmailCapture";
import type { UserAnswers } from "./data/types";
import { topMatch } from "./engine/match";
import { buildReasoning } from "./engine/reasoning";
import { computeGap } from "./engine/gap";
import { buildFlags } from "./engine/flags";
import { buildRoadmap } from "./engine/roadmap";
import { buildCurriculum } from "./engine/curriculum";
import { buildBranding } from "./engine/branding";
import {
  clearProgress,
  loadAnswers,
  loadQuestionIndex,
  saveAnswers,
  saveQuestionIndex,
} from "./storage";

type Stage =
  | "landing"
  | "assessment"
  | "result"
  | "branding"
  | "opportunities";

type Answers = Record<string, unknown>;

export default function App() {
  const [stage, setStage] = useState<Stage>("landing");
  const [answers, setAnswers] = useState<Answers>(() => loadAnswers() ?? {});
  const [index, setIndex] = useState<number>(() => loadQuestionIndex());

  const hasProgress = index > 0 || Object.keys(answers).length > 0;

  // Mirror progress to storage so a refresh during the assessment resumes.
  useEffect(() => {
    saveAnswers(answers);
  }, [answers]);

  useEffect(() => {
    saveQuestionIndex(index);
  }, [index]);

  function handleAnswer(field: string, value: unknown) {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  }

  function handleStartFresh() {
    clearProgress();
    setAnswers({});
    setIndex(0);
    setStage("assessment");
  }

  function handleResume() {
    setStage("assessment");
  }

  function handleStartOver() {
    clearProgress();
    setAnswers({});
    setIndex(0);
    setStage("landing");
  }

  if (stage === "landing") {
    return (
      <Landing
        onStart={handleStartFresh}
        hasProgress={hasProgress}
        onResume={handleResume}
        onOpenBranding={() => setStage("branding")}
        onOpenOpportunities={() => setStage("opportunities")}
      />
    );
  }

  if (stage === "branding") {
    return (
      <BrandingPage
        answers={answers}
        onHome={() => setStage("landing")}
        onStart={handleStartFresh}
      />
    );
  }

  if (stage === "opportunities") {
    return (
      <OpportunityScanner
        answers={answers}
        onHome={() => setStage("landing")}
        onStart={handleStartFresh}
      />
    );
  }

  if (stage === "assessment") {
    return (
      <Assessment
        answers={answers}
        index={index}
        onAnswer={handleAnswer}
        onIndexChange={setIndex}
        onComplete={() => setStage("result")}
        onExit={() => setStage("landing")}
      />
    );
  }

  return <Result answers={answers as unknown as UserAnswers} onStartOver={handleStartOver} />;
}

function Result({
  answers,
  onStartOver,
}: {
  answers: UserAnswers;
  onStartOver: () => void;
}) {
  // Deterministic: same answers always yield the same match, reasoning, gap,
  // flags, and roadmap.
  const { scored, reasoning, gap, flags, roadmap, curriculum, branding } =
    useMemo(() => {
    const scored = topMatch(answers);
    const gap = computeGap(answers, scored.career);
    return {
      scored,
      gap,
      reasoning: buildReasoning(answers, scored),
      flags: buildFlags(answers, scored.career, gap),
      roadmap: buildRoadmap(answers, scored.career, gap),
      curriculum: buildCurriculum(scored.career, gap),
      branding: buildBranding(scored.career, gap),
    };
  }, [answers]);

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <Recommendation career={scored.career} reasoning={reasoning} />
      <Flags flags={flags} />
      <SkillsGap gap={gap} />
      <NextStep text={scored.career.nextStep} />
      <Roadmap phases={roadmap} />
      <Curriculum curriculum={curriculum} />
      <BrandingCoach branding={branding} />
      <EmailCapture careerId={scored.career.id} />

      <div className="mt-14 border-t border-black/10 pt-6 text-center">
        <button
          type="button"
          onClick={onStartOver}
          className="font-mono text-xs uppercase tracking-wider text-zinc-400 transition hover:text-black"
        >
          Start over
        </button>
      </div>
    </div>
  );
}
