import { CERTIFICATIONS } from "@/data/certifications";
import { CertCard } from "@/components/CertCard";

export function Certifications() {
  return (
    <section id="certifications" className="certifications">
      <div className="container">
        <div className="fade-in">
          <h2 className="section-title">Certifications</h2>
          <p className="section-subtitle">Continuous learning in AI tooling and modern development workflows</p>

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
