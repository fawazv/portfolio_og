"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { RevealHeader } from "@/components/ui/reveal-header";
import Image from "next/image";
import { useRef } from "react";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section id="about" ref={containerRef} className="min-h-screen flex items-center justify-center py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8 order-2 lg:order-1"
          >
            <RevealHeader className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-foreground leading-[0.9]">
              About <br /> <span className="text-secondary font-serif italic tracking-normal">The Dev</span>
            </RevealHeader>

            <motion.div
              className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <p>
                I'm a self-taught Full Stack Developer who pivoted from a background in Commerce to the world of Code.
              </p>
              <p>
                My journey is defined by a relentless curiosity—from studying accounting to debugging distributed systems. I build scalable applications with a focus on performance, clean architecture, and cinematic user experiences.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 relative group overflow-hidden"
              >
                <span className="block text-lg font-bold uppercase tracking-widest border-b border-foreground/30 pb-1 group-hover:border-secondary transition-colors duration-300">
                  Get in Touch
                </span>
                <span className="transform group-hover:translate-x-1 transition-transform duration-300 text-secondary">→</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Image / Visual - Parallax Mask */}
          <div className="relative order-1 lg:order-2">
            <motion.div
              style={{ opacity }}
              className="relative h-[500px] w-full md:h-[700px] overflow-hidden rounded-full lg:rounded-none lg:mask-image-fade"
            >
              <motion.div style={{ y }} className="absolute inset-0 h-[120%] w-full -top-[10%]">
                <Image
                  src="/about-visual.png"
                  alt="About Me Visual"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  priority
                />
              </motion.div>

              {/* Cinematic Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-60" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
