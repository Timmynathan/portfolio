"use client";

// Editors for the simpler sections. Each takes the section's current value and reports edits
// upward; nothing is saved until the console's Save button is pressed.

import type { AboutPhoto, Article, Certification, SiteSettings, ToolsContent } from "@/types";
import {
  Checkbox,
  MasterDetail,
  RowControls,
  TextArea,
  TextInput,
  moveItem,
  newId,
  removeAt,
  replaceAt,
} from "@/components/admin/fields";
import { ImageUpload } from "@/components/admin/ImageUpload";

export function SiteEditor({ value, onChange }: { value: SiteSettings; onChange: (value: SiteSettings) => void }) {
  const set = <K extends keyof SiteSettings>(key: K, fieldValue: SiteSettings[K]) => onChange({ ...value, [key]: fieldValue });

  return (
    <div className="adm-form-fields adm-narrow">
      <h3 className="adm-subheading">Home page</h3>
      <TextInput label="Name" value={value.name} onChange={(v) => set("name", v)} hint={`Shown as "Hey! I'm ${value.name || "…"}". The first word is also used in the browser tab title.`} />
      <TextInput label="Title" value={value.role} onChange={(v) => set("role", v)} hint="The big line under your name, e.g. AI Engineer." />
      <TextArea label="Tagline — first line" rows={2} value={value.taglineLine1} onChange={(v) => set("taglineLine1", v)} hint="Press Enter for a new line. Select text and use the buttons to format it." />
      <TextArea label="Tagline — second line" rows={2} value={value.taglineLine2} onChange={(v) => set("taglineLine2", v)} hint="Press Enter for a new line. Select text and use the buttons to format it." />
      <TextInput label="Location / availability line" value={value.availability} onChange={(v) => set("availability", v)} hint="Small line under the tagline. Leave empty to hide it." />

      <h3 className="adm-subheading">Contact links</h3>
      <TextInput label="Email" type="email" value={value.email} onChange={(v) => set("email", v)} />
      <TextInput label="LinkedIn URL" type="url" value={value.linkedin} onChange={(v) => set("linkedin", v)} />
      <TextInput label="GitHub URL" type="url" value={value.github} onChange={(v) => set("github", v)} />

      <h3 className="adm-subheading">Footer</h3>
      <TextInput label="Full name" value={value.legalName} onChange={(v) => set("legalName", v)} hint="Used in the copyright line." />

      <h3 className="adm-subheading">About page</h3>
      {value.aboutBio.map((paragraph, i) => (
        <div key={i} className="adm-repeat">
          <TextArea
            label={`Paragraph ${i + 1}`}
            rows={4}
            value={paragraph}
            onChange={(v) => set("aboutBio", replaceAt(value.aboutBio, i, v))}
          />
          <RowControls
            index={i}
            count={value.aboutBio.length}
            itemName={`paragraph ${i + 1}`}
            onMove={(direction) => set("aboutBio", moveItem(value.aboutBio, i, direction))}
            onDelete={() => set("aboutBio", removeAt(value.aboutBio, i))}
          />
        </div>
      ))}
      <button type="button" className="adm-button" onClick={() => set("aboutBio", [...value.aboutBio, ""])}>
        + Add paragraph
      </button>
    </div>
  );
}

export function ArticlesEditor({ value, onChange }: { value: Article[]; onChange: (value: Article[]) => void }) {
  return (
    <MasterDetail<Article>
      items={value}
      onChange={onChange}
      itemName="article"
      getKey={(article) => article.id}
      getLabel={(article) => article.title}
      createItem={() => ({ id: newId("article"), title: "", url: "", source: "", date: "", summary: "" })}
      renderForm={(article, update) => (
        <>
          <TextInput label="Title" value={article.title} onChange={(v) => update({ ...article, title: v })} />
          <TextInput label="Link to the article" type="url" placeholder="https://…" value={article.url} onChange={(v) => update({ ...article, url: v })} hint="Visitors are sent here when they click the card." />
          <TextInput label="Published on" value={article.source} onChange={(v) => update({ ...article, source: v })} hint="e.g. Medium, LinkedIn, Dev.to" />
          <TextInput label="Date" value={article.date} onChange={(v) => update({ ...article, date: v })} hint="Shown as typed, e.g. Oct 2026" />
          <TextArea label="Summary" rows={3} value={article.summary} onChange={(v) => update({ ...article, summary: v })} hint="One or two sentences shown on the card." />
        </>
      )}
    />
  );
}

export function CertificationsEditor({ value, onChange }: { value: Certification[]; onChange: (value: Certification[]) => void }) {
  return (
    <MasterDetail<Certification>
      items={value}
      onChange={onChange}
      itemName="certification"
      // Certifications have no id; the list position is stable enough while editing.
      getKey={(_, index) => String(index)}
      getLabel={(cert) => cert.title}
      createItem={() => ({ title: "", issuer: "", date: "", description: "", verifyUrl: "" })}
      renderForm={(cert, update) => (
        <>
          <TextInput label="Title" value={cert.title} onChange={(v) => update({ ...cert, title: v })} />
          <TextInput label="Issued by" value={cert.issuer} onChange={(v) => update({ ...cert, issuer: v })} />
          <TextInput label="Date earned" value={cert.date} onChange={(v) => update({ ...cert, date: v })} hint="Shown as typed, e.g. August 2026" />
          <TextInput
            label="Expires"
            value={cert.expires ?? ""}
            onChange={(v) => {
              const { expires: _removed, ...rest } = cert;
              update(v ? { ...rest, expires: v } : rest);
            }}
            hint="Leave empty if it doesn't expire."
          />
          <TextArea label="Description" rows={3} value={cert.description} onChange={(v) => update({ ...cert, description: v })} />
          <TextInput label="Verification link" type="url" placeholder="https://…" value={cert.verifyUrl} onChange={(v) => update({ ...cert, verifyUrl: v })} />
        </>
      )}
    />
  );
}

export function PhotosEditor({ value, onChange }: { value: AboutPhoto[]; onChange: (value: AboutPhoto[]) => void }) {
  return (
    <MasterDetail<AboutPhoto>
      items={value}
      onChange={onChange}
      itemName="photo"
      getKey={(photo) => photo.id}
      getLabel={(photo) => photo.alt}
      createItem={() => ({ id: newId("about"), src: "", alt: "" })}
      renderForm={(photo, update) => (
        <>
          <ImageUpload
            label="Photo"
            folder="about"
            value={photo.src}
            allowRemove={false}
            onChange={(url) => update({ ...photo, src: url })}
            hint="Shown in a portrait (3:4) tile on the About page."
          />
          <TextInput label="Description" value={photo.alt} onChange={(v) => update({ ...photo, alt: v })} hint="Read out by screen readers; describe what's in the photo." />
          <TextInput
            label="Crop position"
            value={photo.position ?? ""}
            placeholder="center"
            onChange={(v) => {
              const { position: _removed, ...rest } = photo;
              update(v ? { ...rest, position: v } : rest);
            }}
            hint={'Which part stays in view when cropped: "top", "center", "bottom", or e.g. "center 30%".'}
          />
          <TextInput
            label="Zoom"
            value={photo.scale ? String(photo.scale) : ""}
            placeholder="1"
            onChange={(v) => {
              const { scale: _removed, ...rest } = photo;
              const scale = Number(v);
              update(v && scale > 0 ? { ...rest, scale } : rest);
            }}
            hint="1 is normal; 1.4 zooms in by 40%."
          />
          <p className="adm-hint">Likes are counted per photo, so a newly added photo starts at zero.</p>
        </>
      )}
    />
  );
}

export function ToolsEditor({ value, onChange }: { value: ToolsContent; onChange: (value: ToolsContent) => void }) {
  const core = new Set(value.core);

  const setGroupTools = (groupIndex: number, tools: string[]) =>
    onChange({ ...value, groups: replaceAt(value.groups, groupIndex, { ...value.groups[groupIndex], tools }) });

  const renameTool = (groupIndex: number, toolIndex: number, name: string) => {
    const group = value.groups[groupIndex];
    const previous = group.tools[toolIndex];
    onChange({
      groups: replaceAt(value.groups, groupIndex, { ...group, tools: replaceAt(group.tools, toolIndex, name) }),
      // Keep the "core" mark attached to the tool through a rename.
      core: value.core.map((tool) => (tool === previous ? name : tool)),
    });
  };

  const setCore = (tool: string, isCore: boolean) =>
    onChange({ ...value, core: isCore ? [...value.core, tool] : value.core.filter((name) => name !== tool) });

  return (
    <div className="adm-form-fields">
      <p className="adm-hint">Tools ticked as “Core” are shown as filled chips on the site. Order within a group is the order shown.</p>
      {value.groups.map((group, groupIndex) => (
        <div key={groupIndex} className="adm-card">
          <div className="adm-repeat">
            <TextInput
              label="Group name"
              value={group.title}
              onChange={(v) => onChange({ ...value, groups: replaceAt(value.groups, groupIndex, { ...group, title: v }) })}
            />
            <RowControls
              index={groupIndex}
              count={value.groups.length}
              itemName={group.title || "group"}
              onMove={(direction) => onChange({ ...value, groups: moveItem(value.groups, groupIndex, direction) })}
              onDelete={() => onChange({ ...value, groups: removeAt(value.groups, groupIndex) })}
            />
          </div>

          <div className="adm-tool-rows">
            {group.tools.map((tool, toolIndex) => (
              <div key={toolIndex} className="adm-tool-row">
                <input
                  className="adm-input"
                  value={tool}
                  aria-label={`Tool ${toolIndex + 1} in ${group.title}`}
                  onChange={(e) => renameTool(groupIndex, toolIndex, e.target.value)}
                />
                <Checkbox label="Core" checked={core.has(tool)} onChange={(checked) => setCore(tool, checked)} />
                <RowControls
                  index={toolIndex}
                  count={group.tools.length}
                  itemName={tool || "tool"}
                  onMove={(direction) => setGroupTools(groupIndex, moveItem(group.tools, toolIndex, direction))}
                  onDelete={() => setGroupTools(groupIndex, removeAt(group.tools, toolIndex))}
                />
              </div>
            ))}
          </div>
          <button type="button" className="adm-button adm-button-quiet" onClick={() => setGroupTools(groupIndex, [...group.tools, ""])}>
            + Add tool
          </button>
        </div>
      ))}
      <button type="button" className="adm-button" onClick={() => onChange({ ...value, groups: [...value.groups, { title: "", tools: [] }] })}>
        + Add group
      </button>
    </div>
  );
}
