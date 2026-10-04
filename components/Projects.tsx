"use client";

import { useState } from "react";
import { FEATURED_PROJECT_ID, PROJECTS, PROJECT_CATEGORIES } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectDetailModal } from "@/components/ProjectDetailModal";
import { StarIcon } from "@/components/icons";
import type { Project } from "@/types";

const PROJECTS_BY_ID = new Map(PROJECTS.map((p) => [p.id, p]));

function getProject(id: string): Project {
  const project = PROJECTS_BY_ID.get(id);
  if (!project) throw new Error(`Unknown project id "${id}" in data/projects.ts`);
  return project;
}

const ALL = "All";
const TOTAL_COUNT = PROJECT_CATEGORIES.reduce((n, c) => n + c.projectIds.length, 0);
const FILTERS = [
  { label: ALL, count: TOTAL_COUNT },
  ...PROJECT_CATEGORIES.map((c) => ({ label: c.title, count: c.projectIds.length })),
];

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState(ALL);

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="fade-in">
          <div className="section-heading">
            <span className="section-tag" aria-hidden="true"><StarIcon /></span>
            <h2 className="section-title">Featured Projects</h2>
          </div>

          <ProjectCard project={getProject(FEATURED_PROJECT_ID)} onOpenDetails={setSelectedProject} />

          <div className="project-filters">
            <span className="project-filters-label" id="project-filters-label">Filter by category</span>
            <div className="project-filters-tabs" role="group" aria-labelledby="project-filters-label">
              {FILTERS.map(({ label, count }) => (
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

        {PROJECT_CATEGORIES.map((category) => (
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
              {category.projectIds.map((id) => (
                <ProjectCard key={id} project={getProject(id)} onOpenDetails={setSelectedProject} />
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
