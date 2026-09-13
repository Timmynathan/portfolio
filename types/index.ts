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
  featured?: boolean;
  secondary?: boolean;
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
