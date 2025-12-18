import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" className={styles.aboutSection}>
      <h2>About Me</h2>
      <p>
        I’m a final-year Computer Science student and passionate software engineer with over two years of experience in full-stack development, cloud infrastructure, and system optimization. I enjoy building secure, scalable web and mobile applications that solve real-world problems and deliver practical value.
      </p>
      <p>
        I’m proficient in technologies such as Node.js, React, and React Native, and I have a strong track record of designing solutions that improve performance, enhance user engagement, and support business growth. Currently pursuing a B.Sc. in Computer Science at Pan-Atlantic University, I am eager to contribute to high-impact projects through innovation, teamwork, and technical excellence.
      </p>
    </section>
  );
}