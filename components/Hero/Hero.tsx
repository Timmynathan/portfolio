import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.text}>
        <span className={styles.intro}>
          Hi there, I’m Oluwatimilehin
        </span>

        <h1>
          Software <br /> Developer
        </h1>

        <p>
          I design and build simple, reliable digital experiences that solve
          real problems and feel intuitive to use.
        </p>

        <div className={styles.actions}>
          <a href="#projects" className={styles.ctaPrimary}>
            See my work
          </a>

          <a href="#contact" className={styles.ctaSecondary}>
            Contact me
          </a>
        </div>
      </div>

      <div className={styles.imageWrapper}>
        <Image
          src="/hero-image.jpg"
          alt="Oluwatimilehin portrait"
          width={320}
          height={320}
          priority
          className={styles.image}
        />
      </div>
    </section>
  );
}