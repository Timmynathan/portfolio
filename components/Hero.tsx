import Image from "next/image";

export function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content fade-in">
          <div className="hero-photo">
            <Image
              src="/images/profile_photo.png"
              alt="Ilesanmi Oluwatimilehin Nathaniel"
              fill
              sizes="130px"
              priority
              className="hero-photo-img"
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
          </div>
          <p className="hero-greeting">
            Hi There! <span className="hero-wave">👋</span>
          </p>
          <h1 className="hero-name">
            I&apos;m <span className="hero-name-accent">Ilesanmi Oluwatimilehin</span>
          </h1>
          <p className="hero-role">Full Stack Developer</p>
          <p className="hero-description">
            I&apos;m Ilesanmi Oluwatimilehin, an AI Engineer and Full-Stack Developer with 4+ years of experience
            building production-ready applications. My work spans deep learning and computer vision (CNNs,
            DenseNet, TensorFlow), alongside full-stack web and mobile development. I&apos;ve shipped products
            across healthcare, HR, and e-commerce — from an AI tuberculosis-detection tool for clinics in
            sub-Saharan Africa to HR platforms used by 30+ companies — and I&apos;m passionate about building
            technology for real social impact in Africa.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="cta-button magnetic">
              View My Work
            </a>
            <a
              href="mailto:ilesanmitimilehin19@gmail.com?subject=Resume Request&body=Hi Oluwatimilehin, I'd like to request your resume. Thanks!"
              className="cta-button cta-button-outline magnetic"
            >
              Request Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
