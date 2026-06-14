// Renders the constraint-aware coaching flags. Tone drives the colour: caution
// (soft pink), note (soft purple), good (soft green).

import type { Flag, FlagTone } from "../data/types";

interface FlagsProps {
  flags: Flag[];
}

const TONE_STYLES: Record<FlagTone, { wrap: string; icon: string }> = {
  caution: { wrap: "bg-soft-pink border-black/5", icon: "text-rose-500" },
  note: { wrap: "bg-soft-purple border-black/5", icon: "text-indigo-500" },
  good: { wrap: "bg-soft-green border-black/5", icon: "text-emerald-600" },
};

export function Flags({ flags }: FlagsProps) {
  if (flags.length === 0) return null;

  return (
    <section className="mt-12 animate-fade-up" style={{ animationDelay: "0.05s" }}>
      <h2 className="text-3xl font-bold tracking-tight text-black">
        Your situation, honestly
      </h2>
      <p className="mt-1 text-base text-zinc-500">
        What your answers mean for actually starting this path.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {flags.map((flag, i) => {
          const tone = TONE_STYLES[flag.tone];
          return (
            <div
              key={flag.title}
              style={{ animationDelay: `${0.1 + i * 0.06}s` }}
              className={`lift animate-fade-up rounded-3xl border ${tone.wrap} p-6`}
            >
              <div className="flex items-start gap-3">
                <Icon tone={flag.tone} className={`mt-0.5 h-5 w-5 shrink-0 ${tone.icon}`} />
                <div>
                  <h3 className="font-semibold text-black">{flag.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-600">
                    {flag.detail}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Icon({ tone, className }: { tone: FlagTone; className?: string }) {
  if (tone === "good") {
    return (
      <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.6a1 1 0 0 1-1.42 0l-3.5-3.5a1 1 0 1 1 1.42-1.42l2.79 2.8 6.79-6.88a1 1 0 0 1 1.42 0Z" clipRule="evenodd" />
      </svg>
    );
  }
  if (tone === "caution") {
    return (
      <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M8.26 3.1c.77-1.33 2.7-1.33 3.48 0l6.06 10.5c.77 1.33-.2 3-1.74 3H3.94c-1.54 0-2.5-1.67-1.74-3L8.26 3.1ZM10 7a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0V8a1 1 0 0 1 1-1Zm0 7.5a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2Z" clipRule="evenodd" />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm1-11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-1 2a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z" clipRule="evenodd" />
    </svg>
  );
}
