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
    title: "Proposally",
    shortDescription: "An AI business proposal generator; upload docs, paste meeting notes, or speak.",
    meta: "2026 · Full-Stack Development, AI Agents",
    description:
      "An internal tool that turns discovery-call notes into a drafted proposal, then keeps a human in control the whole way: intake, AI drafting, per-section regeneration, a separate reviewer's approval, and client delivery, with every step logged. Claude writes prose, never commitments — price, scope, and timeline are copied verbatim from the intake form, and the app programmatically verifies they appear unmodified in the model's output rather than trusting the prompt. A missing required field renders as an explicit marker, and a Postgres trigger physically blocks sending until it's filled in, so the approval gate lives in the database rather than behind a hidden button. Sonnet 5 drafts the initial proposal; Haiku 4.5 handles fast per-section regeneration. Internal reviewer and decision emails are best-effort and never block a real approval — the deliberate opposite of the client-delivery email, where the send itself is the point.",
    techStack: ["React", "TypeScript", "Vercel", "Supabase", "Claude", "Resend"],
    mainStack: "TypeScript",
    image: "/images/projects/proposally.png",
    linkLabel: "Website",
    href: "https://proposally.vercel.app/",
    repos: [{ label: "Source", href: "https://github.com/Timmynathan/Proposally" }],
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
