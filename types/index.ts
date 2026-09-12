export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  meta?: string;
  badge?: string;
  techStack: string[];
  mainStack?: string;
  linkLabel: string;
  href?: string;
  videoUrl?: string;
  repos?: { label: string; href: string }[];
  note?: string;
  image?: string;
  /** How the image fills its frame. Default "cover" (screenshots); use "contain" for a
   *  logo or any image that shouldn't be cropped. */
  imageFit?: "cover" | "contain";
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
