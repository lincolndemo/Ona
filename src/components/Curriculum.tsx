// The curriculum: a followable syllabus of modules. Each can be expanded to see
// outcomes, resources and a checkpoint, and marked complete to track progress.
// State is local — a study aid, not persisted.

import { useMemo, useState } from "react";
import type { Curriculum as CurriculumData } from "../data/types";

interface CurriculumProps {
  curriculum: CurriculumData;
}

export function Curriculum({ curriculum }: CurriculumProps) {
  const { modules } = curriculum;
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
          <p className="mt-1 text-base text-zinc-500">
            A module-by-module path to follow, ending in a project you can show.
          </p>
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
                  {m.order}
                </span>
                <span className="flex-1">
                  <span className="flex items-center gap-2">
                    <span className="font-semibold text-black">{m.title}</span>
                    {m.status === "have" && (
                      <span className="rounded-full bg-soft-green px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-emerald-700">
                        You likely have this
                      </span>
                    )}
                  </span>
                </span>
                <Chevron className={`h-4 w-4 text-zinc-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>

              {isOpen && (
                <div className="border-t border-black/5 px-5 pb-5 pt-4">
                  <p className="text-sm text-zinc-600">{m.focus}</p>

                  <p className="mt-4 font-mono text-xs uppercase tracking-wider text-zinc-400">
                    By the end you can
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {m.outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-2.5 text-sm text-zinc-800">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
                        <span className="leading-relaxed">{o}</span>
                      </li>
                    ))}
                  </ul>

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
                    <span className="font-semibold text-black">Checkpoint: </span>
                    {m.checkpoint}
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
