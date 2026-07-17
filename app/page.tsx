"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import { SiPython, SiReact, SiDjango, SiTensorflow, SiTypescript, SiNodedotjs } from "react-icons/si";

// ─── Types ──────────────────────────────────────────────────────────────────

interface Project {
  id: string;
  title: string;
  description: string;
  badge?: string;
  techStack: string[];
  mainStack?: string;
  linkLabel: string;
  href?: string;
  repos?: { label: string; href: string }[];
  note?: string;
  image?: string;
  imageType?: "default" | "mobile";
  onClick?: () => void;
  featured?: boolean;
  secondary?: boolean;
}


interface Certification {
  title: string;
  issuer: string;
  date: string;
  description: string;
  verifyUrl: string;
}

interface Stat {
  value: string;
  label: string;
}

interface ProjectDetail {
  overview: string;
  challenge: string;
  innovation: string;
  technicalApproach: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const STATS: Stat[] = [
  { value: "2:1", label: "GRADE" },
  { value: "2", label: "Production Products" },
  { value: "100+", label: "Clients Served" },
];

const PROJECT_DETAILS: Record<string, ProjectDetail> = {
  "RAY DETECT": {
    overview:
      "The AI-Powered Tuberculosis Detection System is a machine learning solution designed to assist in detecting tuberculosis from chest X-ray images. It uses deep learning to classify images as TB-positive or TB-negative, aiming to support faster and more accessible diagnosis, especially in low-resource settings.",
    challenge:
      "Tuberculosis diagnosis is often delayed due to limited access to radiologists, high workload, and variability in interpreting X-rays. Existing methods can be slow, expensive, and difficult to scale, while many AI solutions still struggle with reliability and clinical trust.",
    innovation:
      "This project focuses on building a trustworthy AI support tool by combining accurate prediction with explainability. It incorporates visual heatmaps and confidence scores to help users understand model decisions, promoting a human-in-the-loop approach rather than full automation.",
    technicalApproach:
      "The system uses Convolutional Neural Networks (CNNs) built with TensorFlow and trained on public TB datasets. Images are preprocessed and augmented to improve performance. The model is evaluated using standard metrics and enhanced with visualization techniques to highlight the image regions influencing predictions.",
  },
};

const PROJECTS: Project[] = [
  {
    id: "RAY DETECT",
    title: "TB Detect AI — AI-Powered Tuberculosis Detection",
    description: "An AI-powered tool that assists in the early detection of tuberculosis (TB) from chest X-ray images. It uses deep learning to classify scans as TB-positive or negative, improving diagnostic support and accessibility, while also ensuring model interpretability and real-world applicability by addressing challenges such as dataset variability and clinical integration.",
    techStack: ["Python", "TensorFlow", "OpenCV", "Matplotlib"],
    mainStack: "TensorFlow",
    linkLabel: "Visit Platform",
    href: "https://inldiagnostics-ai.vercel.app/",
    repos: [
      { label: "View Code", href: "https://github.com/Timmynathan/tb-detection-app" },
    ],  },
  {
    id: "247HR",
    title: "247HR — Unified platform for end-to-end HR management",
    description: "247HR is an all-in-one HR management platform that streamlines and automates the entire employee lifecycle from recruitment to payroll and analytics.",
    techStack: ["React", "MUI", "Docker"],
    mainStack: "React",
    linkLabel: "View Live Platform",
    href: "https://247hr.co.uk/",
    note: "*Production platform — code not publicly available*",  },
  {
    id: "Nonye's Pasta",
    title: "Nonye's Pasta — E-commerce Store for a Pasta Venture",
    description:
      "A full-stack e-commerce store for a registered pasta venture serving 200+ customers, featuring online ordering, Paystack payment integration, WhatsApp checkout, and Cloudinary-powered product galleries, backed by a Django REST API with an admin dashboard for managing products and orders.",
    techStack: ["React", "Vite", "Tailwind CSS", "Django", "PostgreSQL", "Paystack"],
    mainStack: "Django",
    linkLabel: "Visit Site",
    href: "https://nonyespasta.com/",
    repos: [
      { label: "Frontend Code", href: "https://github.com/Timmynathan/nonyes-pasta-frontend" },
      { label: "Backend Code", href: "https://github.com/Timmynathan/nonyes-pasta-backend" },
    ],  },
  {
    id: "City Care",
    title: "City Care — Healthcare Management System",
    description:
      "CityCare is a healthcare management system (HMS) designed to digitize and streamline clinical workflows across four user roles: Patients, Clinicians, Lab Technicians, and Administrators. It solves the coordination problem between appointment scheduling, clinical encounters, lab order processing, result verification, billing, and administrative oversight — all within a single platform.",
    techStack: ["React", "TypeScript", "NestJS", "PostgreSQL", "Prisma"],
    mainStack: "TypeScript",
    linkLabel: "View Live Platform",
    href: "https://csc-419-ca-project.vercel.app/login",
    note: "*Demo Login - admin@citycare.com / password123",  },
];

const CERTIFICATIONS: Certification[] = [
  {
    title: "Claude Code in Action",
    issuer: "Anthropic",
    date: "July 2026",
    description:
      "Verified practitioner in configuring, customising, securing, and automating Claude Code in real development workflows — from local dev environments to CI/CD pipelines.",
    verifyUrl: "https://verify.skilljar.com/c/44waskeh3csi",
  },
  {
    title: "Introduction to Agent Skills",
    issuer: "Anthropic Education",
    date: "July 2026",
    description:
      "Foundational course on building and applying agent skills with Claude — designing reusable, composable skills that extend an agent's capabilities across development tasks.",
    verifyUrl: "https://verify.skilljar.com/c/2ed3bdcn4rxr",
  },
];

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const STACK_ICONS: Record<string, { Icon: IconType; color: string; label: string }> = {
  Python: { Icon: SiPython, color: "#3776AB", label: "Python" },
  TensorFlow: { Icon: SiTensorflow, color: "#FF6F00", label: "TensorFlow" },
  React: { Icon: SiReact, color: "#61DAFB", label: "React" },
  Django: { Icon: SiDjango, color: "#0C4B33", label: "Django" },
  TypeScript: { Icon: SiTypescript, color: "#3178C6", label: "TypeScript" },
  "Node.js": { Icon: SiNodedotjs, color: "#5FA04E", label: "Node.js" },
};

function GithubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.13-.3-.54-1.53.11-3.19 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.89.12 3.19.77.84 1.23 1.92 1.23 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function TechTag({ label }: { label: string }) {
  return <span className="tech-tag">{label}</span>;
}

function ProjectCard({
  project,
  onOpenDetails,
}: {
  project: Project;
  onOpenDetails: (projectId: string) => void;
}) {
  const stack = project.mainStack ? STACK_ICONS[project.mainStack] : undefined;

  const inner = (
    <article
      className={[
        "project-card",
        project.featured ? "project-card-featured" : "",
        project.secondary ? "project-card-secondary" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={project.onClick}
    >
      <div className="project-content">
        {stack && (
          <div className="project-stack-icon" style={{ color: stack.color }} title={stack.label}>
            <stack.Icon />
          </div>
        )}
        {project.badge && (
          <div
            className={[
              "project-badge",
              project.secondary ? "project-badge-secondary" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {project.badge}
          </div>
        )}
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <div className="tech-stack">
          {project.techStack.map((t) => (
            <TechTag key={t} label={t} />
          ))}
        </div>
        <div className="project-links">
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              <GlobeIcon />
              {project.linkLabel}
            </a>
          )}
          {project.repos?.map((repo) => (
            <a
              key={repo.href}
              href={repo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              <GithubIcon />
              {repo.label}
            </a>
          ))}
          {!project.href && !project.repos && project.linkLabel && (
            <button
              type="button"
              className="project-link project-link-button"
              onClick={() => onOpenDetails(project.id)}
            >
              {project.linkLabel}
            </button>
          )}
        </div>
        {project.note && <p className="project-note">{project.note}</p>}
      </div>

    </article>
  );

  return inner;
}

function CertCard({ cert }: { cert: Certification }) {
  return (
    <div className="cert-card">
      <div className="cert-card-head">
        <h3 className="cert-title">{cert.title}</h3>
        <span className="cert-badge">Completed</span>
      </div>
      <div className="cert-meta">
        {cert.issuer} · {cert.date}
      </div>
      <p className="cert-description">{cert.description}</p>
      <a
        href={cert.verifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="project-link cert-link"
      >
        <GlobeIcon />
        Verify Credential
      </a>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const selectedProjectDetail = selectedProjectId ? PROJECT_DETAILS[selectedProjectId] : null;

  // Navbar scroll shadow
  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fade-in observer (mirrors original JS behavior)
  const observerRef = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".fade-in").forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const handleOpenProjectDetails = (projectId: string) => {
    if (PROJECT_DETAILS[projectId]) {
      setSelectedProjectId(projectId);
    }
  };

  return (
    <>
      {/* ── Navbar ── */}
      <header>
        <nav
          id="navbar"
          className={navScrolled ? "scrolled" : ""}
        >
          <div className="container">
            <div className="nav-container">
              <div className="logo"></div>

              <button
                className={`mobile-menu-toggle ${menuOpen ? "active" : ""}`}
                aria-label="Toggle mobile menu"
                onClick={() => setMenuOpen((o) => !o)}
              >
                <span className="hamburger-line" />
                <span className="hamburger-line" />
                <span className="hamburger-line" />
              </button>

              <ul className={`nav-links ${menuOpen ? "active" : ""}`} id="navLinks">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      onClick={() => setMenuOpen(false)}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* ── Hero ── */}
        <section id="home" className="hero">
          <div className="container">
            <div className="hero-content fade-in">
              <div className="hero-photo">
                <Image
                  src="/images/profile_photo.png"
                  alt="Ilesanmi Oluwatimilehin Nathaniel"
                  fill
                  sizes="130px"
                  priority
                  className="hero-photo-img"
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                />
              </div>
              <p className="hero-greeting">Hi There! <span className="hero-wave">👋</span></p>
              <h1 className="hero-name">
                I&apos;m <span className="hero-name-accent">Ilesanmi Oluwatimilehin</span>
              </h1>
              <p className="hero-role">Full Stack Developer</p>
              <p className="hero-description">
                I&apos;m Ilesanmi Oluwatimilehin, an AI Engineer and Full-Stack Developer with 4+ years of
                experience building production-ready applications. My work spans deep learning and computer
                vision (CNNs, DenseNet, TensorFlow), alongside full-stack web and mobile development.
                I&apos;ve shipped products across healthcare, HR, and e-commerce — from an AI tuberculosis-detection
                tool for clinics in sub-Saharan Africa to HR platforms used by 30+ companies — and I&apos;m passionate
                about building technology for real social impact in Africa.
              </p>
              <div className="hero-buttons">
                <a href="#projects" className="cta-button magnetic">
                  View My Work
                </a>
                <a
                  href="mailto:ilesanmitimilehin19@gmail.com?subject=Resume Request&body=Hi Oluwatimilehin, I'd like to request your resume. Thanks!"
                  className="cta-button cta-button-outline magnetic"
                >
                  Request Resume
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Projects ── */}
        <section id="projects" className="projects">
          <div className="container">
            <div className="fade-in">
              <h2 className="section-title">Featured Projects</h2>
              <p className="section-subtitle">
               Showcasing solutions that balance engineering excellence with intuitive user experience
              </p>

              <div className="projects-grid">
                {PROJECTS.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onOpenDetails={handleOpenProjectDetails}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Certifications ── */}
        <section id="certifications" className="certifications">
          <div className="container">
            <div className="fade-in">
              <h2 className="section-title">Certifications</h2>
              <p className="section-subtitle">
                Continuous learning in AI tooling and modern development workflows
              </p>

              <div className="cert-grid">
                {CERTIFICATIONS.map((cert) => (
                  <CertCard key={cert.title} cert={cert} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="contact">
          <div className="container">
            <div className="fade-in">
              <p className="contact-message">
                Let&apos;s connect — I&apos;m always open to new opportunities and collaborations.
              </p>
              <div className="social-links">
                <a
                  href="mailto:oluwatimilehin.nathan@gmail.com"
                  className="social-link"
                  title="Email"
                  aria-label="Send email"
                >
                  <span>Email</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/oluwatimilehin-ilesanmi/"
                  className="social-link"
                  title="LinkedIn"
                  aria-label="Visit LinkedIn profile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>in</span>
                </a>
                <a
                  href="https://github.com/Timmynathan"
                  className="social-link"
                  title="GitHub"
                  aria-label="Visit GitHub profile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer>
        <div className="container">
          <p>© 2026 Ilesanmi Oluwatimilehin Nathaniel. All rights reserved.</p>
        </div>
      </footer>
      {/* Modal and global styles */}
      <style jsx global>{`
        .project-link-button {
          background: none;
          border: none;
          padding: 0;
          font: inherit;
          text-align: left;
        }

        .project-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          z-index: 1000;
        }

        .project-modal {
          width: min(720px, 100%);
          max-height: 85vh;
          overflow-y: auto;
          background: var(--color-bg-white);
          color: var(--color-text);
          border: 1px solid var(--color-border);
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.18);
          position: relative;
        }

        .project-modal h2,
        .project-modal h3 {
          color: var(--color-primary);
        }

        .project-modal h2 {
          margin: 0 0 16px;
        }

        .project-modal h3 {
          margin: 24px 0 10px;
        }

        .project-modal p {
          margin: 0;
          line-height: 1.8;
          color: var(--color-text);
        }

        .project-modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: none;
          border: none;
          font-size: 28px;
          line-height: 1;
          color: var(--color-text);
          padding: 4px;
        }
      `}</style>
      {selectedProjectDetail && (
        <div
          className="project-modal-overlay"
          onClick={() => setSelectedProjectId(null)}
          role="presentation"
        >
          <div
            className="project-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-details-title"
          >
            <button
              type="button"
              className="project-modal-close"
              aria-label="Close project details"
              onClick={() => setSelectedProjectId(null)}
            >
              ×
            </button>

            <h2 id="project-details-title">Project Overview</h2>
            <p>{selectedProjectDetail.overview}</p>

            <h3>The Challenge</h3>
            <p>{selectedProjectDetail.challenge}</p>

            <h3>The Innovation</h3>
            <p>{selectedProjectDetail.innovation}</p>

            <h3>Technical Approach</h3>
            <p>{selectedProjectDetail.technicalApproach}</p>
          </div>
        </div>
      )}
    </>
  );
}
