"use client";

import { useRef, useEffect } from "react";
import { RevealHeader } from "@/components/ui/reveal-header";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "5+", label: "Projects Shipped" },
  { value: "1000+", label: "Hours of Code" },
  { value: "5+", label: "Microservices Built" },
  { value: "10+", label: "Technologies Mastered" },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple one-shot opacity reveal — no continuous scrub
      gsap.fromTo(
        imageContainerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Single unified reveal for text column + children (merged 3 triggers → 1)
      const textTl = gsap.timeline({
        scrollTrigger: {
          trigger: textColRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // Text column slides in
      textTl.fromTo(
        textColRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
      );

      // Children stagger right after
      textTl.fromTo(
        ".about-reveal",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.08 },
        "-=0.2"
      );

      // Stats stagger last
      textTl.fromTo(
        ".stat-card",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out", stagger: 0.06 },
        "-=0.2"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="min-h-screen flex items-center justify-center py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 dot-grid pointer-events-none" aria-hidden="true" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Content */}
          <div
            ref={textColRef}
            className="space-y-8 order-2 lg:order-1"
            style={{ opacity: 0 }}
          >
            <RevealHeader className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-foreground leading-[0.9]">
              About <br /> <span className="gradient-text font-bold">The Dev</span>
            </RevealHeader>

            <div
              className="about-reveal space-y-5 text-base md:text-lg text-[#6B6F8A] dark:text-[#7B82A8] leading-relaxed max-w-lg"
              style={{ opacity: 0 }}
            >
              <p>
                Self-taught Full Stack Developer who pivoted from a B.Com degree to building production-grade systems in under a year. I&apos;ve shipped 5+ projects across e-commerce, microservices, and cloud storage, dedicating 1000+ hours to mastering the MERN stack and modern DevOps practices.
              </p>
              <p>
                I specialize in distributed backends — breaking monoliths into Node.js microservices, containerizing with Docker, managing async communication via RabbitMQ, and deploying on AWS EC2/S3. On the frontend, I pair React &amp; Next.js with GSAP to build interfaces that feel as good as they perform.
              </p>
            </div>

            {/* Stats Bar */}
            <div
              className="about-stats about-reveal grid grid-cols-2 sm:grid-cols-4 gap-4 py-6"
              style={{ opacity: 0 }}
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="stat-card cosmos-card rounded-xl p-4 text-center sm:text-left"
                  style={{ opacity: 0 }}
                >
                  <div className="text-3xl font-black tracking-tighter gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-xs font-mono uppercase tracking-widest text-[#6B6F8A] dark:text-[#7B82A8] mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Job Seeking */}
            <div className="about-reveal space-y-6" style={{ opacity: 0 }}>
              <div>
                <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-violet-600 dark:text-cyan-400 mb-2">
                  What I&apos;m Looking For
                </h3>
                <p className="text-[#6B6F8A] dark:text-[#7B82A8] leading-relaxed">
                  Fast-paced environments where I can build scalable systems from the ground up, contributing as a Full Stack or Backend Engineer.
                </p>
              </div>
              <div>
                <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-violet-600 dark:text-cyan-400 mb-2">
                  Presently Learning
                </h3>
                <p className="text-[#6B6F8A] dark:text-[#7B82A8] leading-relaxed">
                  Expanding my stack with React Native for cross-platform mobile apps, and Python for robust backend and AI integrations.
                </p>
              </div>
              <div className="pt-6 flex flex-wrap gap-6 items-center">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glow-btn-violet inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm rounded-full transition-all"
                >
                  Download Resume
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 relative group overflow-hidden"
                >
                  <span className="block text-sm font-bold uppercase tracking-widest text-violet-600 dark:text-cyan-400 border-b border-violet-500/50 dark:border-cyan-400/50 pb-1 group-hover:border-violet-500 dark:group-hover:border-cyan-400 transition-colors duration-300">
                    Get in Touch
                  </span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300 text-violet-600 dark:text-cyan-400">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative order-1 lg:order-2">
            <div
              ref={imageContainerRef}
              className="relative h-[350px] sm:h-[450px] w-full md:h-[700px] overflow-hidden rounded-3xl ring-1 ring-violet-500/20 hover:ring-violet-500/50 transition-all duration-700"
              style={{ opacity: 0 }}
            >
              <div className="absolute inset-0 h-full w-full">
                <Image
                  src="/portrait.webp"
                  alt="Mohammed Fawaz — Full Stack Developer based in Kerala, India"
                  fill
                  className="object-cover object-center sm:object-top mt-12 sm:mt-0 grayscale transition-all duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-60" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
