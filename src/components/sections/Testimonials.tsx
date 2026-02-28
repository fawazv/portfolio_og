"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    text: "Fawaz has a rare ability to break down complex system architecture into elegant, maintainable microservices. His work on our authentication flow was flawless.",
    author: "Rahul V.",
    role: "Senior Backend Engineer"
  },
  {
    text: "Working with him on the frontend is a breeze. He doesn't just write React components; he builds intuitive, fully-optimized user experiences.",
    author: "Sneha M.",
    role: "UI/UX Designer & Frontend Dev"
  },
  {
    text: "I've collaborated with Fawaz on several open-source initiatives. His code quality, documentation, and understanding of Docker are always top-tier.",
    author: "James T.",
    role: "Open Source Contributor"
  },
  {
    text: "A highly driven developer who genuinely cares about performance. His transition from monoliths to event-driven architectures showed real growth.",
    author: "Arif K.",
    role: "Technical Lead"
  }
];

function TestimonialCard({ item }: { item: typeof testimonials[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const spotlight = spotlightRef.current;
    if (!card || !spotlight) return;

    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top } = card.getBoundingClientRect();
      spotlight.style.background = `radial-gradient(500px circle at ${e.clientX - left}px ${e.clientY - top}px, rgba(139,92,246,0.08), transparent 80%)`;
    };
    const handleMouseEnter = () => { spotlight.style.opacity = "1"; };
    const handleMouseLeave = () => { spotlight.style.opacity = "0"; };

    card.addEventListener("mousemove", handleMouseMove, { passive: true });
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="group relative cosmos-card rounded-2xl w-[85vw] md:w-[420px] shrink-0 overflow-hidden border-violet-500/15 p-8"
    >
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
        style={{ opacity: 0 }}
      />
      <div className="relative flex h-full flex-col justify-between z-10">
        <span className="text-5xl font-serif text-violet-500/20 dark:text-violet-500/30 leading-none block mb-2">&ldquo;</span>
        <p className="text-base md:text-lg font-light tracking-tight mb-8 text-[#4A4F6A] dark:text-[#C0C4D8] leading-relaxed">
          {item.text}
        </p>
        <div>
          <div className="gradient-text text-sm font-semibold tracking-wide">{item.author}</div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#6B6F8A] dark:text-[#7B82A8] mt-0.5">{item.role}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // Duplicate once for seamless loop
  const doubled = [...testimonials, ...testimonials];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const halfWidth = track.scrollWidth / 2;

    tweenRef.current = gsap.to(track, {
      x: -halfWidth,
      duration: 32,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (x: string) => `${parseFloat(x) % halfWidth}px`,
      },
    });

    // Pause marquee when section is off-screen
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => tweenRef.current?.play(),
      onLeave: () => tweenRef.current?.pause(),
      onEnterBack: () => tweenRef.current?.play(),
      onLeaveBack: () => tweenRef.current?.pause(),
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="py-24 bg-background overflow-hidden relative z-10">
      <div className="container mx-auto px-6 mb-16">
        <h2 className="text-xs font-mono text-[#6B6F8A] dark:text-[#7B82A8] tracking-[0.3em] uppercase text-center">
          Peer Endorsements
        </h2>
        <div className="w-16 h-px bg-linear-to-r from-violet-500 to-cyan-400 mx-auto mt-3" />
      </div>

      <div className="relative w-full">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-background to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-background to-transparent z-20 pointer-events-none" />

        {/* GSAP translates this element */}
        <div ref={trackRef} className="flex gap-8 w-max will-change-transform">
          {doubled.map((item, index) => (
            <TestimonialCard key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
