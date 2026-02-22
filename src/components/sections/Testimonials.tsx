"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useRef } from "react";

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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Only enable spotlight effect on non-touch devices
  const isTouchDevice = typeof window !== "undefined" && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    if (isTouchDevice) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`
    radial-gradient(
      650px circle at ${mouseX}px ${mouseY}px,
      rgba(139,92,246,0.1),
      transparent 80%
    )
  `;

  return (
    <div
      className="group relative cosmos-card rounded-2xl w-[85vw] md:w-[420px] overflow-hidden border-violet-500/15 p-8"
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{ background }}
      />

      <div className="relative flex h-full flex-col justify-between z-10">
        {/* Decorative quote */}
        <span className="text-5xl font-serif text-violet-500/20 dark:text-violet-500/30 leading-none block mb-2">&ldquo;</span>
        <p className="text-base md:text-lg font-light tracking-tight mb-8 text-[#4A4F6A] dark:text-[#C0C4D8] leading-relaxed">
          {item.text}
        </p>
        <div>
          <div className="gradient-text text-sm font-semibold tracking-wide">
            {item.author}
          </div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#6B6F8A] dark:text-[#7B82A8] mt-0.5">
            {item.role}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-background overflow-hidden relative z-10">
      <div className="container mx-auto px-6 mb-16">
        <h2 className="text-xs font-mono text-[#6B6F8A] dark:text-[#7B82A8] tracking-[0.3em] uppercase text-center">
          Peer Endorsements
        </h2>
        <div className="w-16 h-px bg-linear-to-r from-violet-500 to-cyan-400 mx-auto mt-3" />
      </div>

      {/* Infinite Marquee */}
      <div className="relative w-full">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-background to-transparent z-20" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-background to-transparent z-20" />

        <motion.div
          className="marquee-track flex gap-8 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
          style={{ willChange: "transform" }}
        >
          {[...testimonials, ...testimonials].map((item, index) => (
            <TestimonialCard key={index} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
