// The skills-gap readout: what the person already has, what they need to build,
// and one honest time estimate scaled to the hours they reported.

import type { SkillsGap as SkillsGapData } from "../engine/gap";

interface SkillsGapProps {
  gap: SkillsGapData;
}

export function SkillsGap({ gap }: SkillsGapProps) {
  const monthLabel = gap.months === 1 ? "1 month" : `${gap.months} months`;

  const required = gap.have.length + gap.toBuild.length;
  // How much of the role's required skills the person already holds, as a rough
  // readiness signal. (gap.have can include transferable skills beyond the role.)
  const coreHeld = Math.max(0, required - gap.toBuild.length);
  const readiness = required === 0 ? 1 : coreHeld / required;

  return (
    <section className="mt-12 animate-fade-up" style={{ animationDelay: "0.1s" }}>
      <h2 className="text-3xl font-bold tracking-tight text-black">Where you stand</h2>
      <p className="mt-1 text-base text-zinc-500">
        The distance between where you are and where this role sits.
      </p>

      {/* Readiness bar */}
      <div className="mt-6 card p-5">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-xs uppercase tracking-wider text-zinc-500">
            Starting readiness
          </span>
          <span className="font-mono text-sm font-bold tabular-nums text-black">
            {coreHeld} / {required} core skills
          </span>
        </div>
        <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-black/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all duration-700 ease-out"
            style={{ width: `${Math.round(readiness * 100)}%` }}
          />
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
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

      <div className="card mt-6 bg-gradient-to-br from-soft-green to-soft-purple p-7">
        <p className="eyebrow !text-zinc-600">Estimated learning time at your pace</p>
        <p className="mt-2 text-3xl font-bold text-black">About {monthLabel}</p>
        <p className="mt-1.5 text-sm text-zinc-600">
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
      ? { chip: "bg-soft-green text-zinc-800" }
      : { chip: "bg-black text-white" };

  return (
    <div className="card lift p-6">
      <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-500">
        {title}
      </h3>
      {skills.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <li
              key={skill}
              style={{ animationDelay: `${0.2 + i * 0.04}s` }}
              className={`animate-fade-up rounded-full px-3 py-1.5 text-sm font-medium ${styles.chip}`}
            >
              {skill}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-zinc-500">{empty}</p>
      )}
    </div>
  );
}
