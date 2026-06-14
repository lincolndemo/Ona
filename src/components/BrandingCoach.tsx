// Personal Branding Coach: shows the generated headline, bio, posting plan and
// tips, with copy-to-clipboard on the pieces a person will paste into a profile.

import { useState } from "react";
import type { Branding } from "../data/types";

interface BrandingCoachProps {
  branding: Branding;
}

export function BrandingCoach({ branding }: BrandingCoachProps) {
  return (
    <section className="mt-12 animate-fade-up" style={{ animationDelay: "0.12s" }}>
      <h2 className="text-3xl font-bold tracking-tight text-black">
        Personal branding coach
      </h2>
      <p className="mt-1 text-base text-zinc-500">
        How to show up online so the right people find you. Copy, tweak, post.
      </p>

      <div className="mt-6 space-y-4">
        <CopyBlock label="Profile headline" value={branding.headline} mono />
        <CopyBlock label="About / bio" value={branding.bio} />

        <div className="card p-6">
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-500">
            Your first three posts
          </h3>
          <ol className="mt-4 space-y-4">
            {branding.posts.map((post, i) => (
              <li key={post.title} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-soft-purple font-mono text-sm font-bold text-black">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-black">{post.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-zinc-600">
                    {post.prompt}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="card bg-soft-green/60 p-6">
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-500">
            Keep in mind
          </h3>
          <ul className="mt-4 space-y-2">
            {branding.tips.map((tip) => (
              <li key={tip} className="flex items-start gap-2.5 text-sm text-zinc-700">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
                <span className="leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function CopyBlock({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard may be unavailable; fail quietly.
    }
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-500">
          {label}
        </h3>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-zinc-600 transition hover:border-black/40 hover:text-black"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
      <p
        className={[
          "mt-3 whitespace-pre-line leading-relaxed text-zinc-800",
          mono ? "font-mono text-sm" : "text-base",
        ].join(" ")}
      >
        {value}
      </p>
    </div>
  );
}
