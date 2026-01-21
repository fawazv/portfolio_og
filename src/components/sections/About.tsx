"use client";

import { motion } from "framer-motion";

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
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight text-foreground">
              We <span className="text-muted-foreground font-serif italic normal-case">help create</span> <br/>
              Moments of <br/>
              <span className="text-secondary">Excellence</span>
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
              I am a passionate developer focused on building scalable, performant, and accessible web applications. 
              My approach combines technical precision with a keen eye for design, ensuring that every line of code contributes to an exceptional user experience.
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
