"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1. Initial State Setup
    gsap.set(".char-reveal", { y: 100, opacity: 0, rotateX: -45 });
    gsap.set(roleRef.current, { y: 20, opacity: 0 });
    gsap.set(scrollRef.current, { opacity: 0 });
    // Reduced scale from 1.1 to 1.05 for "zoomed out" feel, reduced blur for clarity
    gsap.set(imageRef.current, { scale: 1.05, filter: "blur(5px)" });

    // 2. Cinematic Entrance Sequence
    tl.to(imageRef.current, {
      scale: 1,
      filter: "blur(0px)",
      duration: 2.5,
      ease: "power2.inOut",
    })
      .to(".char-reveal", {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.05,
        duration: 1.2,
        ease: "power4.out",
      }, "-=1.5")
      .to(roleRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
      }, "-=0.8")
      .to(scrollRef.current, {
        opacity: 1,
        duration: 1,
      }, "-=0.5");

    // 3. Scroll Parallax Effect
    gsap.to(imageRef.current, {
      y: 100, // Reduced movement to keep image steadier
      scale: 1.02, // Minimal zoom on scroll to maintain sharpness
      ease: "none",
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
      <span key={index} className="char-reveal inline-block origin-bottom transform-3d">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-screen w-full overflow-hidden flex items-center justify-center bg-background"
    >
      {/* Background Images - Cinematic Dual Theme Strategy */}
      <div ref={imageRef} className="absolute inset-0 z-0 w-full h-full will-change-transform">
        {/* Light Mode: Architectural Minimal */}
        <div className="absolute inset-0 z-0 dark:hidden">
          <Image
            src="/lightmode.png"
            alt="Architectural Abstract"
            fill
            sizes="100vw"
            className="object-cover object-[25%_50%] md:object-center"
            priority
            quality={100}
          />

        </div>

        {/* Dark Mode: Liquid Metal */}
        <div className="absolute inset-0 z-0 hidden dark:block">
          <Image
            src="/darkmode.png"
            alt="Liquid Metal Abstract"
            fill
            sizes="100vw"
            className="object-cover object-[25%_50%] md:object-center"
            priority
            quality={100}
          />
          {/* Vignette & Overlay for text readability */}
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-black/40" />
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-end text-right">
        <div className="w-full max-w-none perspective-1000">
          <h1 ref={nameRef} className="text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter uppercase mb-6 leading-none text-foreground dark:mix-blend-overlay dark:text-white drop-shadow-2xl">
            <div className="block">{renderSplitText("Mohammed")}</div>
            <div className="block text-secondary dark:text-white/90">{renderSplitText("Fawaz")}</div>
          </h1>

          <p
            ref={roleRef}
            className="text-lg md:text-2xl font-light tracking-[0.2em] uppercase text-foreground/80 dark:text-white/70 max-w-2xl ml-auto mr-0 backdrop-blur-xs py-2 px-4 rounded-full border border-white/10"
          >
            Full Stack Developer
          </p>
        </div>
      </div>

      {/* Modern Scroll Indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground animate-pulse">Scroll</span>
        <div className="w-px h-16 bg-linear-to-b from-transparent via-foreground/50 to-transparent dark:via-white/50" />
      </div>

    </section>
  );
}
