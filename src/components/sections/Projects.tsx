"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    title: "E-Commerce Reform",
    category: "Full Stack",
    image: "/project1.jpg", // Placeholder
    description: "A complete overhaul of a legacy e-commerce platform using Next.js 14 and Shopify Storefront API."
  },
  {
    title: "Fintech Dashboard",
    category: "Dashboard",
    image: "/project2.jpg", // Placeholder
    description: "Real-time financial data visualization with WebSockets and D3.js."
  },
  {
    title: "AI Content Studio",
    category: "SaaS",
    image: "/project3.jpg", // Placeholder
    description: "Generative AI platform for content creators, featuring text-to-image and automated editing."
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
        >
             <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-4">Selected Works</h2>
             <div className="w-24 h-1 bg-secondary" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="group relative h-[500px] w-full bg-accent/10 overflow-hidden cursor-pointer"
                >
                    {/* Image Placeholder */}
                    <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 transition-transform duration-700 group-hover:scale-105">
                         {/* Actual Image component would go here */}
                         <div className="flex items-center justify-center h-full text-muted-foreground/20 font-bold text-6xl uppercase">
                             {index + 1}
                         </div>
                    </div>
                    
                    {/* Overlay Content */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                    
                    <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                         <span className="text-secondary text-sm font-bold uppercase tracking-widest mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                             {project.category}
                         </span>
                         <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-2">
                             {project.title}
                         </h3>
                         <p className="text-white/80 text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200 max-w-sm">
                             {project.description}
                         </p>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
