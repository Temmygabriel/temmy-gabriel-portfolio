import { getProjects } from '@/lib/projects';
import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/ui/Footer';
import CursorGlow from '@/components/ui/CursorGlow';

export default function Home() {
  const projects = getProjects();

  return (
    <>
      <CursorGlow />
      <div className="scanline" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects projects={projects} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
