import { brandIcons } from "@/content/brand-icons";
import { Scribble } from "@/components/ui/scribble";

/*
 * Stack wall (F7) — the same skills as before, grouped by layer, each with its
 * real brand mark (Simple Icons, inlined). Marks sit on a small paper chip so
 * brand colours read in both themes. Brands without an official Simple Icons
 * mark (AWS, VS Code) and concepts (REST API, NoSQL, Context API) show a
 * monogram instead of a drawn look-alike.
 */

type Skill = { name: string; icon?: string; mono?: string };

const layers: { name: string; note: string; skills: Skill[] }[] = [
  {
    name: "Services",
    note: "APIs and the messages between them",
    skills: [
      { name: "Node.js", icon: "nodedotjs" },
      { name: "Express.js", icon: "express" },
      { name: "REST API", mono: "API" },
      { name: "RabbitMQ", icon: "rabbitmq" },
    ],
  },
  {
    name: "Data",
    note: "Where it's stored",
    skills: [
      { name: "MongoDB", icon: "mongodb" },
      { name: "Mongoose", icon: "mongoose" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "NoSQL", mono: "{ }" },
    ],
  },
  {
    name: "Infrastructure",
    note: "Where it runs",
    skills: [
      { name: "Docker", icon: "docker" },
      { name: "Nginx", icon: "nginx" },
      { name: "AWS EC2", mono: "EC2" },
      { name: "AWS S3", mono: "S3" },
      { name: "Google Cloud", icon: "googlecloud" },
      { name: "Firebase", icon: "firebase" },
    ],
  },
  {
    name: "Interface",
    note: "What people touch",
    skills: [
      { name: "JavaScript (ES6+)", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" },
      { name: "React.js", icon: "react" },
      { name: "Next.js", icon: "nextdotjs" },
      { name: "HTML5", icon: "html5" },
      { name: "CSS3", icon: "css" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "Vite", icon: "vite" },
      { name: "Material UI", icon: "mui" },
      { name: "shadcn/ui", icon: "shadcnui" },
      { name: "Bootstrap", icon: "bootstrap" },
      { name: "GSAP", icon: "gsap" },
      { name: "Redux Toolkit", icon: "redux" },
      { name: "Context API", mono: "ctx" },
    ],
  },
  {
    name: "AI workflows",
    note: "Agents that do the work",
    skills: [
      { name: "Claude Code", mono: "CC" },
      { name: "AI agents", mono: "AI" },
      { name: "Agent skills", mono: "SK" },
      { name: "Workflow automation", mono: "WF" },
      { name: "Python", mono: "Py" },
    ],
  },
  {
    name: "Content & video",
    note: "Reels I make and edit",
    skills: [
      { name: "Short-form video", mono: "SV" },
      { name: "Video editing", mono: "VE" },
      { name: "Motion graphics", mono: "MG" },
      { name: "Captions (ML / EN)", mono: "Aa" },
      { name: "Colour grading", mono: "CG" },
      { name: "HyperFrames", mono: "HF" },
      { name: "ffmpeg", mono: "FF" },
      { name: "whisper.cpp", mono: "WH" },
    ],
  },
  {
    name: "Tools",
    note: "Day to day",
    skills: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Postman", icon: "postman" },
      { name: "Insomnia", icon: "insomnia" },
      { name: "Figma", icon: "figma" },
      { name: "VS Code", mono: "VS" },
      { name: "Notion", icon: "notion" },
    ],
  },
];

function monogram(name: string) {
  const words = name.replace(/[^A-Za-z0-9 ]/g, " ").trim().split(/\s+/);
  return (words.length > 1 ? words[0][0] + words[1][0] : name.slice(0, 2)).toUpperCase();
}

function Mark({ skill }: { skill: Skill }) {
  const icon = skill.icon ? brandIcons[skill.icon] : undefined;
  return (
    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#FFFDF8] shadow-[inset_0_0_0_1px_rgba(27,30,25,0.08)]">
      {icon ? (
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true" focusable="false">
          <path d={icon.path} fill={`#${icon.hex}`} />
        </svg>
      ) : (
        <span className="font-mono text-[10px] font-medium tracking-tight text-[#1B1E19]" aria-hidden="true">
          {skill.mono ?? monogram(skill.name)}
        </span>
      )}
    </span>
  );
}

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="relative py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 flex flex-col gap-4 md:mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Stack</p>
          <h2
            id="skills-heading"
            className="font-serif text-[clamp(2.5rem,5vw,4.25rem)] font-normal leading-[1] tracking-[-0.03em] text-foreground"
          >
            What I <Scribble delay="0.2s">build with</Scribble>.
          </h2>
        </div>

        <div className="flex flex-col">
          {layers.map((layer) => (
            <div
              key={layer.name}
              className="grid grid-cols-[minmax(0,1fr)] gap-4 border-t border-line py-7 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10"
            >
              <div className="flex items-baseline justify-between gap-4 lg:flex-col lg:justify-start lg:gap-1">
                <h3 className="text-lg font-semibold text-foreground">{layer.name}</h3>
                <p className="text-sm text-muted-foreground">{layer.note}</p>
              </div>
              <ul className="flex flex-wrap gap-2.5">
                {layer.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-center gap-2.5 rounded-xl border border-line bg-raised py-1.5 pl-1.5 pr-3.5 text-sm font-medium text-foreground transition-[transform,border-color] duration-200 hover:-translate-y-px hover:border-foreground/25"
                  >
                    <Mark skill={skill} />
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
