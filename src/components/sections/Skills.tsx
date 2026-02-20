"use client";

import { motion } from "framer-motion";

const skillCategories = [
  {
    name: "Frontend",
    skills: [
      "JavaScript (ES6+)", "TypeScript", "React.js", "Next.js",
      "HTML5", "CSS3", "Tailwind CSS", "Vite", "Material UI",
      "Shadcn UI", "Bootstrap", "Framer Motion", "Redux Toolkit", "Context API"
    ]
  },
  {
    name: "Backend",
    skills: ["Node.js", "Express.js", "REST API", "RabbitMQ"]
  },
  {
    name: "Database",
    skills: ["MongoDB", "PostgreSQL", "Mongoose", "NoSQL"]
  },
  {
    name: "DevOps & Cloud",
    skills: ["Docker", "Nginx", "AWS EC2", "AWS S3", "Google Cloud", "Firebase"]
  },
  {
    name: "Tools",
    skills: ["Git", "Postman", "Figma"]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-accent/20 border-y border-black/5 dark:border-white/5">
      <div className="container mx-auto px-6 mb-12">
        <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
          Tech Stack
        </h2>
        <div className="w-full h-px bg-black/10 dark:bg-white/10" />
      </div>

      <div className="container mx-auto px-6">
        <div className="space-y-14">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.08, duration: 0.6 }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground whitespace-nowrap">
                  {category.name}
                </h3>
                <div className="flex-1 h-px bg-black/8 dark:bg-white/8" />
              </div>

              {/* Skill Pills */}
              <div className="flex flex-wrap gap-3 md:gap-4">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIndex * 0.06 + index * 0.03, duration: 0.4 }}
                    className="group relative px-5 py-2.5 border border-black/10 dark:border-white/10 rounded-full hover:border-black dark:hover:border-white transition-colors cursor-default bg-background"
                  >
                    <span className="text-sm md:text-base font-medium uppercase tracking-tight text-muted-foreground group-hover:text-foreground transition-colors">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
