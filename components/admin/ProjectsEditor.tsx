"use client";

import { useState } from "react";
import type { Project, ProjectDescriptionSection, ProjectsContent } from "@/types";
import {
  Checkbox,
  CommaListInput,
  Field,
  RowControls,
  TextArea,
  TextInput,
  moveItem,
  newId,
  removeAt,
  replaceAt,
} from "@/components/admin/fields";
import { ImageUpload, measureImage } from "@/components/admin/ImageUpload";

// Where a project appears: the featured block, one of the categories (by index), or nowhere.
const FEATURED = "featured";
const HIDDEN = "hidden";

function placementOf(content: ProjectsContent, id: string): string {
  if (content.featuredId === id) return FEATURED;
  const index = content.categories.findIndex((category) => category.projectIds.includes(id));
  return index >= 0 ? String(index) : HIDDEN;
}

/** Moves a project to the featured slot, a category, or hidden — removing it from wherever it was. */
function withPlacement(content: ProjectsContent, id: string, placement: string): ProjectsContent {
  const categories = content.categories.map((category) => ({
    ...category,
    projectIds: category.projectIds.filter((projectId) => projectId !== id),
  }));
  let featuredId = content.featuredId === id ? null : content.featuredId;

  if (placement === FEATURED) featuredId = id;
  else if (placement !== HIDDEN) {
    const index = Number(placement);
    categories[index] = { ...categories[index], projectIds: [...categories[index].projectIds, id] };
  }
  return { ...content, categories, featuredId };
}

// The description is stored as plain text, or as headed sections for a longer write-up.
function toSections(description: Project["description"]): ProjectDescriptionSection[] {
  return Array.isArray(description) ? description : [{ heading: "", body: description }];
}

function fromSections(sections: ProjectDescriptionSection[]): Project["description"] {
  if (sections.length === 0) return "";
  if (sections.length === 1 && !sections[0].heading.trim()) return sections[0].body;
  return sections;
}

/** Sets a field, or removes it entirely when the value is empty, so optional fields stay absent. */
function withOptional<K extends keyof Project>(project: Project, key: K, value: Project[K] | "" | undefined): Project {
  const next = { ...project };
  if (value === "" || value === undefined) delete next[key];
  else next[key] = value as Project[K];
  return next;
}

export function ProjectsEditor({ value, onChange }: { value: ProjectsContent; onChange: (value: ProjectsContent) => void }) {
  const [selectedId, setSelectedId] = useState<string | null>(value.items[0]?.id ?? null);
  const byId = new Map(value.items.map((project) => [project.id, project]));
  const selected = selectedId ? byId.get(selectedId) : undefined;

  const placed = new Set(value.categories.flatMap((category) => category.projectIds));
  const hidden = value.items.filter((project) => project.id !== value.featuredId && !placed.has(project.id));
  const featured = value.featuredId ? byId.get(value.featuredId) : undefined;

  const updateProject = (project: Project) =>
    onChange({ ...value, items: value.items.map((item) => (item.id === project.id ? project : item)) });

  const deleteProject = (id: string) => {
    onChange({ ...withPlacement(value, id, HIDDEN), items: value.items.filter((item) => item.id !== id) });
    if (selectedId === id) setSelectedId(null);
  };

  const addProject = () => {
    const project: Project = { id: newId("project"), title: "", description: "", techStack: [], linkLabel: "Website" };
    const withItem = { ...value, items: [...value.items, project] };
    // New projects go into the first category so they're visible straight away.
    onChange(value.categories.length > 0 ? withPlacement(withItem, project.id, "0") : withItem);
    setSelectedId(project.id);
  };

  const listRow = (project: Project, controls?: React.ReactNode) => (
    <div key={project.id} className={project.id === selectedId ? "adm-list-row adm-list-row-active" : "adm-list-row"}>
      <button type="button" className="adm-list-select" onClick={() => setSelectedId(project.id)} aria-current={project.id === selectedId}>
        {project.title || "Untitled project"}
      </button>
      {controls ?? (
        <span className="adm-row-controls">
          <button type="button" className="adm-icon-button adm-icon-button-danger" onClick={() => deleteProject(project.id)} aria-label={`Delete ${project.title || "project"}`} title="Delete">
            ✕
          </button>
        </span>
      )}
    </div>
  );

  return (
    <div className="adm-split">
      <div className="adm-list">
        <p className="adm-list-heading">Featured (top of the section)</p>
        {featured ? listRow(featured) : <p className="adm-empty">None</p>}

        {value.categories.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <p className="adm-list-heading">{category.title || "Untitled category"}</p>
            {category.projectIds.map((id, i) => {
              const project = byId.get(id);
              if (!project) return null;
              return listRow(
                project,
                <RowControls
                  index={i}
                  count={category.projectIds.length}
                  itemName={project.title || "project"}
                  onMove={(direction) =>
                    onChange({
                      ...value,
                      categories: replaceAt(value.categories, categoryIndex, {
                        ...category,
                        projectIds: moveItem(category.projectIds, i, direction),
                      }),
                    })
                  }
                  onDelete={() => deleteProject(id)}
                />
              );
            })}
            {category.projectIds.length === 0 && <p className="adm-empty">Empty — not shown on the site</p>}
          </div>
        ))}

        {hidden.length > 0 && (
          <div>
            <p className="adm-list-heading">Hidden (not on the site)</p>
            {hidden.map((project) => listRow(project))}
          </div>
        )}

        <button type="button" className="adm-button" onClick={addProject}>
          + Add project
        </button>

        <CategoriesEditor value={value} onChange={onChange} />
      </div>

      <div className="adm-form">
        {selected ? (
          <ProjectForm
            key={selected.id}
            project={selected}
            placement={placementOf(value, selected.id)}
            categoryTitles={value.categories.map((category) => category.title)}
            onChange={updateProject}
            onPlacementChange={(placement) => onChange(withPlacement(value, selected.id, placement))}
          />
        ) : (
          <p className="adm-empty">Select a project to edit it, or add a new one.</p>
        )}
      </div>
    </div>
  );
}

function CategoriesEditor({ value, onChange }: { value: ProjectsContent; onChange: (value: ProjectsContent) => void }) {
  const setCategories = (categories: ProjectsContent["categories"]) => onChange({ ...value, categories });

  return (
    <details className="adm-details">
      <summary>Edit categories</summary>
      <div className="adm-form-fields">
        {value.categories.map((category, i) => (
          <div key={i} className="adm-card">
            <div className="adm-repeat">
              <TextInput label="Name" value={category.title} onChange={(v) => setCategories(replaceAt(value.categories, i, { ...category, title: v }))} />
              <RowControls
                index={i}
                count={value.categories.length}
                itemName={category.title || "category"}
                onMove={(direction) => setCategories(moveItem(value.categories, i, direction))}
                // Its projects aren't deleted — they move to "Hidden".
                onDelete={() => setCategories(removeAt(value.categories, i))}
              />
            </div>
            <TextInput label="One-line description" value={category.subtitle} onChange={(v) => setCategories(replaceAt(value.categories, i, { ...category, subtitle: v }))} />
          </div>
        ))}
        <button type="button" className="adm-button adm-button-quiet" onClick={() => setCategories([...value.categories, { title: "", subtitle: "", projectIds: [] }])}>
          + Add category
        </button>
        <p className="adm-hint">Deleting a category keeps its projects; they move to “Hidden”.</p>
      </div>
    </details>
  );
}

function ProjectForm({
  project,
  placement,
  categoryTitles,
  onChange,
  onPlacementChange,
}: {
  project: Project;
  placement: string;
  categoryTitles: string[];
  onChange: (project: Project) => void;
  onPlacementChange: (placement: string) => void;
}) {
  const sections = toSections(project.description);
  const setSections = (next: ProjectDescriptionSection[]) => onChange({ ...project, description: fromSections(next) });
  const repos = project.repos ?? [];
  const setRepos = (next: NonNullable<Project["repos"]>) => onChange(withOptional(project, "repos", next.length > 0 ? next : undefined));
  const [imageError, setImageError] = useState<string | null>(null);

  const setFullImage = async (showFull: boolean) => {
    setImageError(null);
    if (!showFull || !project.image) return onChange(withOptional(project, "detailImage", undefined));
    try {
      const size = await measureImage(project.image);
      onChange({ ...project, detailImage: { src: project.image, ...size } });
    } catch {
      setImageError("Couldn't read the image's size.");
    }
  };

  return (
    <div className="adm-form-fields">
      <TextInput label="Title" value={project.title} onChange={(v) => onChange({ ...project, title: v })} />

      <div className="adm-columns">
        <Field label="Where it appears">
          <select className="adm-input" value={placement} onChange={(e) => onPlacementChange(e.target.value)}>
            <option value={FEATURED}>Featured (wide block at the top)</option>
            {categoryTitles.map((title, i) => (
              <option key={i} value={String(i)}>
                {title || "Untitled category"}
              </option>
            ))}
            <option value={HIDDEN}>Hidden (not on the site)</option>
          </select>
        </Field>
        <TextInput label="Date" value={project.date ?? ""} onChange={(v) => onChange(withOptional(project, "date", v))} hint="Shown as typed, e.g. Aug 2026 or Jul 2026 – Present" />
      </div>
      {placement === FEATURED && <p className="adm-hint">Only one project can be featured; choosing this moves the current one to “Hidden”.</p>}

      <TextArea label="Card description" rows={3} value={project.shortDescription ?? ""} onChange={(v) => onChange(withOptional(project, "shortDescription", v))} hint="The short text on the project card." />

      <h3 className="adm-subheading">Full description (expanded view)</h3>
      {sections.map((section, i) => (
        <div key={i} className="adm-card">
          <div className="adm-repeat">
            <TextInput
              label="Heading"
              value={section.heading}
              onChange={(v) => setSections(replaceAt(sections, i, { ...section, heading: v }))}
              hint={sections.length === 1 ? "Optional when there's only one section." : undefined}
            />
            <RowControls
              index={i}
              count={sections.length}
              itemName={section.heading || `section ${i + 1}`}
              onMove={(direction) => setSections(moveItem(sections, i, direction))}
              onDelete={() => setSections(removeAt(sections, i))}
            />
          </div>
          <TextArea label="Text" rows={5} value={section.body} onChange={(v) => setSections(replaceAt(sections, i, { ...section, body: v }))} />
        </div>
      ))}
      <button type="button" className="adm-button adm-button-quiet" onClick={() => setSections([...sections, { heading: "", body: "" }])}>
        + Add section
      </button>

      <CommaListInput label="Tech tags" resetKey={project.id} value={project.techStack} onChange={(v) => onChange({ ...project, techStack: v })} hint="Separate with commas: React, TypeScript, Supabase" />

      <h3 className="adm-subheading">Image</h3>
      <ImageUpload
        label="Screenshot"
        folder="projects"
        value={project.image ?? ""}
        hint="Cards show it in a 16:9 frame."
        onChange={(url, size) => {
          let next = withOptional(project, "image", url);
          // Keep the "full image" option pointing at the new picture, or drop it with the image.
          if (project.detailImage) next = withOptional(next, "detailImage", url && size ? { src: url, ...size } : undefined);
          onChange(next);
        }}
      />
      {project.image && (
        <>
          <div className="adm-columns">
            <Field label="How it fills the card" hint="“Fit” shows the whole image with no cropping — good for logos.">
              <select className="adm-input" value={project.imageFit ?? "cover"} onChange={(e) => onChange(withOptional(project, "imageFit", e.target.value === "contain" ? "contain" : undefined))}>
                <option value="cover">Fill (crop to fit)</option>
                <option value="contain">Fit (show everything)</option>
              </select>
            </Field>
            <TextInput label="Crop position" placeholder="center" value={project.imagePosition ?? ""} onChange={(v) => onChange(withOptional(project, "imagePosition", v))} hint={'e.g. "top", "left", "center 80%"'} />
            <TextInput
              label="Zoom"
              placeholder="1"
              value={project.imageScale ? String(project.imageScale) : ""}
              onChange={(v) => onChange(withOptional(project, "imageScale", v && Number(v) > 0 ? Number(v) : undefined))}
              hint="1 is normal; 1.3 zooms in."
            />
          </div>
          <Checkbox label="Show the whole image, uncropped, in the expanded view" checked={Boolean(project.detailImage)} onChange={setFullImage} />
          {imageError && <span className="adm-error">{imageError}</span>}
        </>
      )}

      <h3 className="adm-subheading">Links</h3>
      <TextInput label="Live website" type="url" placeholder="https://…" value={project.href ?? ""} onChange={(v) => onChange(withOptional(project, "href", v))} />
      <TextInput label="Demo video" type="url" placeholder="https://…" value={project.videoUrl ?? ""} onChange={(v) => onChange(withOptional(project, "videoUrl", v))} />
      {repos.map((repo, i) => (
        <div key={i} className="adm-repeat">
          <div className="adm-columns">
            <TextInput label="Code link label" value={repo.label} onChange={(v) => setRepos(replaceAt(repos, i, { ...repo, label: v }))} hint="e.g. Source, Frontend, Backend" />
            <TextInput label="Repository URL" type="url" placeholder="https://github.com/…" value={repo.href} onChange={(v) => setRepos(replaceAt(repos, i, { ...repo, href: v }))} />
          </div>
          <RowControls index={i} count={repos.length} itemName={repo.label || "code link"} onMove={(direction) => setRepos(moveItem(repos, i, direction))} onDelete={() => setRepos(removeAt(repos, i))} />
        </div>
      ))}
      <button type="button" className="adm-button adm-button-quiet" onClick={() => setRepos([...repos, { label: "Source", href: "" }])}>
        + Add code link
      </button>

      <TextInput label="Note" value={project.note ?? ""} onChange={(v) => onChange(withOptional(project, "note", v))} hint="Small print at the bottom of the expanded view, e.g. demo login details." />
    </div>
  );
}
