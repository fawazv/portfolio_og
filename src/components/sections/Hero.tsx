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
      {/* Ambient Orb Background — Dark Cosmos depth layer */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-violet-400/8 dark:bg-violet-600/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-400/6 dark:bg-cyan-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Background Image — Conditional: only load the active theme's image */}
      <div ref={imageRef} className="absolute inset-0 z-0 w-full h-full will-change-transform opacity-0">
        {mounted && resolvedTheme === "light" && (
          <>
            <Image
              src="/lightmode.png"
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
              src="/darkmode.png"
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
            className="text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter uppercase mb-6 leading-none drop-shadow-2xl"
            aria-label="Mohammed Fawaz"
          >
            <div className="block text-space dark:text-[#F0F0FF]" aria-hidden="true">{renderSplitText("Mohammed")}</div>
            <div className="block text-violet-600 dark:text-violet-400" aria-hidden="true">{renderSplitText("Fawaz")}</div>
          </h1>

          <p
            ref={roleRef}
            className="font-mono text-sm tracking-widest text-violet-600 dark:text-cyan-400 max-w-2xl ml-auto mr-0 backdrop-blur-md py-2 px-4 rounded-full border border-violet-500/20 dark:border-violet-500/25 bg-violet-500/8 dark:bg-violet-500/10 opacity-0"
          >
            Full Stack Developer
          </p>

          {/* Value Proposition Tagline */}
          <p ref={taglineRef} className="font-mono text-xs tracking-wider text-[#6B6F8A] dark:text-[#7B82A8] mt-3 mr-1 opacity-0">
            &gt; Building scalable systems with React, Node.js &amp; Cloud Architecture
          </p>

          {/* CTA Buttons */}
          <div
            ref={ctaRef}
            className="flex flex-wrap gap-4 mt-8 justify-end opacity-0"
          >
            <a
              href="#projects"
              className="glow-btn-violet px-8 py-3 text-sm font-semibold tracking-wide rounded-full bg-violet-600 hover:bg-violet-500 text-white transition-all duration-300"
            >
              Explore My Work
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Resume (opens in new tab)"
              className="px-8 py-3 text-sm font-semibold tracking-wide rounded-full border border-violet-500/40 text-violet-600 dark:text-violet-300 hover:border-violet-500 dark:hover:border-violet-400 hover:bg-violet-500/10 transition-all duration-300"
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
        <span className="text-[10px] uppercase tracking-widest text-violet-500/40 dark:text-violet-400/50 animate-pulse">Scroll</span>
        <div className="w-px h-16 bg-linear-to-b from-transparent via-violet-500/30 dark:via-violet-400/50 to-transparent" />
      </div>

    </section>
  );
}
