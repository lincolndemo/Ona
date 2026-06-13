// The career library the engine scores against. This is content, not logic:
// edit or extend it without touching the engine. Salary figures are monthly
// placeholders in Nigerian Naira, marked VERIFY, to confirm before launch.

import type { Career } from "./types";

export const CAREERS: Career[] = [
  {
    id: "data_analyst",
    name: "Data Analyst",
    category: "technical",
    roleOrientation: "technical",
    oneLiner: "Turns raw business data into clear answers and dashboards.",
    thinkingStyles: ["analysing", "solving", "organising"],
    backgroundAffinity: [
      "accountant",
      "banker",
      "teacher",
      "civil_servant",
      "engineer",
    ],
    difficulty: "medium",
    baseMonthsAt10hrs: 4,
    motivationFit: ["income", "remote", "growth", "future_proof"],
    prerequisiteSkills: [
      "data analysis",
      "spreadsheet modelling",
      "Power BI",
      "basic SQL",
    ],
    tools: ["Excel", "SQL", "Power BI"],
    realityCheck: {
      typicalDay:
        "Most days you take a question from a manager, find the data that answers it, clean it, and build a chart or short report that makes the answer obvious. A good part of the week goes into preparing data before any analysis begins.",
      toolsUsed:
        "Excel and Power BI are the daily tools, with SQL to pull data from databases. Many Nigerian employers still run most of their reporting in Excel, so strong spreadsheet skills carry you a long way.",
      technicalShare:
        "Moderate. You work with data and query tools, but you are not writing software, and much of the value comes from asking the right business question.",
      commonFrustrations:
        "Data often arrives messy or incomplete, so cleaning eats into time you would rather spend analysing. Stakeholders also change what they want after you have built the report.",
      salaryRangeNGN: "350,000 to 850,000 per month for early to mid roles", // VERIFY
      remotePotential:
        "Good. Analysts work remotely for both local and international employers, and remote contracts in foreign currency are within reach once you have a portfolio.",
    },
    nextStep:
      "Rebuild a report you already understand, such as a sales or attendance record, as a Power BI dashboard this week, and write two sentences on what it reveals.",
  },
  {
    id: "business_analyst",
    name: "Business Analyst",
    category: "hybrid",
    roleOrientation: "hybrid",
    oneLiner:
      "Sits between business and technical teams to define what gets built.",
    thinkingStyles: ["analysing", "organising", "solving"],
    backgroundAffinity: [
      "accountant",
      "sales_professional",
      "marketing_professional",
      "business_owner",
    ],
    difficulty: "medium",
    baseMonthsAt10hrs: 4,
    motivationFit: ["growth", "income", "security"],
    prerequisiteSkills: [
      "requirements gathering",
      "process mapping",
      "Excel",
      "basic data analysis",
    ],
    tools: ["Excel", "SQL"],
    realityCheck: {
      typicalDay:
        "You spend the week talking to business teams to understand what they need, then writing that up clearly so a technical team can build it. Meetings and documentation take more of your time than data does.",
      toolsUsed:
        "Excel for analysis, plus documentation and process-mapping tools. Some SQL helps when you need to check figures yourself.",
      technicalShare:
        "Low to moderate. You sit between business and technical people, so you translate more than you build.",
      commonFrustrations:
        "Requirements shift as projects move, and you often hold the tension between what the business wants and what the team can deliver.",
      salaryRangeNGN: "400,000 to 1,000,000 per month for early to mid roles", // VERIFY
      remotePotential:
        "Good for software and consulting firms, lower where the work needs you on site with operations teams.",
    },
    nextStep:
      "Take a process you know well, such as how invoices are approved at your workplace, and document it step by step with the gaps marked.",
  },
  {
    id: "software_developer",
    name: "Software Developer",
    category: "technical",
    roleOrientation: "technical",
    oneLiner: "Builds the applications and systems people use every day.",
    thinkingStyles: ["building", "solving"],
    backgroundAffinity: ["engineer", "graduate", "university_student"],
    difficulty: "high",
    baseMonthsAt10hrs: 8,
    motivationFit: ["income", "remote", "future_proof", "international"],
    prerequisiteSkills: [
      "programming",
      "problem decomposition",
      "version control",
      "one core language",
    ],
    tools: ["Python", "GitHub"],
    realityCheck: {
      typicalDay:
        "You spend most of the day writing and testing code, reading other people's code, and fixing things that break. Real progress comes in quiet stretches of focused work rather than meetings.",
      toolsUsed:
        "A code editor, a programming language such as Python or JavaScript, and Git for version control. You will live in documentation and search.",
      technicalShare:
        "High. This is the most technical path on the list, and it rewards patience with detail.",
      commonFrustrations:
        "Small bugs can cost hours, and the learning never stops because tools change often. The early months are humbling for most people.",
      salaryRangeNGN:
        "400,000 to 1,500,000 per month, with a wide spread by skill and employer", // VERIFY
      remotePotential:
        "Very high. Developers hold the strongest position for remote and international work, and many Nigerian developers earn in foreign currency.",
    },
    nextStep:
      "Pick one language and build a tiny working program this week, such as a tool that renames files or sends a reminder, and put it on GitHub.",
  },
  {
    id: "cloud_engineer",
    name: "Cloud Engineer",
    category: "technical",
    roleOrientation: "technical",
    oneLiner: "Sets up and maintains the infrastructure software runs on.",
    thinkingStyles: ["building", "solving", "organising"],
    backgroundAffinity: ["engineer", "graduate"],
    difficulty: "high",
    baseMonthsAt10hrs: 8,
    motivationFit: ["income", "international", "future_proof"],
    prerequisiteSkills: [
      "networking basics",
      "Linux",
      "a cloud platform",
      "scripting",
    ],
    tools: ["Python", "GitHub"],
    realityCheck: {
      typicalDay:
        "You set up and maintain the servers and services that applications run on, automate the repetitive parts, and respond when something goes down. Some days are calm, and some are spent firefighting.",
      toolsUsed:
        "A cloud platform such as AWS or Azure, the command line, Linux, and scripting. You also work with the tools that monitor systems.",
      technicalShare:
        "High. The work is deeply technical and assumes comfort with how systems connect.",
      commonFrustrations:
        "On-call duty means problems can reach you outside working hours, and a wrong configuration can be expensive.",
      salaryRangeNGN: "600,000 to 1,800,000 per month for early to mid roles", // VERIFY
      remotePotential:
        "Very high, and among the best paid remote paths for Nigerians with cloud certifications.",
    },
    nextStep:
      "Open a free tier account on a cloud platform this week and follow one guided tutorial to deploy a simple website.",
  },
  {
    id: "cybersecurity_analyst",
    name: "Cybersecurity Analyst",
    category: "technical",
    roleOrientation: "technical",
    oneLiner: "Protects systems and data from attack and misuse.",
    thinkingStyles: ["analysing", "solving", "researching"],
    backgroundAffinity: ["engineer", "graduate", "civil_servant"],
    difficulty: "high",
    baseMonthsAt10hrs: 8,
    motivationFit: ["income", "security", "future_proof"],
    prerequisiteSkills: [
      "networking basics",
      "security fundamentals",
      "threat analysis",
    ],
    tools: ["Python"],
    realityCheck: {
      typicalDay:
        "You watch for threats, investigate alerts, and check systems for weaknesses before attackers find them. The work mixes routine monitoring with sudden, urgent incidents.",
      toolsUsed:
        "Security monitoring tools, the command line, and a working knowledge of networks. Some scripting helps you automate checks.",
      technicalShare:
        "High. You need a solid grasp of how systems and networks work to spot what is wrong.",
      commonFrustrations:
        "Much of the job is patient monitoring, and the pressure rises sharply when a real incident hits. Convincing organisations to take security seriously can be slow.",
      salaryRangeNGN: "500,000 to 1,600,000 per month for early to mid roles", // VERIFY
      remotePotential:
        "Good, though some roles need you on site for sensitive systems, and demand is rising across Nigerian banks and fintech.",
    },
    nextStep:
      "Complete a free introductory security course this week and set up two-factor authentication and a password manager on your own accounts as practice.",
  },
  {
    id: "product_manager",
    name: "Product Manager",
    category: "non_technical",
    roleOrientation: "non_technical",
    oneLiner:
      "Decides what a product should do and guides the team that builds it.",
    thinkingStyles: ["organising", "solving", "selling"],
    backgroundAffinity: [
      "business_owner",
      "marketing_professional",
      "sales_professional",
      "graduate",
    ],
    difficulty: "medium",
    baseMonthsAt10hrs: 5,
    motivationFit: ["growth", "income", "entrepreneurship"],
    prerequisiteSkills: [
      "product thinking",
      "prioritisation",
      "stakeholder communication",
      "basic data literacy",
    ],
    tools: ["Excel", "Canva"],
    realityCheck: {
      typicalDay:
        "You spend the week deciding what the product should do next, talking to users and the team, and keeping everyone moving towards the same goal. You write a lot, and you sit in many conversations.",
      toolsUsed:
        "Documents, spreadsheets, and planning tools, plus whatever the team uses to track work. Comfort reading data matters more than building it.",
      technicalShare:
        "Low. You do not need to code, but you need to understand enough to talk credibly with engineers.",
      commonFrustrations:
        "You carry responsibility for outcomes without direct authority over the people building, so influence is your main tool. Saying no to good ideas is a daily task.",
      salaryRangeNGN:
        "500,000 to 1,500,000 per month, with a wide spread by company", // VERIFY
      remotePotential:
        "Good, especially with product companies, though it leans on strong communication when the team is spread out.",
    },
    nextStep:
      "Take an app you use often, write down one thing that frustrates you, and draft a short note on how you would fix it and why.",
  },
  {
    id: "ai_trainer",
    name: "AI Trainer",
    category: "non_technical",
    roleOrientation: "non_technical",
    oneLiner: "Teaches people and organisations to use AI tools well.",
    thinkingStyles: ["teaching", "analysing", "organising"],
    backgroundAffinity: [
      "teacher",
      "civil_servant",
      "graduate",
      "healthcare_professional",
    ],
    difficulty: "low",
    baseMonthsAt10hrs: 3,
    motivationFit: ["interest", "flexibility", "growth", "entrepreneurship"],
    prerequisiteSkills: [
      "AI tool fluency",
      "instructional design",
      "facilitation",
    ],
    tools: ["ChatGPT", "Canva", "Google Workspace"],
    realityCheck: {
      typicalDay:
        "You help people and organisations use AI tools well, through workshops, guides, and hands-on sessions. Much of the week is preparing material and standing in front of people who are new to the tools.",
      toolsUsed:
        "AI tools such as ChatGPT, plus presentation and design tools for your materials. Your teaching skill matters more than any single tool.",
      technicalShare:
        "Low. The value is in explaining clearly and building confidence, rather than in technical depth.",
      commonFrustrations:
        "You meet a lot of fear and resistance, and you repeat the basics often. Keeping up as the tools change quickly takes steady effort.",
      salaryRangeNGN:
        "300,000 to 900,000 per month employed, with strong freelance and training income on top", // VERIFY
      remotePotential:
        "High. Sessions run well online, and this path suits people who want to build their own training practice.",
    },
    nextStep:
      "Teach one person in your life to use an AI tool for a real task this week, and note what confused them, since that becomes your teaching material.",
  },
  {
    id: "prompt_engineer",
    name: "Prompt Engineer",
    category: "hybrid",
    roleOrientation: "hybrid",
    oneLiner:
      "Designs the instructions that make AI systems produce reliable results.",
    thinkingStyles: ["analysing", "building", "researching"],
    backgroundAffinity: ["graduate", "teacher", "marketing_professional"],
    difficulty: "low",
    baseMonthsAt10hrs: 3,
    motivationFit: ["interest", "remote", "future_proof"],
    prerequisiteSkills: [
      "prompt design",
      "testing and iteration",
      "clear writing",
      "AI tool fluency",
    ],
    tools: ["ChatGPT", "Python"],
    realityCheck: {
      typicalDay:
        "You design and test the instructions that make AI systems produce reliable results, then refine them when they fail. The work is a loop of trying, checking, and adjusting.",
      toolsUsed:
        "AI platforms and their interfaces, with some light scripting to test prompts at scale. Clear writing is the core skill.",
      technicalShare:
        "Moderate. You do not need heavy coding, but you need a structured, testing mindset.",
      commonFrustrations:
        "The same prompt can behave differently from one day to the next, which makes the work feel unpredictable. The role is also still being defined, so expectations vary by employer.",
      salaryRangeNGN: "400,000 to 1,200,000 per month, with wide variation", // VERIFY
      remotePotential:
        "Very high, and one of the more accessible AI paths to start remotely with a strong portfolio.",
    },
    nextStep:
      "Take one task you do often, write three different prompts for it this week, and record which one works best and why.",
  },
  {
    id: "marketing_analyst",
    name: "Digital Marketing Analyst",
    category: "non_technical",
    roleOrientation: "non_technical",
    oneLiner: "Measures and improves marketing using data.",
    thinkingStyles: ["analysing", "selling", "organising"],
    backgroundAffinity: [
      "marketing_professional",
      "sales_professional",
      "business_owner",
    ],
    difficulty: "low",
    baseMonthsAt10hrs: 3,
    motivationFit: ["growth", "income", "entrepreneurship", "flexibility"],
    prerequisiteSkills: [
      "campaign analytics",
      "Excel",
      "basic data visualisation",
    ],
    tools: ["Excel", "Canva", "Google Workspace"],
    realityCheck: {
      typicalDay:
        "You measure how campaigns perform, find what is working, and advise on where to spend next. The week mixes pulling numbers with explaining them to people who decide budgets.",
      toolsUsed:
        "Excel, analytics dashboards, and the platforms where ads and content run. Design tools help when you present findings.",
      technicalShare:
        "Low to moderate. You work with data and platforms, but the focus stays on marketing decisions.",
      commonFrustrations:
        "Results depend on factors you do not control, and you are often asked to prove the value of spending after the fact. Platform changes can reset what you know.",
      salaryRangeNGN: "300,000 to 800,000 per month for early to mid roles", // VERIFY
      remotePotential:
        "Good, and strong for freelance work with local businesses and international clients.",
    },
    nextStep:
      "Pick a brand you admire, study one of their campaigns this week, and write a short note on what you think worked and how you would measure it.",
  },
  {
    id: "product_designer",
    name: "Product Designer, UX",
    category: "hybrid",
    roleOrientation: "hybrid",
    oneLiner: "Designs how products look and feel so they are easy to use.",
    thinkingStyles: ["designing", "solving", "researching"],
    backgroundAffinity: [
      "graduate",
      "marketing_professional",
      "freelancer",
      "university_student",
    ],
    difficulty: "medium",
    baseMonthsAt10hrs: 4,
    motivationFit: ["interest", "remote", "growth", "international"],
    prerequisiteSkills: [
      "user research",
      "interface design",
      "prototyping",
      "design tools",
    ],
    tools: ["Canva"],
    realityCheck: {
      typicalDay:
        "You research how people use a product, sketch and design screens, and test them with real users before they are built. The week moves between quiet design work and conversations with users and developers.",
      toolsUsed:
        "A design tool such as Figma, plus simple research methods. A portfolio matters more than certificates in this field.",
      technicalShare:
        "Low to moderate. You design rather than code, though understanding what is buildable helps.",
      commonFrustrations:
        "Good design is often invisible when it works, so your contribution can be hard to point to. Feedback can be subjective, and you redo work as opinions shift.",
      salaryRangeNGN: "350,000 to 1,200,000 per month for early to mid roles", // VERIFY
      remotePotential:
        "High. Design work suits remote arrangements, and a strong portfolio opens international contracts.",
    },
    nextStep:
      "Redesign one screen of an app that frustrates you this week, even on paper, and write two lines on the problem you were solving.",
  },
  {
    id: "automation_specialist",
    name: "Automation Specialist",
    category: "hybrid",
    roleOrientation: "hybrid",
    oneLiner:
      "Removes repetitive work by connecting tools and building workflows.",
    thinkingStyles: ["building", "solving", "organising"],
    backgroundAffinity: [
      "business_owner",
      "freelancer",
      "civil_servant",
      "accountant",
    ],
    difficulty: "medium",
    baseMonthsAt10hrs: 3,
    motivationFit: ["entrepreneurship", "flexibility", "income", "remote"],
    prerequisiteSkills: [
      "process mapping",
      "automation tools",
      "logical thinking",
      "AI tool fluency",
    ],
    tools: ["ChatGPT", "Excel"],
    realityCheck: {
      typicalDay:
        "You find repetitive tasks in a business and build workflows that handle them without a person. Much of the week is mapping how work flows now and connecting tools so it flows by itself.",
      toolsUsed:
        "Automation platforms such as Make or n8n, spreadsheets, and AI tools for the smarter steps. Logical thinking matters more than coding.",
      technicalShare:
        "Moderate. You build with visual tools and light logic rather than full programming.",
      commonFrustrations:
        "Workflows break when the tools they connect change, so maintenance is part of the job. Convincing a business to change how it works can be harder than building the automation.",
      salaryRangeNGN:
        "400,000 to 1,000,000 per month employed, with good freelance demand from Nigerian SMEs", // VERIFY
      remotePotential:
        "High, and well suited to building your own service for small businesses.",
    },
    nextStep:
      "Find one task you repeat every week, such as sending the same email or updating a sheet, and automate it with a free tool this week.",
  },
  {
    id: "learning_analytics",
    name: "Learning Analytics Specialist",
    category: "hybrid",
    roleOrientation: "hybrid",
    oneLiner:
      "Uses data to improve how people learn and how programmes perform.",
    thinkingStyles: ["analysing", "teaching", "organising"],
    backgroundAffinity: [
      "teacher",
      "civil_servant",
      "graduate",
      "healthcare_professional",
    ],
    difficulty: "medium",
    baseMonthsAt10hrs: 4,
    motivationFit: ["growth", "interest", "security", "future_proof"],
    prerequisiteSkills: [
      "data analysis",
      "Power BI",
      "basic SQL",
      "learning measurement",
    ],
    tools: ["Excel", "Power BI", "SQL"],
    realityCheck: {
      typicalDay:
        "You spend much of the week pulling data from learning platforms, cleaning it, and building reports that show what is working in a programme and what is not. The work joins teaching insight with data skill.",
      toolsUsed:
        "Excel and Power BI most days, with some SQL to pull data. Your understanding of how people learn shapes what you measure.",
      technicalShare:
        "Moderate. You work with data and tools, but the focus stays on learning outcomes rather than software.",
      commonFrustrations:
        "Records are often messy or kept on paper, so you spend real time cleaning before you can analyse. Schools and training bodies can be slow to act on what the data shows.",
      salaryRangeNGN: "400,000 to 900,000 per month for early to mid roles", // VERIFY
      remotePotential:
        "High for organisations with mature data systems, lower where records are still on paper.",
    },
    nextStep:
      "Take a free Power BI starter course this week and rebuild one of your own class or programme reports as a dashboard.",
  },
];
