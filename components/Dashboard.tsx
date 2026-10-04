import Image from "next/image";
import { GITHUB_USER, getLanguageShares, getRecentCommits } from "@/lib/github";
import { ThemeCard } from "@/components/ThemeCard";
import { LocalClock } from "@/components/LocalClock";
import { ClickCounter } from "@/components/ClickCounter";
import {
  ActivityIcon,
  ArrowUpRightIcon,
  CodeIcon,
  LinkedinIcon,
  MailIcon,
  MessageIcon,
  PaletteIcon,
  PinIcon,
  PointerIcon,
} from "@/components/icons";

const GITHUB_URL = `https://github.com/${GITHUB_USER}`;

function formatPercent(percent: number) {
  return percent < 1 ? "<1%" : `${Math.round(percent)}%`;
}

export async function Dashboard() {
  const [commits, languages] = await Promise.all([getRecentCommits(), getLanguageShares()]);

  return (
    <section id="contact" className="dashboard">
      <div className="container">
        <div className="dash-grid fade-in">
          <div className="dash-card">
            <h3 className="dash-title"><PaletteIcon />Theme</h3>
            <ThemeCard />
          </div>

          <div className="dash-card">
            <h3 className="dash-title"><MessageIcon />Let&apos;s Connect</h3>
            <p className="dash-text">Always open to new opportunities, interesting projects and conversations.</p>
            <div className="dash-actions">
              <a href="mailto:oluwatimilehin.nathan@gmail.com" className="dash-button dash-button-filled">
                <MailIcon />
                Email me
              </a>
              <a
                href="https://www.linkedin.com/in/oluwatimilehin-ilesanmi/"
                className="dash-button"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedinIcon />
                LinkedIn
              </a>
            </div>
          </div>

          <div className="dash-card">
            <h3 className="dash-title"><PinIcon />Currently Based In</h3>
            <div className="dash-map">
              <Image
                src="/images/lagos-map.png"
                alt="Map of Lagos"
                fill
                sizes="(max-width: 560px) 100vw, 260px"
                style={{ objectFit: "cover", objectPosition: "60% 45%" }}
              />
              <a
                className="dash-map-credit"
                href="https://www.openstreetmap.org/copyright"
                target="_blank"
                rel="noopener noreferrer"
              >
                © OpenStreetMap
              </a>
            </div>
            <div className="dash-location">
              <span>Lagos, Nigeria</span>
              <LocalClock timeZone="Africa/Lagos" />
            </div>
          </div>

          <div className="dash-card">
            <h3 className="dash-title"><PointerIcon />Click Counter</h3>
            <ClickCounter />
          </div>

          <div className="dash-card dash-card-wide">
            <h3 className="dash-title"><ActivityIcon />Recent Commits</h3>
            {commits.length > 0 ? (
              <ul className="commit-list">
                {commits.map((commit) => (
                  <li key={commit.sha} className="commit-row">
                    <a href={commit.url} target="_blank" rel="noopener noreferrer" className="commit-message">
                      <span className="commit-repo">{commit.repo}:</span> {commit.message}
                    </a>
                    {commit.additions !== null && commit.deletions !== null && (
                      <span className="commit-stats">
                        <span className="commit-additions">+{commit.additions}</span>
                        {" / "}
                        <span className="commit-deletions">-{commit.deletions}</span>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="dash-text">Recent commits couldn&apos;t be loaded right now.</p>
            )}
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="dash-link">
              View on GitHub <ArrowUpRightIcon />
            </a>
          </div>

          <div className="dash-card dash-card-wide">
            <h3 className="dash-title"><CodeIcon />Languages</h3>
            {languages.length > 0 ? (
              <>
                <p className="dash-text">Average language mix across my public GitHub repositories.</p>
                <div className="lang-bar" aria-hidden="true">
                  {languages.map((language, i) => (
                    <span
                      key={language.name}
                      className="lang-segment"
                      data-slot={language.name === "Other" ? "other" : i + 1}
                      style={{ flexGrow: language.percent }}
                      title={`${language.name} ${formatPercent(language.percent)}`}
                    />
                  ))}
                </div>
                <ul className="lang-legend">
                  {languages.map((language, i) => (
                    <li key={language.name} className="lang-item">
                      <span className="lang-dot" data-slot={language.name === "Other" ? "other" : i + 1} />
                      {language.name}
                      <span className="lang-percent">{formatPercent(language.percent)}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="dash-text">Language stats couldn&apos;t be loaded right now.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
