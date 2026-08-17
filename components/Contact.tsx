export function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="fade-in">
          <p className="contact-message">
            Let&apos;s connect — I&apos;m always open to new opportunities and collaborations.
          </p>
          <div className="social-links">
            <a href="mailto:oluwatimilehin.nathan@gmail.com" className="social-link" title="Email" aria-label="Send email">
              <span>Email</span>
            </a>
            <a
              href="https://www.linkedin.com/in/oluwatimilehin-ilesanmi/"
              className="social-link"
              title="LinkedIn"
              aria-label="Visit LinkedIn profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>in</span>
            </a>
            <a
              href="https://github.com/Timmynathan"
              className="social-link"
              title="GitHub"
              aria-label="Visit GitHub profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
