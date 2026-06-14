// The Opportunity Scanner: a curated directory of where to find jobs, remote and
// freelance work, scholarships, internships and certifications. It is not a live
// feed — it points at trustworthy places to look, filtered by category and, when
// the person has a result, by their matched path.

import { useMemo, useState } from "react";
import { filterOpportunities } from "../data/opportunities";
import type { OpportunityFilter } from "../data/opportunities";
import type { Opportunity, OpportunityType, UserAnswers } from "../data/types";
import { isComplete } from "../data/questions";
import { topMatch } from "../engine/match";
import { PageNav } from "./PageNav";

interface OpportunityScannerProps {
  answers: Record<string, unknown>;
  onHome: () => void;
  onStart: () => void;
  onOpenBranding: () => void;
}

const FILTERS: { value: OpportunityFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "job", label: "Jobs" },
  { value: "remote", label: "Remote" },
  { value: "freelance", label: "Freelance" },
  { value: "scholarship", label: "Scholarships" },
  { value: "internship", label: "Internships" },
  { value: "certification", label: "Certifications" },
];

const TYPE_LABELS: Record<OpportunityType, string> = {
  job: "Job board",
  remote: "Remote",
  freelance: "Freelance",
  scholarship: "Scholarship",
  internship: "Internship",
  certification: "Certification",
};

const COST_LABELS: Record<Opportunity["cost"], string> = {
  free: "Free",
  paid: "Paid",
  mixed: "Free / paid",
};

export function OpportunityScanner({
  answers,
  onHome,
  onStart,
  onOpenBranding,
}: OpportunityScannerProps) {
  const completed = isComplete(answers);
  const matched = useMemo(
    () => (completed ? topMatch(answers as unknown as UserAnswers) : null),
    [answers, completed],
  );

  const [filter, setFilter] = useState<OpportunityFilter>("all");
  const [forMyPath, setForMyPath] = useState<boolean>(true);

  const careerId = completed && forMyPath ? matched?.career.id : undefined;
  const results = useMemo(
    () => filterOpportunities(filter, careerId),
    [filter, careerId],
  );

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-6 pb-16">
      <PageNav onHome={onHome} onOpenBranding={onOpenBranding} active="opportunities" />

      <h1 className="text-4xl font-bold tracking-tight text-black">
        Opportunity scanner
      </h1>
      <p className="mt-2 text-base text-zinc-500">
        Trusted places to find work, funding and credentials. A curated directory,
        not live listings — open each to see what's on right now.
      </p>

      {/* Path context */}
      {completed ? (
        <div className="mt-5 flex flex-wrap items-center gap-3 rounded-2xl bg-soft-green/60 px-5 py-3">
          <span className="text-sm text-black">
            Showing what suits{" "}
            <span className="font-semibold">{matched?.career.name}</span>
          </span>
          <button
            onClick={() => setForMyPath((v) => !v)}
            className="font-mono text-xs uppercase tracking-wider text-navy underline underline-offset-4 hover:text-black"
          >
            {forMyPath ? "Show all paths" : "Show my path only"}
          </button>
        </div>
      ) : (
        <div className="mt-5 rounded-2xl bg-soft-purple/60 px-5 py-3 text-sm text-zinc-700">
          <button
            onClick={onStart}
            className="font-semibold text-navy underline underline-offset-4 hover:text-black"
          >
            Take the assessment
          </button>{" "}
          to filter these to the path that fits you.
        </div>
      )}

      {/* Category filters */}
      <div className="mt-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={[
              "rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wider transition",
              filter === f.value
                ? "bg-black text-white"
                : "border border-black/10 bg-white text-zinc-600 hover:border-black/40 hover:text-black",
            ].join(" ")}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="mt-6 space-y-3">
        {results.map((o, i) => (
          <a
            key={o.id}
            href={o.url}
            target="_blank"
            rel="noreferrer"
            style={{ animationDelay: `${i * 0.03}s` }}
            className="card lift block animate-fade-up p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-bold text-black">{o.title}</h3>
                <p className="font-mono text-xs uppercase tracking-wider text-zinc-400">
                  {o.org}
                </p>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-400" />
            </div>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">{o.blurb}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Tag>{TYPE_LABELS[o.type]}</Tag>
              <Tag>{COST_LABELS[o.cost]}</Tag>
              {o.audience !== "global" && <Tag>{o.audience === "nigeria" ? "Nigeria" : "Africa"}</Tag>}
            </div>
          </a>
        ))}
        {results.length === 0 && (
          <p className="rounded-2xl bg-white p-6 text-center text-sm text-zinc-500">
            Nothing in this category for that filter yet.
          </p>
        )}
      </div>

      <p className="mt-8 text-center font-mono text-[11px] uppercase tracking-wider text-zinc-400">
        Always confirm details on the provider's own site.
      </p>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-soft-purple px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-600">
      {children}
    </span>
  );
}

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M7 17L17 7M17 7H8M17 7V16" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
