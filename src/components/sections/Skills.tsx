"use client";

import { motion } from "framer-motion";

const skillCategories = [
  {
    name: "Frontend",
    dot: "bg-violet-400",
    skills: [
      "JavaScript (ES6+)", "TypeScript", "React.js", "Next.js",
      "HTML5", "CSS3", "Tailwind CSS", "Vite", "Material UI",
      "Shadcn UI", "Bootstrap", "Framer Motion", "Redux Toolkit", "Context API"
    ]
  },
  {
    name: "Backend",
    dot: "bg-cyan-400",
    skills: ["Node.js", "Express.js", "REST API", "RabbitMQ"]
  },
  {
    name: "Database",
    dot: "bg-rose-400",
    skills: ["MongoDB", "PostgreSQL", "Mongoose", "NoSQL"]
  },
  {
    name: "DevOps & Cloud",
    dot: "bg-emerald-400",
    skills: ["Docker", "Nginx", "AWS EC2", "AWS S3", "Google Cloud", "Firebase"]
  },
];

const toolsSkills = ["Git", "Postman", "Figma", "VS Code", "GitHub", "Insomnia", "Notion"];

export default function Skills() {
  // Duplicate for seamless marquee loop
  const marqueeItems = [...toolsSkills, ...toolsSkills, ...toolsSkills];

  return (
    <section
      id="skills"
      className="py-24 bg-background border-y border-violet-500/10 relative overflow-hidden"
    >
      {/* Dot Grid Overlay */}
      <div className="absolute inset-0 dot-grid pointer-events-none" aria-hidden="true" />
      {/* Ambient orb */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-violet-400/6 dark:bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
      {/* Section Header */}
      <div className="container mx-auto px-6 mb-14">
        <div className="flex items-center gap-6">
          <h2 className="text-violet-600 dark:text-violet-400 font-mono text-xs tracking-[0.3em] uppercase whitespace-nowrap">
            Tech Stack
          </h2>
          <div className="flex-1 h-px bg-linear-to-r from-violet-500/40 to-transparent" />
        </div>
      </div>

      {/* Skill Categories */}
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
                <span className={`w-1.5 h-1.5 rounded-full ${category.dot} shrink-0`} />
                <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#6B6F8A] dark:text-[#7B82A8] whitespace-nowrap">
                  {category.name}
                </h3>
                <div className="flex-1 h-px bg-violet-500/10" />
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
                    className="group cosmos-card rounded-full px-4 py-2 cursor-default hover:border-violet-500/50 hover:shadow-[0_0_12px_rgba(139,92,246,0.12)] dark:hover:shadow-[0_0_12px_rgba(139,92,246,0.2)] transition-all duration-300"
                  >
                    <span className="text-sm font-mono text-[#6B6F8A] dark:text-[#7B82A8] group-hover:text-space dark:group-hover:text-white transition-colors duration-300">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tools Marquee Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="mt-20 overflow-hidden"
      >
        {/* Category label */}
        <div className="container mx-auto px-6 mb-6">
          <div className="flex items-center gap-4">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#6B6F8A] dark:text-[#7B82A8] whitespace-nowrap">
              Tools
            </h3>
            <div className="flex-1 h-px bg-violet-500/10" />
          </div>
        </div>

        {/* Scrolling strip */}
        <div className="relative w-full">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-4 w-max"
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{ duration: 18, ease: "linear", repeat: Infinity }}
          >
            {marqueeItems.map((tool, i) => (
              <div
                key={`${tool}-${i}`}
                className="cosmos-card rounded-full px-5 py-2.5 shrink-0 hover:border-violet-500/50 hover:shadow-[0_0_12px_rgba(139,92,246,0.12)] dark:hover:shadow-[0_0_12px_rgba(139,92,246,0.2)] transition-all duration-300 cursor-default group"
              >
                <span className="text-sm font-mono text-[#6B6F8A] dark:text-[#7B82A8] group-hover:text-space dark:group-hover:text-white transition-colors duration-300">
                  {tool}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
