import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";

// Dynamically import below-the-fold sections to reduce initial JS payload
const About = dynamic(() => import("@/components/sections/About"));
const Skills = dynamic(() => import("@/components/sections/Skills"));
const Projects = dynamic(() => import("@/components/sections/Projects"));
const Journey = dynamic(() => import("@/components/sections/Journey"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const Blog = dynamic(() => import("@/components/sections/Blog"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Journey />
      <Testimonials />
      <Blog />
      <Contact />
    </main>
  );
}

