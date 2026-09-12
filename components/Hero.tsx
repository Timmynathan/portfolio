import Image from "next/image";
import { DownloadFileIcon, GithubIcon, LinkedinIcon, MailIcon } from "./icons";

export function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content fade-in">
          <div className="hero-text">
            <h1 className="hero-name">
              Hey! I&apos;m <span className="hero-name-accent">Nathaniel Ilesanmi</span>
            </h1>
            <p className="hero-role">Software Engineer</p>
            <p className="hero-description">
              <span className="hero-description-line">
                I build software that solves people&apos;s pain points end-to-end.
              </span>
              <br />
              Currently building AI agents that take over the repetitive work businesses run on.
            </p>
            <div className="hero-actions">
              <a href="/resume.pdf" download className="hero-resume magnetic">
                <span>Resume</span>
                <DownloadFileIcon />
              </a>
              <div className="hero-socials">
                <a
                  href="https://www.linkedin.com/in/oluwatimilehin-ilesanmi/"
                  className="hero-social"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  title="LinkedIn"
                >
                  <LinkedinIcon />
                </a>
                <a
                  href="https://github.com/Timmynathan"
                  className="hero-social"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  title="GitHub"
                >
                  <GithubIcon />
                </a>
                <a
                  href="mailto:oluwatimilehin.nathan@gmail.com"
                  className="hero-social"
                  aria-label="Send email"
                  title="Email"
                >
                  <MailIcon />
                </a>
              </div>
              <a href="/about" className="hero-more-link">
                More about me <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="hero-photo">
            <Image
              src="/images/profile_photo.png"
              alt="Nathaniel"
              fill
              sizes="180px"
              priority
              className="hero-photo-img"
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
