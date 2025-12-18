import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <h1>Ilesanmi Oluwatimilehin.</h1>
      <nav className={styles.navLinks}>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}