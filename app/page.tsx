import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Tools } from "@/components/Tools";
import { Certifications } from "@/components/Certifications";
import { Dashboard } from "@/components/Dashboard";
import { Footer } from "@/components/Footer";
import { FadeInObserver } from "@/components/FadeInObserver";
import { getContent, visibleProjects } from "@/lib/content";

export default async function Portfolio() {
  const content = await getContent();

  return (
    <>
      <Navbar />
      <main>
        <Hero site={content.site} />
        <Projects content={visibleProjects(content.projects)} />
        <Tools tools={content.tools} />
        <Certifications certifications={content.certifications} />
        <Dashboard site={content.site} />
      </main>
      <Footer site={content.site} />
      <FadeInObserver />
    </>
  );
}
