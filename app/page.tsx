"use client";

import { useEffect, useRef, useState } from "react";

// ─── Types ──────────────────────────────────────────────────────────────────

interface Project {
  id: string;
  title: string;
  description: string;
  badge?: string;
  techStack: string[];
  linkLabel: string;
  href?: string;
  note?: string;
  image?: string;
  imageType?: "default" | "mobile";
  onClick?: () => void;
  featured?: boolean;
  secondary?: boolean;
}

interface TimelineEntry {
  date: string;
  title: string;
  company: string;
  description: string;
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

const SKILLS = [
  "Javascript",
  "Python",
  "PostgreSQL",
  "React",
  "TypeScript",
  "React Native",
  "Claude Code",
  "Docker",
  "Shopify",
];

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
    title: "INL Diagnostics — AI-Powered Tuberculosis Detection",
    badge: "Early Stage Startup",
    description: "Developed a machine learning system to assist in the early detection of tuberculosis (TB) from chest X-ray images. The project leverages deep learning techniques to classify images as TB-positive or negative, improving diagnostic support and accessibility. It also explores model interpretability and real-world applicability by addressing challenges such as dataset variability and clinical integration.",
    techStack: ["Python", "TensorFlow", "OpenCV", "Matplotlib"],
    linkLabel: "Visit Platform",
    href: "https://inldiagnostics-ai.vercel.app/",
    note: "*In active development — launching mid-2026*",
    image: "/projects/tbx.png",
  },
  {
    id: "247HR",
    title: "247HR — Unified platform for end-to-end HR management",
    badge: "Isurf Global Services",
    description: "247HR is an all-in-one HR management platform that streamlines and automates the entire employee lifecycle from recruitment to payroll and analytics.",
    techStack: ["React", "MUI", "Docker"],
    linkLabel: "View Live Platform",
    href: "https://247hr.co.uk/",
    note: "*Production platform — code not publicly available*",
    image: "/projects/247hr.png",
  },
  {
    id: "City Care",
    title: "City Care — Healthcare Management System",
    description:
      "CityCare is a healthcare management system (HMS) designed to digitize and streamline clinical workflows across four user roles: Patients, Clinicians, Lab Technicians, and Administrators. It solves the coordination problem between appointment scheduling, clinical encounters, lab order processing, result verification, billing, and administrative oversight — all within a single platform.",
    techStack: ["React", "TypeScript", "NestJS", "PostgreSQL", "Prisma"],
    linkLabel: "View Live Platform",
    href: "https://csc-419-ca-project.vercel.app/login",
    note: "*Demo Login - admin@citycare.com / password123",
    image: "/projects/citycare.png",
  },
  {
    id: "DTSLuxe",
    title: "DTSLuxe — Premium Clothing Resale Brand",
    badge: "Co-founder",
    description:
      "A premium clothing resale brand curating sought-after global pieces, serving 80+ customers and generating ₦4–₦5M in revenue. Developed and managed the e-commerce website to drive conversions, while leading sourcing, branding, and growth through social media and influencer collaborations.",
    techStack: ["Shopify"],
    linkLabel: "Visit Site",
    href: "https://www.dtsluxe.com",
    image: "/projects/dtsluxe.png",
  },
  {
    id: "Beta Biz",
    title: "Beta Biz — A mobile-first AI-powered financial assistant",
    badge: "Payaza Hackathon 2024",
    description: "BetaBiz is a powerful virtual business partner accessible right from every business owner's most essential tool—their mobile phone. BetaBiz will empower SMEs by tracking cash flow, evaluating business health, offering tailored daily goals, and financial literacy all with the ultimate aim of unlocking access to funding and helping them grow.",
    techStack: ["React Native", "Node JS"],
    linkLabel: "",
    href: "",
    note: "",
    image: "/projects/betabiz.png",
    imageType: "mobile",
  },
];

const TIMELINE: TimelineEntry[] = [
   {
    date: "April 2025 - Present",
    title: "Co-founder & Operations Lead",
    company: "Dtsluxe",
    description:
      "Built a premium clothing resale brand curating sought-after global pieces, serving 80+ customers and generating ₦4–₦5M in revenue. Developed and managed the e-commerce website to drive conversions, while leading sourcing, branding, and growth through social media and influencer collaborations.",
  },
  {
    date: "July 2025 - September 2025",
    title: "IT Intern",
    company: "Isurf Global Services",
    description:
      "Contributed to the development of an HRMS application, being a part of the front-end team used by 100+ applicants, improving usability and workflow efficiency.",
  },
 
  {
    date: "July 2024 - September 2024",
    title: "Software Engineer Intern",
    company: "Cyber fleet",
    description:
      "Developed and maintained web and mobile applications using JavaScript, Node.js, and React Native, improving user engagement by 25%",
  },
  {
    date: "2022 - December 2026",
    title: "Computer Science Student",
    company: "Pan-Atlantic University",
    description:
      "Pursuing a degree in Computer Science while specializing in data structures, algorithms, and full-stack development. Active in tech communities and leadership roles including collaboration with ICT team on AI projects.",
  },
];

// const CERTIFICATIONS: Certification[] = [];

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  // { label: "Certs", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SkillBubble({ label }: { label: string }) {
  return <span className="skill-bubble">{label}</span>;
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
  const hasImage = Boolean(project.image);
  const placeholder = project.id
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

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
      <div
        className={[
          "project-image",
          project.featured ? "project-image-featured" : "",
          project.secondary ? "project-image-secondary" : "",
          project.imageType === "mobile" ? "project-image-mobile" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {hasImage ? (
          <img src={project.image} alt={`${project.title} Screenshot`} loading="lazy" />
        ) : (
          placeholder
        )}
      </div>
      <div className="project-content">
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
          {project.href ? (
            <span className="project-link">{project.linkLabel}</span>
          ) : project.linkLabel ? (
            <button
              type="button"
              className="project-link project-link-button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onOpenDetails(project.id);
              }}
            >
              {project.linkLabel}
            </button>
          ) : null}
        </div>
        {project.note && <p className="project-note">{project.note}</p>}
      </div>

    </article>
  );

  if (project.href) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="project-card-link"
      >
        {inner}
      </a>
    );
  }

  return inner;
}

function TimelineItem({ entry }: { entry: TimelineEntry }) {
  return (
    <article className="timeline-item">
      <div className="timeline-content">
        <div className="timeline-date">{entry.date}</div>
        <h3 className="timeline-title">{entry.title}</h3>
        <div className="timeline-company">{entry.company}</div>
        <p className="timeline-description">{entry.description}</p>
      </div>
    </article>
  );
}

function CertCard({ cert }: { cert: Certification }) {
  return (
    <div className="stat">
      <a
        href={cert.verifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="stat-number"
      >
        {cert.title}
      </a>
      <div className="stat-label">{cert.issuer}</div>
      <div className="stat-label">{cert.date}</div>
      <p className="stat-label">{cert.description}</p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const selectedProjectDetail = selectedProjectId ? PROJECT_DETAILS[selectedProjectId] : null;

  // Dark mode sync
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

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

  const handleSendMessage = () => {
    const { name, email, message } = formData;
    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:oluwatimilehin.nathan@gmail.com?subject=${subject}&body=${body}`;
  };

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
              <div className="logo">Nathaniel</div>

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

              <button
                className="theme-toggle"
                aria-label="Toggle dark mode"
                onClick={() => setDarkMode((d) => !d)}
              >
                <span className={`icon ${darkMode ? "moon-icon" : "sun-icon"}`}>
                  {darkMode ? "🌙" : "☀️"}
                </span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* ── Hero ── */}
        <section id="home" className="hero">
          <div className="container">
            <div className="hero-content fade-in">
              <p className="hero-eyebrow">Software Developer</p>
              <h1>Ilesanmi Oluwatimilehin Nathaniel</h1>
              <p className="tagline">
                Full-Stack Software Engineer with 4+ years of experience building scalable web and mobile applications using React, Node.js, and modern JavaScript frameworks.
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

        {/* ── About ── */}
        <section id="about">
          <div className="container">
            <div className="fade-in">
              <p className="section-label">01 — About</p>
              <h2 className="section-title">About Me</h2>
              <p className="section-subtitle">
                Passionate about technology, focused on building scalable products with real-world impact, and deeply rooted in innovation and 
                problem-solving
              </p>

              <div className="about-grid">
                <div className="about-image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/profile_photo.png"
                    alt="Oluwatimilehin Nathaniel"
                    className="about-photo"
                  />
                </div>
                <div className="about-content">
                  <h3>Full-Stack Software Engineer</h3>
                  <p>
                    Full-Stack Software Engineer with 4+ years of experience building scalable web and mobile applications using React, Node.js, and modern JavaScript frameworks.
                    Skilled in developing reusable UI components, designing REST APIs, and troubleshooting issues across the application stack. 
                    Experienced in agile, collaborative environments, with strong communication skills and a focus on writing clean, maintainable code. 
                  </p>

                  <div className="terminal">
                    {`const nathaniel = { skills: ["JavaScript", "Python", "React", "Problem Solving"], passion: "Building meaningful tech" };`}
                    <span className="terminal-cursor">|</span>
                  </div>

                  <div className="skills-section">
                    <h4>Core Technologies</h4>
                    <div className="skills-container">
                      {SKILLS.map((s) => (
                        <SkillBubble key={s} label={s} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="stats">
                {STATS.map(({ value, label }) => (
                  <div className="stat" key={label}>
                    <span className="stat-number">{value}</span>
                    <div className="stat-label">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Projects ── */}
        <section id="projects" className="projects">
          <div className="container">
            <div className="fade-in">
              <p className="section-label">02 — Work</p>
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

        {/* ── Experience ── */}
        <section id="experience">
          <div className="container">
            <div className="fade-in">
              <p className="section-label">03 — Experience</p>
              <h2 className="section-title">Professional Journey</h2>
              <p className="section-subtitle">
                Building expertise through diverse hands-on experience across tech, product development, and entrepreneurship.
              </p>

              <div className="experience-timeline">
                {TIMELINE.map((entry) => (
                  <TimelineItem key={entry.date + entry.company} entry={entry} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Certifications ──
        <section id="certifications">
          <div className="container">
            <div className="fade-in">
              <h2 className="section-title">Certifications</h2>
              <p className="section-subtitle">
                Continuous learning in AI tooling and modern development workflows
              </p>

              <div className="stats">
                {CERTIFICATIONS.map((cert) => (
                  <CertCard key={cert.title} cert={cert} />
                ))}
              </div>
            </div>
          </div>
        </section> */}

        {/* ── Contact ── */}
        <section id="contact" className="contact">
          <div className="container">
            <div className="fade-in">
              <p className="section-label">04 — Contact</p>
              <h2 className="section-title">Let&apos;s Build Something Amazing</h2>
              <p className="section-subtitle">
                Ready to collaborate? Let&apos;s connect and create solutions that matter.
              </p>

              {/* NOTE: <form> removed intentionally — use controlled state + mailto handler */}
              <div className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((f) => ({ ...f, name: e.target.value }))
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((f) => ({ ...f, email: e.target.value }))
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((f) => ({ ...f, message: e.target.value }))
                    }
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSendMessage}
                  className="cta-button cta-button-full"
                >
                  Send Message
                </button>
                <p className="contact-email">
                  Or email me directly at{" "}
                  <a href="mailto:ilesanmitimilehin19@gmail.com">
                    oluwatimilehin.nathan@gmail.com
                  </a>
                </p>
              </div>

              <div className="social-links">
                <a
                  href="mailto:ilesanmitimilehin19@gmail.com"
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
