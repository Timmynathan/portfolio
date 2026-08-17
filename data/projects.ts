import type { Project } from "@/types";

export const PROJECTS: Project[] = [
  {
    id: "TB DETECT",
    title: "TB detect.ai — AI-Powered Tuberculosis Detection",
    description:
      "An AI-powered tool that assists in the early detection of tuberculosis (TB) from chest X-ray images. It uses deep learning to classify scans as TB-positive or negative, improving diagnostic support and accessibility, while also ensuring model interpretability and real-world applicability by addressing challenges such as dataset variability and clinical integration.",
    techStack: ["Python", "TensorFlow", "OpenCV", "Matplotlib"],
    mainStack: "Python",
    linkLabel: "Visit Platform",
    href: "https://inldiagnostics-ai.vercel.app/",
    repos: [{ label: "View Code", href: "https://github.com/Timmynathan/tb-detection-app" }],
  },
  {
    id: "MoveIn Rental App",
    title: "MoveIn — Rental Platform",
    description:
      "A full-stack rental platform for flexible-length stays in Nigeria. Landlords create, edit, publish, and manage listings with photo uploads; guests browse and search including a voice-search flow that parses natural speech into location/bedroom/price filters — view listings on an interactive map, save favorites, and contact landlords directly via WhatsApp. Built with a FastAPI/PostgreSQL backend (Supabase for auth, storage, and the database) and a React/TypeScript frontend, with a Redis caching layer added to cut cross-region query latency and role-based access control enforced end-to-end for landlord-owned data.",
    techStack: ["React", "TypeScript", "Supabase", "FastAPI", "PostgreSQL", "Redis"],
    mainStack: "React",
    linkLabel: "Watch Demo",
    videoUrl: "https://www.loom.com/share/842aa2bef16f400d9d317edef4a61292",
    repos: [{ label: "View Code", href: "https://github.com/Timmynathan/movein-rental-app" }],
  },
  {
    id: "247HR",
    title: "247HR — Unified platform for end-to-end HR management",
    description:
      "247HR is an all-in-one HR management platform that streamlines and automates the entire employee lifecycle from recruitment to payroll and analytics.",
    techStack: ["React", "MUI", "Docker"],
    mainStack: "React",
    linkLabel: "View Live Platform",
    href: "https://247hr.co.uk/",
    note: "*Production platform — code not publicly available*",
  },
  {
    id: "Nonye's Pasta",
    title: "Nonye's Pasta — E-commerce Store for a Pasta Venture",
    description:
      "A full-stack e-commerce store for a registered pasta venture serving 200+ customers, featuring online ordering, Paystack payment integration, WhatsApp checkout, and Cloudinary-powered product galleries, backed by a Django REST API with an admin dashboard for managing products and orders.",
    techStack: ["React", "Vite", "Tailwind CSS", "Django", "PostgreSQL", "Paystack"],
    mainStack: "React",
    linkLabel: "Visit Site",
    href: "https://nonyespasta.com/",
    repos: [
      { label: "Frontend", href: "https://github.com/Timmynathan/nonyes-pasta-frontend" },
      { label: "Backend", href: "https://github.com/Timmynathan/nonyes-pasta-backend" },
    ],
  },
  {
    id: "City Care",
    title: "City Care — Healthcare Management System",
    description:
      "CityCare is a healthcare management system (HMS) designed to digitize and streamline clinical workflows across four user roles: Patients, Clinicians, Lab Technicians, and Administrators. It solves the coordination problem between appointment scheduling, clinical encounters, lab order processing, result verification, billing, and administrative oversight — all within a single platform.",
    techStack: ["React", "TypeScript", "NestJS", "PostgreSQL", "Prisma"],
    mainStack: "TypeScript",
    linkLabel: "View Live Platform",
    href: "https://csc-419-ca-project.vercel.app/login",
    note: "*Demo Login - admin@citycare.com / password123",
  },
];
