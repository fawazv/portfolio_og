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
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Desktop: Pinning and Timeline Animation
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: leftRef.current,
      });

      const line = containerRef.current?.querySelector(".timeline-line-fill");
      if (line) {
        gsap.fromTo(line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: rightRef.current,
              start: "top 60%",
              end: "bottom 80%",
              scrub: 1,
            }
          }
        );
      }
    });

    // Universal: Item Reveal (works on both but simple on mobile)
    const items = gsap.utils.toArray(".journey-item");
    items.forEach((item: any, i) => {
      gsap.fromTo(item,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => mm.revert();

  }, { scope: containerRef });

  return (
    <section id="journey" className="bg-background relative overflow-hidden">
      {/* Dot Grid Overlay */}
      <div className="absolute inset-0 dot-grid pointer-events-none" aria-hidden="true" />
      {/* Ambient orb — cyan tint for variety */}
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
      <div
        ref={containerRef}
        className="container mx-auto px-6 flex flex-col md:flex-row min-h-screen"
      >
        {/* Left Column - Pinned */}
        <div
          ref={leftRef}
          className="w-full md:w-1/2 flex flex-col justify-center relative"
        >
          <RevealHeader className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8 md:mb-0">
            My <span className="gradient-text">Journey</span>
          </RevealHeader>
          <div className="w-24 h-px bg-linear-to-r from-violet-500 to-cyan-400 mt-4 hidden md:block" />
        </div>

        {/* Right Column - Scrolling Content */}
        <div ref={rightRef} className="w-full md:w-1/2 flex flex-col justify-center py-20 md:py-32 relative">

          {/* Thread/Timeline Line */}
          <div className="absolute left-0 top-24 bottom-20 w-[2px] bg-violet-500/10 hidden md:block overflow-hidden rounded-full">
            <div className="timeline-line-fill w-full h-full bg-linear-to-b from-violet-500/40 via-cyan-400/20 to-transparent origin-top shadow-[0_0_15px_rgba(139,92,246,0.4)]" />
          </div>

          <div className="space-y-24 pl-0 md:pl-12">
            {journey.map((item, index) => (
              <div
                key={index}
                className="journey-item relative flex flex-col gap-4 border-l-2 md:border-l-0 border-violet-500/15 pl-8 md:pl-0"
              >
                {/* Mobile Glow Border */}
                <div className="absolute left-[-2px] top-0 h-full w-[2px] bg-violet-500 md:hidden origin-top scale-y-0 transition-transform duration-1000" />

                <div className="relative cosmos-card rounded-2xl p-6">
                  {/* Desktop Dot */}
                  <div className="absolute -left-[70px] top-4 w-3 h-3 bg-violet-500 rounded-full hidden md:block z-10 shadow-[0_0_8px_rgba(124,58,237,0.3)] dark:shadow-[0_0_12px_rgba(139,92,246,0.6)]" />

                  <span className="font-mono text-xs tracking-wider text-violet-600/70 dark:text-cyan-400/70 block mb-2">
                    {item.year}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-semibold uppercase tracking-tight mb-1 text-space dark:text-[#F0F0FF]">
                    {item.role}
                  </h3>
                  <p className="text-sm font-mono text-[#6B6F8A] dark:text-[#7B82A8] uppercase mb-3 tracking-wide">
                    {item.company}
                  </p>
                  <p className="text-[#6B6F8A] dark:text-[#7B82A8] text-sm leading-relaxed max-w-lg">
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
