// Drives the assessment: one question per screen, progress, back navigation,
// and per-question validation. State lives in App so a refresh can resume; this
// component reports answers and index changes upward.

import { QUESTIONS, TOTAL_QUESTIONS, isAnswered } from "../data/questions";
import { QuestionCard } from "./QuestionCard";

interface AssessmentProps {
  answers: Record<string, unknown>;
  index: number;
  onAnswer: (field: string, value: unknown) => void;
  onIndexChange: (index: number) => void;
  onComplete: () => void;
  onExit: () => void;
}

export function Assessment({
  answers,
  index,
  onAnswer,
  onIndexChange,
  onComplete,
  onExit,
}: AssessmentProps) {
  const question = QUESTIONS[index];
  const rawValue = answers[question.field];

  // A slider shows a midpoint by default; treat that as a deliberate, valid
  // answer so the person is not forced to nudge it to continue.
  const sliderDefault =
    question.type === "slider"
      ? Math.round(((question.min ?? 1) + (question.max ?? 10)) / 2)
      : undefined;
  const value =
    question.type === "slider" && rawValue === undefined
      ? sliderDefault
      : rawValue;

  const answered = isAnswered(question, value);
  const isLast = index === TOTAL_QUESTIONS - 1;
  const progress = ((index + 1) / TOTAL_QUESTIONS) * 100;

  function handleChange(next: unknown) {
    onAnswer(question.field, next);
  }

  function handleNext() {
    if (!answered) return;
    // Persist the slider's default if the person never moved it.
    if (question.type === "slider" && rawValue === undefined) {
      onAnswer(question.field, sliderDefault);
    }
    if (isLast) {
      onComplete();
    } else {
      onIndexChange(index + 1);
    }
  }

  function handleBack() {
    if (index === 0) {
      onExit();
    } else {
      onIndexChange(index - 1);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-8">
      {/* Progress */}
      <div className="mb-10">
        <div className="mb-2.5 flex items-center justify-between font-mono text-xs uppercase tracking-wider">
          <span className="text-black">{question.sectionTitle}</span>
          <span className="text-zinc-400">
            {index + 1} / {TOTAL_QUESTIONS}
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/10">
          <div
            className="h-full rounded-full bg-black transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex flex-1 flex-col">
        <h2
          key={question.id}
          className="animate-fade-up text-3xl font-bold leading-tight tracking-tight text-black"
        >
          {question.prompt}
        </h2>
        {question.help && (
          <p
            key={`${question.id}-help`}
            className="mt-3 animate-fade-up text-base text-zinc-500"
            style={{ animationDelay: "0.05s" }}
          >
            {question.help}
          </p>
        )}

        <div className="mt-8">
          <QuestionCard
            key={question.id}
            question={question}
            value={value}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-12 flex items-center justify-between gap-4">
        <button type="button" onClick={handleBack} className="btn-ghost">
          {index === 0 ? "Exit" : "Back"}
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!answered}
          className="btn-primary group"
        >
          {isLast ? "See my result" : "Next"}
          <Arrow className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
