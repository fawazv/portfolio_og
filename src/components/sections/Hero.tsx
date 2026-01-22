"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Initial state
    gsap.set(titleRef.current, { y: 100, opacity: 0 });
    gsap.set(subtitleRef.current, { y: 50, opacity: 0 });
    gsap.set(scrollRef.current, { opacity: 0 });
    gsap.set(imageRef.current, { scale: 1.2 });

    // Animation Sequence
    tl.to(imageRef.current, {
      scale: 1,
      duration: 2,
      ease: "power2.inOut",
    })
    .to(titleRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.1,
    }, "-=1.5")
    .to(subtitleRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
    }, "-=1")
    .to(scrollRef.current, {
      opacity: 1,
      duration: 1,
    }, "-=0.5");

    // Scroll Parallax Effect
    gsap.to(imageRef.current, {
      y: 200,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative h-screen min-h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background Images - Dual Theme Strategy */}
      <div ref={imageRef} className="absolute inset-0 z-0 w-full h-full">
         <div className="absolute inset-0 z-0 dark:hidden">
            <Image
              src="/light.png"
              alt="Hero Background Light"
              fill
              className="object-cover"
              priority
            />
             <div className="absolute inset-0 bg-white/10" />
         </div>

         <div className="absolute inset-0 z-0 hidden dark:block">
            <Image
              src="/dark.png"
              alt="Hero Background Dark"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
         </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <div className="max-w-4xl overflow-hidden">
          <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter uppercase mb-6 mix-blend-difference text-white dark:text-white">
            Mohammed <br /> Fawaz
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-lg md:text-xl font-medium tracking-wide uppercase text-white/90 dark:text-white/80 max-w-2xl mx-auto"
          >
            Full Stack Developer
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
        <div 
            ref={scrollRef}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
            <div className="w-px h-24 bg-linear-to-b from-transparent via-white to-transparent opacity-60 animate-bounce" />
        </div>

    </section>
  );
}
