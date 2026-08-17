"use client";

import { useState } from "react";
import { PROJECTS } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { VideoModal } from "@/components/VideoModal";

export function Projects() {
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="fade-in">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Showcasing solutions that balance engineering excellence with intuitive user experience
          </p>

          <div className="projects-grid">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} onOpenVideo={setSelectedVideoUrl} />
            ))}
          </div>
        </div>
      </div>

      {selectedVideoUrl && (
        <VideoModal videoUrl={selectedVideoUrl} onClose={() => setSelectedVideoUrl(null)} />
      )}
    </section>
  );
}
