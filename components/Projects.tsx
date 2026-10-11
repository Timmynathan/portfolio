"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectDetailModal } from "@/components/ProjectDetailModal";
import { StarIcon } from "@/components/icons";
import type { Project, ProjectsContent } from "@/types";

const ALL = "All";

export function Projects({ content }: { content: ProjectsContent }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState(ALL);

  // `featured` drives the wide card layout, so it's set here from featuredId rather than trusted from the data.
  const byId = new Map<string, Project>(
    content.items.map((p) => [p.id, { ...p, featured: p.id === content.featuredId }])
  );
  const featured = content.featuredId ? byId.get(content.featuredId) : undefined;
  // An id with no matching project (e.g. deleted in the admin console) is skipped.
  const categories = content.categories
    .map((category) => ({
      ...category,
      projects: category.projectIds.map((id) => byId.get(id)).filter((p): p is Project => Boolean(p)),
    }))
    .filter((category) => category.projects.length > 0);

  const filters = [
    { label: ALL, count: categories.reduce((n, c) => n + c.projects.length, 0) },
    ...categories.map((c) => ({ label: c.title, count: c.projects.length })),
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="fade-in">
          <div className="section-heading">
            <span className="section-tag" aria-hidden="true"><StarIcon /></span>
            <h2 className="section-title">Featured Projects</h2>
          </div>

          {featured && <ProjectCard project={featured} onOpenDetails={setSelectedProject} />}

          <div className="project-filters">
            <span className="project-filters-label" id="project-filters-label">Filter by category</span>
            <div className="project-filters-tabs" role="group" aria-labelledby="project-filters-label">
              {filters.map(({ label, count }) => (
                <button
                  key={label}
                  type="button"
                  className="project-filter"
                  aria-pressed={activeFilter === label}
                  onClick={() => setActiveFilter(label)}
                >
                  {label}
                  <span className="project-filter-count">{count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {categories.map((category) => (
          // Hidden rather than unmounted, so FadeInObserver (which only observes elements present
          // on first render) still reveals a category the first time it's shown.
          // Heading and grid share one fade-in wrapper so the heading never appears without its cards.
          <div
            key={category.title}
            className="project-category fade-in"
            hidden={activeFilter !== ALL && activeFilter !== category.title}
          >
            <div className="project-category-heading">
              <h3 className="project-category-title">{category.title}</h3>
              <p className="project-category-subtitle">{category.subtitle}</p>
            </div>

            <div className="projects-grid">
              {category.projects.map((project) => (
                <ProjectCard key={project.id} project={project} onOpenDetails={setSelectedProject} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}
