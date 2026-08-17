import type { Project } from "@/types";
import { STACK_ICONS } from "@/data/stack-icons";
import { TechTag } from "@/components/TechTag";
import { GithubIcon, GlobeIcon } from "@/components/icons";

export function ProjectCard({
  project,
  onOpenVideo,
}: {
  project: Project;
  onOpenVideo: (videoUrl: string) => void;
}) {
  const stack = project.mainStack ? STACK_ICONS[project.mainStack] : undefined;

  return (
    <article
      className={[
        "project-card",
        project.featured ? "project-card-featured" : "",
        project.secondary ? "project-card-secondary" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="project-content">
        {stack && (
          <div className="project-stack-icon" style={{ color: stack.color }} title={stack.label}>
            <stack.Icon />
          </div>
        )}
        {project.badge && (
          <div className={["project-badge", project.secondary ? "project-badge-secondary" : ""].filter(Boolean).join(" ")}>
            {project.badge}
          </div>
        )}
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <div className="tech-stack">
          {project.techStack.map((t) => (
            <TechTag key={t} label={t} />
          ))}
        </div>
        <div className="project-links">
          {project.videoUrl && (
            <button
              type="button"
              className="project-link project-link-button"
              onClick={() => onOpenVideo(project.videoUrl!)}
            >
              <GlobeIcon />
              {project.linkLabel}
            </button>
          )}
          {project.href && (
            <a href={project.href} target="_blank" rel="noopener noreferrer" className="project-link">
              <GlobeIcon />
              {project.linkLabel}
            </a>
          )}
          {project.repos?.map((repo) => (
            <a key={repo.href} href={repo.href} target="_blank" rel="noopener noreferrer" className="project-link">
              <GithubIcon />
              {repo.label}
            </a>
          ))}
        </div>
        {project.note && <p className="project-note">{project.note}</p>}
      </div>
    </article>
  );
}
