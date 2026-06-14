// Free learning resources keyed by skill, used to populate the roadmap. These
// are content, not logic — edit freely. URLs point at canonical, well-known free
// resources; the owner should review them before launch (marked REVIEW).

import type { Resource } from "./types";

// One or two strong free resources per skill the careers require.
export const SKILL_RESOURCES: Record<string, Resource[]> = {
  // Data & analysis
  "data analysis": [
    { label: "Kaggle: Intro to Data Analysis", url: "https://www.kaggle.com/learn" },
    { label: "freeCodeCamp: Data Analysis", url: "https://www.freecodecamp.org/learn/data-analysis-with-python/" },
  ],
  "basic data analysis": [
    { label: "Kaggle Learn", url: "https://www.kaggle.com/learn" },
  ],
  "spreadsheet modelling": [
    { label: "Excel Easy (free tutorials)", url: "https://www.excel-easy.com/" },
  ],
  Excel: [
    { label: "Microsoft: Excel video training", url: "https://support.microsoft.com/excel" },
  ],
  "Power BI": [
    { label: "Microsoft Learn: Power BI", url: "https://learn.microsoft.com/training/powerplatform/power-bi" },
  ],
  "basic SQL": [
    { label: "SQLBolt (interactive)", url: "https://sqlbolt.com/" },
    { label: "Kaggle: Intro to SQL", url: "https://www.kaggle.com/learn/intro-to-sql" },
  ],
  "basic data visualisation": [
    { label: "Google: Data Analytics basics", url: "https://www.coursera.org/google-certificates/data-analytics-certificate" },
  ],
  "learning measurement": [
    { label: "Kirkpatrick model overview", url: "https://www.mindtools.com/a8t9esw/kirkpatricks-four-level-training-evaluation-model" },
  ],

  // Software / cloud / security
  programming: [
    { label: "freeCodeCamp", url: "https://www.freecodecamp.org/" },
    { label: "CS50 (Harvard, free)", url: "https://cs50.harvard.edu/x/" },
  ],
  "one core language": [
    { label: "Python for Everybody (free)", url: "https://www.py4e.com/" },
  ],
  "problem decomposition": [
    { label: "CS50 problem sets", url: "https://cs50.harvard.edu/x/" },
  ],
  "version control": [
    { label: "GitHub: Git & GitHub basics", url: "https://docs.github.com/get-started" },
  ],
  "networking basics": [
    { label: "Professor Messer: Network+ (free)", url: "https://www.professormesser.com/" },
  ],
  Linux: [
    { label: "Linux Journey", url: "https://linuxjourney.com/" },
  ],
  "a cloud platform": [
    { label: "Microsoft Learn: Azure Fundamentals", url: "https://learn.microsoft.com/training/azure/" },
    { label: "AWS Skill Builder (free tier)", url: "https://skillbuilder.aws/" },
  ],
  scripting: [
    { label: "Automate the Boring Stuff (free)", url: "https://automatetheboringstuff.com/" },
  ],
  "security fundamentals": [
    { label: "TryHackMe: Intro path", url: "https://tryhackme.com/" },
  ],
  "threat analysis": [
    { label: "Professor Messer: Security+ (free)", url: "https://www.professormesser.com/" },
  ],

  // AI
  "AI tool fluency": [
    { label: "Anthropic: prompting & docs", url: "https://docs.anthropic.com/" },
    { label: "Google: AI Essentials", url: "https://grow.google/ai/" },
  ],
  "prompt design": [
    { label: "Learn Prompting (free)", url: "https://learnprompting.org/" },
    { label: "Anthropic prompt guide", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview" },
  ],
  "testing and iteration": [
    { label: "Learn Prompting: evaluation", url: "https://learnprompting.org/" },
  ],

  // Product / design / marketing
  "product thinking": [
    { label: "Reforge & SVPG free essays", url: "https://www.svpg.com/articles/" },
  ],
  prioritisation: [
    { label: "Atlassian: prioritisation frameworks", url: "https://www.atlassian.com/agile/product-management" },
  ],
  "stakeholder communication": [
    { label: "Atlassian: working agreements", url: "https://www.atlassian.com/team-playbook" },
  ],
  "user research": [
    { label: "Google UX Design (free to audit)", url: "https://www.coursera.org/professional-certificates/google-ux-design" },
  ],
  "interface design": [
    { label: "Figma: design basics", url: "https://www.figma.com/resource-library/" },
  ],
  prototyping: [
    { label: "Figma: prototyping", url: "https://help.figma.com/hc/en-us/categories/360002051613" },
  ],
  "design tools": [
    { label: "Figma (free) + tutorials", url: "https://www.figma.com/resource-library/" },
  ],
  "campaign analytics": [
    { label: "Google: Fundamentals of Digital Marketing", url: "https://grow.google/certificates/digital-marketing-ecommerce/" },
  ],

  // Process / automation / facilitation / writing
  "process mapping": [
    { label: "Lucidchart: process mapping guide", url: "https://www.lucidchart.com/pages/process-mapping" },
  ],
  "requirements gathering": [
    { label: "BABOK intro (IIBA)", url: "https://www.iiba.org/career-resources/a-business-analysis-professionals-foundation-for-success/babok/" },
  ],
  "automation tools": [
    { label: "n8n: free course", url: "https://docs.n8n.io/courses/" },
    { label: "Make Academy", url: "https://www.make.com/en/academy" },
  ],
  "logical thinking": [
    { label: "Automate the Boring Stuff", url: "https://automatetheboringstuff.com/" },
  ],
  "instructional design": [
    { label: "Cathy Moore: Action Mapping", url: "https://blog.cathy-moore.com/action-mapping-a-visual-approach-to-training-design/" },
  ],
  facilitation: [
    { label: "SessionLab: facilitation library", url: "https://www.sessionlab.com/library" },
  ],
  "clear writing": [
    { label: "Hemingway Editor", url: "https://hemingwayapp.com/" },
  ],
};

// Pointers used in the later roadmap phases.
export const COMMUNITY_RESOURCES: Resource[] = [
  { label: "freeCodeCamp community forum", url: "https://forum.freecodecamp.org/" },
  { label: "dev.to — write & share progress", url: "https://dev.to/" },
];

export const JOB_RESOURCES: Resource[] = [
  { label: "LinkedIn Jobs", url: "https://www.linkedin.com/jobs/" },
  { label: "RemoteOK (remote roles)", url: "https://remoteok.com/" },
];

/** Up to two resources for a skill; empty array if we have none. */
export function resourcesFor(skill: string): Resource[] {
  return SKILL_RESOURCES[skill] ?? [];
}
