// Landing screen, styled after the SynthAI (TailGrids) hero: a floating brand
// row, a mono eyebrow, a large Figtree headline, mono buttons, and a soft glass
// graphic echoing the template's iridescent motif.

import { PathChooser } from "./PathChooser";
import { OnaMark } from "./OnaMark";

interface LandingProps {
  onStart: () => void;
  hasProgress: boolean;
  onResume: () => void;
  onOpenBranding: () => void;
  onOpenOpportunities: () => void;
}

export function Landing({
  onStart,
  hasProgress,
  onResume,
  onOpenBranding,
  onOpenOpportunities,
}: LandingProps) {
  return (
    <div className="mx-auto min-h-screen max-w-6xl px-6">
      {/* Brand row */}
      <header className="flex items-center justify-between gap-4 py-6">
        <div className="flex items-center gap-2.5">
          <OnaMark className="h-8 w-8 text-navy" />
          <span className="text-xl font-bold tracking-tight text-navy">Ona</span>
        </div>
        <nav className="flex items-center gap-1 rounded-full border border-black/5 bg-white/70 p-1.5 shadow-[0px_6px_18.6px_0px_#d0d0d050] backdrop-blur">
          <button
            onClick={onOpenOpportunities}
            className="hidden rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wider text-zinc-600 transition hover:bg-black/5 hover:text-black sm:block"
          >
            Opportunities
          </button>
          <button
            onClick={onOpenBranding}
            className="hidden rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wider text-zinc-600 transition hover:bg-black/5 hover:text-black sm:block"
          >
            Branding
          </button>
          <button onClick={onStart} className="btn-primary !rounded-full !px-5 !py-2.5">
            Get started
          </button>
        </nav>
      </header>

      {/* Mobile menu links */}
      <div className="-mt-2 flex gap-2 sm:hidden">
        <button
          onClick={onOpenOpportunities}
          className="rounded-full border border-black/10 bg-white px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-zinc-600"
        >
          Opportunities
        </button>
        <button
          onClick={onOpenBranding}
          className="rounded-full border border-black/10 bg-white px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-zinc-600"
        >
          Branding
        </button>
      </div>

      {/* Hero */}
      <div className="grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-20">
        <div>
          <span className="eyebrow animate-fade-up" style={{ animationDelay: "0.05s" }}>
            <Sparkle className="h-3.5 w-3.5" />
            Career decision tool
          </span>

          <h1
            className="mt-6 animate-fade-up text-5xl font-bold leading-[1.05] tracking-tight text-black sm:text-6xl"
            style={{ animationDelay: "0.12s" }}
          >
            Find your path.
            <br />
            Build your future.
          </h1>

          <p
            className="mt-6 max-w-md animate-fade-up text-lg leading-relaxed text-zinc-500"
            style={{ animationDelay: "0.2s" }}
          >
            Many people want to move into technology but lose months learning the
            wrong skills. Answer a few honest questions and Ona points you to one
            career that fits, explains why, and tells you what to do this week.
          </p>

          <div
            className="mt-10 flex animate-fade-up flex-wrap items-center gap-4"
            style={{ animationDelay: "0.28s" }}
          >
            <button onClick={onStart} className="btn-primary group">
              Start now
              <Arrow className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            {hasProgress && (
              <button onClick={onResume} className="btn-secondary">
                Resume
              </button>
            )}
          </div>

          <p
            className="mt-8 animate-fade-up font-mono text-xs uppercase tracking-wider text-zinc-400"
            style={{ animationDelay: "0.36s" }}
          >
            ~5 minutes · No sign-up to see your result
          </p>
        </div>

        {/* Animated "choosing a path" scene */}
        <div className="relative flex h-[360px] items-center justify-center lg:h-[460px]">
          <PathChooser />
        </div>
      </div>
    </div>
  );
}

function Sparkle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" />
    </svg>
  );
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M7 17L17 7M17 7H8M17 7V16" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
