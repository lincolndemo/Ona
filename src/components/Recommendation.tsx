// The recommendation screen: the match, the reasoning, and the reality check.
// The reality check is the product's trust anchor, so it is given clear visual
// weight and candid, labelled fields.

import type { Career } from "../data/types";

interface RecommendationProps {
  career: Career;
  reasoning: string;
  showHeader?: boolean;
}

const CATEGORY_LABELS: Record<Career["category"], string> = {
  technical: "Technical",
  non_technical: "Non-technical",
  hybrid: "Hybrid",
};

export function Recommendation({ career, reasoning, showHeader = true }: RecommendationProps) {
  return (
    <section className="animate-fade-up">
      {showHeader && (
        <>
          <span className="eyebrow">
            <Sparkle className="h-3.5 w-3.5" />
            Your recommended path
          </span>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl">
              {career.name}
            </h1>
            <span className="rounded-full bg-soft-purple px-3 py-1 font-mono text-xs uppercase tracking-wider text-black">
              {CATEGORY_LABELS[career.category]}
            </span>
          </div>

          <p className="mt-3 text-lg text-zinc-500">{career.oneLiner}</p>
        </>
      )}

      {reasoning && (
        <p
          className="mt-6 animate-fade-up rounded-3xl bg-gradient-to-br from-soft-purple to-soft-pink p-7 text-lg leading-relaxed text-black"
          style={{ animationDelay: "0.1s" }}
        >
          {reasoning}
        </p>
      )}

      {/* Reality check — the trust anchor */}
      <div
        className="card mt-8 animate-fade-up overflow-hidden"
        style={{ animationDelay: "0.18s" }}
      >
        <div className="border-b border-black/5 bg-soft-green/60 px-7 py-5">
          <h2 className="text-lg font-bold text-black">
            An honest look at the work
          </h2>
          <p className="mt-0.5 text-sm text-zinc-500">
            No promises — here is what this career is actually like.
          </p>
        </div>
        <dl className="divide-y divide-black/5">
          <RealityRow label="A typical day" value={career.realityCheck.typicalDay} />
          <RealityRow label="Tools you would use" value={career.realityCheck.toolsUsed} />
          <RealityRow label="How technical it is" value={career.realityCheck.technicalShare} />
          <RealityRow label="Common frustrations" value={career.realityCheck.commonFrustrations} />
          {/* Salary range hidden for now — data retained in careers.ts (salaryRangeNGN). */}
          <RealityRow label="Remote potential" value={career.realityCheck.remotePotential} />
        </dl>
      </div>
    </section>
  );
}

function RealityRow({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="grid gap-1 px-7 py-5 transition-colors hover:bg-soft-purple/30 sm:grid-cols-[190px_1fr] sm:gap-6">
      <dt className="font-mono text-xs uppercase tracking-wider text-zinc-400">{label}</dt>
      <dd className="text-base leading-relaxed text-zinc-800">
        {value}
        {hint && <span className="mt-1 block text-sm italic text-zinc-400">{hint}</span>}
      </dd>
    </div>
  );
}

function Sparkle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" />
    </svg>
  );
}
