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
  image?: string; // src path or placeholder text
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

// ─── Data ────────────────────────────────────────────────────────────────────

const SKILLS = [
  "Django/DRF",
  "PostgreSQL",
  "React",
  "TypeScript",
  "React Native",
  "Stripe/Plaid",
  "Claude Code",
  "Docker",
];

const STATS: Stat[] = [
  { value: "4.73/5.0", label: "First Class GPA" },
  { value: "4", label: "Production Products" },
  { value: "1,000+", label: "Students Served" },
  { value: "700+", label: "AI Assistant Users" },
];

const PROJECTS: Project[] = [
  {
    id: "shadow",
    title: "Shadow — AI-Powered Academic Achievement System",
    badge: "Final Year Project",
    description:
      "A goal-driven academic platform that reverse-engineers what students need to achieve their target CGPA. Features GPT-4 powered study coaching, mood-aware task prioritization using NLP sentiment analysis, multi-source content curation (YouTube, Reddit, Google), AI-generated quizzes and practice exercises, and statistical effectiveness tracking. Full-stack: FastAPI, React, PostgreSQL, Redis, Docker Compose — with 80+ API endpoints, JWT auth with refresh token rotation, and CI/CD via GitHub Actions.",
    techStack: ["FastAPI", "React", "PostgreSQL", "GPT-4", "Docker", "Redis"],
    linkLabel: "View Live Platform",
    href: "https://shadow-academic.up.railway.app/",
    note: "*Demo login — demo.user@gmail.com / Demouser1*",
    image: "assets/images/projects/shadowimg.png",
  },
  {
    id: "royal-academy",
    title: "Royal Academy — EdTech Platform",
    description:
      "Full-stack educational platform built with Django and React. Implemented complete Stripe payment lifecycle, activity management system with admin tooling, and student video player. 649 passing tests at 81% coverage with CI/CD running against real PostgreSQL.",
    techStack: ["Django", "DRF", "React", "Stripe", "PostgreSQL"],
    linkLabel: "View Details",
    note: "*Production platform — code not publicly available*",
    image: "",
  },
  {
    id: "fomo-fi",
    title: "Fomo-Fi — Personal Finance App",
    description:
      "Mobile-first personal finance app with Plaid bank connection, Stripe subscription billing, and Clerk authentication. Monorepo architecture with React Native/Expo frontend and Django backend. Built from zero with Claude Code as core development tool.",
    techStack: ["React Native", "Django", "Plaid", "Stripe", "Clerk"],
    linkLabel: "View Details",
    note: "*In active development — launching mid-2026*",
    image: "",
  },
  {
    id: "uni-ordering",
    title: "Uni Ordering Platform",
    description:
      "A comprehensive food-ordering platform serving 1,000+ university students, handling 30-40 daily orders. Led frontend development with responsive UI, boosting adoption and order efficiency.",
    techStack: ["HTML5", "Tailwind CSS", "JavaScript"],
    linkLabel: "Visit Live Platform",
    href: "https://uniordering.com",
    image: "assets/images/projects/uniOrderingimg.png",
  },
  {
    id: "pau-assistant",
    title: "PAU Knowledge Assistant",
    description:
      "AI-powered assistant built with Microsoft Copilot Studio that provides 700+ students and staff instant access to policies, HR guidelines, and academic procedures. Designed and structured comprehensive knowledge base.",
    techStack: [
      "Microsoft Copilot",
      "Markdown",
      "Knowledge Base",
      "AI Integration",
    ],
    linkLabel: "View Demo",
    note: "*Available exclusively for Pan-Atlantic University students and staff",
    image: "assets/images/projects/pauknowledgebaseimg.png",
  },
  {
    id: "eagle",
    title: "Eagle - Vessel Tracking System",
    description:
      "Vessel-tracking solution for Keystone Bank Nigeria to monitor bank-owned vessels, integrating AIS data. Designed database schema for ship information, routes, and live tracking for risk assessment.",
    techStack: [
      "Database Design",
      "API Integration",
      "AIS Data",
      "Risk Management",
    ],
    linkLabel: "View Case Study",
    note: "*Internal banking tool - Code repository not publicly available",
    image: "",
  },
  {
    id: "echomind",
    title: "EchoMind - Voice-Powered Healthcare AI",
    badge: "TIC Hackathon 2.0 Winner",
    description:
      "Award-winning voice-powered document Q&A system for healthcare professionals. Built with RAG, OpenAI Whisper, and React in under 24 hours at TIC Hackathon 2.0.",
    techStack: ["Python", "FastAPI", "React", "OpenAI", "RAG"],
    linkLabel: "View Full Case Study",
    href: "project-echomind.html",
    image: "assets/images/echomind/Screenshot 2025-12-17 at 19.10.48.png",
    featured: true,
  },
  {
    id: "echopay",
    title: "EchoPay - Intelligent Banking Platform",
    badge: "TIC Hackathon 2.0 Winner",
    description:
      "Innovative fintech solution reimagining digital banking experience. Built in under 24 hours with focus on security, accessibility, and user experience. AI-enhanced platform addressing modern financial transaction challenges.",
    techStack: ["Python", "React", "AI/ML", "Security", "Fintech"],
    linkLabel: "View Details",
    image: "assets/images/projects/echoPayimg.png",
    secondary: true,
  },
];

const TIMELINE: TimelineEntry[] = [
  {
    date: "Dec 2025 - Present",
    title: "Senior Full-Stack & Mobile Developer (Contract)",
    company: "Benmore Technologies",
    description:
      "Own end-to-end development across four concurrent production products (edtech, fintech, property-tech, ERP). Build Django/DRF backends, React frontends, and React Native mobile apps. Integrated Stripe payment lifecycle (checkout, webhooks, customer portal), Plaid bank connection, and Clerk auth. Use Claude Code as a core development tool — Opus for planning, Sonnet for execution, CLAUDE.md for persistent project context, and Claude Bot for automated PR review. Maintain CI/CD pipelines with GitHub Actions, Vercel, and Sentry. Codebase at 649 passing tests with 81% coverage.",
  },
  {
    date: "July 2025 - September 2025",
    title: "Risk Consulting Intern, Digital Risk",
    company: "Ernst & Young (EY)",
    description:
      "Assisted in Enterprise Level Control (ELC) reviews for energy & financial clients, improving accuracy of risk assessments. Conducted IT control testing (change, access, backup), with findings adopted in client compliance evaluations.",
  },
  {
    date: "January 2025 - Present",
    title: "Co-Founder & Frontend Developer",
    company: "Uni Ordering (Startup)",
    description:
      "Built a food-ordering platform serving 1,000+ students, handling 30-40 daily orders. Led frontend development with responsive UI, boosting adoption and order efficiency. Oversaw operations and product design, merging technical execution with business decision-making.",
  },
  {
    date: "July 2024 - September 2024",
    title: "Frontend Development Intern",
    company: "Unyte Africa",
    description:
      "Developed scalable React interfaces with search, filter, and pagination for large datasets. Collaborated with cross-functional teams to deliver features on time using Agile practices. Optimized API-driven rendering to improve performance and load speed.",
  },
  {
    date: "2022 - December 2026",
    title: "Computer Science Student",
    company: "Pan-Atlantic University",
    description:
      "Maintaining a First-Class GPA (4.73/5.0) while specializing in data structures, algorithms, and full-stack development. Active in tech communities and leadership roles including collaboration with ICT team on AI projects.",
  },
];

const CERTIFICATIONS: Certification[] = [
  {
    title: "Claude Code in Action",
    issuer: "Anthropic",
    date: "April 2026",
    description:
      "Verified practitioner in configuring, customising, securing, and automating Claude Code in real development workflows — from local dev environments to CI/CD pipelines.",
    verifyUrl: "https://verify.skilljar.com/c/rhm4c9giv8ug",
  },
  {
    title: "Introduction to Agent Skills",
    issuer: "Anthropic",
    date: "March 2026",
    description:
      "Completed Anthropic's official course on building and using agent skills within Claude Code workflows.",
    verifyUrl: "https://verify.skilljar.com/c/96dg64g9a38r",
  },
  {
    title: "Introduction to Model Context Protocol",
    issuer: "Anthropic",
    date: "April 2026",
    description:
      "Completed Anthropic's official course on the Model Context Protocol — building MCP servers, integrating tools and resources, and connecting external services to Claude.",
    verifyUrl: "https://verify.skilljar.com/c/qot85jvb5tgh",
  },
];

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certs", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SkillBubble({ label }: { label: string }) {
  return <span className="skill-bubble">{label}</span>;
}

function TechTag({ label }: { label: string }) {
  return <span className="tech-tag">{label}</span>;
}

function ProjectCard({ project }: { project: Project }) {
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
      style={project.onClick ? { cursor: "pointer" } : undefined}
    >
      <div
        className={[
          "project-image",
          project.featured ? "project-image-featured" : "",
          project.secondary ? "project-image-secondary" : "",
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
          <span className="project-link">{project.linkLabel}</span>
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
    window.location.href = `mailto:aladenusiadeleke@gmail.com?subject=${subject}&body=${body}`;
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
              <div className="logo">Leke</div>

              <button
                className={`mobile-menu-toggle ${menuOpen ? "active" : ""}`}
                aria-label="Toggle mobile menu"
                onClick={() => setMenuOpen((o) => !o)}
              >
                <span className="hamburger-line" />
                <span className="hamburger-line" />
                <span className="hamburger-line" />
              </button>

              <ul className={`nav-links ${menuOpen ? "open" : ""}`} id="navLinks">
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
          <div className="parallax-bg" />
          <div className="container">
            <div className="hero-content fade-in">
              <h1>Paul Adeleke Aladenusi</h1>
              <div className="nickname">(Leke)</div>
              <p className="tagline">
                Full-stack engineer with a backend focus — building fintech, edtech, and
                SaaS products from zero to one. I design and ship robust APIs, data
                pipelines, and server-side architecture using Django and FastAPI, with
                React and React Native on the frontend.
              </p>
              <div className="hero-buttons">
                <a href="#projects" className="cta-button magnetic">
                  View My Work
                </a>
                <a
                  href="mailto:aladenusiadeleke@gmail.com?subject=Resume Request&body=Hi Leke, I'd like to request your resume. Thanks!"
                  className="cta-button cta-button-outline magnetic"
                >
                  Request Resume
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Floating particles */}
        <div className="floating-particles">
          {[0, 1, 1.5, 2, 2.5, 3, 4, 5, 0.5].map((delay, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${(i + 1) * 10}%`,
                animationDelay: `${delay}s`,
              }}
            />
          ))}
        </div>

        {/* ── About ── */}
        <section id="about">
          <div className="container">
            <div className="fade-in">
              <h2 className="section-title">About Me</h2>
              <p className="section-subtitle">
                Passionate about technology, driven by creativity, and deeply rooted in
                culture
              </p>

              <div className="about-grid">
                <div className="about-image">LA</div>
                <div className="about-content">
                  <h3>Backend-Focused Full-Stack Engineer</h3>
                  <p>
                    I'm a full-stack engineer with a backend focus. I specialise in
                    designing and building APIs, database architecture, and server-side
                    systems. Currently a Senior Developer at Benmore Technologies, where I
                    own end-to-end development across four concurrent production products —
                    building Django/DRF and FastAPI backends, React frontends, React Native
                    mobile apps, and payment integrations with Stripe, Plaid, and Clerk. I
                    operate with a deeply integrated AI-first workflow using Claude Code for
                    planning, implementation, and automated PR review. Previously interned
                    at Ernst & Young (Digital Risk) and co-founded UniOrdering, a campus
                    delivery platform serving 1,000+ students.
                  </p>

                  <div className="terminal">
                    {`const leke = { skills: ["JavaScript", "Python", "React", "Problem Solving"], passion: "Building meaningful tech" };`}
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
              <h2 className="section-title">Featured Projects</h2>
              <p className="section-subtitle">
                Showcasing solutions that blend technical precision with user-centered
                design
              </p>

              <div className="projects-grid">
                {PROJECTS.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Experience ── */}
        <section id="experience">
          <div className="container">
            <div className="fade-in">
              <h2 className="section-title">Professional Journey</h2>
              <p className="section-subtitle">
                Building expertise through diverse experiences in consulting, fintech, and
                entrepreneurship
              </p>

              <div className="experience-timeline">
                {TIMELINE.map((entry) => (
                  <TimelineItem key={entry.date + entry.company} entry={entry} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Certifications ── */}
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
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="contact">
          <div className="container">
            <div className="fade-in">
              <h2 className="section-title">Let's Build Something Amazing</h2>
              <p className="section-subtitle">
                Ready to collaborate? Let's connect and create solutions that matter.
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
                  <a href="mailto:aladenusiadeleke@gmail.com">
                    aladenusiadeleke@gmail.com
                  </a>
                </p>
              </div>

              <div className="social-links">
                <a
                  href="mailto:aladenusiadeleke@gmail.com"
                  className="social-link"
                  title="Email"
                  aria-label="Send email"
                >
                  <span>Email</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/adeleke-aladenusi-1a1350337/"
                  className="social-link"
                  title="LinkedIn"
                  aria-label="Visit LinkedIn profile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>in</span>
                </a>
                <a
                  href="https://github.com/AdelekeAP"
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
          <p>© 2026 Paul Adeleke Aladenusi. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
