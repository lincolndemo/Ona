// "Why this match" panel — shows the six scoring dimensions as bars with their
// weight and a plain-language note, so the recommendation is transparent. Starts
// collapsed to keep the page tidy; bars animate in when opened.

import { useState } from "react";
import type { BreakdownItem } from "../engine/breakdown";

interface MatchBreakdownProps {
  items: BreakdownItem[];
}

export function MatchBreakdown({ items }: MatchBreakdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="card mt-6 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-6 py-4 text-left transition hover:bg-soft-purple/20"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2.5">
          <Scale className="h-5 w-5 text-navy" />
          <span className="font-bold text-black">Why this match</span>
        </span>
        <Chevron className={`h-4 w-4 text-zinc-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="border-t border-black/5 px-6 py-5">
          <p className="mb-4 text-sm text-zinc-500">
            Ona scores your answers on six factors, each weighted by how much it
            predicts fit. Here's how this path scored.
          </p>
          <ul className="space-y-4">
            {items.map((item, i) => (
              <li key={item.key}>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-black">{item.label}</span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                    {Math.round(item.weight * 100)}% weight
                  </span>
                </div>
                <div className="mt-1.5 flex items-center gap-3">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/10">
                    <div
                      className="h-full rounded-full bg-navy transition-all duration-700 ease-out"
                      style={{
                        width: `${Math.round(item.score * 100)}%`,
                        transitionDelay: `${i * 70}ms`,
                      }}
                    />
                  </div>
                  <span className="w-9 shrink-0 text-right font-mono text-xs font-bold tabular-nums text-navy">
                    {Math.round(item.score * 100)}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-zinc-600">{item.note}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function Scale({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 3v18M5 7l-2 6a3 3 0 0 0 6 0L7 7m12 0l-2 6a3 3 0 0 0 6 0l-2-6M7 7h10M6 21h12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
