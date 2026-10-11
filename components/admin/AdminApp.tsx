"use client";

import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import type { SiteContent } from "@/types";
import { DEFAULT_CONTENT, mergeContent } from "@/data/defaults";
import { supabase } from "@/components/admin/supabase-client";
import { ArticlesEditor, CertificationsEditor, PhotosEditor, SiteEditor, ToolsEditor } from "@/components/admin/editors";
import { ProjectsEditor } from "@/components/admin/ProjectsEditor";

type SectionKey = keyof SiteContent;

const TABS: { key: SectionKey; label: string }[] = [
  { key: "site", label: "Site & About" },
  { key: "projects", label: "Projects" },
  { key: "articles", label: "Articles" },
  { key: "tools", label: "Tools" },
  { key: "certifications", label: "Certifications" },
  { key: "about_photos", label: "About photos" },
];

const isWebUrl = (value: string) => /^https?:\/\/\S+$/i.test(value.trim());

/** Tidies a section before it is saved (e.g. drops blank tool rows). */
function clean<K extends SectionKey>(key: K, data: SiteContent[K]): SiteContent[K] {
  if (key === "tools") {
    const tools = data as SiteContent["tools"];
    const groups = tools.groups.map((group) => ({
      ...group,
      title: group.title.trim(),
      tools: group.tools.map((tool) => tool.trim()).filter(Boolean),
    }));
    const names = new Set(groups.flatMap((group) => group.tools));
    const core = [...new Set(tools.core.map((tool) => tool.trim()))].filter((tool) => names.has(tool));
    return { groups, core } as SiteContent[K];
  }
  if (key === "site") {
    const site = data as SiteContent["site"];
    return { ...site, aboutBio: site.aboutBio.map((p) => p.trim()).filter(Boolean) } as SiteContent[K];
  }
  return data;
}

/** Returns a message describing the first problem that would break the public page, or null if it's fine to save. */
function validate<K extends SectionKey>(key: K, data: SiteContent[K]): string | null {
  switch (key) {
    case "site": {
      const site = data as SiteContent["site"];
      if (!site.name.trim()) return "Name can't be empty.";
      if (!site.role.trim()) return "Title can't be empty.";
      if (!/^\S+@\S+\.\S+$/.test(site.email.trim())) return "Email doesn't look like an email address.";
      if (!isWebUrl(site.linkedin)) return "LinkedIn URL must start with https://";
      if (!isWebUrl(site.github)) return "GitHub URL must start with https://";
      return null;
    }
    case "projects": {
      const projects = data as SiteContent["projects"];
      const titles = projects.categories.map((category) => category.title.trim());
      if (titles.some((title) => !title)) return "Every category needs a name.";
      if (new Set(titles).size !== titles.length) return "Two categories have the same name.";
      for (const project of projects.items) {
        const name = project.title.trim() || "An untitled project";
        if (!project.title.trim()) return "Every project needs a title.";
        if (project.href && !isWebUrl(project.href)) return `${name}: the live website link must start with https://`;
        if (project.videoUrl && !isWebUrl(project.videoUrl)) return `${name}: the demo video link must start with https://`;
        for (const repo of project.repos ?? []) {
          if (!repo.label.trim() || !isWebUrl(repo.href)) return `${name}: each code link needs a label and a URL starting with https://`;
        }
      }
      return null;
    }
    case "articles":
      for (const article of data as SiteContent["articles"]) {
        if (!article.title.trim()) return "Every article needs a title.";
        if (!isWebUrl(article.url)) return `"${article.title}": the link must start with https://`;
      }
      return null;
    case "certifications":
      for (const cert of data as SiteContent["certifications"]) {
        if (!cert.title.trim()) return "Every certification needs a title.";
        if (!isWebUrl(cert.verifyUrl)) return `"${cert.title}": the verification link must start with https://`;
      }
      return null;
    case "about_photos":
      for (const photo of data as SiteContent["about_photos"]) {
        if (!photo.src) return "A photo has no image yet — upload one or delete it.";
        if (!photo.alt.trim()) return "Every photo needs a description.";
      }
      return null;
    case "tools":
      if ((data as SiteContent["tools"]).groups.some((group) => !group.title.trim())) return "Every tool group needs a name.";
      return null;
    default:
      return null;
  }
}

export function AdminApp() {
  /** undefined = still checking for a saved session */
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  /** What's in the form now, and what was last loaded/saved — a section is "unsaved" when they differ. */
  const [content, setContent] = useState<SiteContent | null>(null);
  const [saved, setSaved] = useState<SiteContent | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [tab, setTab] = useState<SectionKey>("site");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ kind: "ok" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => data.subscription.unsubscribe();
  }, []);

  const userId = session?.user.id;

  const load = useCallback(async () => {
    if (!supabase) return;
    setLoadError(null);
    const { data, error } = await supabase.from("site_content").select("key,data");
    if (error) return setLoadError(error.message);
    // Sections never saved before start from the content that ships with the code.
    const merged = mergeContent(data ?? []);
    setContent(merged);
    setSaved(merged);
  }, []);

  useEffect(() => {
    if (!supabase || !userId) {
      setIsAdmin(null);
      setContent(null);
      return;
    }
    let cancelled = false;
    // Row level security returns only the caller's own admins row, so any row means "admin".
    supabase
      .from("admins")
      .select("user_id")
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) return setLoadError(error.message);
        const admin = (data ?? []).length > 0;
        setIsAdmin(admin);
        if (admin) load();
      });
    return () => {
      cancelled = true;
    };
  }, [userId, load]);

  const isDirty = (key: SectionKey) =>
    content !== null && saved !== null && JSON.stringify(content[key]) !== JSON.stringify(saved[key]);
  const anyDirty = TABS.some(({ key }) => isDirty(key));

  // Warn before closing the tab with unsaved edits.
  useEffect(() => {
    if (!anyDirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [anyDirty]);

  if (!supabase) {
    return (
      <Shell>
        <p className="adm-notice">
          Supabase isn&apos;t configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY, then reload.
        </p>
      </Shell>
    );
  }
  const client = supabase;

  if (session === undefined) return <Shell><p className="adm-notice">Loading…</p></Shell>;
  if (session === null) return <Shell><LoginForm /></Shell>;

  const signOut = <button type="button" className="adm-button adm-button-quiet" onClick={() => client.auth.signOut()}>Sign out</button>;

  if (loadError) {
    return (
      <Shell actions={signOut}>
        <p className="adm-notice adm-notice-error">
          Couldn&apos;t load your content: {loadError}. If you haven&apos;t run the database setup file yet
          (supabase/migrations/20261011000000_site_content.sql), run it in the Supabase SQL editor first.
        </p>
      </Shell>
    );
  }
  if (isAdmin === false) {
    return (
      <Shell actions={signOut}>
        <p className="adm-notice adm-notice-error">
          {session.user.email} is signed in but isn&apos;t an admin, so it can&apos;t change anything. Add it to the
          admins table (see the setup file) and reload.
        </p>
      </Shell>
    );
  }
  if (!content || !saved) return <Shell actions={signOut}><p className="adm-notice">Loading your content…</p></Shell>;

  const set = <K extends SectionKey>(key: K, value: SiteContent[K]) => {
    setStatus(null);
    setContent({ ...content, [key]: value });
  };

  const save = async () => {
    setStatus(null);
    const data = clean(tab, content[tab]);
    const problem = validate(tab, data);
    if (problem) return setStatus({ kind: "error", text: problem });

    setSaving(true);
    const { error } = await client
      .from("site_content")
      .upsert({ key: tab, data, updated_at: new Date().toISOString() });
    if (error) {
      setSaving(false);
      return setStatus({ kind: "error", text: `Not saved: ${error.message}` });
    }
    setContent({ ...content, [tab]: data });
    setSaved({ ...saved, [tab]: data });

    // Saved. Now ask the site to rebuild its pages so the change shows up right away.
    try {
      const res = await fetch("/api/revalidate", {
        method: "POST",
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus({ kind: "ok", text: "Saved. The live site updates within a few seconds." });
    } catch {
      setStatus({ kind: "ok", text: "Saved, but the site couldn't be refreshed right now — the change will appear within an hour." });
    }
    setSaving(false);
  };

  const dirty = isDirty(tab);

  return (
    <Shell
      actions={
        <>
          <a href="/" target="_blank" rel="noopener noreferrer" className="adm-button adm-button-quiet">View site ↗</a>
          {signOut}
        </>
      }
    >
      <div className="adm-tabs" role="tablist" aria-label="Content sections">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={tab === key}
            className="adm-tab"
            onClick={() => {
              setStatus(null);
              setTab(key);
            }}
          >
            {label}
            {isDirty(key) && <span className="adm-dot" title="Unsaved changes" aria-label="unsaved changes" />}
          </button>
        ))}
      </div>

      <div className="adm-panel" role="tabpanel">
        {tab === "site" && <SiteEditor value={content.site} onChange={(v) => set("site", v)} />}
        {tab === "projects" && <ProjectsEditor value={content.projects} onChange={(v) => set("projects", v)} />}
        {tab === "articles" && <ArticlesEditor value={content.articles} onChange={(v) => set("articles", v)} />}
        {tab === "tools" && <ToolsEditor value={content.tools} onChange={(v) => set("tools", v)} />}
        {tab === "certifications" && <CertificationsEditor value={content.certifications} onChange={(v) => set("certifications", v)} />}
        {tab === "about_photos" && <PhotosEditor value={content.about_photos} onChange={(v) => set("about_photos", v)} />}
      </div>

      <div className="adm-savebar">
        <span className={status?.kind === "error" ? "adm-status adm-status-error" : "adm-status"} role="status">
          {status?.text ?? (dirty ? "You have unsaved changes in this section." : "No unsaved changes in this section.")}
        </span>
        <button type="button" className="adm-button adm-button-quiet" disabled={!dirty || saving} onClick={() => set(tab, saved[tab])}>
          Discard changes
        </button>
        <button type="button" className="adm-button adm-button-primary" disabled={!dirty || saving} onClick={save}>
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </Shell>
  );
}

function Shell({ children, actions }: { children: React.ReactNode; actions?: React.ReactNode }) {
  return (
    <div className="adm">
      <header className="adm-header">
        <h1 className="adm-heading">Portfolio admin</h1>
        <div className="adm-header-actions">{actions}</div>
      </header>
      <main className="adm-main">{children}</main>
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (signInError) setError(signInError.message);
    setBusy(false);
  };

  return (
    <form className="adm-login" onSubmit={submit}>
      <h2 className="adm-subheading">Sign in</h2>
      <label className="adm-field">
        <span className="adm-label">Email</span>
        <input className="adm-input" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label className="adm-field">
        <span className="adm-label">Password</span>
        <input className="adm-input" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      {error && <span className="adm-error" role="alert">{error}</span>}
      <button type="submit" className="adm-button adm-button-primary" disabled={busy}>
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
