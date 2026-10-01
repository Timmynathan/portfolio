import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Tools } from "@/components/Tools";
import { Certifications } from "@/components/Certifications";
import { Footer } from "@/components/Footer";
import { FadeInObserver } from "@/components/FadeInObserver";

export default function Portfolio() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Tools />
        <Certifications />
      </main>
      <Footer />
      <FadeInObserver />
    </>
  );
}
