// The shareable career card — a 4:5 keepsake rendered at 320×400 and exported at
// 3.375× (→ 1080×1350) for social. Forwarded ref so the share section can
// rasterise it to PNG.

import { forwardRef } from "react";
import type { Career, SubPath } from "../data/types";
import { OnaMark } from "./OnaMark";

interface CareerCardProps {
  career: Career;
  subPath: SubPath | null;
  matchValue: number;
}

function matchLabel(v: number): string {
  if (v >= 0.85) return "Strong fit";
  if (v >= 0.7) return "Good fit";
  if (v >= 0.55) return "Fair fit";
  return "Worth a look";
}

export const CareerCard = forwardRef<HTMLDivElement, CareerCardProps>(
  ({ career, subPath, matchValue }, ref) => {
    return (
      <div
        ref={ref}
        className="relative h-[400px] w-[320px] shrink-0 overflow-hidden rounded-3xl"
        style={{ background: "linear-gradient(160deg, #1b3e5a 0%, #0e2335 100%)" }}
      >
        {/* watermark */}
        <OnaMark className="pointer-events-none absolute -bottom-12 -right-12 h-60 w-60 text-white/5" />

        <div className="relative flex h-full flex-col p-7 text-white">
          <div className="flex items-center gap-2">
            <OnaMark className="h-6 w-6 text-white" />
            <span className="text-lg font-bold tracking-tight">Ona</span>
          </div>

          <span className="mt-7 font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">
            My path
          </span>
          <h2 className="mt-2 text-[26px] font-bold leading-[1.1]">{career.name}</h2>
          {subPath && (
            <p className="mt-1 text-lg font-semibold text-[#cfcffb]">→ {subPath.name}</p>
          )}

          <div className="mt-3 inline-flex w-fit items-center rounded-full bg-white/10 px-3 py-1">
            <span className="font-mono text-xs uppercase tracking-wider text-white/85">
              {matchLabel(matchValue)} · {Math.round(matchValue * 100)}%
            </span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-white/75">
            {subPath?.blurb ?? career.oneLiner}
          </p>

          <div className="mt-auto">
            <p className="font-mono text-[11px] uppercase tracking-wider text-white/45">
              Find your path. Build your future.
            </p>
            <p className="mt-1 text-sm font-semibold text-white">
              Take the free assessment on Ona
            </p>
          </div>
        </div>
      </div>
    );
  },
);

CareerCard.displayName = "CareerCard";
