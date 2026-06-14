// Encodes the assessment answers into a shareable URL and reads them back. No
// backend: the link carries the person's selections (no name or contact), and
// opening it re-runs the deterministic engine to reconstruct their result.

import { isComplete } from "./data/questions";
import type { UserAnswers } from "./data/types";

const PARAM = "r";

function toBase64Url(input: string): string {
  const b64 = btoa(unescape(encodeURIComponent(input)));
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(input: string): string {
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/");
  return decodeURIComponent(escape(atob(b64)));
}

export function encodeAnswers(answers: UserAnswers): string {
  return toBase64Url(JSON.stringify(answers));
}

/** Decodes a share param back into answers, or null if it's invalid/incomplete. */
export function decodeAnswers(param: string): UserAnswers | null {
  try {
    const parsed = JSON.parse(fromBase64Url(param)) as Record<string, unknown>;
    if (parsed && typeof parsed === "object" && isComplete(parsed)) {
      return parsed as unknown as UserAnswers;
    }
  } catch {
    /* malformed link — ignore */
  }
  return null;
}

/** Absolute URL that reconstructs this result when opened. */
export function buildShareUrl(answers: UserAnswers): string {
  const url = new URL(window.location.href);
  url.hash = "";
  url.search = `?${PARAM}=${encodeAnswers(answers)}`;
  return url.toString();
}

/** Answers carried by the current URL's share param, if any. */
export function readSharedAnswers(): UserAnswers | null {
  if (typeof window === "undefined") return null;
  const param = new URLSearchParams(window.location.search).get(PARAM);
  return param ? decodeAnswers(param) : null;
}
