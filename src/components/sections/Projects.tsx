import Image from "next/image";
import { ArrowRight, ArrowUpRight, BookOpen, Github } from "lucide-react";
import { projects, type Project } from "@/content/projects";
import { Scribble } from "@/components/ui/scribble";
import { TransitionLink } from "@/components/ui/transition-link";

/*
 * Selected work — Kitchen Table cards. Replaces the pinned horizontal gallery:
 * no scroll-jacking, and every link (case study, live demo, source) is always
 * visible and reachable by keyboard. The image shares a view-transition-name
 * with the case-study hero so it morphs into /work/[slug].
 */

const liveCount = projects.filter((p) => p.liveUrl).length;

export default function Projects() {
  const [lead, ...rest] = projects;

  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Selected work</p>
            <h2
              id="projects-heading"
              className="font-serif text-[clamp(2.5rem,5vw,4.25rem)] font-normal leading-[1] tracking-[-0.03em] text-foreground"
            >
              Things I&apos;ve <Scribble delay="0.2s">built</Scribble>.
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground md:text-right">
            {projects.length} projects, {liveCount} with live demos. Each one has a page on how it&apos;s built.
          </p>
        </div>

        <ul className="grid grid-cols-[minmax(0,1fr)] gap-6 md:grid-cols-2">
          <li className="md:col-span-2">
            <WorkCard project={lead} wide />
          </li>
          {rest.map((p) => (
            <li key={p.slug}>
              <WorkCard project={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function WorkCard({ project: p, wide = false }: { project: Project; wide?: boolean }) {
  const href = `/work/${p.slug}`;
  return (
    <article
      className={`group/card flex h-full flex-col overflow-hidden rounded-[24px] border border-line bg-raised transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-foreground/20 ${
        wide ? "lg:grid lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]" : ""
      }`}
    >
      {/* Image → case study (duplicate of the title link, so hidden from AT and tab order) */}
      <TransitionLink href={href} tabIndex={-1} aria-hidden="true" className="relative block overflow-hidden bg-surface">
        <span
          className={`relative block ${wide ? "aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[420px]" : "aspect-[16/10]"}`}
          style={{ viewTransitionName: `work-${p.slug}` }}
        >
          <Image
            src={p.image}
            alt=""
            fill
            sizes={wide ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 768px) 100vw, 50vw"}
            className="object-cover transition-transform duration-500 group-hover/card:scale-[1.03]"
          />
        </span>
      </TransitionLink>

      <div className={`flex flex-1 flex-col gap-4 p-6 ${wide ? "lg:justify-center lg:p-10" : ""}`}>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <span>{p.kind}</span>
          <span aria-hidden="true">·</span>
          <span>{p.year}</span>
          {p.liveUrl && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-soft px-2 py-0.5 text-[10.5px] text-sage-deep">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2F7A3E]" aria-hidden="true" />
              Live
            </span>
          )}
        </p>

        <h3 className={`font-serif font-normal leading-[1.02] tracking-[-0.02em] text-foreground ${wide ? "text-5xl" : "text-4xl"}`}>
          <TransitionLink href={href} className="rounded-sm hover:underline hover:decoration-tomato hover:decoration-2 hover:underline-offset-4">
            {p.title}
          </TransitionLink>
        </h3>

        <p className="max-w-[52ch] leading-relaxed text-muted-foreground">{p.summary}</p>

        <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
          {p.stack.slice(0, wide ? 6 : 4).map((s) => (
            <li key={s} className="rounded-full bg-surface px-2.5 py-1 font-mono text-[11.5px] text-foreground/80">
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          <TransitionLink
            href={href}
            aria-label={`${p.title} case study`}
            className="group/btn inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover"
          >
            Case study
            <ArrowRight size={15} className="transition-transform group-hover/btn:translate-x-0.5" aria-hidden="true" />
          </TransitionLink>
          {p.liveUrl && (
            <a
              href={p.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.title} live demo (opens in new tab)`}
              className="inline-flex items-center gap-1.5 rounded-full border border-foreground/25 px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-foreground/60"
            >
              Live demo
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          )}
          {p.guideUrl && (
            <TransitionLink
              href={p.guideUrl}
              aria-label={`${p.title}: read the step-by-step guide`}
              className="inline-flex items-center gap-1.5 rounded-full border border-foreground/25 px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-foreground/60"
            >
              <BookOpen size={15} aria-hidden="true" />
              Guide
            </TransitionLink>
          )}
          {p.githubUrl && (
            <a
              href={p.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.title} source on GitHub (opens in new tab)`}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github size={15} aria-hidden="true" />
              Source
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
