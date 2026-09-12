import Image from "next/image";
import type { Project } from "@/types";
import { TechTag } from "@/components/TechTag";
import { CloseIcon, GithubIcon, GlobeIcon, PlayIcon } from "@/components/icons";

export function ProjectDetailModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <div className="project-modal-overlay" onClick={onClose} role="presentation">
      <div
        className="project-detail-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} details`}
      >
        <button type="button" className="project-detail-close" aria-label="Close details" onClick={onClose}>
          <CloseIcon />
        </button>

        {project.image && (
          <div className="project-detail-image">
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              sizes="(max-width: 640px) 100vw, 640px"
              style={{ objectFit: project.imageFit ?? "cover", objectPosition: "top" }}
            />
          </div>
        )}

        <div className="project-detail-body">
          <h3 className="project-detail-title">{project.title}</h3>
          <p className="project-detail-description">{project.description}</p>

          <div className="tech-stack">
            {project.techStack.map((t) => (
              <TechTag key={t} label={t} />
            ))}
          </div>

          <div className="project-links">
            {project.videoUrl && (
              <a href={project.videoUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                <PlayIcon />
                {project.videoLabel ?? "Watch Demo"}
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

          {project.note && <p className="project-note">{project.note}</p>}
        </div>
      </div>
    </div>
  );
}
