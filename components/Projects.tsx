"use client";

import { useState } from "react";
import { PROJECTS } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectDetailModal } from "@/components/ProjectDetailModal";
import type { Project } from "@/types";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="fade-in">
          <h2 className="section-title">Featured Projects</h2>

          <div className="projects-grid">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} onOpenDetails={setSelectedProject} />
            ))}
          </div>
        </div>
      </div>

      {selectedProject && (
        <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}
