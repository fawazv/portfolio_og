"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen min-h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background Images - Dual Theme Strategy */}
      {/* Light Mode Image */}
      <div className="absolute inset-0 z-0 dark:hidden">
         <motion.div style={{ y }} className="w-full h-full relative">
            <Image
              src="/light.jpeg"
              alt="Hero Background Light"
              fill
              className="object-cover"
              priority
            />
             <div className="absolute inset-0 bg-white/10" />
         </motion.div>
      </div>

      {/* Dark Mode Image */}
      <div className="absolute inset-0 z-0 hidden dark:block">
        <motion.div style={{ y }} className="w-full h-full relative">
            <Image
              src="/dark.jpeg"
              alt="Hero Background Dark"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
         </motion.div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter uppercase mb-6 mix-blend-difference text-white dark:text-white">
            Creative <br /> Developer
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl font-medium tracking-wide uppercase text-white/90 dark:text-white/80 max-w-2xl mx-auto"
          >
            Crafting cinematic digital experiences with clean code and motion.
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
            <div className="w-px h-24 bg-linear-to-b from-transparent via-white to-transparent opacity-60" />
        </motion.div>

    </section>
  );
}
