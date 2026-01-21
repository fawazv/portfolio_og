"use client";

import { motion } from "framer-motion";

const experience = [
  {
    year: "2024 - Present",
    role: "Senior Frontend Engineer",
    company: "TechFlow Systems",
    description: "Leading the migration to Next.js App Router and implementing a new design system."
  },
  {
    year: "2021 - 2024",
    role: "Full Stack Developer",
    company: "Creative Pulse Agency",
    description: "Built award-winning marketing sites and complex e-commerce platforms for global brands."
  },
  {
    year: "2019 - 2021",
    role: "UI/UX Designer & Dev",
    company: "Freelance",
    description: "Collaborated with startups to design and prototype MVPs using React and Figma."
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-accent/5">
      <div className="container mx-auto px-6">
         <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-20 text-center"
        >
            Experience
        </motion.h2>

        <div className="max-w-4xl mx-auto relative">
            {/* Vertical Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-black/10 dark:bg-white/10 transform md:-translate-x-1/2 ml-6 md:ml-0" />

            <div className="space-y-16">
                {experience.map((item, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                    >
                        {/* Dot */}
                        <div className="absolute left-0 md:left-1/2 top-0 w-3 h-3 bg-secondary rounded-full transform md:-translate-x-1/2 translate-y-2 ml-[1.35rem] md:ml-0 z-10 box-content border-4 border-background" />

                        <div className="md:w-1/2 pl-16 md:pl-0">
                           <div className={`p-6 bg-background border border-black/5 dark:border-white/5 shadow-sm rounded-sm ${index % 2 === 0 ? 'md:text-left md:mr-12' : 'md:text-right md:ml-12'}`}>
                                <span className="text-secondary font-bold text-sm uppercase tracking-wider block mb-2">
                                    {item.year}
                                </span>
                                <h3 className="text-xl font-bold uppercase tracking-tight mb-1">
                                    {item.role}
                                </h3>
                                <p className="text-sm font-medium text-muted-foreground uppercase mb-4">
                                    {item.company}
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    {item.description}
                                </p>
                           </div>
                        </div>
                        <div className="md:w-1/2" /> {/* Spacer */}
                    </motion.div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
