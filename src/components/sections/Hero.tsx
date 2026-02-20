"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "next-themes";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1. Initial State Setup
    gsap.set(".char-reveal", { y: 100, opacity: 0, rotateX: -45 });
    gsap.set(roleRef.current, { y: 20, opacity: 0 });
    gsap.set(taglineRef.current, { y: 20, opacity: 0 });
    gsap.set(ctaRef.current, { y: 20, opacity: 0 });
    gsap.set(scrollRef.current, { opacity: 0 });
    // Optimized: Removed filter blur animation as it causes significant paint overhead
    gsap.set(imageRef.current, { scale: 1.1, opacity: 0 });

    // 2. Cinematic Entrance Sequence
    tl.to(imageRef.current, {
      scale: 1,
      opacity: 1, // Use opacity instead of blur for performance
      duration: 2.0, // Slightly faster
      ease: "power2.inOut",
    })
      .to(".char-reveal", {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.05,
        duration: 1.2,
        ease: "power4.out",
      }, "-=1.2")
      .to(roleRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
      }, "-=0.8")
      .to(taglineRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
      }, "-=0.8")
      .to(ctaRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
      }, "-=0.5")
      .to(scrollRef.current, {
        opacity: 1,
        duration: 1,
      }, "-=0.5");

    // 3. Scroll Parallax Effect
    // 3. Scroll Parallax Effect
    gsap.to(imageRef.current, {
      y: 100, // Reduced movement to keep image steadier
      ease: "none",
      willChange: "transform", // Hint browser
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(nameRef.current, {
      y: -50,
      opacity: 0,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "50% top",
        scrub: true,
      }
    });

  }, { scope: containerRef });

  const renderSplitText = (text: string) => {
    return text.split("").map((char, index) => (
      <span key={index} className="char-reveal inline-block origin-bottom transform-3d opacity-0">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-screen w-full overflow-hidden flex items-center justify-center bg-background"
    >
      {/* Background Image — Conditional: only load the active theme's image */}
      <div ref={imageRef} className="absolute inset-0 z-0 w-full h-full will-change-transform opacity-0">
        {mounted && resolvedTheme === "light" && (
          <>
            <Image
              src="/lightmode.webp"
              alt="Minimal architectural abstract background"
              fill
              sizes="100vw"
              className="object-cover object-[25%_50%] md:object-center"
              priority
              quality={85}
            />
          </>
        )}

        {mounted && resolvedTheme === "dark" && (
          <>
            <Image
              src="/darkmode.webp"
              alt="Liquid metal abstract dark background"
              fill
              sizes="100vw"
              className="object-cover object-[25%_50%] md:object-center"
              priority
              quality={85}
            />
            {/* Vignette & Overlay for text readability */}
            <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
            <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-black/40" aria-hidden="true" />
          </>
        )}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-end text-right">
        <div className="w-full max-w-none perspective-1000">
          <h1
            ref={nameRef}
            className="text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter uppercase mb-6 leading-none text-foreground dark:mix-blend-overlay dark:text-white drop-shadow-2xl"
            aria-label="Mohammed Fawaz"
          >
            <div className="block" aria-hidden="true">{renderSplitText("Mohammed")}</div>
            <div className="block text-secondary dark:text-white/90" aria-hidden="true">{renderSplitText("Fawaz")}</div>
          </h1>

          <p
            ref={roleRef}
            className="text-lg md:text-2xl font-light tracking-[0.2em] uppercase text-foreground/80 dark:text-white/70 max-w-2xl ml-auto mr-0 md:backdrop-blur-xs py-2 px-4 rounded-full border border-white/10 opacity-0"
          >
            Full Stack Developer
          </p>

          {/* Value Proposition Tagline */}
          <p ref={taglineRef} className="text-sm md:text-base font-serif italic text-foreground/50 dark:text-white/40 mt-3 mr-1 tracking-wide opacity-0">
            Building scalable systems with React, Node.js &amp; Cloud Architecture
          </p>

          {/* CTA Buttons */}
          <div
            ref={ctaRef}
            className="flex flex-wrap gap-4 mt-8 justify-end opacity-0"
          >
            <a
              href="#projects"
              className="px-7 py-3 text-sm font-bold uppercase tracking-widest rounded-full
                bg-white/10 backdrop-blur-md border border-white/20
                text-foreground dark:text-white
                hover:bg-white/20 hover:border-white/40
                shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)]
                hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.25)]
                transition-all duration-300"
            >
              Explore My Work
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Resume (opens in new tab)"
              className="px-7 py-3 text-sm font-bold uppercase tracking-widest rounded-full
                border border-foreground/20 dark:border-white/30
                text-foreground/70 dark:text-white/70
                hover:border-foreground dark:hover:border-white
                hover:text-foreground dark:hover:text-white
                transition-all duration-300"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>

      {/* Modern Scroll Indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-0"
      >
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground animate-pulse">Scroll</span>
        <div className="w-px h-16 bg-linear-to-b from-transparent via-foreground/50 to-transparent dark:via-white/50" />
      </div>

    </section>
  );
}
