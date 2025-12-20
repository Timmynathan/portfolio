import Image from "next/image";
import Link from "next/link";
import styles from "./ProjectDetails.module.css";

export default function ShiftManagementProject() {
  return (
    <section className={styles.projectPage}>
      {/* Back Button */}
      <Link href="/#projects" className={styles.backLink}>
        ← Back to Projects
      </Link>

      {/* Header */}
      <header className={styles.header}>
        <span className={styles.sectionLabel}>Project Details</span>
        <h1>Shift Management System</h1>
        <p>
          A biometric-integrated attendance and shift management system designed
          for universities and healthcare institutions to improve efficiency,
          accountability, and operational transparency.
        </p>
      </header>

      {/* Overview */}
      <section className={styles.section}>
        <h2>Overview</h2>
        <p>
          This project was developed to replace manual and fragmented staff
          scheduling systems with a centralized, automated solution. It enables
          administrators to manage shifts, track attendance, and handle
          approvals efficiently while reducing errors and time wastage.
        </p>
      </section>

      {/* Problem */}
      <section className={styles.sectionAlt}>
        <h2>Problem Statement</h2>
        <p>
          Many institutions rely on manual attendance registers or disconnected
          systems that are prone to errors, manipulation, and inefficiencies.
          These methods make auditing difficult and slow down operational
          workflows, especially in large organizations.
        </p>
      </section>

      {/* Features */}
      <section className={styles.section}>
        <h2>Key Features</h2>
        <ul className={styles.list}>
          <li>Biometric-based staff attendance tracking</li>
          <li>CSV roster upload with automatic shift assignment</li>
          <li>Supervisor review and approval workflows</li>
          <li>Detection of attendance anomalies</li>
          <li>Automated email notifications</li>
        </ul>
      </section>

      {/* Screenshots */}
      <section className={styles.section}>
        <h2>Screenshots</h2>
        <div className={styles.imageGrid}>
          <Image
            src="/projects/project-1.png"
            alt="Shift management system dashboard"
            width={1600}
            height={400}
            priority
          />
        </div>

        <div className={styles.imageGrid}>
          <Image
            src="/projects/project-1b.png"
            alt="Shift management system dashboard"
            width={1600}
            height={400}
            priority
          />
        </div>

      </section>

      {/* Tech Stack */}
      <section className={styles.sectionAlt}>
        <h2>Technologies Used</h2>
        <ul className={styles.techList}>
          <li>Java (Swing)</li>
          <li>MySQL</li>
          <li>NetBeans</li>
          <li>JavaMail API</li>
        </ul>
      </section>

      {/* What You Learned */}
      <section className={styles.section}>
        <h2>What I Learned</h2>
        <p>
          Working on this project strengthened my ability to design real-world
          systems that handle structured workflows and approvals. I gained
          deeper insight into database design, desktop application development,
          and building solutions that prioritize reliability, usability, and
          maintainability.
        </p>
      </section>
    </section>
  );
}