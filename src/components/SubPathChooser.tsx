// Shows the chosen specialisation within a career and lets the person switch to
// another. Switching re-tailors the curriculum, roadmap, branding and project.

import type { ScoredSubPath } from "../engine/subpath";

interface SubPathChooserProps {
  ranked: ScoredSubPath[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  reason: string;
}

export function SubPathChooser({
  ranked,
  selectedId,
  onSelect,
  reason,
}: SubPathChooserProps) {
  if (ranked.length === 0) return null;
  const selected = ranked.find((r) => r.subPath.id === selectedId)?.subPath;

  return (
    <div className="mt-6 animate-fade-up rounded-3xl border border-black/5 bg-gradient-to-br from-soft-green to-soft-purple p-6">
      <p className="eyebrow !text-zinc-600">Your specialisation</p>
      <h3 className="mt-1 text-2xl font-bold tracking-tight text-black">
        {selected?.name}
      </h3>
      {selected?.blurb && (
        <p className="mt-1 text-sm text-zinc-700">{selected.blurb}</p>
      )}
      {reason && <p className="mt-2 text-sm font-medium text-black">{reason}</p>}

      <p className="mt-5 font-mono text-xs uppercase tracking-wider text-zinc-500">
        Switch focus
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {ranked.map(({ subPath }) => {
          const active = subPath.id === selectedId;
          return (
            <button
              key={subPath.id}
              onClick={() => onSelect(subPath.id)}
              className={[
                "rounded-full px-4 py-2 text-sm font-medium transition",
                active
                  ? "bg-black text-white"
                  : "border border-black/10 bg-white/70 text-zinc-700 hover:border-black/40 hover:text-black",
              ].join(" ")}
            >
              {subPath.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
