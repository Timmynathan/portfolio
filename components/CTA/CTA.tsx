import styles from "./CTA.module.css";

export default function CTA() {
  return (
    <section id="contact" className={styles.ctaSection}>
      <div className={styles.ctaContainer}>
        <span className={styles.ctaLabel}>Let’s Connect</span>

        <h2>Get In Touch</h2>

        <p>
          I’m open to opportunities, collaborations, and learning experiences.
          Whether you have a project in mind or just want to connect, feel free
          to reach out.
        </p>

        <div className={styles.ctaButtons}>
          <a
            href="https://mail.google.com/mail/?view=cm&to=oluwatimilehin.ilesanmi@pau.edu.ng"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.primaryBtn}
          >
            Email Me
          </a>

          <a
            href="https://wa.me/2348132265016"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryBtn}
          >
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}