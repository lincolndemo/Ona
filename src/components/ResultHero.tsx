// The result hero: a compact summary card that anchors the page — the matched
// career and specialisation, an animated match-strength ring, and the primary
// action. Everything below is supporting detail.

import type { Career, SubPath } from "../data/types";
import { MatchRing } from "./MatchRing";

interface ResultHeroProps {
  career: Career;
  subPath: SubPath | null;
  matchValue: number; // 0..1
  onDownload: () => void;
}

function matchLabel(v: number): string {
  if (v >= 0.85) return "Strong fit";
  if (v >= 0.7) return "Good fit";
  if (v >= 0.55) return "Fair fit";
  return "Worth a look";
}

export function ResultHero({ career, subPath, matchValue, onDownload }: ResultHeroProps) {
  return (
    <div className="card animate-fade-up mt-2 overflow-hidden">
      <div className="bg-gradient-to-br from-soft-green via-soft-purple to-soft-pink p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <span className="eyebrow !text-zinc-600">Your recommended path</span>
            <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl">
              {career.name}
            </h1>
            {subPath && (
              <p className="mt-1 text-lg font-semibold text-navy">
                → {subPath.name}
              </p>
            )}
            <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-700">
              {subPath?.blurb ?? career.oneLiner}
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-center">
            <MatchRing value={matchValue} />
            <span className="mt-1 font-mono text-[11px] uppercase tracking-wider text-zinc-600">
              {matchLabel(matchValue)}
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={onDownload} className="btn-primary pressable">
            <DownloadIcon className="h-4 w-4" />
            Download as PDF
          </button>
        </div>
      </div>
    </div>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
