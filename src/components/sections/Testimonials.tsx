"use client";

import { motion } from "framer-motion";

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

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-accent/5 overflow-hidden">
       <div className="container mx-auto px-6 mb-16">
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground text-center">
                What People Say
            </h2>
       </div>

       {/* Simple Marquee Animation */}
       <div className="relative w-full">
           <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-background to-transparent z-10" />
           <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-background to-transparent z-10" />
           
           <motion.div 
                className="flex gap-8 w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
           >
               {[...testimonials, ...testimonials].map((item, index) => (
                   <div 
                        key={index} 
                        className="w-[400px] p-8 bg-background border border-black/5 dark:border-white/5 flex flex-col justify-between"
                    >
                       <p className="text-lg md:text-xl font-medium tracking-tight mb-6">
                           "{item.text}"
                       </p>
                       <div>
                           <div className="text-sm font-bold uppercase tracking-wide text-foreground">
                               {item.author}
                           </div>
                           <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                               {item.role}
                           </div>
                       </div>
                   </div>
               ))}
           </motion.div>
       </div>
    </section>
  );
}
