import Image from "next/image";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FadeInObserver } from "@/components/FadeInObserver";
import { ABOUT_PHOTOS } from "@/data/about-photos";
import { ArrowLeftIcon, GithubIcon, LinkedinIcon, MailIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "About | Ilesanmi Oluwatimilehin",
  description: "A bit more about Nathaniel — background, focus, and a few photos.",
};

export default function AboutPage() {
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
                  alt="Ilesanmi Oluwatimilehin Nathaniel"
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

                <p className="about-bio">
                  I&apos;m Nathaniel, but most of my friends call me Timmy (a shorter version of my name,
                  Oluwatimilehin) :) I&apos;m a software engineer with 2+ years of experience building
                  production-ready applications. My work spans deep learning and computer vision (CNNs,
                  DenseNet, TensorFlow), full-stack web and mobile development, and I&apos;m currently
                  focused on building AI agents that take over the repetitive work businesses run on.
                </p>
                <p className="about-bio">
                  I&apos;ve shipped products across healthcare, HR, and e-commerce. I care about building
                  technology that has a real, tangible impact in Africa.
                </p>
                <p className="about-bio">
                  Outside of work, I&apos;m usually on a basketball court, spending time with my dog or in
                  nature, or catching up on what&apos;s happening in fintech. There are a few snapshots
                  below!
                </p>

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
              </div>
            </div>
          </div>
        </section>

        {ABOUT_PHOTOS.length > 0 && (
          <section className="about-gallery-section">
            <div className="container fade-in">
              <h2 className="section-title">A Few Snapshots</h2>
              <div className="about-gallery">
                {ABOUT_PHOTOS.map((photo) => (
                  <div key={photo.src} className="about-gallery-item">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 900px) 33vw, 25vw"
                      style={{ objectFit: "cover", objectPosition: photo.position ?? "center" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <FadeInObserver />
    </>
  );
}
