// "Share your result" section: shows the career card and lets the person save it
// as an image, share it via the native sheet, or copy a link that reconstructs
// their result. html-to-image is loaded lazily (only when sharing) to keep the
// main bundle lean.

import { useRef, useState } from "react";
import type { Career, SubPath, UserAnswers } from "../data/types";
import { buildShareUrl } from "../shareLink";
import { CareerCard } from "./CareerCard";

interface ShareResultProps {
  answers: UserAnswers;
  career: Career;
  subPath: SubPath | null;
  matchValue: number;
}

export function ShareResult({ answers, career, subPath, matchValue }: ShareResultProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareUrl = buildShareUrl(answers);
  const label = subPath ? `${career.name} → ${subPath.name}` : career.name;

  async function renderImage(): Promise<string> {
    const { toPng } = await import("html-to-image");
    if (document.fonts?.ready) await document.fonts.ready;
    return toPng(cardRef.current!, { pixelRatio: 3.375, cacheBust: true });
  }

  function download(dataUrl: string) {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "ona-career-card.png";
    a.click();
  }

  async function handleShare() {
    setBusy(true);
    try {
      const dataUrl = await renderImage();
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], "ona-career-card.png", { type: "image/png" });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "My Ona path",
          text: `I matched ${label} on Ona — find your path too.`,
          url: shareUrl,
        });
      } else {
        download(dataUrl);
      }
    } catch {
      /* user cancelled or share failed — no-op */
    } finally {
      setBusy(false);
    }
  }

  async function handleSave() {
    setBusy(true);
    try {
      download(await renderImage());
    } catch {
      /* ignore */
    } finally {
      setBusy(false);
    }
  }

  function copyLink() {
    navigator.clipboard?.writeText(shareUrl).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      },
      () => {},
    );
  }

  return (
    <section className="mt-12 animate-fade-up" style={{ animationDelay: "0.1s" }}>
      <h2 className="text-3xl font-bold tracking-tight text-black">Share your result</h2>
      <p className="mt-1 text-base text-zinc-500">
        Post it, keep it, or send the link — anyone who opens it sees your result
        and can find their own path.
      </p>

      <div className="mt-6 flex flex-col items-center gap-6">
        <CareerCard ref={cardRef} career={career} subPath={subPath} matchValue={matchValue} />

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <button onClick={handleShare} disabled={busy} className="btn-primary pressable">
            <ShareIcon className="h-4 w-4" />
            {busy ? "Preparing…" : "Share"}
          </button>
          <button onClick={handleSave} disabled={busy} className="btn-secondary pressable">
            <DownloadIcon className="h-4 w-4" />
            Save image
          </button>
          <button onClick={copyLink} className="btn-secondary pressable">
            <LinkIcon className="h-4 w-4" />
            {copied ? "Copied ✓" : "Copy link"}
          </button>
        </div>
      </div>
    </section>
  );
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v13" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
