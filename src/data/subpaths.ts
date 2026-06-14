// Specialisations within each career — technical "tracks" (front-end, back-end,
// mobile…) and industry "domains" (healthcare, logistics, fintech…). Each sub-
// path carries the signals that favour it (used by the deterministic picker) and
// the content that tailors the result: a niche capstone project and a niche
// curriculum module inserted before the base capstone. Content — edit freely.

import type { Resource, SubPath } from "./types";

const R = {
  kaggle: { label: "Kaggle: free datasets & courses", url: "https://www.kaggle.com/" },
  ga4: { label: "Google Analytics Academy", url: "https://analytics.google.com/analytics/academy/" },
  ndpr: { label: "Nigeria Data Protection Act (NDPA) overview", url: "https://ndpc.gov.ng/" },
  mdn: { label: "MDN Web Docs", url: "https://developer.mozilla.org/" },
  odin: { label: "The Odin Project", url: "https://www.theodinproject.com/" },
  fccResponsive: { label: "freeCodeCamp: Responsive Web Design", url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/" },
  flutter: { label: "Flutter docs", url: "https://docs.flutter.dev/" },
  reactNative: { label: "React Native docs", url: "https://reactnative.dev/docs/getting-started" },
  fastapi: { label: "FastAPI docs", url: "https://fastapi.tiangolo.com/" },
  postgres: { label: "PostgreSQL tutorial", url: "https://www.postgresqltutorial.com/" },
  awsSkill: { label: "AWS Skill Builder", url: "https://skillbuilder.aws/" },
  azureLearn: { label: "Microsoft Learn: Azure", url: "https://learn.microsoft.com/training/azure/" },
  terraform: { label: "HashiCorp: Terraform tutorials", url: "https://developer.hashicorp.com/terraform/tutorials" },
  tryhackme: { label: "TryHackMe", url: "https://tryhackme.com/" },
  owasp: { label: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/" },
  iso27001: { label: "ISO 27001 overview", url: "https://www.iso.org/standard/27001" },
  learnPrompting: { label: "Learn Prompting", url: "https://learnprompting.org/" },
  anthropicDocs: { label: "Anthropic: build with Claude", url: "https://docs.anthropic.com/" },
  figma: { label: "Figma: resource library", url: "https://www.figma.com/resource-library/" },
  makeAcademy: { label: "Make Academy", url: "https://www.make.com/en/academy" },
  metaAds: { label: "Meta Blueprint", url: "https://www.facebookblueprint.com/" },
  svpg: { label: "SVPG: product essays", url: "https://www.svpg.com/articles/" },
  kirkpatrick: { label: "Kirkpatrick evaluation model", url: "https://www.mindtools.com/a8t9esw/kirkpatricks-four-level-training-evaluation-model" },
} satisfies Record<string, Resource>;

// Helper to keep each sub-path terse.
function mod(
  id: string,
  title: string,
  summary: string,
  topics: string[],
  resources: Resource[],
  project: string,
) {
  return { id, title, summary, topics, resources, project };
}

export const SUBPATHS: Record<string, SubPath[]> = {
  // ===================== DATA ANALYST (domain) =====================
  data_analyst: [
    {
      id: "health_analytics",
      name: "Healthcare Analytics",
      blurb: "Analyse hospital, clinic and public-health data to improve care and operations.",
      kind: "domain",
      industries: ["health"],
      situations: ["healthcare_professional"],
      project: "a patient-flow or hospital wait-time dashboard built from a public health dataset, with two recommendations.",
      modules: [
        mod("da_health_mod", "Health data & its rules", "Health data is sensitive and structured differently. Knowing the data and the rules sets you apart.", ["Clinical & operational data types", "Patient privacy & the NDPA", "Common health metrics (wait time, readmission)", "Data quality in medical records"], [R.ndpr, R.kaggle], "Find a public health dataset and chart one outcome that matters."),
      ],
    },
    {
      id: "finance_analytics",
      name: "Financial & Banking Analytics",
      blurb: "Turn transaction and risk data into insight for banks and fintechs.",
      kind: "domain",
      industries: ["fintech"],
      situations: ["banker", "accountant"],
      motivations: ["income"],
      project: "a transactions dashboard that surfaces spending patterns or simple fraud signals.",
      modules: [
        mod("da_finance_mod", "Financial data & risk", "Finance is data-rich and well paid. Learn its metrics and its red flags.", ["Reading financial statements", "Key banking KPIs", "Fraud & risk signals", "Regulatory reporting basics"], [R.kaggle], "Analyse a sample transactions dataset and flag the unusual rows."),
      ],
    },
    {
      id: "logistics_analytics",
      name: "Logistics & Supply-chain Analytics",
      blurb: "Measure deliveries, inventory and routes to cut cost and delay.",
      kind: "domain",
      industries: ["logistics", "ecommerce"],
      situations: ["business_owner"],
      project: "a delivery-performance dashboard (on-time %, cost per route) with a bottleneck called out.",
      modules: [
        mod("da_logistics_mod", "Supply-chain metrics", "Logistics runs on numbers — and Nigeria's boom in delivery makes this valuable.", ["Inventory & stock metrics", "Delivery & route KPIs", "Demand forecasting basics", "Simple geospatial views"], [R.kaggle], "Build a dashboard from a deliveries dataset showing on-time performance."),
      ],
    },
    {
      id: "marketing_analytics_da",
      name: "Marketing & Growth Analytics",
      blurb: "Measure campaigns and customer behaviour to guide spend.",
      kind: "domain",
      industries: ["ecommerce", "media"],
      thinkingStyles: ["selling"],
      project: "a marketing dashboard showing channel performance and return on spend.",
      modules: [
        mod("da_marketing_mod", "Marketing data", "Where analysis meets growth — strong for freelance work.", ["Funnels & conversion", "Attribution basics", "GA4 fundamentals", "Cohorts & retention"], [R.ga4], "Pull data from a GA4 demo account and build a channel report."),
      ],
    },
  ],

  // ===================== BUSINESS ANALYST (domain) =====================
  business_analyst: [
    {
      id: "ba_fintech",
      name: "Fintech / Banking BA",
      blurb: "Bridge business and tech teams inside banks and fintechs.",
      kind: "domain",
      industries: ["fintech"],
      situations: ["banker", "accountant"],
      project: "a requirements pack for a payments or onboarding feature, with a process map.",
      modules: [
        mod("ba_fintech_mod", "Financial products & compliance", "Fintech BAs must understand money flows and the rules around them.", ["Payments & accounts basics", "KYC / AML at a high level", "Regulatory constraints", "Reconciliation"], [R.ndpr], "Map a money-transfer process end to end with controls marked."),
      ],
    },
    {
      id: "ba_software",
      name: "Software / Product BA",
      blurb: "Define what software teams build, working close to product and engineering.",
      kind: "domain",
      industries: ["other", "ecommerce"],
      buildPreference: ["web", "backend"],
      situations: ["engineer", "graduate"],
      project: "a full feature spec with user stories and acceptance criteria a dev team could build from.",
      modules: [
        mod("ba_software_mod", "Working with software teams", "Speak engineering's language without needing to code.", ["Agile & user stories", "APIs & data at a high level", "Acceptance criteria", "Backlog grooming"], [R.svpg], "Write user stories and acceptance criteria for one feature."),
      ],
    },
    {
      id: "ba_operations",
      name: "Operations BA",
      blurb: "Improve how a business runs — processes, logistics and operations.",
      kind: "domain",
      industries: ["logistics", "ecommerce"],
      situations: ["business_owner"],
      project: "an operations process redesign with before/after metrics.",
      modules: [
        mod("ba_ops_mod", "Operations & process improvement", "Find waste and fix it — the core of operations work.", ["Process mapping", "Lean basics", "Measuring a process", "Change management"], [], "Document a real operations process and propose two improvements."),
      ],
    },
    {
      id: "ba_public",
      name: "Public-sector BA",
      blurb: "Help government and agencies define and improve digital services.",
      kind: "domain",
      industries: ["government"],
      situations: ["civil_servant"],
      project: "a requirements and process pack for digitising a public service.",
      modules: [
        mod("ba_public_mod", "Public-sector delivery", "Government work has its own constraints and stakeholders.", ["Stakeholder mapping in the public sector", "Service design basics", "Policy-aware requirements", "Accessibility & inclusion"], [], "Map a public service and the people it must serve."),
      ],
    },
  ],

  // ===================== SOFTWARE DEVELOPER (track) =====================
  software_developer: [
    {
      id: "frontend",
      name: "Front-end Developer",
      blurb: "Build what users see and click — websites and web app interfaces.",
      kind: "track",
      buildPreference: ["web"],
      thinkingStyles: ["building", "designing"],
      project: "a polished, responsive web app (e.g. a dashboard or storefront UI) deployed live.",
      modules: [
        mod("dev_fe_mod", "Front-end deep dive", "Go deep on the browser stack and one framework.", ["HTML & CSS mastery", "JavaScript then TypeScript", "React (components, state, hooks)", "Responsive design & accessibility"], [R.mdn, R.odin, R.fccResponsive], "Rebuild a screen you admire as a responsive React component."),
      ],
    },
    {
      id: "backend",
      name: "Back-end Developer",
      blurb: "Build the servers, APIs and databases behind the scenes.",
      kind: "track",
      buildPreference: ["backend"],
      thinkingStyles: ["solving", "building"],
      project: "a REST API with a database and authentication, deployed and documented.",
      modules: [
        mod("dev_be_mod", "Back-end deep dive", "Own the data and the logic behind an app.", ["A back-end language & framework (Node/Express, Python/FastAPI, etc.)", "Designing REST APIs", "Databases (PostgreSQL)", "Authentication & security"], [R.fastapi, R.postgres], "Build and deploy a small API backed by a database."),
      ],
    },
    {
      id: "mobile",
      name: "Mobile App Developer",
      blurb: "Build the apps people install — Nigeria is mobile-first, so demand is real.",
      kind: "track",
      buildPreference: ["mobile"],
      thinkingStyles: ["building"],
      project: "a mobile app published to a store or shared as an installable build.",
      modules: [
        mod("dev_mobile_mod", "Mobile deep dive", "One codebase, both platforms — the fastest route in.", ["Cross-platform: Flutter (Dart) or React Native (JS/TS)", "Navigation & state", "Using device features", "Publishing to app stores"], [R.flutter, R.reactNative], "Build a small mobile app and run it on a real phone."),
      ],
    },
    {
      id: "fullstack",
      name: "Full-stack Developer",
      blurb: "Both ends — front-end and back-end. Best after you're solid on one side.",
      kind: "track",
      buildPreference: ["web", "backend"],
      thinkingStyles: ["building", "solving"],
      project: "a full-stack app (front-end + back-end + database) deployed end to end.",
      modules: [
        mod("dev_fs_mod", "Tie the stack together", "Connect a front-end to your own back-end and ship it.", ["A front-end framework + your API", "Auth across the stack", "Connecting to a database", "Deployment of both ends"], [R.odin], "Connect a React front-end to your own API with a database."),
      ],
    },
  ],

  // ===================== CLOUD ENGINEER (track) =====================
  cloud_engineer: [
    {
      id: "cloud_aws",
      name: "AWS Cloud Engineer",
      blurb: "Specialise in Amazon Web Services — the largest job market in cloud.",
      kind: "track",
      buildPreference: ["backend"],
      project: "a documented AWS architecture (web app + database) on the free tier, with a cert in progress.",
      modules: [
        mod("cloud_aws_mod", "AWS focus", "Go deep on AWS core services and certification.", ["EC2, S3, VPC, IAM", "Managed databases (RDS)", "Serverless (Lambda)", "Cert: Cloud Practitioner → Solutions Architect Associate"], [R.awsSkill], "Deploy a small app on AWS following a guided lab."),
      ],
    },
    {
      id: "cloud_azure",
      name: "Azure Cloud Engineer",
      blurb: "Specialise in Microsoft Azure — common in banks, enterprise and government.",
      kind: "track",
      industries: ["fintech", "government"],
      project: "a documented Azure deployment with identity set up, plus AZ-900 in progress.",
      modules: [
        mod("cloud_azure_mod", "Azure focus", "Azure skills open enterprise and public-sector doors.", ["VMs & App Service", "Azure Storage", "Entra ID (identity)", "Cert: AZ-900 → AZ-104"], [R.azureLearn], "Deploy a web app on Azure and secure it with identity."),
      ],
    },
    {
      id: "devops",
      name: "DevOps / Platform Engineer",
      blurb: "Automate how software is built, tested and shipped.",
      kind: "track",
      buildPreference: ["backend"],
      thinkingStyles: ["building", "organising"],
      project: "a CI/CD pipeline that builds, tests and deploys an app, with infrastructure as code.",
      modules: [
        mod("cloud_devops_mod", "DevOps toolchain", "The automation layer every modern team needs.", ["Docker & containers", "CI/CD pipelines", "Terraform (Infrastructure as Code)", "Monitoring basics"], [R.terraform], "Containerise an app and deploy it through a pipeline."),
      ],
    },
  ],

  // ===================== CYBERSECURITY ANALYST (track) =====================
  cybersecurity_analyst: [
    {
      id: "blue_team",
      name: "Blue Team / SOC Analyst",
      blurb: "Defend systems — monitor, detect and respond to threats. The common entry path.",
      kind: "track",
      thinkingStyles: ["analysing", "organising"],
      project: "an incident investigation in a home lab, written up as a SOC-style report.",
      modules: [
        mod("sec_blue_mod", "Defensive operations", "The day-to-day of protecting an organisation.", ["Log analysis & SIEM", "Incident response process", "Tools: Splunk, Microsoft Sentinel", "Threat intelligence basics"], [R.tryhackme], "Investigate a simulated incident and document your findings."),
      ],
    },
    {
      id: "offensive",
      name: "Penetration Tester",
      blurb: "Ethically break into systems to find weaknesses before attackers do.",
      kind: "track",
      thinkingStyles: ["solving", "researching"],
      project: "a write-up of vulnerabilities you found and exploited in a legal lab environment.",
      modules: [
        mod("sec_offensive_mod", "Offensive security", "Think like an attacker, legally.", ["Web app security (OWASP Top 10)", "Hack The Box / TryHackMe labs", "Common exploits", "Cert path: eJPT → OSCP"], [R.owasp, R.tryhackme], "Complete an offensive-security lab path and document one exploit."),
      ],
    },
    {
      id: "grc",
      name: "GRC Analyst (Governance, Risk, Compliance)",
      blurb: "Policy, audit and risk — a strong security path for non-coders.",
      kind: "domain",
      buildPreference: ["people"],
      situations: ["civil_servant", "accountant"],
      industries: ["fintech", "government"],
      project: "a risk assessment and a short security policy for a small organisation.",
      modules: [
        mod("sec_grc_mod", "Governance & risk", "Security as policy and process, not code.", ["Frameworks: ISO 27001, NIST", "Risk assessment", "Audits & compliance", "Security awareness"], [R.iso27001], "Carry out a simple risk assessment for an organisation you know."),
      ],
    },
  ],

  // ===================== PRODUCT MANAGER (domain) =====================
  product_manager: [
    {
      id: "pm_fintech",
      name: "Fintech PM",
      blurb: "Lead products that move money — Nigeria's hottest tech sector.",
      kind: "domain",
      industries: ["fintech"],
      project: "a PRD for a payments or savings feature, with metrics and a roadmap.",
      modules: [
        mod("pm_fintech_mod", "Fintech product sense", "Understand the money, the risk and the regulation.", ["Payments & financial products", "Compliance constraints", "Trust & fraud", "Fintech metrics"], [R.svpg], "Write a one-page PRD for a fintech feature."),
      ],
    },
    {
      id: "pm_health",
      name: "Healthtech PM",
      blurb: "Build products that improve how people access and receive care.",
      kind: "domain",
      industries: ["health"],
      situations: ["healthcare_professional"],
      project: "a PRD for a healthtech feature, mindful of privacy and access.",
      modules: [
        mod("pm_health_mod", "Healthtech product sense", "Care, privacy and access shape every decision.", ["Patient & provider needs", "Privacy (NDPA) & trust", "Access in low-connectivity settings", "Health outcomes as metrics"], [R.ndpr], "Write a PRD for a feature that improves a care journey."),
      ],
    },
    {
      id: "pm_ecommerce",
      name: "E-commerce / Consumer PM",
      blurb: "Own consumer-facing products — shopping, marketplaces, content.",
      kind: "domain",
      industries: ["ecommerce", "media"],
      project: "a PRD for a consumer feature, with growth and retention metrics.",
      modules: [
        mod("pm_ecom_mod", "Consumer product growth", "Acquisition, conversion and retention at consumer scale.", ["Funnels & conversion", "Retention & habit", "Experimentation", "Consumer metrics"], [R.svpg], "Define the success metrics and experiments for a consumer feature."),
      ],
    },
    {
      id: "pm_saas",
      name: "B2B / SaaS PM",
      blurb: "Build tools that other businesses pay for.",
      kind: "domain",
      industries: ["other"],
      buildPreference: ["backend", "web"],
      project: "a PRD for a B2B feature, including the buyer vs user distinction.",
      modules: [
        mod("pm_saas_mod", "B2B product sense", "Selling to businesses is a different game from consumers.", ["Buyers vs users", "Onboarding & activation", "Integrations & APIs", "B2B metrics (churn, expansion)"], [R.svpg], "Write a PRD for a B2B feature and name the buyer and the user."),
      ],
    },
  ],

  // ===================== AI TRAINER (domain) =====================
  ai_trainer: [
    {
      id: "ai_corporate",
      name: "Corporate AI Trainer",
      blurb: "Help companies and their teams adopt AI tools productively.",
      kind: "domain",
      industries: ["fintech", "ecommerce", "other"],
      project: "a corporate AI workshop with role-specific use cases and a measurable goal.",
      modules: [
        mod("ai_corp_mod", "Training businesses", "Tie AI to real business outcomes and roles.", ["Role-based use cases", "Change management & resistance", "Measuring impact", "Data safety at work"], [R.anthropicDocs], "Design an AI session for one business team's real tasks."),
      ],
    },
    {
      id: "ai_education",
      name: "Education AI Trainer",
      blurb: "Help teachers, schools and students use AI to learn and teach better.",
      kind: "domain",
      industries: ["education"],
      situations: ["teacher"],
      project: "an AI workshop for teachers, with classroom-ready examples and a handout.",
      modules: [
        mod("ai_edu_mod", "AI in education", "AI for learning, not cheating — and for teacher productivity.", ["Classroom use cases", "Academic integrity", "Differentiated learning", "Teacher workflows"], [R.learnPrompting], "Design an AI lesson aid a teacher could use next week."),
      ],
    },
    {
      id: "ai_public",
      name: "Public-sector / NGO AI Trainer",
      blurb: "Build AI capability in government, agencies and non-profits.",
      kind: "domain",
      industries: ["government"],
      situations: ["civil_servant"],
      project: "an AI capability session for a public or non-profit team, with safe-use guidelines.",
      modules: [
        mod("ai_public_mod", "AI for public good", "Capacity-building with public-sector constraints in mind.", ["Public-sector use cases", "Data protection & ethics", "Low-resource delivery", "Building internal champions"], [R.anthropicDocs], "Design an AI session for a public-sector team."),
      ],
    },
  ],

  // ===================== PROMPT ENGINEER (track/domain) =====================
  prompt_engineer: [
    {
      id: "prompt_content",
      name: "Content & Marketing Prompting",
      blurb: "Design prompts that produce reliable marketing and content at scale.",
      kind: "domain",
      industries: ["media", "ecommerce"],
      thinkingStyles: ["selling", "building"],
      project: "a prompt library for a content workflow, with brand voice locked in.",
      modules: [
        mod("prompt_content_mod", "Prompting for content", "Consistent, on-brand output at volume.", ["Brand voice in prompts", "Templates & variables", "Quality control", "Scaling content"], [R.learnPrompting], "Build prompts that produce on-brand content reliably."),
      ],
    },
    {
      id: "prompt_software",
      name: "Technical Prompt Engineer (RAG & tools)",
      blurb: "Build prompts inside real software — retrieval, tools, structured output.",
      kind: "track",
      buildPreference: ["backend"],
      thinkingStyles: ["building", "analysing"],
      project: "a small AI feature that uses retrieval (RAG) and returns structured output.",
      modules: [
        mod("prompt_rag_mod", "Prompting in systems", "Where prompting meets engineering.", ["Retrieval-augmented generation (RAG)", "Tool / function calling", "Structured output (JSON)", "Evaluation & guardrails"], [R.anthropicDocs], "Build a prompt that returns reliable JSON for a real task."),
      ],
    },
    {
      id: "prompt_research",
      name: "Research & Analysis Prompting",
      blurb: "Use prompting to research, summarise and analyse at speed.",
      kind: "domain",
      thinkingStyles: ["researching", "analysing"],
      project: "a tested prompt suite for research and synthesis, with quality checks.",
      modules: [
        mod("prompt_research_mod", "Prompting for analysis", "Reliable summarising, extraction and reasoning.", ["Summarisation patterns", "Extraction & classification", "Reducing hallucination", "Checking the output"], [R.learnPrompting], "Build a prompt that extracts structured facts from messy text."),
      ],
    },
  ],

  // ===================== DIGITAL MARKETING ANALYST (domain) =====================
  marketing_analyst: [
    {
      id: "mk_ecommerce",
      name: "E-commerce / Retail Analyst",
      blurb: "Measure and grow online stores and marketplaces.",
      kind: "domain",
      industries: ["ecommerce"],
      project: "an e-commerce performance dashboard with a recommendation to lift conversion.",
      modules: [
        mod("mk_ecom_mod", "E-commerce analytics", "Where marketing data meets sales.", ["Conversion & cart metrics", "Product & category analysis", "Retention & LTV", "Channel ROI"], [R.ga4], "Analyse a store's funnel and recommend one improvement."),
      ],
    },
    {
      id: "mk_fintech",
      name: "Fintech Growth Analyst",
      blurb: "Drive and measure user growth for financial products.",
      kind: "domain",
      industries: ["fintech"],
      project: "a growth dashboard for a fintech app (acquisition → activation → retention).",
      modules: [
        mod("mk_fintech_mod", "Fintech growth", "Acquiring and keeping users who move money.", ["Acquisition channels", "Activation & onboarding", "Retention & referral", "Compliance in marketing"], [R.ga4], "Map a fintech growth funnel and find the biggest drop-off."),
      ],
    },
    {
      id: "mk_freelance",
      name: "Agency / Freelance Analyst",
      blurb: "Serve local businesses and SMEs as an independent marketing analyst.",
      kind: "domain",
      situations: ["business_owner", "freelancer"],
      motivations: ["entrepreneurship", "flexibility"],
      project: "a reusable reporting template and a sample audit for an SME client.",
      modules: [
        mod("mk_freelance_mod", "Marketing analytics as a service", "Package your skills for paying clients.", ["Client reporting templates", "Auditing accounts", "Pricing your service", "Presenting to non-marketers"], [R.metaAds], "Audit a small business's marketing and write a one-page report."),
      ],
    },
    {
      id: "mk_social",
      name: "Social & Content Analyst",
      blurb: "Measure what works across social and content channels.",
      kind: "domain",
      industries: ["media"],
      thinkingStyles: ["analysing", "selling"],
      project: "a social-content performance dashboard with a posting recommendation.",
      modules: [
        mod("mk_social_mod", "Social & content analytics", "Turn engagement into decisions.", ["Engagement & reach metrics", "Content performance", "Platform analytics", "Reporting cadence"], [R.metaAds], "Analyse a brand's social content and recommend a change."),
      ],
    },
  ],

  // ===================== PRODUCT DESIGNER (track) =====================
  product_designer: [
    {
      id: "design_mobile",
      name: "Mobile App Designer",
      blurb: "Design phone apps — the dominant surface for Nigerian users.",
      kind: "track",
      buildPreference: ["mobile"],
      project: "a mobile app case study: research, screens and a clickable prototype.",
      modules: [
        mod("design_mobile_mod", "Mobile UX & UI", "Designing for small screens and real thumbs.", ["Mobile patterns & navigation", "Touch & gestures", "iOS vs Android conventions", "Designing for low-end devices"], [R.figma], "Design and prototype a 3-screen mobile flow in Figma."),
      ],
    },
    {
      id: "design_web",
      name: "Web / SaaS Designer",
      blurb: "Design web apps, dashboards and SaaS products.",
      kind: "track",
      buildPreference: ["web"],
      project: "a web app case study with a design system and a clickable prototype.",
      modules: [
        mod("design_web_mod", "Web & SaaS design", "Designing dense, productive interfaces.", ["Layout & responsive design", "Design systems & components", "Data-heavy interfaces", "Hand-off to developers"], [R.figma], "Design a dashboard screen with a small component system."),
      ],
    },
    {
      id: "design_research",
      name: "UX Researcher",
      blurb: "Specialise in understanding users — research that guides design.",
      kind: "domain",
      thinkingStyles: ["researching", "analysing"],
      buildPreference: ["people"],
      project: "a research report from real interviews and a usability test, with clear insights.",
      modules: [
        mod("design_research_mod", "UX research craft", "The discipline of learning from users rigorously.", ["Interview techniques", "Usability testing", "Synthesising findings", "Communicating insight"], [R.figma], "Run three interviews and turn them into actionable insights."),
      ],
    },
  ],

  // ===================== AUTOMATION SPECIALIST (domain) =====================
  automation_specialist: [
    {
      id: "auto_sme",
      name: "SME Operations Automation",
      blurb: "Automate the repetitive work of small and medium businesses.",
      kind: "domain",
      situations: ["business_owner", "freelancer"],
      motivations: ["entrepreneurship"],
      project: "an end-to-end automation of a real SME task, with time saved documented.",
      modules: [
        mod("auto_sme_mod", "Automating a business", "Find and remove repetitive work for a real business.", ["Mapping operations", "Connecting common SME tools", "Pricing automation work", "Maintenance & handover"], [R.makeAcademy], "Automate one repetitive task for a small business."),
      ],
    },
    {
      id: "auto_marketing",
      name: "Marketing & Sales Ops Automation",
      blurb: "Automate lead capture, follow-up and reporting for sales and marketing.",
      kind: "domain",
      industries: ["ecommerce", "media"],
      thinkingStyles: ["selling", "organising"],
      project: "an automated lead-to-follow-up workflow with reporting.",
      modules: [
        mod("auto_marketing_mod", "Marketing & sales automation", "Where automation drives revenue.", ["Lead capture & routing", "Email & CRM automation", "AI for personalisation", "Reporting dashboards"], [R.makeAcademy], "Automate a lead-capture-to-follow-up flow."),
      ],
    },
    {
      id: "auto_finance",
      name: "Finance & Admin Automation",
      blurb: "Automate invoicing, reconciliation and admin paperwork.",
      kind: "domain",
      industries: ["fintech"],
      situations: ["accountant"],
      project: "an automated invoicing or reconciliation workflow with error handling.",
      modules: [
        mod("auto_finance_mod", "Finance & admin automation", "Remove the slow, error-prone paperwork.", ["Invoice & receipt workflows", "Reconciliation", "Spreadsheets & data validation", "Error handling"], [R.makeAcademy], "Automate an invoicing or data-entry task end to end."),
      ],
    },
  ],

  // ===================== LEARNING ANALYTICS (domain) =====================
  learning_analytics: [
    {
      id: "la_schools",
      name: "Schools / Basic Education Analytics",
      blurb: "Use data to improve teaching and outcomes in schools.",
      kind: "domain",
      industries: ["education"],
      situations: ["teacher"],
      project: "a school performance dashboard with two recommended interventions.",
      modules: [
        mod("la_schools_mod", "Education data in schools", "Records are often messy and on paper — turn them into insight.", ["School data sources", "Outcome & attendance metrics", "Cleaning paper-based records", "Reporting to school leaders"], [R.kirkpatrick], "Build a dashboard from a class or school dataset."),
      ],
    },
    {
      id: "la_higher",
      name: "Higher Education Analytics",
      blurb: "Improve programmes and retention in universities and colleges.",
      kind: "domain",
      industries: ["education"],
      situations: ["graduate"],
      project: "a retention dashboard for a programme, with at-risk students flagged.",
      modules: [
        mod("la_higher_mod", "Higher-ed analytics", "Retention, progression and programme quality.", ["Retention & progression metrics", "At-risk indicators", "Programme evaluation", "Institutional reporting"], [R.kirkpatrick], "Build a programme-retention dashboard and flag risk."),
      ],
    },
    {
      id: "la_corporate",
      name: "Corporate L&D Analytics",
      blurb: "Measure training and capability inside companies.",
      kind: "domain",
      industries: ["fintech", "other"],
      project: "an L&D dashboard linking training to performance outcomes.",
      modules: [
        mod("la_corporate_mod", "Corporate learning analytics", "Prove that training actually works.", ["Training metrics", "Kirkpatrick's levels", "Linking learning to performance", "Reporting to leadership"], [R.kirkpatrick], "Build a dashboard that links a training programme to an outcome."),
      ],
    },
    {
      id: "la_edtech",
      name: "EdTech Analytics",
      blurb: "Improve learning products with usage and outcome data.",
      kind: "domain",
      industries: ["education", "ecommerce"],
      project: "an engagement-and-outcomes dashboard for a learning product.",
      modules: [
        mod("la_edtech_mod", "EdTech product analytics", "Where learning science meets product data.", ["Engagement & completion metrics", "Learning outcomes", "Cohort analysis", "Funnels in learning products"], [R.kirkpatrick], "Analyse a learning product's engagement and completion."),
      ],
    },
  ],
};

/** All sub-paths for a career, or an empty list if none are authored. */
export function subPathsFor(careerId: string): SubPath[] {
  return SUBPATHS[careerId] ?? [];
}
