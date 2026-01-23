"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { RevealHeader } from "@/components/ui/reveal-header";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Elite Hotel",
    category: "Full Stack System",
    image: "https://picsum.photos/seed/elite/800/600",
    description: "Microservices-based Hotel Management System with secure authentication, billing, and integrated payments using Node.js, Express, and Docker.",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "Nxtcart",
    category: "E-commerce Platform",
    image: "https://picsum.photos/seed/nxtcart/800/600",
    description: "Full-stack e-commerce application with customer features, authentication used Auth.js, payments via Stripe/PayPal, and an admin dashboard.",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "Dropbox Clone",
    category: "Cloud Architecture",
    image: "https://picsum.photos/seed/dropbox/800/600",
    description: "High-performance file storage app built with Next.js and Firebase featuring drag-and-drop uploads, smart caching, and secure authentication.",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "Blog Platform",
    category: "Distributed System",
    image: "https://picsum.photos/seed/blog/800/600",
    description: "Scalable blog platform with Node.js, Express, MongoDB, RabbitMQ, and Docker, featuring microservices architecture and CI/CD pipelines.",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "Pixabay Gallery",
    category: "Frontend Experience",
    image: "https://picsum.photos/seed/pixabay/800/600",
    description: "Responsive image gallery built with React, Vite, and Tailwind CSS. Features infinite scroll, masonry layout, and advanced search.",
    liveUrl: "#",
    githubUrl: "#"
  }
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const totalWidth = sectionRef.current ? sectionRef.current.scrollWidth - window.innerWidth : 0;

    gsap.fromTo(
      sectionRef.current,
      { x: 0 },
      {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=3000", // Increased scroll distance for slower, smoother feeling
          scrub: 1, // Smooth scrub
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      }
    );
  }, { scope: triggerRef });

  return (
    <section id="projects" className="overflow-hidden bg-background relative z-20">
      <div ref={triggerRef}>

        {/* Pinned Container */}
        <div className="h-screen flex flex-col justify-center relative">

          {/* Section Header - Fixed Spacing & Visibility */}
          <div className="container mx-auto px-6 mb-12 pt-10 absolute top-10 left-0 right-0 z-0 pointer-events-none">
            <RevealHeader className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4 text-foreground/30 dark:text-white/30 mix-blend-overlay">
              Selected Works
            </RevealHeader>
            <div className="flex items-center gap-4 opacity-90 pl-2">
              <div className="w-24 h-1 bg-secondary" />
              <p className="text-lg text-muted-foreground uppercase tracking-widest font-medium">Interactive Gallery</p>
            </div>
          </div>

          {/* Horizontal Scroll Track - Reduced Size & Added Top Margin */}
          <div
            ref={sectionRef}
            className="flex gap-10 px-12 md:px-32 w-fit items-center h-full pt-32 relative z-20"
          >
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
  // Holographic Tilt Effect Logic could go here or simple CSS hover
  return (
    <div
      // Reduced dimensions for better overview
      className="group relative h-[50vh] md:h-[60vh] w-[80vw] md:w-[45vw] lg:w-[35vw] shrink-0 
                       perspective-1000 cursor-pointer"
    >
      <div className="relative w-full h-full duration-500 ease-out transform group-hover:-translate-y-4 group-hover:rotate-x-2 group-hover:scale-[1.02]">

        {/* Glass Panel Container */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl dark:shadow-neon-blue/20 transition-all duration-500 group-hover:border-white/30 group-hover:shadow-neon-blue/40">

          {/* Image Layer */}
          <div className="relative h-3/5 w-full overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/80 z-10" />
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            {/* Number Watermark */}
            <div className="absolute top-4 right-6 text-9xl font-black text-white/5 z-0 pointer-events-none">
              {index + 1}
            </div>
          </div>

          {/* Content Layer - Tech Style */}
          <div className="relative h-2/5 p-8 flex flex-col justify-between z-20 bg-linear-to-t from-black/90 to-transparent -mt-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-secondary dark:text-neon-blue text-xs font-bold uppercase tracking-[0.2em] px-3 py-1 border border-secondary/30 dark:border-neon-blue/30 rounded-full bg-secondary/10 dark:bg-neon-blue/10 backdrop-blur-md">
                  {project.category}
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight mb-3 group-hover:text-neon-blue transition-colors">
                {project.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed line-clamp-3 group-hover:text-white/80 transition-colors">
                {project.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6 mt-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <a href={project.liveUrl} className="flex items-center gap-2 text-white hover:text-neon-blue transition-colors uppercase text-sm font-bold tracking-wider">
                View Project <ArrowRight size={16} />
              </a>
              <div className="h-px w-8 bg-white/20" />
              <a href={project.githubUrl} className="text-white/50 hover:text-white transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
