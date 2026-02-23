import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";

// Simple skeleton loader to prevent layout collapse
const SectionSkeleton = () => <div className="min-h-[50vh] animate-pulse bg-background/5" />;

// Dynamically import below-the-fold sections to reduce initial JS payload
const About = dynamic(() => import("@/components/sections/About"), { loading: SectionSkeleton });
const Skills = dynamic(() => import("@/components/sections/Skills"), { loading: SectionSkeleton });
const Projects = dynamic(() => import("@/components/sections/Projects"), { loading: SectionSkeleton });
const Journey = dynamic(() => import("@/components/sections/Journey"), { loading: SectionSkeleton });
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"), { loading: SectionSkeleton });
const Blog = dynamic(() => import("@/components/sections/Blog"), { loading: SectionSkeleton });
const Contact = dynamic(() => import("@/components/sections/Contact"), { loading: SectionSkeleton });

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

