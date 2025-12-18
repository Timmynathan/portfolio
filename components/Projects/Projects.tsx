import Link from "next/link";
import styles from "./Projects.module.css";

export default function Projects() {
  return (
    <section id="projects" className={styles.projectsSection}>
      <h2>Projects</h2>

      <div className={styles.projectsGrid}>
        {/* Project 1 */}
        <div className={styles.projectCard}>
          <h3>Shift Management (SystemBiometric-Integrated Roster App)</h3>
          <p>
            A full-stack attendance and shift management system designed for universities and healthcare environments. The system automates roster management, staff attendance tracking, anomaly detection, and approval workflows, improving operational efficiency and accountability.
          </p>
          <p>
            <strong>Tech Stack:</strong> (Java Swing), MySQL, NetBeans, JavaMail API
          </p>
          <Link className={styles.projectLink} href="/projects/portfolio-website">
            View Details
          </Link>
        </div>

        {/* Project 2 */}
        <div className={styles.projectCard}>
          <h3>Tooth Fixers - Clinic-Patient Management System</h3>
          <p>
            A web-based application built to streamline dental clinic operations, including appointment scheduling, patient record management, staff roles, and automated notifications, ensuring a smooth and secure clinic workflow.
          </p>
          <p>
            <strong>Tech Stack:</strong> Node.js, PostgreSQL (pgAdmin), React
          </p>
          <Link className={styles.projectLink} href="/projects/todo-app">
            View Details
          </Link>
        </div>

        {/* Project 3 */}
        <div className={styles.projectCard}>
          <h3>BetaBiz – AI-Powered MSME Financial Assistant</h3>
          <p>
            A mobile-first prototype that empowers micro and small business owners with AI-driven financial insights such as cash flow tracking, profit/loss analysis, and real-time business health scoring. Built during the Payaza Fintech Hackathon and aligned with SDG 10 (Reduced Inequality).
          </p>
          <p>
            <strong>Tech Stack:</strong> React Native, Node.js, Azure
          </p>
          <Link className={styles.projectLink} href="/projects/todo-app">
            View Details
          </Link>
        </div>
      </div>
    </section>
  );
}