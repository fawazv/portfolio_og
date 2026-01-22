"use client";

import { motion } from "framer-motion";
import { RevealHeader } from "@/components/ui/reveal-header";

export default function About() {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <RevealHeader className="text-4xl md:text-6xl font-bold uppercase tracking-tight text-foreground">
              About <span className="text-secondary font-serif italic">Me</span>
            </RevealHeader>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
              Enthusiastic and committed self-taught Full Stack Developer with expertise in TypeScript, React.js, Next.js, Node.js, Express.js, and MongoDB. Experienced in building scalable web applications and microservices with a focus on clean code, performance, and maintainability. Strong problem-solving skills with a commitment to continuous learning and delivering high-quality solutions in fast-paced environments.
            </p>

            <motion.a 
                href="#contact"
                className="inline-block relative group overflow-hidden"
                whileHover="hover"
            >
                <span className="block text-lg font-bold uppercase tracking-wide border-b border-foreground pb-1">
                    Read More
                </span>
                <span className="absolute bottom-0 left-0 w-full h-px bg-secondary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </motion.a>
          </motion.div>

          {/* Image / Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] w-full rounded-full overflow-hidden border border-black/10 dark:border-white/10"
          >
             {/* Placeholder for About Image - could be a profile shot or abstract */}
             <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-900" />
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 font-bold uppercase tracking-widest text-4xl transform -rotate-12">
                   Image
              </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
