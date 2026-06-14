// "AI for my path": for each career, the role AI plays in that field, what to
// use AI to do day to day, and the AI skills worth learning to get ahead. This
// is content — edit freely. Honest by design: each guide ends with a caveat.

import type { AiGuide, Resource } from "./types";

const R = {
  learnPrompting: { label: "Learn Prompting (free)", url: "https://learnprompting.org/" },
  googleAi: { label: "Google: AI Essentials", url: "https://grow.google/ai/" },
  anthropic: { label: "Anthropic: build with Claude", url: "https://docs.anthropic.com/" },
  openai: { label: "OpenAI: docs & quickstart", url: "https://platform.openai.com/docs/overview" },
  copilot: { label: "Microsoft Copilot help", url: "https://support.microsoft.com/copilot" },
  elementsAi: { label: "Elements of AI (free)", url: "https://www.elementsofai.com/" },
  cursor: { label: "AI coding assistants (overview)", url: "https://docs.github.com/copilot" },
} satisfies Record<string, Resource>;

export const AI_GUIDES: Record<string, AiGuide> = {
  data_analyst: {
    careerId: "data_analyst",
    role: "AI now does much of the grunt work of analysis — writing SQL, cleaning data, drafting explanations — so analysts who use it are far faster. It won't decide which question matters; that judgement stays yours.",
    uses: [
      "Turn a plain-English question into a working SQL query",
      "Clean and reshape messy data with step-by-step help",
      "Summarise findings into plain language for managers",
      "Draft chart titles, report narratives and takeaways",
      "Explain an unfamiliar formula, function or piece of code",
    ],
    learn: [
      { skill: "Prompting for data tasks", why: "Get reliable SQL, formulas and explanations on demand.", resource: R.learnPrompting },
      { skill: "AI inside your tools (Copilot in Excel & Power BI)", why: "It's built into the software you already use.", resource: R.copilot },
      { skill: "How LLMs handle data — and their limits", why: "Know when the output can be trusted.", resource: R.googleAi },
    ],
    caution: "AI will confidently invent numbers. Always check figures against the source data.",
  },

  business_analyst: {
    careerId: "business_analyst",
    role: "AI helps BAs draft documents, summarise meetings and turn rough notes into clear requirements — cutting the time spent writing so you spend more time understanding the business.",
    uses: [
      "Turn meeting notes into draft requirements or user stories",
      "Summarise long documents and email threads",
      "Draft process descriptions and acceptance criteria",
      "Generate test scenarios from a requirement",
      "Rewrite technical points in business language (and vice versa)",
    ],
    learn: [
      { skill: "Prompting for documents", why: "Faster, clearer requirements and specs.", resource: R.learnPrompting },
      { skill: "AI meeting & document tools", why: "Summaries and notes are where AI saves a BA the most time.", resource: R.copilot },
      { skill: "AI literacy", why: "Speak credibly about AI features stakeholders ask for.", resource: R.googleAi },
    ],
    caution: "AI summaries miss nuance and can misattribute decisions — confirm anything that drives a requirement.",
  },

  software_developer: {
    careerId: "software_developer",
    role: "AI coding assistants now write, explain and debug code alongside you, and they're becoming standard. They make you faster — but you must understand what they produce, or you'll get stuck the moment it's wrong.",
    uses: [
      "Generate boilerplate and repetitive code",
      "Explain unfamiliar code and error messages",
      "Write tests and help track down bugs",
      "Translate between languages or frameworks",
      "Talk through a design before you build it",
    ],
    learn: [
      { skill: "Using an AI coding assistant well", why: "It's now part of the everyday workflow.", resource: R.cursor },
      { skill: "Reviewing & testing AI-generated code", why: "You own the bugs, not the AI.", resource: R.anthropic },
      { skill: "Building AI features (calling an LLM API)", why: "AI-powered features are in high demand.", resource: R.openai },
      { skill: "Prompt fundamentals", why: "Better prompts produce better code.", resource: R.learnPrompting },
    ],
    caution: "Never paste secrets or client code into public AI tools, and test everything it writes — it is often subtly wrong.",
  },

  cloud_engineer: {
    careerId: "cloud_engineer",
    role: "AI helps cloud engineers write scripts and infrastructure code, explain configurations, and debug incidents faster. It's an accelerator on top of deep systems knowledge, not a replacement for it.",
    uses: [
      "Generate and explain Terraform, YAML and shell scripts",
      "Draft and troubleshoot cloud configurations",
      "Summarise logs and suggest causes during incidents",
      "Explain unfamiliar services and error messages",
      "Write documentation for what you built",
    ],
    learn: [
      { skill: "Prompting for scripts & config", why: "Speed up the repetitive, error-prone parts.", resource: R.learnPrompting },
      { skill: "AI assistants for infrastructure code", why: "Increasingly built into cloud tooling.", resource: R.cursor },
      { skill: "AI literacy & security", why: "Avoid leaking infrastructure details to AI tools.", resource: R.googleAi },
    ],
    caution: "A wrong AI-suggested config can be expensive or insecure — review every change before applying it.",
  },

  cybersecurity_analyst: {
    careerId: "cybersecurity_analyst",
    role: "AI cuts through alert noise, explains threats and drafts reports — and attackers use it too, so understanding AI is now part of defending against it.",
    uses: [
      "Summarise and triage security alerts and logs",
      "Explain malware behaviour and attack techniques",
      "Draft incident reports and playbooks",
      "Write detection rules and scripts",
      "Spot AI-generated phishing and social engineering",
    ],
    learn: [
      { skill: "Prompting for analysis & reporting", why: "Faster triage and clearer reports.", resource: R.learnPrompting },
      { skill: "How attackers use AI", why: "You can't defend against what you don't understand.", resource: R.googleAi },
      { skill: "AI data-handling & privacy", why: "Never feed sensitive security data to public tools.", resource: R.elementsAi },
    ],
    caution: "Never paste real logs, credentials or sensitive data into public AI tools — treat them as untrusted.",
  },

  product_manager: {
    careerId: "product_manager",
    role: "AI helps PMs research, write and synthesise faster — drafting specs, summarising user feedback, and exploring ideas — so you spend more time on judgement and less on the keyboard.",
    uses: [
      "Summarise user interviews and feedback at scale",
      "Draft PRDs, user stories and release notes",
      "Explore and pressure-test product ideas",
      "Turn data into a plain-language narrative",
      "Draft stakeholder updates and FAQs",
    ],
    learn: [
      { skill: "Prompting for synthesis & writing", why: "The biggest time-saver in the PM workflow.", resource: R.learnPrompting },
      { skill: "What AI can and can't do", why: "So you can scope realistic AI features.", resource: R.googleAi },
      { skill: "Designing AI-powered features", why: "More products now have AI at their core.", resource: R.anthropic },
    ],
    caution: "AI flattens nuance in user feedback — read the raw quotes before you trust the summary.",
  },

  ai_trainer: {
    careerId: "ai_trainer",
    role: "AI is the subject you teach — so deep, current fluency across the main tools is the whole job, alongside the ability to make others confident with them.",
    uses: [
      "Build lesson content, examples and exercises fast",
      "Create role-specific demos for the people you train",
      "Generate practice prompts and answer keys",
      "Stay current by testing new tools and features",
      "Draft handouts, slides and follow-up guides",
    ],
    learn: [
      { skill: "Deep fluency across ChatGPT, Claude & Gemini", why: "You teach what you've truly mastered.", resource: R.anthropic },
      { skill: "Advanced prompting", why: "Show people the difference between basic and expert use.", resource: R.learnPrompting },
      { skill: "AI safety, ethics & limits", why: "Responsible use is part of what you teach.", resource: R.elementsAi },
    ],
    caution: "The tools change monthly — budget real time each week just to stay current.",
  },

  prompt_engineer: {
    careerId: "prompt_engineer",
    role: "AI isn't a helper here — it's the material you work with. The entire craft is making AI systems produce reliable, repeatable results.",
    uses: [
      "Design and refine prompts for real workflows",
      "Build test sets and evaluate prompt reliability",
      "Use retrieval (RAG) and tools to ground outputs",
      "Produce structured, machine-readable output",
      "Document patterns that work and why",
    ],
    learn: [
      { skill: "Advanced prompting techniques", why: "The core of the role.", resource: R.learnPrompting },
      { skill: "Evaluation & testing of prompts", why: "Reliability is what separates pros from power users.", resource: R.anthropic },
      { skill: "RAG, tool use & structured output", why: "Where prompting meets real systems.", resource: R.openai },
    ],
    caution: "The same prompt can behave differently over time — never ship without a test set.",
  },

  marketing_analyst: {
    careerId: "marketing_analyst",
    role: "AI drafts content, analyses campaigns and explains results — letting a marketing analyst move from numbers to recommendations much faster.",
    uses: [
      "Draft ad copy, captions and email variants to test",
      "Summarise campaign performance into recommendations",
      "Cluster and tag customer feedback or comments",
      "Explain analytics results in plain language",
      "Brainstorm test ideas and audience angles",
    ],
    learn: [
      { skill: "Prompting for content & analysis", why: "Faster creative and faster reporting.", resource: R.learnPrompting },
      { skill: "AI in ad & analytics platforms", why: "Built into the tools you already report on.", resource: R.googleAi },
      { skill: "AI literacy", why: "Advise clients credibly on AI in marketing.", resource: R.elementsAi },
    ],
    caution: "AI-written copy needs a human edit for brand voice and accuracy before it goes live.",
  },

  product_designer: {
    careerId: "product_designer",
    role: "AI speeds up research synthesis, copywriting and early ideation, and is increasingly built into design tools — freeing you to spend more time on craft and decisions.",
    uses: [
      "Synthesise user research and interview notes",
      "Generate UX copy, labels and microcopy",
      "Explore layout and flow ideas quickly",
      "Draft personas and user journey maps",
      "Create placeholder content for prototypes",
    ],
    learn: [
      { skill: "Prompting for research & copy", why: "The fastest wins for a designer.", resource: R.learnPrompting },
      { skill: "AI features in Figma and design tools", why: "They're already in your workflow.", resource: R.googleAi },
      { skill: "Designing AI-powered experiences", why: "More products now have AI in the interface.", resource: R.anthropic },
    ],
    caution: "AI ideas converge on the generic — use them as a starting point, not the final design.",
  },

  automation_specialist: {
    careerId: "automation_specialist",
    role: "AI is what makes modern automation smart — it reads, writes, classifies and decides inside workflows, turning simple rule-based automations into ones that handle real, messy work.",
    uses: [
      "Add AI steps that summarise, classify or extract data",
      "Draft and explain the logic of a workflow",
      "Generate the code for custom automation steps",
      "Auto-respond to and route incoming messages",
      "Turn unstructured input into structured data",
    ],
    learn: [
      { skill: "Using AI inside automation platforms (Make, n8n, Zapier)", why: "AI steps are the high-value part clients pay for.", resource: R.openai },
      { skill: "Prompting for reliable, structured output", why: "Automations need predictable results.", resource: R.learnPrompting },
      { skill: "Connecting LLM APIs", why: "Unlocks custom, smarter workflows.", resource: R.anthropic },
    ],
    caution: "AI steps can fail unpredictably — build in checks and fallbacks for anything that matters.",
  },

  learning_analytics: {
    careerId: "learning_analytics",
    role: "AI helps learning analysts clean records, write queries and explain findings, and powers new ways to personalise learning — speeding up the data work so you focus on what improves outcomes.",
    uses: [
      "Write SQL and clean messy learning records",
      "Summarise outcomes into reports for educators",
      "Analyse open-text feedback from learners",
      "Explain statistics in plain language",
      "Draft recommendations from the data",
    ],
    learn: [
      { skill: "Prompting for data & reporting", why: "Speeds up the heavy cleaning and writing.", resource: R.learnPrompting },
      { skill: "AI in education — uses and risks", why: "Shapes what you measure and recommend.", resource: R.googleAi },
      { skill: "AI data privacy with learner data", why: "Student data is sensitive and protected.", resource: R.elementsAi },
    ],
    caution: "Never put identifiable learner data into public AI tools, and verify any figures it produces.",
  },
};

const FALLBACK: AiGuide = {
  careerId: "",
  role: "AI is becoming a standard tool in almost every field — it speeds up writing, research and repetitive work, so the people who use it well get more done.",
  uses: [
    "Draft and summarise documents",
    "Explain unfamiliar concepts and tools",
    "Brainstorm and pressure-test ideas",
    "Turn rough notes into clear output",
  ],
  learn: [
    { skill: "Prompting fundamentals", why: "The core skill for getting good results.", resource: R.learnPrompting },
    { skill: "AI literacy", why: "Know what AI can and can't do.", resource: R.googleAi },
  ],
  caution: "AI can be confidently wrong — always check anything important against a reliable source.",
};

export function aiGuideFor(careerId: string): AiGuide {
  return AI_GUIDES[careerId] ?? { ...FALLBACK, careerId };
}
