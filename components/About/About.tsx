import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.aboutContainer}>
        <span className={styles.sectionLabel}>About Me</span>
        <h2>Who I Am</h2>

        <p>
          I’m a final-year Computer Science student and passionate software
          developer with over two years of experience building practical digital
          solutions. I enjoy creating applications that are reliable, easy to
          use, and genuinely helpful.
        </p>

        <p>
          I have experience working with modern web and mobile technologies and
          enjoy collaborating on projects that improve performance, user
          experience, and overall product quality. I’m currently pursuing a
          B.Sc. in Computer Science at Pan-Atlantic University and I’m motivated
          by learning, teamwork, and building meaningful software.
        </p>
      </div>
    </section>
  );
}