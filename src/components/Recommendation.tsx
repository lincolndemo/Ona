// The recommendation screen: the match, the reasoning, and the reality check.
// The reality check is the product's trust anchor, so it is given clear visual
// weight and candid, labelled fields.

import type { Career } from "../data/types";

interface RecommendationProps {
  career: Career;
  reasoning: string;
}

const CATEGORY_LABELS: Record<Career["category"], string> = {
  technical: "Technical",
  non_technical: "Non-technical",
  hybrid: "Hybrid",
};

export function Recommendation({ career, reasoning }: RecommendationProps) {
  return (
    <section>
      <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
        Your recommended path
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          {career.name}
        </h1>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
          {CATEGORY_LABELS[career.category]}
        </span>
      </div>

      <p className="mt-3 text-lg text-slate-600">{career.oneLiner}</p>

      {reasoning && (
        <p className="mt-6 rounded-2xl bg-indigo-50 p-6 text-lg leading-relaxed text-indigo-950">
          {reasoning}
        </p>
      )}

      {/* Reality check — the trust anchor */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-slate-50 px-6 py-4">
          <h2 className="text-lg font-bold text-slate-900">
            An honest look at the work
          </h2>
          <p className="text-sm text-slate-500">
            No promises — here is what this career is actually like.
          </p>
        </div>
        <dl className="divide-y divide-slate-100">
          <RealityRow label="A typical day" value={career.realityCheck.typicalDay} />
          <RealityRow label="Tools you would use" value={career.realityCheck.toolsUsed} />
          <RealityRow label="How technical it is" value={career.realityCheck.technicalShare} />
          <RealityRow label="Common frustrations" value={career.realityCheck.commonFrustrations} />
          <RealityRow
            label="Salary range (monthly)"
            value={career.realityCheck.salaryRangeNGN}
            hint="Starting estimate in Naira, to confirm against current local data."
          />
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
    <div className="grid gap-1 px-6 py-4 sm:grid-cols-[180px_1fr] sm:gap-6">
      <dt className="text-sm font-semibold text-slate-500">{label}</dt>
      <dd className="text-base leading-relaxed text-slate-800">
        {value}
        {hint && <span className="mt-1 block text-sm italic text-slate-400">{hint}</span>}
      </dd>
    </div>
  );
}
