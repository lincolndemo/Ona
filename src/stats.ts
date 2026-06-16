// Client helpers for the platform assessment counter. Both fail silently: on
// localhost (no serverless function) or before Upstash is configured, the app
// behaves exactly as before.

// Only surface the count as social proof once it's meaningful.
export const COUNT_THRESHOLD = 25;

/** Increment the platform counter — call once when an assessment completes. */
export async function recordAssessment(): Promise<void> {
  try {
    await fetch("/api/assessments", { method: "POST" });
  } catch {
    /* offline / not deployed — ignore */
  }
}

/** Current platform total, or null if unavailable/unconfigured. */
export async function fetchAssessmentCount(): Promise<number | null> {
  try {
    const res = await fetch("/api/assessments");
    if (!res.ok) return null;
    const data = (await res.json()) as { count: number | null };
    return typeof data.count === "number" ? data.count : null;
  } catch {
    return null;
  }
}
