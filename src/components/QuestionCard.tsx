// Renders a single question by type. It is presentational: it reads the current
// value and reports changes upward. The Assessment owns validation and storage.

import type { Option, Question } from "../data/questions";

interface QuestionCardProps {
  question: Question;
  value: unknown;
  onChange: (value: unknown) => void;
}

const RANK_LABELS = ["1st", "2nd", "3rd"];

export function QuestionCard({ question, value, onChange }: QuestionCardProps) {
  switch (question.type) {
    case "single":
      return (
        <SingleSelect
          options={question.options ?? []}
          value={value as string | undefined}
          onChange={onChange}
        />
      );
    case "multi":
      return (
        <MultiSelect
          options={question.options ?? []}
          value={(value as string[] | undefined) ?? []}
          onChange={onChange}
        />
      );
    case "rank3":
      return (
        <RankThree
          options={question.options ?? []}
          value={(value as string[] | undefined) ?? []}
          onChange={onChange}
        />
      );
    case "slider":
      return (
        <SliderInput
          min={question.min ?? 1}
          max={question.max ?? 10}
          value={value as number | undefined}
          onChange={onChange}
        />
      );
    case "boolean":
      return (
        <BooleanSelect value={value as boolean | undefined} onChange={onChange} />
      );
  }
}

function optionClasses(active: boolean): string {
  return [
    "flex w-full items-center justify-between gap-3 rounded-xl border px-5 py-4 text-left text-base transition",
    active
      ? "border-indigo-600 bg-indigo-50 text-indigo-900 ring-1 ring-indigo-600"
      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
  ].join(" ");
}

function SingleSelect({
  options,
  value,
  onChange,
}: {
  options: Option[];
  value: string | undefined;
  onChange: (value: unknown) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={optionClasses(value === opt.value)}
        >
          <span>{opt.label}</span>
          {value === opt.value && <CheckMark />}
        </button>
      ))}
    </div>
  );
}

function MultiSelect({
  options,
  value,
  onChange,
}: {
  options: Option[];
  value: string[];
  onChange: (value: unknown) => void;
}) {
  function toggle(optValue: string) {
    const isNone = optValue === "none";
    if (value.includes(optValue)) {
      onChange(value.filter((v) => v !== optValue));
      return;
    }
    if (isNone) {
      onChange(["none"]);
      return;
    }
    onChange([...value.filter((v) => v !== "none"), optValue]);
  }

  return (
    <div className="flex flex-col gap-3">
      {options.map((opt) => {
        const active = value.includes(opt.value);
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => toggle(opt.value)}
            className={optionClasses(active)}
          >
            <span>{opt.label}</span>
            {active && <CheckMark />}
          </button>
        );
      })}
    </div>
  );
}

function RankThree({
  options,
  value,
  onChange,
}: {
  options: Option[];
  value: string[];
  onChange: (value: unknown) => void;
}) {
  function toggle(optValue: string) {
    if (value.includes(optValue)) {
      onChange(value.filter((v) => v !== optValue));
      return;
    }
    if (value.length >= 3) return; // top three only
    onChange([...value, optValue]);
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-slate-500">
        Tap your top three in order — your first tap is what matters most.
      </p>
      {options.map((opt) => {
        const rank = value.indexOf(opt.value);
        const active = rank !== -1;
        const full = value.length >= 3 && !active;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => toggle(opt.value)}
            disabled={full}
            className={[
              optionClasses(active),
              full ? "cursor-not-allowed opacity-50" : "",
            ].join(" ")}
          >
            <span>{opt.label}</span>
            {active && (
              <span className="rounded-full bg-indigo-600 px-2.5 py-0.5 text-sm font-semibold text-white">
                {RANK_LABELS[rank]}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function SliderInput({
  min,
  max,
  value,
  onChange,
}: {
  min: number;
  max: number;
  value: number | undefined;
  onChange: (value: unknown) => void;
}) {
  const current = value ?? Math.round((min + max) / 2);
  return (
    <div className="flex flex-col gap-6 px-1">
      <div className="text-center">
        <span className="text-5xl font-extrabold text-indigo-600">
          {current}
        </span>
        <span className="text-xl font-medium text-slate-400"> / {max}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={current}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-indigo-600"
      />
      <div className="flex justify-between text-sm text-slate-400">
        <span>Beginner</span>
        <span>Very confident</span>
      </div>
    </div>
  );
}

function BooleanSelect({
  value,
  onChange,
}: {
  value: boolean | undefined;
  onChange: (value: unknown) => void;
}) {
  return (
    <div className="flex gap-4">
      {[
        { label: "Yes", val: true },
        { label: "No", val: false },
      ].map((opt) => (
        <button
          key={opt.label}
          type="button"
          onClick={() => onChange(opt.val)}
          className={[
            "flex-1 rounded-xl border px-6 py-5 text-lg font-semibold transition",
            value === opt.val
              ? "border-indigo-600 bg-indigo-50 text-indigo-900 ring-1 ring-indigo-600"
              : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
          ].join(" ")}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function CheckMark() {
  return (
    <svg
      className="h-5 w-5 shrink-0 text-indigo-600"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.5 7.6a1 1 0 0 1-1.42.005l-3.5-3.5a1 1 0 1 1 1.414-1.414l2.79 2.79 6.792-6.894a1 1 0 0 1 1.418-.006Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
