import type { Project } from "@/types";

export const PROJECTS: Project[] = [
  {
    id: "TB DETECT",
    title: "TB Detect AI",
    shortDescription: "A deep learning model that detects tuberculosis from chest X-rays",
    meta: "2025 · Machine Learning, Web Development",
    description:
      "An AI-powered tool that assists in the early detection of tuberculosis (TB) from chest X-ray images. It uses deep learning to classify scans as TB-positive or negative, improving diagnostic support and accessibility, while also ensuring model interpretability and real-world applicability by addressing challenges such as dataset variability and clinical integration.",
    techStack: ["Python", "TensorFlow", "OpenCV", "Matplotlib"],
    mainStack: "Python",
    image: "/images/projects/tbdetect.png",
    linkLabel: "Website",
    href: "https://inldiagnostics-ai.vercel.app/",
    repos: [{ label: "Source", href: "https://github.com/Timmynathan/tb-detection-app" }],
  },
  {
    id: "Nonye's Pasta",
    title: "Nonye's Pasta",
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
    repos: [{ label: "Source", href: "https://github.com/Timmynathan/nonyes-pasta-backend" }],
  },
  {
    id: "Proposally",
    title: "Proposally AI",
    shortDescription: "An AI business proposal generator; upload docs, paste meeting notes, or speak.",
    meta: "2026 · Full-Stack Development, AI Agents",
    description:
      "An internal tool that turns discovery-call notes into a drafted proposal, then keeps a human in control the whole way: intake, AI drafting, per-section regeneration, a separate reviewer's approval, and client delivery, with every step logged. Claude writes prose, never commitments — price, scope, and timeline are copied verbatim from the intake form, and the app programmatically verifies they appear unmodified in the model's output rather than trusting the prompt. A missing required field renders as an explicit marker, and a Postgres trigger physically blocks sending until it's filled in, so the approval gate lives in the database rather than behind a hidden button. Sonnet 5 drafts the initial proposal; Haiku 4.5 handles fast per-section regeneration. Internal reviewer and decision emails are best-effort and never block a real approval — the deliberate opposite of the client-delivery email, where the send itself is the point.",
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
    title: "Opsr",
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
    // Internal company tool — no public link or repo to share.
    linkLabel: "Website",
    note: "*Internal tool — not publicly available*",
  },
  {
    id: "MoveIn Rental App",
    title: "MoveIn",
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
    shortDescription: "HR management platform; frontend components, built with a team",
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
