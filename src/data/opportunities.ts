// A curated directory of where to find opportunities — jobs, remote work,
// freelance, scholarships, internships and certifications — weighted towards
// what is reachable from Nigeria. This is content, not a live feed: it lists
// trustworthy places to look, not individual postings (which go stale). Review
// links before launch (REVIEW). The "careers" array tags which paths an entry
// suits; empty means it suits everyone.

import type { Opportunity } from "./types";

export const OPPORTUNITIES: Opportunity[] = [
  // ---- Jobs ----
  {
    id: "jobberman",
    title: "Jobberman",
    org: "Jobberman Nigeria",
    type: "job",
    url: "https://www.jobberman.com/",
    blurb: "Nigeria's largest job board, with a strong stream of entry and mid-level tech roles.",
    careers: [],
    audience: "nigeria",
    cost: "free",
  },
  {
    id: "myjobmag",
    title: "MyJobMag",
    org: "MyJobMag Nigeria",
    type: "job",
    url: "https://www.myjobmag.com/",
    blurb: "Widely-used Nigerian board; filter by 'IT / Software' for tech openings.",
    careers: [],
    audience: "nigeria",
    cost: "free",
  },
  {
    id: "linkedin-jobs",
    title: "LinkedIn Jobs",
    org: "LinkedIn",
    type: "job",
    url: "https://www.linkedin.com/jobs/",
    blurb: "Where most professional tech hiring happens. Set alerts for your role and 'remote'.",
    careers: [],
    audience: "global",
    cost: "free",
  },
  {
    id: "wellfound",
    title: "Wellfound (startup jobs)",
    org: "Wellfound",
    type: "job",
    url: "https://wellfound.com/",
    blurb: "Startup roles, many remote-friendly and open to junior talent with a portfolio.",
    careers: ["software_developer", "product_manager", "product_designer", "data_analyst"],
    audience: "global",
    cost: "free",
  },

  // ---- Remote ----
  {
    id: "remoteok",
    title: "RemoteOK",
    org: "RemoteOK",
    type: "remote",
    url: "https://remoteok.com/",
    blurb: "One of the biggest remote job boards, often paying in foreign currency.",
    careers: [],
    audience: "global",
    cost: "free",
  },
  {
    id: "turing",
    title: "Turing",
    org: "Turing",
    type: "remote",
    url: "https://www.turing.com/",
    blurb: "Matches vetted developers to remote roles at US companies.",
    careers: ["software_developer", "cloud_engineer", "data_analyst"],
    audience: "global",
    cost: "free",
  },
  {
    id: "remotive",
    title: "Remotive",
    org: "Remotive",
    type: "remote",
    url: "https://remotive.com/",
    blurb: "Curated remote roles across software, design, marketing and product.",
    careers: [],
    audience: "global",
    cost: "free",
  },

  // ---- Freelance ----
  {
    id: "upwork",
    title: "Upwork",
    org: "Upwork",
    type: "freelance",
    url: "https://www.upwork.com/",
    blurb: "The largest freelance marketplace; good for a first client and a track record.",
    careers: [],
    audience: "global",
    cost: "free",
  },
  {
    id: "fiverr",
    title: "Fiverr",
    org: "Fiverr",
    type: "freelance",
    url: "https://www.fiverr.com/",
    blurb: "Sell productised services — dashboards, designs, automations, prompts.",
    careers: ["data_analyst", "product_designer", "marketing_analyst", "automation_specialist", "prompt_engineer"],
    audience: "global",
    cost: "free",
  },
  {
    id: "toptal",
    title: "Toptal",
    org: "Toptal",
    type: "freelance",
    url: "https://www.toptal.com/",
    blurb: "Vetted, higher-paying network for experienced developers and designers.",
    careers: ["software_developer", "product_designer", "cloud_engineer"],
    audience: "global",
    cost: "free",
  },
  {
    id: "contra",
    title: "Contra",
    org: "Contra",
    type: "freelance",
    url: "https://contra.com/",
    blurb: "Commission-free freelance platform, strong for design and marketing.",
    careers: ["product_designer", "marketing_analyst"],
    audience: "global",
    cost: "free",
  },

  // ---- Scholarships / funded programmes ----
  {
    id: "3mtt",
    title: "3MTT (Three Million Technical Talent)",
    org: "Federal Government of Nigeria",
    type: "scholarship",
    url: "https://3mtt.nitda.gov.ng/",
    blurb: "Nigeria's national programme training three million people in tech skills, free.",
    careers: [],
    audience: "nigeria",
    cost: "free",
  },
  {
    id: "alx",
    title: "ALX Africa",
    org: "ALX",
    type: "scholarship",
    url: "https://www.alxafrica.com/",
    blurb: "Funded, intensive programmes in software, data, cloud and AI for Africans.",
    careers: ["software_developer", "data_analyst", "cloud_engineer", "ai_trainer"],
    audience: "africa",
    cost: "free",
  },
  {
    id: "google-certs-aid",
    title: "Google Career Certificates",
    org: "Google / Coursera",
    type: "scholarship",
    url: "https://grow.google/certificates/",
    blurb: "Job-ready certificates with financial aid available through Coursera.",
    careers: ["data_analyst", "marketing_analyst", "product_designer", "product_manager"],
    audience: "global",
    cost: "mixed",
  },
  {
    id: "coursera-aid",
    title: "Coursera Financial Aid",
    org: "Coursera",
    type: "scholarship",
    url: "https://www.coursera.org/",
    blurb: "Apply for fee waivers on most paid courses and certificates.",
    careers: [],
    audience: "global",
    cost: "mixed",
  },

  // ---- Internships / talent programmes ----
  {
    id: "altschool",
    title: "AltSchool Africa",
    org: "AltSchool Africa",
    type: "internship",
    url: "https://altschoolafrica.com/",
    blurb: "Low-cost, year-long schools in engineering, data, product and design with placement support.",
    careers: ["software_developer", "data_analyst", "product_designer", "cloud_engineer", "product_manager"],
    audience: "africa",
    cost: "mixed",
  },
  {
    id: "decagon",
    title: "Decagon",
    org: "Decagon",
    type: "internship",
    url: "https://decagon.dev/",
    blurb: "Selective, funded software engineering training with a job guarantee model.",
    careers: ["software_developer"],
    audience: "nigeria",
    cost: "mixed",
  },
  {
    id: "side-hustle",
    title: "Side Hustle Internship",
    org: "Terra Learning",
    type: "internship",
    url: "https://terrahq.co/",
    blurb: "Cohort-based virtual internships that give you real team experience and a reference.",
    careers: [],
    audience: "nigeria",
    cost: "mixed",
  },
  {
    id: "utiva",
    title: "Utiva",
    org: "Utiva",
    type: "internship",
    url: "https://utiva.io/",
    blurb: "Career programmes in data, product and cloud, with internship pathways.",
    careers: ["data_analyst", "product_manager", "cloud_engineer", "learning_analytics"],
    audience: "africa",
    cost: "paid",
  },

  // ---- Certifications ----
  {
    id: "google-data-cert",
    title: "Google Data Analytics Certificate",
    org: "Google",
    type: "certification",
    url: "https://grow.google/certificates/data-analytics/",
    blurb: "A recognised entry credential covering spreadsheets, SQL and visualisation.",
    careers: ["data_analyst", "learning_analytics", "marketing_analyst"],
    audience: "global",
    cost: "mixed",
  },
  {
    id: "pl300",
    title: "Microsoft Power BI (PL-300)",
    org: "Microsoft",
    type: "certification",
    url: "https://learn.microsoft.com/credentials/certifications/data-analyst-associate/",
    blurb: "The standard Power BI analyst certification, valued by Nigerian employers.",
    careers: ["data_analyst", "learning_analytics"],
    audience: "global",
    cost: "paid",
  },
  {
    id: "aws-cloud-practitioner",
    title: "AWS Certified Cloud Practitioner",
    org: "Amazon Web Services",
    type: "certification",
    url: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
    blurb: "The entry point into cloud certifications, opening well-paid remote roles.",
    careers: ["cloud_engineer"],
    audience: "global",
    cost: "paid",
  },
  {
    id: "comptia-security",
    title: "CompTIA Security+",
    org: "CompTIA",
    type: "certification",
    url: "https://www.comptia.org/certifications/security",
    blurb: "A widely-required baseline certification for security roles.",
    careers: ["cybersecurity_analyst"],
    audience: "global",
    cost: "paid",
  },
  {
    id: "freecodecamp-certs",
    title: "freeCodeCamp Certifications",
    org: "freeCodeCamp",
    type: "certification",
    url: "https://www.freecodecamp.org/learn",
    blurb: "Free, project-based certifications in web development and data analysis.",
    careers: ["software_developer", "data_analyst"],
    audience: "global",
    cost: "free",
  },
  {
    id: "google-ux-cert",
    title: "Google UX Design Certificate",
    org: "Google",
    type: "certification",
    url: "https://grow.google/certificates/ux-design/",
    blurb: "Build a UX portfolio and credential, financial aid available.",
    careers: ["product_designer"],
    audience: "global",
    cost: "mixed",
  },
  {
    id: "meta-marketing-cert",
    title: "Meta Digital Marketing Certificate",
    org: "Meta / Coursera",
    type: "certification",
    url: "https://www.coursera.org/professional-certificates/facebook-social-media-marketing",
    blurb: "Marketing analytics and ad-platform skills, with aid available.",
    careers: ["marketing_analyst"],
    audience: "global",
    cost: "mixed",
  },
];

export type OpportunityFilter = "all" | Opportunity["type"];

/**
 * Opportunities for a category and (optionally) a career. Career-relevant and
 * general entries are kept; career-specific matches are listed first.
 */
export function filterOpportunities(
  type: OpportunityFilter = "all",
  careerId?: string,
): Opportunity[] {
  let list = OPPORTUNITIES;
  if (type !== "all") {
    list = list.filter((o) => o.type === type);
  }
  if (careerId) {
    list = list.filter(
      (o) => o.careers.length === 0 || o.careers.includes(careerId),
    );
    // Career-specific entries first, then general ones.
    list = [...list].sort((a, b) => {
      const aSpecific = a.careers.includes(careerId) ? 0 : 1;
      const bSpecific = b.careers.includes(careerId) ? 0 : 1;
      return aSpecific - bSpecific;
    });
  }
  return list;
}
