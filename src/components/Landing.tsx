// The single landing screen. One clear call to action that starts the
// assessment. If saved progress exists, it also offers to resume.

interface LandingProps {
  onStart: () => void;
  hasProgress: boolean;
  onResume: () => void;
}

export function Landing({ onStart, hasProgress, onResume }: LandingProps) {
  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
      <span className="mb-6 rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-semibold tracking-wide text-indigo-700">
        Ona
      </span>

      <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
        Find your path.
        <br />
        Build your future.
      </h1>

      <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
        Many people want to move into technology but lose months learning the
        wrong skills. Answer a few honest questions and Ona will point you to one
        career that fits, explain why, and tell you exactly what to do this week.
      </p>

      <div className="mt-10 flex w-full flex-col items-center gap-3 sm:w-auto">
        <button
          onClick={onStart}
          className="w-full rounded-xl bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300 sm:w-auto"
        >
          Start the assessment
        </button>

        {hasProgress && (
          <button
            onClick={onResume}
            className="text-sm font-medium text-indigo-700 underline-offset-4 hover:underline"
          >
            Resume where you left off
          </button>
        )}
      </div>

      <p className="mt-8 text-sm text-slate-400">
        Takes about five minutes. No sign-up needed to see your result.
      </p>
    </div>
  );
}
