import type { SiteContent } from "@/types";
import { SITE_SETTINGS } from "@/data/site";
import { FEATURED_PROJECT_ID, PROJECTS, PROJECT_CATEGORIES } from "@/data/projects";
import { CORE_TOOLS, TOOL_GROUPS } from "@/data/tools";
import { CERTIFICATIONS } from "@/data/certifications";
import { ARTICLES } from "@/data/articles";
import { ABOUT_PHOTOS } from "@/data/about-photos";

/**
 * The content that ships with the code. Each key is used until the admin console saves that
 * section to the database for the first time; after that the saved version wins.
 */
export const DEFAULT_CONTENT: SiteContent = {
  site: SITE_SETTINGS,
  projects: { items: PROJECTS, categories: PROJECT_CATEGORIES, featuredId: FEATURED_PROJECT_ID },
  tools: { groups: TOOL_GROUPS, core: CORE_TOOLS },
  certifications: CERTIFICATIONS,
  articles: ARTICLES,
  about_photos: ABOUT_PHOTOS,
};

/** Sections saved in the database, laid over the defaults above. */
export function mergeContent(rows: { key: string; data: unknown }[]): SiteContent {
  const content: SiteContent = { ...DEFAULT_CONTENT };
  for (const row of rows) {
    if (!(row.key in DEFAULT_CONTENT) || row.data === null || typeof row.data !== "object") continue;
    const key = row.key as keyof SiteContent;
    // Ignore a saved value of the wrong shape (list vs. object) rather than crash the page on it.
    if (Array.isArray(row.data) === Array.isArray(DEFAULT_CONTENT[key])) {
      // Objects are merged over the default so a field added in code later still has a value.
      (content as unknown as Record<string, unknown>)[key] = Array.isArray(row.data)
        ? row.data
        : { ...DEFAULT_CONTENT[key], ...row.data };
    }
  }
  return content;
}
