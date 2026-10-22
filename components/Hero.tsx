import Image from "next/image";
import type { SiteSettings } from "@/types";
import { RichText } from "./RichText";
import { DownloadFileIcon, GithubIcon, LinkedinIcon, MailIcon } from "./icons";

export function Hero({ site }: { site: SiteSettings }) {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content fade-in">
          <div className="hero-text">
            <h1 className="hero-name">
              Hey! I&apos;m <span className="hero-name-accent">{site.name}</span>
            </h1>
            <p className="hero-role">{site.role}</p>
            <p className="hero-description">
              <span className="hero-description-line"><RichText text={site.taglineLine1} /></span>
              <br />
              <RichText text={site.taglineLine2} />
            </p>
            {site.availability && <p className="hero-availability">{site.availability}</p>}
            <div className="hero-actions">
              <a href="/resume.pdf" download className="hero-resume magnetic">
                <span>Resume</span>
                <DownloadFileIcon />
              </a>
              <div className="hero-socials">
                <a
                  href={site.linkedin}
                  className="hero-social"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  title="LinkedIn"
                >
                  <LinkedinIcon />
                </a>
                <a
                  href={site.github}
                  className="hero-social"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  title="GitHub"
                >
                  <GithubIcon />
                </a>
                <a
                  href={`mailto:${site.email}`}
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
              alt={site.name}
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
