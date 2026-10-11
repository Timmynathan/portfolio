import type { SiteSettings } from "@/types";
import { GITHUB_USER } from "@/lib/github";
import { GithubIcon, LinkedinIcon, MailIcon } from "@/components/icons";

// Set by Vercel at build time; absent in local builds, where the hash is simply not shown.
const COMMIT_SHA = process.env.VERCEL_GIT_COMMIT_SHA;

export function Footer({ site }: { site: SiteSettings }) {
  return (
    <footer>
      <div className="container">
        <div className="footer-bar">
          <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>

          <div className="footer-meta">
            {COMMIT_SHA && (
              <a
                href={`https://github.com/${GITHUB_USER}/portfolio/commit/${COMMIT_SHA}`}
                className="footer-commit"
                target="_blank"
                rel="noopener noreferrer"
                title="The commit this site was built from"
              >
                {COMMIT_SHA.slice(0, 7)}
              </a>
            )}
            <div className="footer-socials">
              <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" title="GitHub">
                <GithubIcon />
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                title="LinkedIn"
              >
                <LinkedinIcon />
              </a>
              <a href={`mailto:${site.email}`} aria-label="Send email" title="Email">
                <MailIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
