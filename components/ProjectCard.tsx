import Image from "next/image";
import type { Project } from "@/types";
import { TechTag } from "@/components/TechTag";
import { GithubIcon, GlobeIcon, PlayIcon } from "@/components/icons";

export function ProjectCard({
  project,
  onOpenDetails,
}: {
  project: Project;
  onOpenDetails: (project: Project) => void;
}) {
  return (
    <article
      className={[
        "project-card",
        project.featured ? "project-card-featured" : "",
        project.secondary ? "project-card-secondary" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={() => onOpenDetails(project)}
    >
      {project.image && (
        <div className="project-image">
          <div className="project-image-frame">
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              sizes="(max-width: 640px) 45vw, 350px"
              style={{ objectFit: project.imageFit ?? "cover" }}
            />
          </div>
        </div>
      )}
      <div className="project-content">
        {project.badge && (
          <div className={["project-badge", project.secondary ? "project-badge-secondary" : ""].filter(Boolean).join(" ")}>
            {project.badge}
          </div>
        )}
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.shortDescription ?? project.description}</p>
        <div className="tech-stack">
          {project.techStack.map((t) => (
            <TechTag key={t} label={t} />
          ))}
        </div>
        <div className="project-links" onClick={(e) => e.stopPropagation()}>
          {project.videoUrl && (
            <a href={project.videoUrl} target="_blank" rel="noopener noreferrer" className="project-link">
              <PlayIcon />
              {project.linkLabel}
            </a>
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
      </div>
    </article>
  );
}
