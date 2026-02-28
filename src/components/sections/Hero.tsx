"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1. Initial State Setup
    gsap.set(".char-reveal", { yPercent: 110, opacity: 0 });
    gsap.set(roleRef.current, { y: 20, opacity: 0 });
    gsap.set(taglineRef.current, { y: 20, opacity: 0 });
    gsap.set(ctaRef.current, { y: 20, opacity: 0 });
    gsap.set(scrollRef.current, { opacity: 0 });
    gsap.set(imageRef.current, { scale: 1.1, opacity: 0 });

    // 2. Cinematic Entrance Sequence
    tl.to(imageRef.current, {
      scale: 1,
      opacity: 1,
      force3D: true,
      duration: 2.0,
      ease: "power2.inOut",
    })
      .to(".char-reveal", {
        yPercent: 0,
        opacity: 1,
        force3D: true,
        stagger: 0.04,
        duration: 0.9,
        ease: "power3.out",
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
    // Cache innerWidth once to avoid multiple forced layout reads
    const vw = window.innerWidth;
    const isMobile = vw < 768;
    gsap.to(parallaxRef.current, {
      y: isMobile ? 40 : 100,
      ease: "none",
      // willChange handled by CSS class will-change-transform on wrapper
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: isMobile ? false : true,
        toggleActions: isMobile ? "play none none reverse" : undefined,
      },
    });

    gsap.to(nameRef.current, {
      y: -50,
      opacity: 0,
      force3D: true,
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
      <span key={index} className="char-reveal inline-block overflow-hidden opacity-0">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-screen w-full overflow-hidden flex items-center justify-center bg-background"
    >
      {/* Background Image — Loaded immediately, displayed conditionally via CSS */}
      <div ref={parallaxRef} className="absolute inset-0 z-0 w-full h-full will-change-transform">
        <div ref={imageRef} className="absolute inset-0 w-full h-full opacity-0 origin-center">

          {/* Light Mode Image */}
          <div className="dark:hidden absolute inset-0 w-full h-full">
            <Image
              src="/lightmode.webp"
              alt="Minimal architectural abstract background"
              fill
              sizes="100vw"
              className="object-cover object-[15%_50%] sm:object-[20%_50%] md:object-center"
              priority
              quality={85}
            />
          </div>

          {/* Dark Mode Image */}
          <div className="hidden dark:block absolute inset-0 w-full h-full">
            <Image
              src="/darkmode.webp"
              alt="Liquid metal abstract dark background"
              fill
              sizes="100vw"
              className="object-cover object-[15%_50%] sm:object-[20%_50%] md:object-center"
              priority
              quality={85}
            />
            {/* Vignette & Overlay for text readability */}
            <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
            <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-black/40" aria-hidden="true" />
          </div>

        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-end text-right">
        <div className="w-full max-w-none perspective-1000">
          <h1
            ref={nameRef}
            className="text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter uppercase mb-6 leading-none text-foreground dark:text-white md:drop-shadow-2xl"
            aria-label="Mohammed Fawaz"
          >
            <div className="block" aria-hidden="true">{renderSplitText("Mohammed")}</div>
            <div className="block text-violet-600 dark:text-violet-400 drop-shadow-lg" aria-hidden="true">{renderSplitText("Fawaz")}</div>
          </h1>

          <p
            ref={roleRef}
            className="text-lg md:text-2xl font-light tracking-[0.2em] uppercase text-violet-600 dark:text-cyan-400 max-w-2xl ml-auto mr-0 md:backdrop-blur-md py-2 px-6 rounded-full border border-violet-500/20 dark:border-cyan-500/20 bg-violet-500/5 dark:bg-cyan-500/10 opacity-0"
          >
            Full Stack Developer
          </p>

          {/* Value Proposition Tagline */}
          <p ref={taglineRef} className="text-sm md:text-base font-serif italic text-muted-foreground dark:text-[#7B82A8] mt-3 mr-1 tracking-wide opacity-0">
            Building scalable systems with React, Node.js &amp; Cloud Architecture
          </p>

          {/* CTA Buttons */}
          <div
            ref={ctaRef}
            className="flex flex-wrap gap-4 mt-8 justify-end opacity-0"
          >
            <a
              href="#projects"
              className="glow-btn-violet px-8 py-3.5 text-sm font-bold uppercase tracking-widest rounded-full
                bg-violet-600 hover:bg-violet-500 text-white transition-all duration-300"
            >
              Explore My Work
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Resume (opens in new tab)"
              className="px-8 py-3.5 text-sm font-bold uppercase tracking-widest rounded-full
                border border-violet-500/40 text-violet-600 dark:text-violet-300
                hover:border-violet-500 dark:hover:border-violet-400 hover:bg-violet-500/10
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
        <span className="text-[10px] uppercase tracking-widest text-[#6B6F8A] dark:text-[#7B82A8]">Scroll</span>
        <div className="w-px h-16 bg-linear-to-b from-transparent via-violet-500/50 dark:via-cyan-400/50 to-transparent" />
      </div>

    </section>
  );
}
