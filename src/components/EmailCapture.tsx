// Optional email capture for product updates. It never blocks the result and it
// does not send anything to the person — it simply collects the address. The
// lead is POSTed to VITE_LEAD_ENDPOINT if set, otherwise stored in localStorage.

import { useState } from "react";
import { storeLeadLocally } from "../storage";

interface EmailCaptureProps {
  careerId: string;
}

type Status = "idle" | "submitting" | "done" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EmailCapture({ careerId }: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    const payload = { email, careerId, timestamp: new Date().toISOString() };
    const endpoint = import.meta.env.VITE_LEAD_ENDPOINT as string | undefined;

    try {
      if (endpoint) {
        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        storeLeadLocally(payload);
      }
      setStatus("done");
    } catch {
      storeLeadLocally(payload);
      setStatus("done");
    }
  }

  if (status === "done") {
    return (
      <section className="card mt-12 animate-fade-up bg-soft-green/60 p-7 text-center">
        <p className="text-lg font-semibold text-black">You're on the list.</p>
        <p className="mt-1 text-sm text-zinc-600">
          We'll send the occasional update on new paths and resources. Download
          your result above to keep a copy.
        </p>
      </section>
    );
  }

  return (
    <section className="card mt-12 animate-fade-up p-7" style={{ animationDelay: "0.2s" }}>
      <h2 className="text-xl font-bold text-black">Get updates</h2>
      <p className="mt-1 text-sm text-zinc-500">
        Optional. Leave your email for occasional updates on new career paths and
        learning resources. We won't spam you, and your result is already yours to
        download.
      </p>
      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="you@example.com"
          className="flex-1 rounded-xl border border-black/15 px-4 py-3 text-base text-black outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
          aria-label="Email address"
        />
        <button type="submit" disabled={status === "submitting"} className="btn-primary">
          {status === "submitting" ? "Saving…" : "Keep me posted"}
        </button>
      </form>
      {status === "error" && (
        <p className="mt-2 text-sm text-red-600">
          That email does not look right — give it another try.
        </p>
      )}
    </section>
  );
}
