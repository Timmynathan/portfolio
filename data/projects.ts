import type { Project, ProjectCategory } from "@/types";

export const PROJECTS: Project[] = [
  {
    id: "TB DETECT",
    title: "TB Detect AI",
    date: "Oct 2025 – Present",
    // Shown as the headline block above the category tabs, not in the grid.
    featured: true,
    shortDescription:
      "A deep learning model that detects tuberculosis from chest X-rays. Independently validated by a practising radiologist. Detection on the target population improved from 1-in-5 to 4-in-5 cases after retraining on a locally-sourced clinical dataset.",
    meta: "2025 · Machine Learning, Web Development",
    description:
      "An AI-powered tool that assists in the early detection of tuberculosis (TB) from chest X-ray images. It uses deep learning to classify scans as TB-positive or negative, improving diagnostic support and accessibility, while also ensuring model interpretability and real-world applicability by addressing challenges such as dataset variability and clinical integration.",
    techStack: ["Python", "TensorFlow", "Keras", "DenseNet121", "Grad-CAM", "OpenCV", "Flask", "React"],
    mainStack: "Python",
    image: "/images/projects/tbdetect.png",
    linkLabel: "Website",
    href: "https://inldiagnostics-ai.vercel.app/",
    repos: [{ label: "Source", href: "https://github.com/Timmynathan/tb-detection-app" }],
  },
  {
    id: "My Job Hunter",
    title: "My Job Hunter AI Agent",
    date: "Sep 2026",
    shortDescription:
      "A personal AI agent that hunts for Nigeria-friendly remote roles over 6 separate job boards, filtering for genuine eligibility, and scoring each posting against my CV with an LLM.",
    meta: "2026 · AI Agents, Automation",
    description: [
      {
        heading: "The problem",
        body: "Remote job listings open to Nigeria-based candidates are scattered across job boards with inconsistent, sometimes misleading APIs. There was no single place to see genuinely eligible EMEA roles.",
      },
      {
        heading: "The build",
        body: "An agentic pipeline built with LangGraph pulls from six free job-board APIs in parallel, applies deterministic hard filters for role fit, seniority, and geographic eligibility, then has an LLM read each surviving posting against the candidate's CV to produce a 0–100 match score with reasoning. It runs unattended on a daily schedule and emails a digest of new strong matches, or on demand from a Streamlit dashboard with live per-node progress.",
      },
      {
        heading: "Docs said filterable; the API disagreed",
        body: "Several \"free\" job-board search/filter parameters turned out to silently no-op server-side — identical results for unrelated search terms — so retrieval was redesigned around fetching full feeds and doing all filtering deterministically client-side instead of trusting the API's documented behaviour.",
      },
      {
        heading: "One dead source shouldn't kill the run",
        body: "Each of the six job-board sources is fetched, logged, and isolated independently, so one API timing out or failing doesn't take the rest of the run down with it.",
      },
      {
        heading: "Scoring under a tight rate limit",
        body: "Free-tier LLM quotas are tight relative to real usage volume, so scoring runs against a per-run budget that prioritises the freshest postings rather than scoring everything and running out partway through.",
      },
      {
        heading: "Streaming an agent's progress into a UI",
        body: "Swapping a blocking invoke() call for stream(stream_mode=\"updates\") surfaced real per-node progress in the dashboard without duplicating the agent's own orchestration logic.",
      },
    ],
    techStack: ["Python", "LangGraph", "Gemini", "Postgres", "Streamlit", "Resend"],
    mainStack: "Python",
    image: "/images/projects/jobhunter.png",
    // Content runs edge-to-edge (sidebar on the left, buttons on the right) — cropping cuts into it, so show the whole screenshot.
    imageFit: "contain",
    // Personal, locally-run project — no live demo to link to.
    linkLabel: "Website",
    repos: [{ label: "Source", href: "https://github.com/Timmynathan/remote-job-rag" }],
  },
  {
    id: "Nonye's Pasta",
    title: "Nonye's Pasta",
    date: "Jul 2026 – Present",
    // Draft — no short text was supplied for this one; tweak freely.
    shortDescription: "A full-stack e-commerce store with Paystack checkout and an admin dashboard, serving 200+ customers.",
    meta: "2026 · Full-Stack Development, E-Commerce",
    description:
      "A full-stack e-commerce store for a registered pasta venture serving 200+ customers, featuring online ordering, Paystack payment integration, WhatsApp checkout, and Cloudinary-powered product galleries, backed by a Django REST API with an admin dashboard for managing products and orders.",
    techStack: ["React", "Vite", "Tailwind CSS", "Django", "PostgreSQL", "Paystack"],
    mainStack: "React",
    image: "/images/projects/nonyespasta.png",
    // Logo, not a screenshot — must not be cropped.
    imageFit: "contain",
    linkLabel: "Website",
    href: "https://nonyespasta.com/",
    repos: [
      { label: "Backend", href: "https://github.com/Timmynathan/nonyes-pasta-backend" },
      { label: "Frontend", href: "https://github.com/Timmynathan/nonyes-pasta-frontend" },
    ],
  },
  {
    id: "RelayPay",
    title: "RelayPay Voice Support Agent",
    date: "Sep 2026",
    shortDescription:
      "An AI voice agent that answers customer support calls for a payments company",
    meta: "2026 · AI Agents, Voice AI",
    description: [
      {
        heading: "Overview",
        body: "RelayPay is a fictional B2B payments platform for cross-border payments, invoicing and contractor payouts, and this is its voice support line. A customer opens a web page and talks to Relay, an animated 3D assistant, which answers from an approved knowledge base, checks transactions and payouts, opens support tickets, and escalates to a human specialist when needed. The focus was making the agent trustworthy, not just conversational: every answer must come from approved information or a real record, the important rules are enforced in code rather than left to the AI's judgement, and every decision is logged so it can be audited.",
      },
      {
        heading: "What it does",
        body: "Relay answers questions by voice or text about fees, payout times, invoicing and verification, and looks up live transactions, payouts and accounts through a secure tool layer — but only after the caller matches on two identifying details. It creates tickets and escalations with short references (e.g. TKT-00013) the caller can copy with one click, and escalates automatically for account restrictions, compliance issues, disputes, refunds or a frustrated caller. Callers type their email rather than saying it, since speech-to-text garbles emails. It runs the call like a person would: one question at a time, checking whether there's anything else, refusing to hang up until an escalation has contact details, and ending the call itself when the caller is done.",
      },
      {
        heading: "How it works",
        body: "Vapi handles audio only (Deepgram speech-to-text, LiveKit turn detection, text-to-speech). A Node.js/TypeScript agent server verifies each request genuinely came from Vapi, retrieves knowledge with a custom BM25 keyword search behind a minimum relevance threshold, runs the Claude turn through the Claude Agent SDK with structured output, and enforces the rules. The agent can only reach customer data through an MCP tool server, which verifies callers, hides sensitive fields, and logs every call to Supabase before it runs.",
      },
      {
        heading: "Rules enforced in code, not just requested in the prompt",
        body: "An answer that cites no retrieved source and no tool result is replaced with a safe \"I can't confirm that\" reply. Escalation triggers are detected in code, and an escalation is forced if the AI doesn't take that path. Emails are never read aloud, and references like TXN-9001 are always spoken digit by digit, even when the model spells them oddly. The AI can't end a call by accident: only a fixed goodbye line written by the code triggers the hang-up.",
      },
      {
        heading: "A database that protects itself",
        body: "Row-level security on every table with no public access to personal data, and append-only audit tables that can't be edited or deleted. Unique constraints allow one open escalation per conversation, so a retry fills in missing details instead of creating a duplicate, and a conversation can't switch to a different verified customer once one is confirmed. Every secret stays on the server, Vapi requests are HMAC signature-checked within a timestamp window before anything runs, and the agent can see only its five approved tools.",
      },
      {
        heading: "Speed and results",
        body: "Replies stream to the caller sentence by sentence, the session warms up as soon as the call connects, and if an answer takes longer than 1.2 s the caller hears \"One moment\" so the line never goes silent — about 1.2 s to Relay's first words in the voice simulator. Discovering the agent was loading about 110 unrelated tools and restricting it to its own five cut median turn time from 11.4 s to 7.0 s and AI cost per test run by 74%. It's covered by 61 automated voice checks, 12 database guard tests that deliberately attempt forbidden actions (like editing an audit log) and confirm the database refuses them, 9 end-to-end scenarios, and browser tests that run the real widget against a simulated voice service.",
      },
      {
        heading: "Challenges solved",
        body: "Misheard reference numbers: \"TXN 9, double o, 1\" is now understood as TXN-9001, and garbled input is never guessed — the agent asks again. A spurious \"I'm having trouble\" message on every turn turned out, from the call records, to be a voice-platform timeout firing before the server replied. Silently dropped calls now tell the caller the call ended before Relay could answer, while a normal goodbye is no longer shown as an error. And the chat covering the assistant's face was fixed by rebuilding the layout so the face shrinks to fit instead of being hidden.",
      },
    ],
    techStack: ["TypeScript", "Node.js", "Claude Agent SDK", "MCP", "Vapi", "Supabase", "Three.js", "Zod"],
    mainStack: "TypeScript",
    image: "/images/projects/relaypay.png",
    // Expanded view shows the whole screenshot, uncropped.
    detailImage: { src: "/images/projects/relaypay.png", width: 1918, height: 871 },
    linkLabel: "Website",
    href: "https://support-agent-production-775f.up.railway.app/",
    repos: [{ label: "Source", href: "https://github.com/Timmynathan/support-agent" }],
  },
  {
    id: "Scraping Bird",
    title: "Scraping Bird AI",
    date: "Aug 2026",
    shortDescription:
      "Describe your ideal customer in plain English and get back qualified leads with cold emails ready to send.",
    meta: "2026 · AI Agents, Automation",
    description:
      "Scraping Bird is an AI lead research and outreach agent built with the Claude Agent SDK. Given a plain-English objective, it refines a target customer profile, discovers real companies via Apify, reads their public websites with Firecrawl, judges fit against the criteria with evidence-backed reasoning, and drafts a 3-step cold email sequence plus a LinkedIn message, all logged to Supabase for human review. It never finds, validates, or sends anything itself, every output is a draft waiting for a person to approve.",
    techStack: ["TypeScript", "Next.js", "Claude Agent SDK", "Supabase", "Apify", "Firecrawl", "Tailwind CSS"],
    mainStack: "TypeScript",
    image: "/images/projects/scrapingbird.png",
    // Wider than the card's 16:9 frame — anchor left so the logo and headline stay in view.
    imagePosition: "left",
    // Expanded view shows the whole screenshot, uncropped.
    detailImage: { src: "/images/projects/scrapingbird.png", width: 1893, height: 864 },
    linkLabel: "Website",
    href: "https://lead-agent-zeta-two.vercel.app/",
    videoUrl: "https://drive.google.com/file/d/1H8RZ1jR1NRiWDzdslv_9OWT9NhvBre7c/view?usp=sharing",
    repos: [{ label: "Source", href: "https://github.com/Timmynathan/lead-agent" }],
  },
  {
    id: "AI Content Publisher",
    title: "AI Content Publisher",
    date: "Aug 2026",
    shortDescription:
      "An AI content publisher that turns a raw idea into reviewed, platform-ready content (X, LinkedIn, e.t.c)",
    meta: "2026 · AI Agents, Automation",
    description: [
      {
        heading: "The problem",
        body: "A marketing team's content workflow — researching a topic, drafting an SEO article, adapting it for LinkedIn/X/newsletter, reviewing it, and publishing — worked, but was too manual to scale without sacrificing quality, tone, or factual accuracy.",
      },
      {
        heading: "The solution",
        body: "An end-to-end content agent that runs unattended from request to review. A manager submits an idea, an audience, and (optionally) source material; the system then researches the topic, retrieves and grounds itself in real source material, plans multiple article angles, drafts them in parallel, scores each against a fixed quality rubric, and automatically rewrites whatever falls short — looping until it passes or hits a revision cap — with zero manual clicks along the way. It stops in exactly two situations: when it genuinely can't produce something trustworthy (too few usable sources, a failed generation step), or when a human is required, which is the one deliberate gate in the whole system — nothing gets adapted for channels, queued, or published without a reviewer's sign-off.",
      },
      {
        heading: "Grounding, not just generation",
        body: "Every factual claim in a draft is checked against the actual source text it was drafted from; unverifiable claims are flagged rather than silently trusted, and reviewers see exactly which sources informed the output.",
      },
      {
        heading: "Self-correcting drafts",
        body: "An evaluation/revision loop scores drafts against a rubric and automatically rewrites only the failing sections, not the whole article, up to a bounded number of attempts.",
      },
      {
        heading: "A recovery path, not a checkpoint",
        body: "Source selection isn't a gate the pipeline waits at; a manager can always discard the run and redo it with different sources via \"Change sources and redraft,\" and can optionally opt a specific request into pausing for review before drafting starts.",
      },
      {
        heading: "Channel-aware adaptation",
        body: "The approved article is reformatted per-platform (LinkedIn, X, email newsletter) against explicit formatting rules, validated in code (not just trusted to the model), and lands in a publishing queue.",
      },
    ],
    techStack: ["React", "TypeScript", "Vercel", "Supabase", "Claude", "Firecrawl", "Resend"],
    mainStack: "TypeScript",
    image: "/images/projects/content-agent.png",
    // No live demo to link to yet.
    linkLabel: "Website",
    videoUrl: "https://drive.google.com/file/d/1Z1nKrHPPdKo-La03ZqN7a-HON5Vuv_TG/view?usp=sharing",
    repos: [{ label: "Source", href: "https://github.com/Timmynathan/Content-Research-and-Publishing-Agent" }],
  },
  {
    id: "Proposally",
    title: "Proposally AI",
    date: "Aug 2026",
    shortDescription: "An AI business proposal generator; upload docs, paste meeting notes, or speak.",
    meta: "2026 · Full-Stack Development, AI Agents",
    description:
      "An internal tool that turns discovery call notes, voice notes, and/or any uploaded docs into a business proposal, then keeps a human in control the whole way: intake, AI drafting, per-section regeneration, a separate reviewer's approval, and client delivery, with every step logged. Claude writes prose, but never commitments such as price, scope, and timeline. They are copied verbatim from the intake form, and the app programmatically verifies they appear unmodified in the model's output rather than trusting the prompt.\n\nSonnet 5 drafts the initial proposal; Haiku 4.5 handles fast per-section regeneration.",
    techStack: ["React", "TypeScript", "Vercel", "Supabase", "Claude", "Resend"],
    mainStack: "TypeScript",
    image: "/images/projects/proposally.png",
    imagePosition: "center 80%",
    linkLabel: "Website",
    href: "https://proposally.vercel.app/",
    videoUrl: "https://www.loom.com/share/b8dda4751769442d8eea7dd92fca2d13",
    repos: [{ label: "Source", href: "https://github.com/Timmynathan/Proposally" }],
  },
  {
    id: "Opsr",
    title: "Opsr AI",
    date: "Jul 2026",
    shortDescription:
      "A dashboard that pulls sales, project & hiring data from three separate systems daily and uses AI to explain what changed, replacing manual report creation.",
    meta: "2026 · Automation, AI Agents",
    description: [
      {
        heading: "The problem",
        body: "Koya Talent's leadership had no single view of the business. Sales lived in a Google Sheet, project delivery in Airtable, and hiring behind an internal API. Answering a basic question about company performance meant a person opening three tabs and copying numbers into a fourth document — slow, and calculated slightly differently each time depending on who did it.",
      },
      {
        heading: "The build",
        body: "A daily n8n workflow fetches all three sources, normalises them into one shape, and computes a fixed set of KPIs across three periods — last 30 days, last 90 days, and year to date — along with the equal-length period immediately before each, so every figure has a comparison. Those finished numbers go to Claude, which writes an executive summary, names risks with severity, and suggests actions. The whole run is stored as an immutable snapshot in Supabase alongside the raw source records it was built from, and a React dashboard renders the latest snapshot per period. Users can also request an arbitrary date range on demand, which triggers a fresh run through a Vercel serverless function.",
      },
      {
        heading: "Design principles",
        body: "Three rules ran through every decision. Claude never touches arithmetic — every number is computed deterministically in code, and the model only writes prose from finished figures. The dashboard never calculates either; it reads snapshots and renders them, because two places doing the same sum eventually disagree. And missing data is never rendered as zero: a source that fails produces a prominent banner rather than a section full of zeros, since a report claiming \"zero overdue projects\" when it means \"couldn't reach Airtable\" reads as good news.",
      },
      {
        heading: "The hardest part",
        body: "Making the AI output trustworthy. Early versions dramatised — calling two overdue projects a \"collapse\", and at one point inventing a prior-period comparison that was demonstrably false. Three rounds of stricter prompt instructions didn't hold. What worked was changing the input rather than the behaviour: any rate computed from fewer than five records now has its percentage suppressed in code, so the model receives \"0 of 2\" and never sees the alarming-looking 0% at all. Constraining what a model can see turned out to be far more reliable than instructing it how to behave.",
      },
    ],
    techStack: ["React", "TypeScript", "n8n", "Claude", "Supabase", "Vercel"],
    mainStack: "TypeScript",
    image: "/images/projects/koyaops.png",
    imagePosition: "center 80%",
    imageScale: 1.3,
    // Internal company tool — no live demo to link to.
    linkLabel: "Website",
    repos: [{ label: "Source", href: "https://github.com/Timmynathan/Koya-Talent---Operations-Report-System" }],
  },
  {
    id: "MoveIn Rental App",
    title: "MoveIn",
    date: "Jul 2026",
    shortDescription:
      "A full-stack rental platform with voice search; describe what you want and it filters the listings.",
    meta: "2026 · Full-Stack Development",
    description:
      "A full-stack rental platform for flexible-length stays in Nigeria. Landlords create, edit, publish, and manage listings with photo uploads; guests browse and search including a voice-search flow that parses natural speech into location/bedroom/price filters — view listings on an interactive map, save favorites, and contact landlords directly via WhatsApp. Built with a FastAPI/PostgreSQL backend (Supabase for auth, storage, and the database) and a React/TypeScript frontend, with a Redis caching layer added to cut cross-region query latency and role-based access control enforced end-to-end for landlord-owned data.",
    techStack: ["React", "TypeScript", "Supabase", "FastAPI", "PostgreSQL", "Redis"],
    mainStack: "TypeScript",
    image: "/images/projects/movein.png",
    linkLabel: "Watch Demo",
    videoUrl: "https://www.loom.com/share/e0547adc2e5748cfaf2d87d917dd1002",
    repos: [{ label: "Source", href: "https://github.com/Timmynathan/movein-rental-app" }],
  },
  {
    id: "City Care",
    title: "City Care",
    date: "Dec 2025 – Present",
    shortDescription:
      "Healthcare management system to keep patients, doctors, labs, and admin on the same page across a whole hospital.",
    meta: "2025 · Full-Stack Development",
    description:
      "CityCare is a healthcare management system (HMS) designed to digitize and streamline clinical workflows across four user roles: Patients, Clinicians, Lab Technicians, and Administrators. It solves the coordination problem between appointment scheduling, clinical encounters, lab order processing, result verification, billing, and administrative oversight — all within a single platform.",
    techStack: ["React", "TypeScript", "NestJS", "PostgreSQL", "Prisma"],
    mainStack: "TypeScript",
    image: "/images/projects/citycare.png",
    linkLabel: "Website",
    href: "https://csc-419-ca-project.vercel.app/login",
    note: "*Demo Login - admin@citycare.com / password123",
  },
  {
    id: "247HR",
    title: "247HR",
    date: "2025",
    shortDescription:
      "HR management platform. Built frontend components on a team, working in an existing codebase with PR-based code review.",
    meta: "2025 · Frontend Development",
    description:
      "247HR is an all-in-one HR management platform that streamlines and automates the entire employee lifecycle from recruitment to payroll and analytics.",
    techStack: ["React", "MUI", "Docker"],
    mainStack: "React",
    image: "/images/projects/247hr.png",
    linkLabel: "Website",
    href: "https://247hr.co.uk/",
    note: "*Production platform — code not publicly available*",
  },
];

/** Headline project, shown on its own above the category tabs. */
export const FEATURED_PROJECT_ID = "TB DETECT";

/** Display grouping for the Projects section. Order here is the order on the page. */
export const PROJECT_CATEGORIES: ProjectCategory[] = [
  {
    title: "AI Agents & Automation",
    subtitle: "LLM-powered systems that take over repetitive operational work",
    projectIds: ["My Job Hunter", "RelayPay", "Scraping Bird", "AI Content Publisher", "Proposally", "Opsr"],
  },
  {
    title: "Full-Stack Products",
    subtitle: "End-to-end web applications, most built solo and shipped to real users",
    projectIds: ["Nonye's Pasta", "MoveIn Rental App", "City Care", "247HR"],
  },
];
