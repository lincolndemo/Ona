// A one-time celebratory confetti burst, shown when the result first appears.
// Lightweight (CSS-animated divs), removes itself, and renders nothing when the
// user prefers reduced motion.

import { useEffect, useState } from "react";

const COLORS = ["#15324a", "#4f46e5", "#edf4ea", "#f7eff7", "#ebebfc", "#6d6df0"];

export function Confetti() {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const [done, setDone] = useState(reduced);

  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(() => setDone(true), 2600);
    return () => clearTimeout(t);
  }, [reduced]);

  if (done) return null;

  const pieces = Array.from({ length: 36 });
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {pieces.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 0.5;
        const duration = 1.6 + Math.random() * 1;
        const size = 6 + Math.random() * 6;
        const color = COLORS[i % COLORS.length];
        const rounded = i % 2 === 0;
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              top: "-12px",
              left: `${left}%`,
              width: size,
              height: size * (rounded ? 1 : 1.6),
              background: color,
              borderRadius: rounded ? "9999px" : "2px",
              animation: `ona-confetti ${duration}s ease-in ${delay}s forwards`,
            }}
          />
        );
      })}
    </div>
  );
}
