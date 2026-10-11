import Image from "next/image";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FadeInObserver } from "@/components/FadeInObserver";
import { AboutGallery } from "@/components/AboutGallery";
import { getContent } from "@/lib/content";
import { ArrowLeftIcon, CameraIcon, GithubIcon, LinkedinIcon, MailIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "About | Ilesanmi Oluwatimilehin",
  description: "A bit more about Nathaniel — background, focus, and a few photos.",
};

export default async function AboutPage() {
  const { site, about_photos: photos } = await getContent();

  return (
    <>
      <Navbar />
      <main>
        <section className="about-hero">
          <div className="container about-hero-inner fade-in">
            <a href="/" className="back-link">
              <ArrowLeftIcon />
              Back to home
            </a>

            <h1 className="about-title">About Me</h1>

            <div className="about-hero-grid">
              <div className="about-photo">
                <Image
                  src="/images/profile_photo.png"
                  alt={site.legalName}
                  fill
                  sizes="(max-width: 700px) 200px, 240px"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center top",
                    transform: "scale(1.15)",
                    transformOrigin: "center top",
                  }}
                />
              </div>

              <div className="about-hero-text">

                {site.aboutBio.map((paragraph, i) => (
                  <p key={i} className="about-bio">
                    {paragraph}
                  </p>
                ))}

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
              </div>
            </div>
          </div>
        </section>

        {photos.length > 0 && (
          <section className="about-gallery-section">
            <div className="container fade-in">
              <div className="section-heading">
                <span className="section-tag" aria-hidden="true"><CameraIcon /></span>
                <h2 className="section-title">A Few Snapshots</h2>
              </div>
              <AboutGallery photos={photos} />
            </div>
          </section>
        )}
      </main>
      <Footer site={site} />
      <FadeInObserver />
    </>
  );
}
