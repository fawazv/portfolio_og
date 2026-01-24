"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

const testimonials = [
  {
    text: "An absolute professional. Transformed our legacy platform into a high-performance modern app.",
    author: "Sarah Jenkins",
    role: "CTO, TechStart"
  },
  {
    text: "The attention to detail in animations and interactions is unmatched. Highly recommended.",
    author: "David Chen",
    role: "Product Director, FinCorp"
  },
  {
    text: "Delivered on time and exceeded our expectations. The design system they built is scalable and beautiful.",
    author: "Elena Rodriguez",
    role: "Founder, ArtSpace"
  },
  {
    text: "Code quality is top-notch. Documentation was clear, making handover seamless.",
    author: "Markus Weber",
    role: "Lead Dev, Omega Solutions"
  }
];

function TestimonialCard({ item }: { item: typeof testimonials[0] }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className="group relative w-[400px] overflow-hidden bg-foreground/5 border border-foreground/10 p-8"
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
                        radial-gradient(
                        650px circle at ${mouseX}px ${mouseY}px,
                        rgba(255,255,255,0.1),
                        transparent 80%
                        )
                    `,
        }}
      />

      <div className="relative flex h-full flex-col justify-between z-10">
        <p className="text-lg md:text-xl font-medium tracking-tight mb-8 text-foreground/80 dark:text-white/80 leading-relaxed">
          "{item.text}"
        </p>
        <div>
          <div className="text-sm font-bold uppercase tracking-wide text-foreground dark:text-white">
            {item.author}
          </div>
          <div className="text-xs font-bold uppercase tracking-wide text-foreground/50 dark:text-white/50">
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
        <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground text-center mb-4">
          Testimonials
        </h2>
        <div className="w-12 h-1 bg-secondary mx-auto" />
      </div>

      {/* Infinite Marquee */}
      <div className="relative w-full">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-background to-transparent z-20" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-background to-transparent z-20" />

        <motion.div
          className="flex gap-8 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
        >
          {[...testimonials, ...testimonials].map((item, index) => (
            <TestimonialCard key={index} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
