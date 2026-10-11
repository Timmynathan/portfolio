export interface ProjectDescriptionSection {
  heading: string;
  body: string;
}

export interface Project {
  id: string;
  title: string;
  /** Plain paragraph, or headed sections for a longer write-up (rendered with subheadings). */
  description: string | ProjectDescriptionSection[];
  shortDescription?: string;
  meta?: string;
  /** When it was built, e.g. "Aug 2026" or "Jul 2026 – Present". */
  date?: string;
  badge?: string;
  techStack: string[];
  mainStack?: string;
  linkLabel: string;
  href?: string;
  videoUrl?: string;
  /** Label for the videoUrl button, since linkLabel is used by href. Default "Watch Demo". */
  videoLabel?: string;
  repos?: { label: string; href: string }[];
  note?: string;
  image?: string;
  /** How the image fills its frame. Default "cover" (screenshots); use "contain" for a
   *  logo or any image that shouldn't be cropped. */
  imageFit?: "cover" | "contain";
  /** CSS object-position, for when a center crop cuts off the wrong part. Default "center". */
  imagePosition?: string;
  /** CSS transform: scale() multiplier, to zoom in on the image. Default 1. Card thumbnail only —
   *  the detail modal shows the image at full scale so nothing gets cropped away on the larger view. */
  imageScale?: number;
  /** Separate image for the detail modal, shown whole at its natural aspect ratio instead of cropped into the frame. */
  detailImage?: { src: string; width: number; height: number };
  featured?: boolean;
  secondary?: boolean;
}

export interface ProjectCategory {
  title: string;
  subtitle: string;
  /** Project ids, in display order. */
  projectIds: string[];
}

export interface ToolGroup {
  title: string;
  /** Most central first. */
  tools: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  expires?: string;
  description: string;
  verifyUrl: string;
}

export interface NavLink {
  label: string;
  href: string;
}

/** Site-wide details shown in the hero, About page, contact card and footer. */
export interface SiteSettings {
  /** Name shown in the hero ("Hey! I'm …"). */
  name: string;
  /** Full name used in the footer copyright line. */
  legalName: string;
  /** Job title under the name, also used in the browser tab title. */
  role: string;
  taglineLine1: string;
  taglineLine2: string;
  /** Small detail line under the tagline. */
  availability: string;
  email: string;
  linkedin: string;
  github: string;
  /** About page bio, one entry per paragraph. */
  aboutBio: string[];
}

/** An article hosted elsewhere (Medium, LinkedIn, …); the Articles page links out to it. */
export interface Article {
  id: string;
  title: string;
  url: string;
  /** Where it's published, e.g. "Medium". */
  source: string;
  date: string;
  summary: string;
}

export interface AboutPhoto {
  /** Stable id for the photo's like count. Changing it starts that photo's count again from zero. */
  id: string;
  src: string;
  alt: string;
  /** CSS object-position, for when a center crop cuts off the subject. Default "center". */
  position?: string;
  /** CSS transform: scale() multiplier, to zoom in on the subject. Default 1. */
  scale?: number;
}

export interface ProjectsContent {
  items: Project[];
  /** Order here is the order on the page. Projects in no category (and not featured) are hidden. */
  categories: ProjectCategory[];
  /** Headline project, shown on its own above the category tabs. */
  featuredId: string | null;
}

export interface ToolsContent {
  groups: ToolGroup[];
  /** The everyday tools — rendered with stronger styling than the long tail. */
  core: string[];
}

/** Everything the admin console can edit. Each key is one row in the site_content table. */
export interface SiteContent {
  site: SiteSettings;
  projects: ProjectsContent;
  tools: ToolsContent;
  certifications: Certification[];
  articles: Article[];
  about_photos: AboutPhoto[];
}
