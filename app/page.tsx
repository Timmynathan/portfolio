import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import Projects from "../components/Projects/Projects";
import CTA from "../components/CTA/CTA";
import Footer from "../components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />    
        <About />
        <Projects />
        <CTA />
      </main>
      <Footer />
    </>
  );
}