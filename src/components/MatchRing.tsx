// An animated circular progress ring with a counting-up percentage. Honours
// prefers-reduced-motion (snaps to the final value instead of animating).

import { useEffect, useRef, useState } from "react";

interface MatchRingProps {
  value: number; // 0..1
  size?: number;
  stroke?: number;
  className?: string;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export function MatchRing({ value, size = 104, stroke = 9, className }: MatchRingProps) {
  const target = Math.max(0, Math.min(1, value));
  const [shown, setShown] = useState(prefersReducedMotion() ? target : 0);
  const raf = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setShown(target);
      return;
    }
    const duration = 900;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setShown(target * eased);
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [target]);

  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - shown);

  return (
    <div className={`relative ${className ?? ""}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--color-navy)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold tabular-nums text-navy">
          {Math.round(shown * 100)}%
        </span>
      </div>
    </div>
  );
}
