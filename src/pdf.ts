// Builds a downloadable PDF of the result with jsPDF. The PDF is laid out from
// the structured data (not a screenshot), so text stays crisp and selectable.
// jsPDF is imported statically so the download has no runtime dependency on
// fetching a separate chunk — the button just works.

import { jsPDF } from "jspdf";
import type {
  AiGuide,
  Branding,
  Career,
  Curriculum,
  RoadmapPhase,
  SubPath,
} from "./data/types";
import type { SkillsGap } from "./engine/gap";

export interface ResultPdfData {
  career: Career;
  subPath?: SubPath | null;
  reasoning: string;
  gap: SkillsGap;
  roadmap: RoadmapPhase[];
  curriculum: Curriculum;
  aiGuide?: AiGuide;
  branding: Branding;
}

const NAVY: [number, number, number] = [21, 50, 74];
const INK: [number, number, number] = [30, 30, 30];
const GREY: [number, number, number] = [120, 120, 120];

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 48;
const WIDTH = PAGE_W - MARGIN * 2;
const BOTTOM = PAGE_H - 56;

/** Renders the result into a jsPDF document. Separated from saving so it can be
 *  exercised in tests without a browser. */
export function renderResultDoc(data: ResultPdfData): jsPDF {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  let y = 56;

  function ensure(space: number) {
    if (y + space > BOTTOM) {
      doc.addPage();
      y = 56;
    }
  }

  function lines(text: string, size: number, leading: number, color: [number, number, number], bold = false) {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(size);
    doc.setTextColor(...color);
    for (const line of doc.splitTextToSize(text, WIDTH)) {
      ensure(leading);
      doc.text(line, MARGIN, y);
      y += leading;
    }
  }

  function heading(text: string) {
    y += 10;
    ensure(24);
    lines(text, 14, 19, NAVY, true);
    y += 4;
  }

  function label(text: string) {
    lines(text.toUpperCase(), 8, 13, GREY, true);
  }

  function body(text: string) {
    lines(text, 10, 14.5, INK);
  }

  function bullets(items: string[]) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...INK);
    for (const item of items) {
      const wrapped = doc.splitTextToSize(item, WIDTH - 14);
      wrapped.forEach((line: string, i: number) => {
        ensure(14.5);
        if (i === 0) doc.text("•", MARGIN, y);
        doc.text(line, MARGIN + 14, y);
        y += 14.5;
      });
    }
  }

  function divider() {
    y += 6;
    ensure(10);
    doc.setDrawColor(225, 225, 230);
    doc.line(MARGIN, y, PAGE_W - MARGIN, y);
    y += 10;
  }

  // --- Header ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...NAVY);
  doc.text("Ona", MARGIN, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...GREY);
  doc.text("Find your path. Build your future.", MARGIN + 34, y);
  y += 26;

  label("Your recommended path");
  y += 2;
  lines(data.career.name, 24, 28, NAVY, true);
  body(data.career.oneLiner);
  if (data.subPath) {
    y += 4;
    label("Specialisation");
    lines(data.subPath.name, 13, 17, NAVY, true);
    body(data.subPath.blurb);
  }

  // --- Why this fits ---
  if (data.reasoning) {
    heading("Why this fits");
    body(data.reasoning);
  }

  // --- Reality check ---
  heading("An honest look at the work");
  const rc = data.career.realityCheck;
  const realityRows: [string, string][] = [
    ["A typical day", rc.typicalDay],
    ["Tools you would use", rc.toolsUsed],
    ["How technical it is", rc.technicalShare],
    ["Common frustrations", rc.commonFrustrations],
    ["Remote potential", rc.remotePotential],
  ];
  for (const [l, v] of realityRows) {
    label(l);
    body(v);
    y += 3;
  }

  // --- Skills gap ---
  heading("Where you stand");
  label("Skills you already have");
  body(data.gap.have.length ? data.gap.have.join(", ") : "—");
  y += 3;
  label("Skills to build");
  body(data.gap.toBuild.length ? data.gap.toBuild.join(", ") : "You already hold the core skills.");
  y += 3;
  label("Estimated learning time at your pace");
  body(`About ${data.gap.months} ${data.gap.months === 1 ? "month" : "months"}.`);

  // --- Next step ---
  heading("Start here this week");
  body(data.career.nextStep);

  // --- Roadmap ---
  heading("Your 90-day roadmap");
  data.roadmap.forEach((phase, i) => {
    label(`Phase ${i + 1} · ${phase.title} · ${phase.timeframe}`);
    body(phase.focus);
    bullets(phase.milestones);
    if (phase.resources.length) {
      body("Resources: " + phase.resources.map((r) => `${r.label} (${r.url})`).join("  ·  "));
    }
    y += 4;
  });

  // --- Curriculum ---
  heading("Your curriculum");
  if (data.curriculum.intro) body(data.curriculum.intro);
  y += 2;
  data.curriculum.modules.forEach((m, i) => {
    label(`Module ${i + 1} · ${m.title}`);
    body(m.summary);
    bullets(m.topics);
    if (m.tracks && m.tracks.length) {
      for (const track of m.tracks) {
        body(`${track.name}: ${track.options.join("; ")}`);
      }
    }
    if (m.resources.length) {
      body("Resources: " + m.resources.map((r) => `${r.label} (${r.url})`).join("  ·  "));
    }
    body(`Project: ${m.project}`);
    y += 4;
  });

  // --- AI for your path ---
  if (data.aiGuide) {
    heading("AI for your path");
    label("The role AI plays here");
    body(data.aiGuide.role);
    y += 2;
    label("Use AI to");
    bullets(data.aiGuide.uses);
    label("Learn this AI to get ahead");
    bullets(data.aiGuide.learn.map((l) => `${l.skill} — ${l.why}`));
    body(`Keep in mind: ${data.aiGuide.caution}`);
  }

  // --- Branding ---
  heading("Personal branding");
  label("Profile headline");
  body(data.branding.headline);
  y += 3;
  label("About / bio");
  body(data.branding.bio);

  divider();
  lines(
    `Generated by Ona on ${new Date().toLocaleDateString()}. Salary and resource details should be confirmed at source.`,
    8,
    12,
    GREY,
  );

  // --- Page numbers ---
  const pages = doc.getNumberOfPages();
  for (let p = 1; p <= pages; p++) {
    doc.setPage(p);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...GREY);
    doc.text(`${p} / ${pages}`, PAGE_W - MARGIN, PAGE_H - 28, { align: "right" });
  }

  return doc;
}

export function downloadResultPdf(data: ResultPdfData): void {
  const doc = renderResultDoc(data);
  doc.save(`Ona-${data.career.id}-plan.pdf`);
}
