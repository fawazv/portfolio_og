"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    name: "Frontend",
    dot: "bg-violet-400",
    skills: [
      "JavaScript (ES6+)", "TypeScript", "React.js", "Next.js",
      "HTML5", "CSS3", "Tailwind CSS", "Vite", "Material UI",
      "Shadcn UI", "Bootstrap", "GSAP", "Redux Toolkit", "Context API"
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
  {
    name: "Tools",
    dot: "bg-orange-400",
    skills: ["Git", "Postman", "Figma", "VS Code", "GitHub", "Insomnia", "Notion"]
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skill-category",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".skills-grid",
            start: "top 85%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 bg-background border-y border-violet-500/10 relative overflow-hidden"
    >
      <div className="absolute inset-0 dot-grid pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-violet-400/6 dark:bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-6 mb-14">
        <div className="flex items-center gap-6">
          <h2 className="text-violet-600 dark:text-violet-400 font-mono text-xs tracking-[0.3em] uppercase whitespace-nowrap">
            Tech Stack
          </h2>
          <div className="flex-1 h-px bg-linear-to-r from-violet-500/40 to-transparent" />
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="skills-grid space-y-14">
          {skillCategories.map((category) => (
            <div key={category.name} className="skill-category" style={{ opacity: 0 }}>
              <div className="flex items-center gap-4 mb-6">
                <span className={`w-1.5 h-1.5 rounded-full ${category.dot} shrink-0`} />
                <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#6B6F8A] dark:text-[#7B82A8] whitespace-nowrap">
                  {category.name}
                </h3>
                <div className="flex-1 h-px bg-violet-500/10" />
              </div>
              <div className="flex flex-wrap gap-3 md:gap-4">
                {category.skills.map((skill) => (
                  <div
                    key={skill}
                    className="group skill-pill rounded-full px-4 py-2 cursor-default hover:border-violet-500/50 transition-colors duration-200"
                  >
                    <span className="text-sm font-mono text-[#6B6F8A] dark:text-[#7B82A8] group-hover:text-space dark:group-hover:text-white transition-colors duration-300">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
