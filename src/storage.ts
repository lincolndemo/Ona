// Small localStorage wrapper so progress survives a refresh and leads can be
// stored when no endpoint is configured. All access is guarded, so a browser
// with storage disabled degrades quietly instead of breaking the flow.

const ANSWERS_KEY = "ona.answers.v1";
const INDEX_KEY = "ona.questionIndex.v1";
const LEADS_KEY = "ona.leads.v1";

function safeGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore: storage may be unavailable or full. The flow continues in memory.
  }
}

function safeRemove(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Ignore.
  }
}

export function loadAnswers(): Record<string, unknown> | null {
  const raw = safeGet(ANSWERS_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function saveAnswers(answers: Record<string, unknown>): void {
  safeSet(ANSWERS_KEY, JSON.stringify(answers));
}

export function loadQuestionIndex(): number {
  const raw = safeGet(INDEX_KEY);
  const value = raw ? Number(raw) : 0;
  return Number.isFinite(value) && value >= 0 ? value : 0;
}

export function saveQuestionIndex(index: number): void {
  safeSet(INDEX_KEY, String(index));
}

export function clearProgress(): void {
  safeRemove(ANSWERS_KEY);
  safeRemove(INDEX_KEY);
}

export interface Lead {
  email: string;
  careerId: string;
  timestamp: string;
}

/** Append a lead to localStorage when no endpoint is configured. */
export function storeLeadLocally(lead: Lead): void {
  const raw = safeGet(LEADS_KEY);
  let leads: Lead[] = [];
  if (raw) {
    try {
      leads = JSON.parse(raw) as Lead[];
    } catch {
      leads = [];
    }
  }
  leads.push(lead);
  safeSet(LEADS_KEY, JSON.stringify(leads));
}
