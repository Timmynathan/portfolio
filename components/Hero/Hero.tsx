import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <span className={styles.introText}>
          Hi there, I’m Oluwatimilehin
        </span>

        <h1>Software Developer</h1>

        <p>
          I build clean, modern web and mobile applications that are easy to use and solve real-world problems. 
          I enjoy turning ideas into reliable digital solutions and continuously improving how people interact with technology.
        </p>

        <div className={styles.heroButtons}>
          <a href="#projects" className={styles.primaryBtn}>
            See My Work
          </a>
          <a href="#contact" className={styles.secondaryBtn}>
            Contact Me
          </a>
        </div>
      </div>

      <div className={styles.heroImage}>
        <Image
        src="/hero-image.png"
        alt="Oluwatimilehin portrait"
        width={460}
        height={460}
        priority
      />
      </div>
    </section>
  );
}