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
import { AiForPathPage } from "./components/AiForPathPage";
import { AiForPath } from "./components/AiForPath";
import { PageNav } from "./components/PageNav";
import { ResultHero } from "./components/ResultHero";
import { ResultNav } from "./components/ResultNav";
import type { NavSection } from "./components/ResultNav";
import { Confetti } from "./components/Confetti";
import { SubPathChooser } from "./components/SubPathChooser";
import { MatchBreakdown } from "./components/MatchBreakdown";
import { ShareResult } from "./components/ShareResult";
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
import { rankSubPaths, subPathReason } from "./engine/subpath";
import { explainMatch } from "./engine/breakdown";
import { aiGuideFor } from "./data/aiGuides";
import { downloadResultPdf } from "./pdf";
import { readSharedAnswers } from "./shareLink";
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
  | "opportunities"
  | "ai";

type Answers = Record<string, unknown>;

export default function App() {
  // A shared link (?r=…) reconstructs someone's result on open.
  const shared = useMemo(() => readSharedAnswers(), []);

  const [stage, setStage] = useState<Stage>(shared ? "result" : "landing");
  const [answers, setAnswers] = useState<Answers>(
    () => (shared as Answers | null) ?? loadAnswers() ?? {},
  );
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

  // Drop a shared-link param so a reload doesn't resurrect someone else's result.
  function clearShareParam() {
    if (typeof window !== "undefined" && window.location.search) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }

  function handleStartFresh() {
    clearProgress();
    clearShareParam();
    setAnswers({});
    setIndex(0);
    setStage("assessment");
  }

  function handleResume() {
    setStage("assessment");
  }

  function handleStartOver() {
    clearProgress();
    clearShareParam();
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
        onOpenAi={() => setStage("ai")}
      />
    );
  }

  if (stage === "branding") {
    return (
      <BrandingPage
        answers={answers}
        onHome={() => setStage("landing")}
        onStart={handleStartFresh}
        onOpenOpportunities={() => setStage("opportunities")}
      />
    );
  }

  if (stage === "opportunities") {
    return (
      <OpportunityScanner
        answers={answers}
        onHome={() => setStage("landing")}
        onStart={handleStartFresh}
        onOpenBranding={() => setStage("branding")}
      />
    );
  }

  if (stage === "ai") {
    return (
      <AiForPathPage
        answers={answers}
        onHome={() => setStage("landing")}
        onStart={handleStartFresh}
        onOpenBranding={() => setStage("branding")}
        onOpenOpportunities={() => setStage("opportunities")}
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

  return (
    <Result
      answers={answers as unknown as UserAnswers}
      onStartOver={handleStartOver}
      onHome={() => setStage("landing")}
      onOpenBranding={() => setStage("branding")}
      onOpenOpportunities={() => setStage("opportunities")}
      onOpenAi={() => setStage("ai")}
    />
  );
}

function Result({
  answers,
  onStartOver,
  onHome,
  onOpenBranding,
  onOpenOpportunities,
  onOpenAi,
}: {
  answers: UserAnswers;
  onStartOver: () => void;
  onHome: () => void;
  onOpenBranding: () => void;
  onOpenOpportunities: () => void;
  onOpenAi: () => void;
}) {
  // Career-level results — stable for a given set of answers.
  const { scored, reasoning, gap, flags, ranked, breakdown } = useMemo(() => {
    const scored = topMatch(answers);
    const gap = computeGap(answers, scored.career);
    return {
      scored,
      gap,
      reasoning: buildReasoning(answers, scored),
      flags: buildFlags(answers, scored.career, gap),
      ranked: rankSubPaths(answers, scored.career),
      breakdown: explainMatch(answers, scored),
    };
  }, [answers]);

  // The chosen specialisation — defaults to the best fit, switchable below.
  const [subId, setSubId] = useState<string | null>(
    () => ranked[0]?.subPath.id ?? null,
  );
  const selectedSub =
    ranked.find((r) => r.subPath.id === subId)?.subPath ?? ranked[0]?.subPath ?? null;

  // Content tailored to the selected specialisation.
  const { roadmap, curriculum, branding } = useMemo(
    () => ({
      roadmap: buildRoadmap(answers, scored.career, gap, selectedSub?.project),
      curriculum: buildCurriculum(scored.career, selectedSub),
      branding: buildBranding(scored.career, gap, selectedSub),
    }),
    [answers, scored.career, gap, selectedSub],
  );

  function handleDownload() {
    try {
      downloadResultPdf({
        career: scored.career,
        subPath: selectedSub,
        reasoning,
        gap,
        roadmap,
        curriculum,
        aiGuide: aiGuideFor(scored.career.id),
        branding,
      });
    } catch (err) {
      console.error("PDF download failed", err);
      alert("Sorry — the PDF could not be generated. Please try again.");
    }
  }

  // Scroll-spy: highlight the section currently in view.
  const [activeId, setActiveId] = useState(RESULT_SECTIONS[0].id);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.1, 0.5, 1] },
    );
    for (const s of RESULT_SECTIONS) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  function jump(id: string) {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }

  return (
    <div className="mx-auto max-w-2xl px-6 pb-28 sm:pb-10">
      <Confetti />
      <PageNav
        onHome={onHome}
        onOpenOpportunities={onOpenOpportunities}
        onOpenBranding={onOpenBranding}
        onOpenAi={onOpenAi}
      />

      <ResultHero
        career={scored.career}
        subPath={selectedSub}
        matchValue={scored.total}
        onDownload={handleDownload}
        onShare={() => jump("share")}
      />

      <ResultNav sections={RESULT_SECTIONS} activeId={activeId} onJump={jump} />

      <div id="overview" className="scroll-mt-24">
        <SubPathChooser
          ranked={ranked}
          selectedId={selectedSub?.id ?? null}
          onSelect={setSubId}
          reason={selectedSub ? subPathReason(answers, selectedSub) : ""}
        />
        <div className="mt-8">
          <Recommendation career={scored.career} reasoning={reasoning} showHeader={false} />
        </div>
        <MatchBreakdown items={breakdown} />
      </div>
      <div id="situation" className="scroll-mt-24">
        <Flags flags={flags} />
      </div>
      <div id="skills" className="scroll-mt-24">
        <SkillsGap gap={gap} />
      </div>
      <div id="next" className="scroll-mt-24">
        <NextStep text={scored.career.nextStep} />
      </div>
      <div id="roadmap" className="scroll-mt-24">
        <Roadmap phases={roadmap} />
      </div>
      <div id="curriculum" className="scroll-mt-24">
        <Curriculum curriculum={curriculum} />
      </div>
      <div id="ai" className="scroll-mt-24">
        <AiForPath guide={aiGuideFor(scored.career.id)} careerName={scored.career.name} />
      </div>
      <div id="branding" className="scroll-mt-24">
        <BrandingCoach branding={branding} />
      </div>
      <div id="share" className="scroll-mt-24">
        <ShareResult
          answers={answers}
          career={scored.career}
          subPath={selectedSub}
          matchValue={scored.total}
        />
      </div>
      <EmailCapture careerId={scored.career.id} />

      <div className="mt-14 flex flex-col items-center gap-4 border-t border-black/10 pt-6">
        <button
          type="button"
          onClick={onStartOver}
          className="font-mono text-xs uppercase tracking-wider text-zinc-400 transition hover:text-black"
        >
          Start over
        </button>
      </div>

      {/* Sticky mobile action bar */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t border-black/10 bg-white/90 px-4 py-3 backdrop-blur sm:hidden"
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      >
        <button onClick={onHome} className="btn-secondary pressable flex-1 !py-3">
          Home
        </button>
        <button onClick={handleDownload} className="btn-primary pressable flex-1 !py-3">
          <DownloadIcon className="h-4 w-4" />
          PDF
        </button>
      </div>
    </div>
  );
}

const RESULT_SECTIONS: NavSection[] = [
  { id: "overview", label: "Overview" },
  { id: "situation", label: "Situation" },
  { id: "skills", label: "Skills" },
  { id: "next", label: "This week" },
  { id: "roadmap", label: "Roadmap" },
  { id: "curriculum", label: "Curriculum" },
  { id: "ai", label: "AI" },
  { id: "branding", label: "Branding" },
  { id: "share", label: "Share" },
];

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
