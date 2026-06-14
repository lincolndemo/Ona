// Constraint-aware coaching flags. A good coach reflects the person's real
// situation back at them — their hours, kit and internet against the path they
// matched. These turn data we already collect into honest, useful caveats.

import type { Career, Flag, UserAnswers } from "../data/types";
import { DIFFICULTY_REQUIRED_HOURS } from "../data/weights";
import { userHoursNumeric } from "./profile";
import type { SkillsGap } from "./gap";

const HOURS_LABELS: Record<UserAnswers["weeklyHours"], string> = {
  "2-5": "2–5",
  "5-10": "5–10",
  "10-20": "10–20",
  "20+": "20+",
};

export function buildFlags(
  user: UserAnswers,
  career: Career,
  gap: SkillsGap,
): Flag[] {
  const cautions: Flag[] = [];
  const notes: Flag[] = [];
  const goods: Flag[] = [];

  const ratio =
    userHoursNumeric(user) / DIFFICULTY_REQUIRED_HOURS[career.difficulty];
  const hasUsedRoleTools = career.tools.some((t) => user.toolsUsed.includes(t));
  const weakInternet = user.internet === "poor" || user.internet === "fair";

  // Hours vs difficulty
  if (ratio < 0.6) {
    cautions.push({
      tone: "caution",
      title: "Your weekly hours are tight for this path",
      detail: `At ${HOURS_LABELS[user.weeklyHours]} hours a week this is honestly about a ${gap.months}-month road. Either protect more hours, or treat the early wins as proof you can keep going before you commit fully.`,
    });
  } else if (ratio >= 1.5) {
    goods.push({
      tone: "good",
      title: "You have strong time to learn",
      detail:
        "The hours you can give comfortably match what this path asks. Use that head start to go deeper than the minimum.",
    });
  }

  // Laptop
  if (!user.hasLaptop) {
    cautions.push({
      tone: "caution",
      title: "You'll need regular access to a laptop",
      detail:
        "This path is hard to learn on a phone alone. Plan for laptop time — a library, a hub, a friend's machine, or a shared one — before you spend money on courses.",
    });
  }

  // Internet
  if (weakInternet) {
    notes.push({
      tone: "note",
      title: "Plan around patchy internet",
      detail:
        "Download videos when you have good signal, and lean on text and offline practice. It is a real constraint, not a blocker.",
    });
  }

  // Computer confidence
  if (user.computerSkill <= 3) {
    notes.push({
      tone: "note",
      title: "Build basic computer confidence first",
      detail:
        "Spend your first week on the fundamentals — files, shortcuts, Google Workspace — so the role skills sit on solid ground.",
    });
  }

  // Tools from scratch
  if (!hasUsedRoleTools && career.tools.length > 0) {
    notes.push({
      tone: "note",
      title: "You're starting the tools from scratch",
      detail: `You have not used ${career.tools.join(", ")} yet — that is normal. The roadmap below starts you at zero on purpose.`,
    });
  }

  // Well set up
  if (user.hasLaptop && !weakInternet && hasUsedRoleTools && ratio >= 1) {
    goods.push({
      tone: "good",
      title: "You're well set up to start now",
      detail:
        "Laptop, internet, time and a head start on the tools — you have what you need to begin this week, not someday.",
    });
  }

  // Caution first, then notes, then one positive. Cap to keep it honest, not noisy.
  const ordered = [...cautions, ...notes, ...goods];
  if (ordered.length === 0) {
    ordered.push({
      tone: "good",
      title: "Nothing standing in your way",
      detail:
        "Your answers show no obvious blockers. The main thing left is to start and stay consistent.",
    });
  }
  return ordered.slice(0, 4);
}
