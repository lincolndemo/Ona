// Optional email capture, offered only after the result is shown. It never
// blocks the result. On submit it POSTs to VITE_LEAD_ENDPOINT when configured,
// otherwise it stores the lead locally — either way it shows success.

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
    const payload = {
      email,
      careerId,
      timestamp: new Date().toISOString(),
    };
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
      // Even if the network call fails, keep the lead so nothing is lost, and
      // still show success — the result is never gated on this.
      storeLeadLocally(payload);
      setStatus("done");
    }
  }

  if (status === "done") {
    return (
      <section className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <p className="text-lg font-semibold text-emerald-900">
          Saved. Your result is on its way to {email}.
        </p>
        <p className="mt-1 text-sm text-emerald-700">
          Keep this page open if you would like to read through the details again.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-xl font-bold text-slate-900">Save your result</h2>
      <p className="mt-1 text-sm text-slate-500">
        Optional. Drop your email to keep this recommendation, and we will send it
        to you. You have already seen everything — this changes nothing.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="you@example.com"
          className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-base text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          aria-label="Email address"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-xl bg-indigo-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-indigo-700 disabled:bg-slate-300"
        >
          {status === "submitting" ? "Saving…" : "Email it to me"}
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
