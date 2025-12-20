import Image from "next/image";
import Link from "next/link";
import styles from "./Projects.module.css";

export default function Projects() {
  return (
    <section id="projects" className={styles.projectsSection}>
      <h2>Projects</h2>

      <div className={styles.projectsGrid}>
        {/* Project 1 */}
        <div className={styles.projectCard}>
          <Image
            src="/projects/project-1.png"
            alt="Shift Management System dashboard"
            width={1200}
            height={675}
            className={styles.projectImage}
            priority
          />

          <div className={styles.projectContent}>
            <h3>Shift Management System</h3>

            <p>
              A biometric-integrated attendance and shift management system
              designed for universities and healthcare environments, automating
              roster uploads, staff attendance, and approval workflows.
            </p>

            <p className={styles.projectTech}>
              <strong>Tech Stack:</strong> Java Swing, MySQL, NetBeans, JavaMail API
            </p>

            <Link
              href="/projects/shift-management"
              className={styles.projectLink}
            >
              View Details
            </Link>
          </div>
        </div>

        {/* Project 2 */}
        <div className={styles.projectCard}>
          <Image
            src="/projects/project-2.png"
            alt="Tooth Fixers clinic management dashboard"
            width={1200}
            height={675}
            className={styles.projectImage}
          />

          <div className={styles.projectContent}>
            <h3>Tooth Fixers</h3>

            <p>
              A web-based clinic and patient management system that streamlines
              appointment scheduling, patient records, staff roles, and secure
              notifications for dental practices.
            </p>

            <p className={styles.projectTech}>
              <strong>Tech Stack:</strong> Node.js, PostgreSQL, React
            </p>

            <Link href="/projects/todo-app" className={styles.projectLink}>
              View Details
            </Link>
          </div>
        </div>

        {/* Project 3 */}
        <div className={styles.projectCard}>
          <Image
            src="/projects/project-3.png"
            alt="BetaBiz financial dashboard"
            width={1200}
            height={675}
            className={styles.projectImage}
          />

          <div className={styles.projectContent}>
            <h3>BetaBiz</h3>

            <p>
              A mobile-first AI-powered financial assistant that helps small
              business owners track cash flow, analyze performance, and
              understand business health in real time.
            </p>

            <p className={styles.projectTech}>
              <strong>Tech Stack:</strong> React Native, Node.js, Azure
            </p>

            <Link href="/projects/todo-app" className={styles.projectLink}>
              View Details
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}