"use client";

import { useRef } from "react";
import Image from "next/image";
import { RevealHeader } from "@/components/ui/reveal-header";
import { Github, ExternalLink } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Elite Hotel",
    category: "Microservices",
    image: "https://picsum.photos/seed/elite/800/600",
    description: "Microservices-based Hotel Management System with secure authentication, billing, and integrated payments using Node.js, Express, and Docker.",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "Nxtcart",
    category: "E-commerce",
    image: "https://picsum.photos/seed/nxtcart/800/600",
    description: "Full-stack e-commerce application with customer features, authentication used Auth.js, payments via Stripe/PayPal, and an admin dashboard.",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "Dropbox Clone",
    category: "File Storage",
    image: "https://picsum.photos/seed/dropbox/800/600",
    description: "File storage app built with Next.js and Firebase featuring drag-and-drop uploads, file management, and secure authentication.",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "Blog Platform",
    category: "Microservices",
    image: "https://picsum.photos/seed/blog/800/600",
    description: "Blog platform with Node.js, Express, MongoDB, RabbitMQ, and Docker, featuring microservices, JWT authentication, and CI/CD.",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "Bookstore App",
    category: "Full Stack",
    image: "https://picsum.photos/seed/bookstore/800/600",
    description: "Full-stack web application built with the MERN stack, enabling users to manage a collection of books with CRUD functionality.",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "Pixabay Gallery",
    category: "Frontend",
    image: "https://picsum.photos/seed/pixabay/800/600",
    description: "Responsive image gallery built with React, Vite, and Tailwind CSS, integrating the Pixabay API for image search and display.",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "Room Image Upload",
    category: "Full Stack",
    image: "https://picsum.photos/seed/room/800/600",
    description: "MERN stack application for uploading and storing room images using Cloudinary, with a clean TypeScript-based backend.",
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
          end: "+=2000",
          scrub: 1,
          pin: true,
        },
      }
    );
  }, { scope: triggerRef });

  return (
    <section id="projects" className="overflow-hidden bg-background">
      <div ref={triggerRef} className="">

        {/* Header Section (Pinned with scroll but separate ideally, putting it inside trigger so it pins too) */}
        <div className="h-screen flex flex-col justify-center">
          <div className="container mx-auto px-6 mb-8 md:mb-12 pt-20">
            <RevealHeader className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-4">
              Selected Works
            </RevealHeader>
            <div className="w-24 h-1 bg-secondary" />
            <p className="mt-4 text-muted-foreground">Scroll down to explore gallery</p>
          </div>

          <div
            ref={sectionRef}
            className="flex gap-8 px-6 md:px-20 w-fit"
          >
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative h-[50vh] md:h-[60vh] w-[85vw] md:w-[40vw] shrink-0 bg-accent/10 overflow-hidden cursor-pointer border border-black/5 dark:border-white/5"
              >
                {/* Image Placeholder */}
                <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 transition-transform duration-700 group-hover:scale-105">
                  {/* Actual Image component would go here */}
                  {project.image && (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  )}
                  <div className="flex items-center justify-center h-full text-muted-foreground/20 font-bold text-6xl uppercase absolute inset-0">
                    {index + 1}
                  </div>
                </div>

                {/* Overlay Content */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-colors duration-500" />

                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-secondary text-sm font-bold uppercase tracking-widest mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {project.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-2">
                    {project.title}
                  </h3>
                  <p className="text-white/80 text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200 max-w-sm mb-4">
                    {project.description}
                  </p>

                  <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-secondary transition-colors"
                      title="View Code"
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-secondary transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
