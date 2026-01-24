"use client";

import { useRef, useState, memo } from "react";
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
    image: "/images/projects/elite-hotel.png",
    description: "Microservices-based Hotel Management System with secure authentication, billing, and integrated payments using Node.js, Express, and Docker.",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "Nxtcart",
    category: "E-commerce Platform",
    image: "/images/projects/nxtcart.png",
    description: "Full-stack e-commerce application with customer features, authentication used Auth.js, payments via Stripe/PayPal, and an admin dashboard.",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "Dropbox Clone",
    category: "Cloud Architecture",
    image: "/images/projects/dropbox-clone.png",
    description: "High-performance file storage app built with Next.js and Firebase featuring drag-and-drop uploads, smart caching, and secure authentication.",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "Blog Platform",
    category: "Distributed System",
    image: "/images/projects/blog-platform.png",
    description: "Scalable blog platform with Node.js, Express, MongoDB, RabbitMQ, and Docker, featuring microservices architecture and CI/CD pipelines.",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "Pixabay Gallery",
    category: "Frontend Experience",
    image: "/images/projects/pixabay-gallery.png",
    description: "Responsive image gallery built with React, Vite, and Tailwind CSS. Features infinite scroll, masonry layout, and advanced search.",
    liveUrl: "#",
    githubUrl: "#"
  }
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const totalWidth = sectionRef.current ? sectionRef.current.scrollWidth - window.innerWidth : 0;

      gsap.to(sectionRef.current, {
        x: -totalWidth,
        ease: "none",
        willChange: "transform", // Hint browser for smoother scroll
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=3000",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => mm.revert();
  }, { scope: triggerRef });

  return (
    <section id="projects" className="overflow-hidden bg-background relative z-20">
      <div ref={triggerRef}>

        {/* Pinned Container */}
        <div className="min-h-screen lg:h-screen flex flex-col justify-center relative">

          {/* Section Header - Fixed Spacing & Visibility */}
          <div className="container mx-auto px-6 mb-12 pt-10 relative lg:absolute lg:top-10 left-0 right-0 z-0 pointer-events-none">
            <RevealHeader className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4 text-foreground/30 dark:text-white/30 dark:mix-blend-overlay">
              Selected Works
            </RevealHeader>
            <div className="flex items-center gap-4 opacity-90 pl-2">
              <div className="w-24 h-1 bg-secondary" />
              <p className="text-lg text-muted-foreground uppercase tracking-widest font-medium">Interactive Gallery</p>
            </div>
          </div>

          {/* Horizontal Scroll Track - Mobile Vertical / Desktop Horizontal */}
          <div
            ref={sectionRef}
            className="flex flex-col lg:flex-row gap-10 px-6 lg:px-32 w-full lg:w-fit items-center h-full pt-0 lg:pt-48 pb-20 lg:pb-0 relative z-20"
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

const ProjectCard = memo(function ProjectCard({ project, index }: { project: any, index: number }) {
  // Holographic Tilt Effect Logic could go here or simple CSS hover
  return (
    <div
      // Reduced dimensions for better overview
      className="group relative h-[50vh] md:h-[60vh] w-full lg:w-[35vw] shrink-0 
                       perspective-1000 cursor-pointer will-change-transform"
    >
      <div className="relative w-full h-full duration-500 ease-out transform group-hover:-translate-y-4 group-hover:rotate-x-2 group-hover:scale-[1.02]">

        {/* Glass Panel Container - Optimized backdrop blur */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-none md:backdrop-blur-xl border border-foreground/30 dark:border-white/30 lg:border-foreground/10 lg:dark:border-white/10 rounded-3xl overflow-hidden shadow-neon-blue/40 lg:shadow-2xl lg:dark:shadow-neon-blue/20 transition-all duration-500 lg:group-hover:border-foreground/30 lg:dark:group-hover:border-white/30 lg:group-hover:shadow-neon-blue/40">

          {/* Image Layer */}
          <div className="relative h-3/5 w-full overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/80 z-10" />
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 35vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              loading="lazy"
            />
            {/* Number Watermark */}
            <div className="absolute top-4 right-6 text-9xl font-black text-white/5 z-0 pointer-events-none">
              {index + 1}
            </div>
          </div>

          {/* Content Layer - Tech Style */}
          <div className="absolute bottom-0 w-full h-3/5 p-8 flex flex-col justify-end z-20 bg-linear-to-t from-black via-black/80 to-transparent">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-white/90 dark:text-neon-blue text-xs font-bold uppercase tracking-[0.2em] px-3 py-1 border border-white/20 dark:border-neon-blue/30 rounded-full bg-white/10 dark:bg-neon-blue/10 backdrop-blur-md">
                  {project.category}
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-neon-blue lg:text-white uppercase tracking-tight mb-3 lg:group-hover:text-neon-blue transition-colors">
                {project.title}
              </h3>
              <p className="text-white/80 lg:text-white/60 text-sm leading-relaxed line-clamp-3 lg:group-hover:text-white/80 transition-colors">
                {project.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6 mt-6 translate-y-0 opacity-100 lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-300">
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
});
