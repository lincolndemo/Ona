// The skills-gap readout: what the person already has, what they need to build,
// and one honest time estimate scaled to the hours they reported.

import type { SkillsGap as SkillsGapData } from "../engine/gap";

interface SkillsGapProps {
  gap: SkillsGapData;
}

export function SkillsGap({ gap }: SkillsGapProps) {
  const monthLabel = gap.months === 1 ? "1 month" : `${gap.months} months`;

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold text-slate-900">Where you stand</h2>
      <p className="mt-1 text-base text-slate-500">
        The distance between where you are and where this role sits.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Column
          title="Skills you already have"
          tone="have"
          skills={gap.have}
          empty="We could not infer existing skills from your answers — that is fine, everyone starts somewhere."
        />
        <Column
          title="Skills to build"
          tone="build"
          skills={gap.toBuild}
          empty="You already hold the core skills this role asks for. Focus on depth and a portfolio."
        />
      </div>

      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
          Estimated learning time at your pace
        </p>
        <p className="mt-1 text-2xl font-bold text-amber-900">About {monthLabel}</p>
        <p className="mt-1 text-sm text-amber-800">
          Based on the hours a week you said you have. Fewer hours honestly means
          a longer road — this figure is one you can plan around.
        </p>
      </div>
    </section>
  );
}

function Column({
  title,
  tone,
  skills,
  empty,
}: {
  title: string;
  tone: "have" | "build";
  skills: string[];
  empty: string;
}) {
  const styles =
    tone === "have"
      ? {
          border: "border-emerald-200",
          chip: "bg-emerald-100 text-emerald-800",
          heading: "text-emerald-700",
        }
      : {
          border: "border-indigo-200",
          chip: "bg-indigo-100 text-indigo-800",
          heading: "text-indigo-700",
        };

  return (
    <div className={`rounded-2xl border ${styles.border} bg-white p-5`}>
      <h3 className={`text-sm font-bold uppercase tracking-wide ${styles.heading}`}>
        {title}
      </h3>
      {skills.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <li
              key={skill}
              className={`rounded-full px-3 py-1 text-sm font-medium ${styles.chip}`}
            >
              {skill}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-slate-500">{empty}</p>
      )}
    </div>
  );
}
