import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";

// Below-the-fold sections load as separate chunks to keep the first load small
const About = dynamic(() => import("@/components/sections/About"));
const Projects = dynamic(() => import("@/components/sections/Projects"));
const HowIBuild = dynamic(() => import("@/components/sections/HowIBuild"));
const Skills = dynamic(() => import("@/components/sections/Skills"));
const Journey = dynamic(() => import("@/components/sections/Journey"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const Blog = dynamic(() => import("@/components/sections/Blog"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

// The page as a story: hook → who → proof → how → tools → path → voices → writing → close
export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Projects />
      <HowIBuild />
      <Skills />
      <Journey />
      <Testimonials />
      <Blog />
      <Contact />
    </div>
  );
}
