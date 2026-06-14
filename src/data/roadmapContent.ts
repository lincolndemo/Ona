// Portfolio projects per career — the proof-of-work a person builds to get hired.
// Keyed by career id, kept here as editable content separate from logic.

export const CAREER_PORTFOLIO: Record<string, string> = {
  data_analyst:
    "a 3-page Power BI dashboard on a public Nigerian dataset (e.g. NBS price data), with a one-page summary of what it reveals",
  business_analyst:
    "a full requirements document and process map for a real business process, ending in a one-page recommendation",
  software_developer:
    "a small deployed full-stack app (e.g. an expense or task tracker), with the code on GitHub and a clear README",
  cloud_engineer:
    "a static site plus a small API deployed on a cloud free tier, with every infrastructure step documented",
  cybersecurity_analyst:
    "a home lab where you run a vulnerability scan on a test machine and write an incident-style report of what you found",
  product_manager:
    "a complete product spec for one feature: problem, users, solution, success metrics and a simple roadmap",
  ai_trainer:
    "a one-hour AI workshop you design and run for 3–5 people, with slides, a handout and collected feedback",
  prompt_engineer:
    "a prompt library for one real workflow, with before/after examples and notes on what made each prompt reliable",
  marketing_analyst:
    "an analysis of a real campaign, a performance dashboard, and a short note on what you would change and why",
  product_designer:
    "an end-to-end redesign of a real app flow — research notes, wireframes and a clickable prototype — written up as a case study",
  automation_specialist:
    "a real multi-step business task automated end to end, documented with the before/after time saved",
  learning_analytics:
    "a dashboard of learning outcomes built from a real programme's data, with two recommended changes",
};

export function portfolioProjectFor(careerId: string): string {
  return (
    CAREER_PORTFOLIO[careerId] ??
    "a small, real project that shows this skill in action, shared publicly"
  );
}
