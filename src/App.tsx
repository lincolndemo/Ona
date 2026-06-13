// Top-level flow controller: landing → assessment → result. Answers and the
// current question index are mirrored to localStorage so a refresh resumes.
// The matching engine runs client-side and is fully deterministic.

import { useEffect, useMemo, useState } from "react";
import { Landing } from "./components/Landing";
import { Assessment } from "./components/Assessment";
import { Recommendation } from "./components/Recommendation";
import { SkillsGap } from "./components/SkillsGap";
import { NextStep } from "./components/NextStep";
import { EmailCapture } from "./components/EmailCapture";
import type { UserAnswers } from "./data/types";
import { topMatch } from "./engine/match";
import { buildReasoning } from "./engine/reasoning";
import { computeGap } from "./engine/gap";
import {
  clearProgress,
  loadAnswers,
  loadQuestionIndex,
  saveAnswers,
  saveQuestionIndex,
} from "./storage";

type Stage = "landing" | "assessment" | "result";

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
  // Deterministic: same answers always yield the same match, reasoning, and gap.
  const { scored, reasoning, gap } = useMemo(() => {
    const scored = topMatch(answers);
    return {
      scored,
      reasoning: buildReasoning(answers, scored),
      gap: computeGap(answers, scored.career),
    };
  }, [answers]);

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <Recommendation career={scored.career} reasoning={reasoning} />
      <SkillsGap gap={gap} />
      <NextStep text={scored.career.nextStep} />
      <EmailCapture careerId={scored.career.id} />

      <div className="mt-12 border-t border-slate-200 pt-6 text-center">
        <button
          type="button"
          onClick={onStartOver}
          className="text-sm font-medium text-slate-500 underline-offset-4 hover:text-slate-700 hover:underline"
        >
          Start over
        </button>
      </div>
    </div>
  );
}
