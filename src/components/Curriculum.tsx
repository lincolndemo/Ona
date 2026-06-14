// The curriculum: an authored, followable syllabus. Each module expands to show
// what to learn, any specialisation tracks (with concrete language/tool options),
// free resources and a hands-on project. Modules can be ticked off to track
// progress. State is local — a study aid, not persisted.

import { useMemo, useState } from "react";
import type { Curriculum as CurriculumData } from "../data/types";

interface CurriculumProps {
  curriculum: CurriculumData;
}

export function Curriculum({ curriculum }: CurriculumProps) {
  const { modules, intro } = curriculum;
  const [done, setDone] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState<string | null>(modules[0]?.id ?? null);

  const pct = useMemo(
    () => (modules.length === 0 ? 0 : Math.round((done.size / modules.length) * 100)),
    [done, modules.length],
  );

  function toggleDone(id: string) {
    setDone((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <section className="mt-12 animate-fade-up" style={{ animationDelay: "0.1s" }}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-black">
            Your curriculum
          </h2>
          <p className="mt-1 max-w-lg text-base text-zinc-500">{intro}</p>
        </div>
        <div className="text-right">
          <span className="font-mono text-2xl font-bold text-black">{pct}%</span>
          <p className="font-mono text-xs uppercase tracking-wider text-zinc-400">
            {done.size} / {modules.length} modules
          </p>
        </div>
      </div>

      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-black/10">
        <div
          className="h-full rounded-full bg-black transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>

      <ol className="mt-6 space-y-3">
        {modules.map((m, i) => {
          const isOpen = open === m.id;
          const isDone = done.has(m.id);
          return (
            <li
              key={m.id}
              style={{ animationDelay: `${0.12 + i * 0.05}s` }}
              className="card animate-fade-up overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : m.id)}
                className="flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-soft-purple/30"
              >
                <span
                  className={[
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold",
                    isDone ? "bg-black text-white" : "bg-soft-purple text-black",
                  ].join(" ")}
                >
                  {i + 1}
                </span>
                <span className="flex-1 font-semibold text-black">{m.title}</span>
                <Chevron className={`h-4 w-4 text-zinc-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>

              {isOpen && (
                <div className="border-t border-black/5 px-5 pb-5 pt-4">
                  <p className="text-sm text-zinc-600">{m.summary}</p>

                  <p className="mt-4 font-mono text-xs uppercase tracking-wider text-zinc-400">
                    What you'll learn
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {m.topics.map((t) => (
                      <li key={t} className="flex items-start gap-2.5 text-sm text-zinc-800">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
                        <span className="leading-relaxed">{t}</span>
                      </li>
                    ))}
                  </ul>

                  {m.tracks && m.tracks.length > 0 && (
                    <div className="mt-4">
                      <p className="font-mono text-xs uppercase tracking-wider text-zinc-400">
                        Choose a track
                      </p>
                      <div className="mt-2 grid gap-3 sm:grid-cols-2">
                        {m.tracks.map((track) => (
                          <div key={track.name} className="rounded-2xl border border-black/10 bg-soft-purple/20 p-4">
                            <h4 className="font-bold text-black">{track.name}</h4>
                            <p className="mt-0.5 text-xs text-zinc-500">{track.blurb}</p>
                            <ul className="mt-2 space-y-1">
                              {track.options.map((o) => (
                                <li key={o} className="flex items-start gap-2 text-sm text-zinc-700">
                                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-400" />
                                  <span className="leading-relaxed">{o}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {m.resources.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {m.resources.map((r) => (
                        <a
                          key={r.url}
                          href={r.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 text-sm text-zinc-700 transition hover:border-black/40 hover:text-black"
                        >
                          {r.label}
                          <ArrowUpRight className="h-3 w-3 text-zinc-400" />
                        </a>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 rounded-xl bg-soft-green/50 p-3 text-sm text-zinc-700">
                    <span className="font-semibold text-black">Project: </span>
                    {m.project}
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleDone(m.id)}
                    className={[
                      "mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-xs uppercase tracking-wider transition",
                      isDone
                        ? "bg-black text-white hover:bg-zinc-800"
                        : "border border-black/15 bg-white text-zinc-700 hover:border-black/40 hover:text-black",
                    ].join(" ")}
                  >
                    {isDone ? "Completed ✓" : "Mark complete"}
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M7 17L17 7M17 7H8M17 7V16" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
