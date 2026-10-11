// Loads the site's editable content (schema: supabase/migrations/20261011000000_site_content.sql).
// Server-side only. The admin console writes it; public pages read it here.

import { cache } from "react";
import type { SiteContent } from "@/types";
import { DEFAULT_CONTENT, mergeContent } from "@/data/defaults";
import { SUPABASE_URL, supabaseConfigured, supabaseHeaders } from "@/lib/supabase";

/** Safety net only — saving in the admin console refreshes the site straight away. */
const REVALIDATE_SECONDS = 60 * 60;

export const getContent = cache(async (): Promise<SiteContent> => {
  if (!supabaseConfigured) return DEFAULT_CONTENT;

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/site_content?select=key,data`, {
      headers: supabaseHeaders(),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    // 404 = the site_content table doesn't exist yet (migration not run), so nothing has been saved.
    if (res.status === 404) return DEFAULT_CONTENT;
    if (!res.ok) throw new Error(`Loading site content failed (${res.status})`);
    return mergeContent(await res.json());
  } catch (error) {
    // In production, fail the render instead of quietly showing the stale content bundled with the
    // code: Next.js then keeps serving the last good page, and a broken build is visible.
    if (process.env.NODE_ENV === "production") throw error;
    console.warn("Site content: couldn't reach Supabase, using the content bundled with the code.", error);
    return DEFAULT_CONTENT;
  }
});

/**
 * Drops projects that aren't featured or in a category. They're hidden on the page anyway, but
 * filtering here keeps their details out of the data sent to the browser.
 */
export function visibleProjects(projects: SiteContent["projects"]): SiteContent["projects"] {
  const shown = new Set(projects.categories.flatMap((category) => category.projectIds));
  if (projects.featuredId) shown.add(projects.featuredId);
  return { ...projects, items: projects.items.filter((project) => shown.has(project.id)) };
}
