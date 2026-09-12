import { CERTIFICATIONS } from "@/data/certifications";
import { CertCard } from "@/components/CertCard";
import { AwardIcon } from "@/components/icons";

export function Certifications() {
  return (
    <section id="certifications" className="certifications">
      <div className="container">
        <div className="fade-in">
          <div className="section-heading">
            <span className="section-tag" aria-hidden="true"><AwardIcon /></span>
            <h2 className="section-title">Certifications</h2>
          </div>

          <div className="cert-grid">
            {CERTIFICATIONS.map((cert) => (
              <CertCard key={cert.title} cert={cert} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
