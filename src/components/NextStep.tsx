// One concrete action the person can begin this week. The action is rendered so
// a link can be attached later by passing an href; without one it reads as plain
// guidance.

interface NextStepProps {
  text: string;
  href?: string;
}

export function NextStep({ text, href }: NextStepProps) {
  return (
    <section className="mt-12 animate-fade-up" style={{ animationDelay: "0.15s" }}>
      <h2 className="text-3xl font-bold tracking-tight text-black">
        Start here this week
      </h2>
      <div className="lift mt-4 rounded-3xl bg-black p-7 text-white">
        <div className="flex items-start gap-4">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white font-mono text-base font-bold text-black">
            1
          </span>
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-lg leading-relaxed text-white underline decoration-white/40 underline-offset-4 transition hover:decoration-white"
            >
              {text}
            </a>
          ) : (
            <p className="text-lg leading-relaxed text-zinc-100">{text}</p>
          )}
        </div>
      </div>
    </section>
  );
}
