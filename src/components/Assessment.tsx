// Drives the assessment: one question per screen, progress, back navigation,
// and per-question validation. State lives in App so a refresh can resume; this
// component reports answers and index changes upward.

import { QUESTIONS, TOTAL_QUESTIONS } from "../data/questions";
import type { Question } from "../data/questions";
import { QuestionCard } from "./QuestionCard";

interface AssessmentProps {
  answers: Record<string, unknown>;
  index: number;
  onAnswer: (field: string, value: unknown) => void;
  onIndexChange: (index: number) => void;
  onComplete: () => void;
  onExit: () => void;
}

function isAnswered(question: Question, value: unknown): boolean {
  switch (question.type) {
    case "single":
      return typeof value === "string" && value.length > 0;
    case "multi":
      return Array.isArray(value) && value.length > 0;
    case "rank3":
      return Array.isArray(value) && value.length === 3;
    case "slider":
      return typeof value === "number";
    case "boolean":
      return typeof value === "boolean";
  }
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
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm font-medium text-slate-500">
          <span className="uppercase tracking-wide text-indigo-600">
            {question.sectionTitle}
          </span>
          <span>
            Question {index + 1} of {TOTAL_QUESTIONS}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex flex-1 flex-col">
        <h2 className="text-2xl font-bold leading-snug text-slate-900">
          {question.prompt}
        </h2>
        {question.help && (
          <p className="mt-2 text-base text-slate-500">{question.help}</p>
        )}

        <div className="mt-8">
          <QuestionCard
            question={question}
            value={value}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-10 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={handleBack}
          className="rounded-xl px-5 py-3 text-base font-medium text-slate-600 transition hover:bg-slate-100"
        >
          {index === 0 ? "Exit" : "Back"}
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!answered}
          className="rounded-xl bg-indigo-600 px-8 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isLast ? "See my result" : "Next"}
        </button>
      </div>
    </div>
  );
}
