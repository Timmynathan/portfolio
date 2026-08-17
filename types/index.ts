export interface Project {
  id: string;
  title: string;
  description: string;
  badge?: string;
  techStack: string[];
  mainStack?: string;
  linkLabel: string;
  href?: string;
  videoUrl?: string;
  repos?: { label: string; href: string }[];
  note?: string;
  image?: string;
  imageType?: "default" | "mobile";
  featured?: boolean;
  secondary?: boolean;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  description: string;
  verifyUrl: string;
}

export interface NavLink {
  label: string;
  href: string;
}
