// "AI for my path" section: the role AI plays in the field, what to use it for,
// and the AI skills worth learning — with an honest caveat.

import type { AiGuide } from "../data/types";

interface AiForPathProps {
  guide: AiGuide;
  careerName: string;
}

export function AiForPath({ guide, careerName }: AiForPathProps) {
  return (
    <section className="mt-12 animate-fade-up" style={{ animationDelay: "0.1s" }}>
      <span className="eyebrow">
        <Spark className="h-3.5 w-3.5" />
        AI for your path
      </span>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-black">
        AI &amp; the {careerName}
      </h2>

      {/* Role of AI */}
      <div className="card mt-5 bg-gradient-to-br from-soft-purple to-soft-pink p-6">
        <p className="font-mono text-xs uppercase tracking-wider text-zinc-500">
          The role AI plays here
        </p>
        <p className="mt-2 text-base leading-relaxed text-black">{guide.role}</p>
      </div>

      {/* What to use AI for */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="card p-6">
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-500">
            Use AI to…
          </h3>
          <ul className="mt-3 space-y-2">
            {guide.uses.map((u) => (
              <li key={u} className="flex items-start gap-2.5 text-sm text-zinc-800">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
                <span className="leading-relaxed">{u}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What AI to learn */}
        <div className="card p-6">
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-500">
            Learn this AI to get ahead
          </h3>
          <ul className="mt-3 space-y-3">
            {guide.learn.map((item) => (
              <li key={item.skill}>
                <p className="text-sm font-semibold text-black">{item.skill}</p>
                <p className="text-sm text-zinc-600">{item.why}</p>
                {item.resource && (
                  <a
                    href={item.resource.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex items-center gap-1.5 text-sm text-navy underline underline-offset-4 hover:text-black"
                  >
                    {item.resource.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <p className="text-sm text-amber-900">
          <span className="font-semibold">Keep in mind: </span>
          {guide.caution}
        </p>
      </div>
    </section>
  );
}

function Spark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" />
    </svg>
  );
}
