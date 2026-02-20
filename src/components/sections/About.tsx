"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { RevealHeader } from "@/components/ui/reveal-header";
import Image from "next/image";
import { useRef } from "react";

const stats = [
  { value: "5+", label: "Projects Shipped" },
  { value: "1000+", label: "Hours of Code" },
  { value: "5+", label: "Microservices Built" },
  { value: "10+", label: "Technologies Mastered" },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
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
              className="space-y-5 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <p>
                Self-taught Full Stack Developer who pivoted from a B.Com degree to building production-grade systems in under a year. I've shipped 5+ projects across e-commerce, microservices, and cloud storage, dedicating 1000+ hours to mastering the MERN stack and modern DevOps practices.
              </p>
              <p>
                I specialize in distributed backends — breaking monoliths into Node.js microservices, containerizing with Docker, managing async communication via RabbitMQ, and deploying on AWS EC2/S3. On the frontend, I pair React &amp; Next.js with GSAP and Framer Motion to build interfaces that feel as good as they perform.
              </p>
            </motion.div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.8 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y border-black/8 dark:border-white/8"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  className="text-center sm:text-left"
                >
                  <div className="text-2xl md:text-3xl font-black tracking-tighter text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
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
              className="relative h-[500px] w-full md:h-[700px] overflow-hidden rounded-2xl"
            >
              <motion.div style={{ y }} className="absolute inset-0 h-[120%] w-full -top-[10%]">
                <Image
                  src="/portrait.webp"
                  alt="Mohammed Fawaz — Full Stack Developer based in Kerala, India"
                  fill
                  className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
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
