// One concrete action the person can begin this week. The action is rendered so
// a link can be attached later by passing an href; without one it reads as plain
// guidance.

interface NextStepProps {
  text: string;
  href?: string;
}

export function NextStep({ text, href }: NextStepProps) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold text-slate-900">Start here this week</h2>
      <div className="mt-4 rounded-2xl bg-slate-900 p-6 text-white">
        <div className="flex items-start gap-4">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-base font-bold">
            1
          </span>
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-lg leading-relaxed text-white underline decoration-indigo-400 underline-offset-4 hover:decoration-white"
            >
              {text}
            </a>
          ) : (
            <p className="text-lg leading-relaxed text-slate-100">{text}</p>
          )}
        </div>
      </div>
    </section>
  );
}
