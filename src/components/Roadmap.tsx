// The learning roadmap: three phases shown as a vertical timeline. Milestones
// are interactive — tick them off to watch progress fill. State is local (a
// motivational aid), so it resets on a fresh visit.

import { useMemo, useState } from "react";
import type { RoadmapPhase } from "../data/types";

interface RoadmapProps {
  phases: RoadmapPhase[];
}

export function Roadmap({ phases }: RoadmapProps) {
  const total = useMemo(
    () => phases.reduce((n, p) => n + p.milestones.length, 0),
    [phases],
  );
  const [done, setDone] = useState<Set<string>>(new Set());

  function toggle(key: string) {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  const pct = total === 0 ? 0 : Math.round((done.size / total) * 100);

  return (
    <section className="mt-12 animate-fade-up" style={{ animationDelay: "0.1s" }}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-black">
            Your 90-day roadmap
          </h2>
          <p className="mt-1 text-base text-zinc-500">
            A path from first steps to a project you can show an employer.
          </p>
        </div>
        <div className="text-right">
          <span className="font-mono text-2xl font-bold text-black">{pct}%</span>
          <p className="font-mono text-xs uppercase tracking-wider text-zinc-400">
            {done.size} / {total} done
          </p>
        </div>
      </div>

      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-black/10">
        <div
          className="h-full rounded-full bg-black transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>

      <ol className="mt-8 space-y-4">
        {phases.map((phase, pi) => (
          <li
            key={phase.id}
            style={{ animationDelay: `${0.15 + pi * 0.08}s` }}
            className="card lift animate-fade-up p-6"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black font-mono text-sm font-bold text-white">
                {pi + 1}
              </span>
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">
                  {phase.timeframe}
                </span>
                <h3 className="text-lg font-bold text-black">{phase.title}</h3>
              </div>
            </div>

            <p className="mt-3 text-sm text-zinc-600">{phase.focus}</p>

            <ul className="mt-4 space-y-2">
              {phase.milestones.map((m, mi) => {
                const key = `${phase.id}-${mi}`;
                const checked = done.has(key);
                return (
                  <li key={key}>
                    <button
                      type="button"
                      onClick={() => toggle(key)}
                      className="group flex w-full items-start gap-3 rounded-xl p-2 text-left transition hover:bg-soft-purple/40"
                    >
                      <span
                        className={[
                          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition",
                          checked
                            ? "border-black bg-black text-white"
                            : "border-black/25 bg-white group-hover:border-black/50",
                        ].join(" ")}
                      >
                        {checked && (
                          <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.6a1 1 0 0 1-1.42 0l-3.5-3.5a1 1 0 1 1 1.42-1.42l2.79 2.8 6.79-6.88a1 1 0 0 1 1.42 0Z" clipRule="evenodd" />
                          </svg>
                        )}
                      </span>
                      <span
                        className={[
                          "text-sm leading-relaxed transition",
                          checked ? "text-zinc-400 line-through" : "text-zinc-800",
                        ].join(" ")}
                      >
                        {m}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {phase.resources.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2 border-t border-black/5 pt-4">
                {phase.resources.map((r) => (
                  <a
                    key={r.url}
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 text-sm text-zinc-700 transition hover:border-black/40 hover:text-black"
                  >
                    {r.label}
                    <svg className="h-3 w-3 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H8M17 7V16" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                ))}
              </div>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
