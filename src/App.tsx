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
import { downloadResultPdf } from "./pdf";
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
      curriculum: buildCurriculum(scored.career),
      branding: buildBranding(scored.career, gap),
    };
  }, [answers]);

  function handleDownload() {
    try {
      downloadResultPdf({
        career: scored.career,
        reasoning,
        gap,
        roadmap,
        curriculum,
        branding,
      });
    } catch (err) {
      console.error("PDF download failed", err);
      alert("Sorry — the PDF could not be generated. Please try again.");
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <div className="mb-6 flex justify-end">
        <button onClick={handleDownload} className="btn-secondary !px-5 !py-2.5">
          <DownloadIcon className="h-4 w-4" />
          Download as PDF
        </button>
      </div>
      <Recommendation career={scored.career} reasoning={reasoning} />
      <Flags flags={flags} />
      <SkillsGap gap={gap} />
      <NextStep text={scored.career.nextStep} />
      <Roadmap phases={roadmap} />
      <Curriculum curriculum={curriculum} />
      <BrandingCoach branding={branding} />
      <EmailCapture careerId={scored.career.id} />

      <div className="mt-14 flex flex-col items-center gap-4 border-t border-black/10 pt-6">
        <button onClick={handleDownload} className="btn-secondary !px-5 !py-2.5">
          <DownloadIcon className="h-4 w-4" />
          Download as PDF
        </button>
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

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
