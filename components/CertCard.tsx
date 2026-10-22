import type { Certification } from "@/types";
import { GlobeIcon } from "@/components/icons";
import { RichText } from "@/components/RichText";

export function CertCard({ cert }: { cert: Certification }) {
  return (
    <div className="cert-card">
      <div className="cert-card-head">
        <h3 className="cert-title">{cert.title}</h3>
        <span className="cert-badge">Completed</span>
      </div>
      <div className="cert-meta">
        {cert.issuer} · {cert.date}
        {cert.expires && ` – ${cert.expires}`}
      </div>
      <p className="cert-description"><RichText text={cert.description} /></p>
      <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className="project-link cert-link">
        <GlobeIcon />
        Verify Credential
      </a>
    </div>
  );
}
