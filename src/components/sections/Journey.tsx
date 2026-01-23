"use client";

import { useRef } from "react";
import { RevealHeader } from "@/components/ui/reveal-header";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const journey = [
  {
    year: "2026 - Present",
    role: "Full Stack Developer",
    company: "Freelance & Open Source",
    description: "Architecting enterprise-scale applications like 'Elite Hotel' (Microservices) and 'Nxtcart' (E-commerce). Expertise in Next.js, Docker, Kubernetes, and Cloud Architecture."
  },
  {
    year: "2024",
    role: "The Pivot to Tech",
    company: "Self-Taught Journey",
    description: "Graduated with a Bachelor of Commerce but discovered a passion for problem-solving. Dedicated 1000+ hours to mastering the MERN stack and software engineering fundamentals."
  },
  {
    year: "2020 - 2023",
    role: "Bachelor of Commerce",
    company: "Calicut University",
    description: "Graduated with a specialization in Co-operation. Developed a strong analytical mindset and understanding of business logic."
  },
  {
    year: "2018 - 2020",
    role: "Computer Applications",
    company: "GHSS Tirurangadi",
    description: "Higher Secondary in Commerce with Computer Applications. Early exposure to programming concepts which sparked my initial interest in tech."
  }
];

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: leftRef.current,
      // markers: true, // debug
    });

    // Animate list items on scroll
    const items = gsap.utils.toArray(".journey-item");
    items.forEach((item: any, i) => {
      gsap.fromTo(item, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <section id="journey" className="bg-background">
      <div 
        ref={containerRef} 
        className="container mx-auto px-6 flex flex-col md:flex-row min-h-screen"
      >
        {/* Left Column - Pinned */}
        <div 
            ref={leftRef} 
            className="w-full md:w-1/2 h-screen flex flex-col justify-center sticky top-0 md:relative"
        >
             <RevealHeader className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8 md:mb-0">
                My Journey
            </RevealHeader>
            <div className="w-24 h-1 bg-secondary mt-4 hidden md:block" />
        </div>

        {/* Right Column - Scrolling Content */}
        <div ref={rightRef} className="w-full md:w-1/2 flex flex-col justify-center py-20 md:py-0">
            <div className="space-y-16">
                {journey.map((item, index) => (
                    <div 
                        key={index}
                        className="journey-item relative flex flex-col gap-4 border-l-2 border-black/10 dark:border-white/10 pl-8 pb-8 last:pb-0"
                    >
                        {/* Dot */}
                        <div className="absolute left-[-9px] top-0 w-4 h-4 bg-secondary rounded-full" />

                        <div className="">
                            <span className="text-secondary font-bold text-sm uppercase tracking-wider block mb-2">
                                {item.year}
                            </span>
                            <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-2">
                                {item.role}
                            </h3>
                            <p className="text-lg font-medium text-muted-foreground uppercase mb-4">
                                {item.company}
                            </p>
                            <p className="text-muted-foreground leading-relaxed max-w-md">
                                {item.description}
                            </p>
                       </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
