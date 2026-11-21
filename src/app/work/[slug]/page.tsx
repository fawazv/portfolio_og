import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { getProject, projects } from "@/content/projects";
import { TransitionLink } from "@/components/ui/transition-link";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const title = `${p.title} — case study | Mohammed Fawaz`;
  return {
    title,
    description: p.summary,
    alternates: { canonical: `https://fawazv.online/work/${p.slug}` },
    openGraph: { title, description: p.summary, url: `https://fawazv.online/work/${p.slug}`, images: [p.image] },
    twitter: { card: "summary_large_image", title, description: p.summary, images: [p.image] },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const index = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="pt-28 pb-24 md:pt-32">
      <div className="container mx-auto px-4 md:px-6">
        <TransitionLink
          href="/#projects"
          className="inline-flex items-center gap-2 rounded-full py-2 pr-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          All work
        </TransitionLink>

        {/* Header */}
        <header className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end">
          <div className="flex flex-col gap-5">
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
              <span className="h-px w-6 bg-foreground/60" aria-hidden="true" />
              {p.kind} · {p.year}
            </p>
            <h1 className="font-serif text-[clamp(3rem,8vw,6.5rem)] font-normal leading-[0.92] tracking-[-0.035em] text-foreground">
              {p.title}
            </h1>
            <p className="max-w-[48ch] text-xl leading-relaxed text-muted-foreground">{p.summary}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            {p.liveUrl && (
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover"
              >
                Open live demo
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
            <a
              href={p.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/25 px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-foreground/60"
            >
              <Github size={16} aria-hidden="true" />
              View source
            </a>
          </div>
        </header>

        {/* Hero image — shares its view-transition-name with the home card */}
        <div
          className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[28px] bg-surface md:mt-14"
          style={{ viewTransitionName: `work-${p.slug}` }}
        >
          <Image
            src={p.image}
            alt={`${p.title} screenshot`}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover"
          />
        </div>

        {/* Facts */}
        <dl className="mt-10 grid grid-cols-3 gap-4 border-b border-line pb-10 md:mt-14">
          {p.facts.map((f) => (
            <div key={f.label} className="flex flex-col gap-1">
              <dt className="order-2 text-sm text-muted-foreground">{f.label}</dt>
              <dd className="order-1 font-serif text-[clamp(2rem,4vw,3.5rem)] leading-none tracking-[-0.02em] text-foreground">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Body */}
        <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-14 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Stack</p>
            <ul className="flex flex-wrap gap-1.5 lg:flex-col lg:items-start">
              {p.stack.map((s) => (
                <li key={s} className="rounded-full bg-surface px-3 py-1 font-mono text-xs text-foreground/80">
                  {s}
                </li>
              ))}
            </ul>
          </aside>

          <div className="flex max-w-[68ch] flex-col gap-14">
            <section aria-labelledby="what">
              <h2 id="what" className="mb-4 font-serif text-4xl font-normal tracking-[-0.02em] text-foreground">
                What it is
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">{p.overview}</p>
            </section>

            <section aria-labelledby="how">
              <h2 id="how" className="mb-5 font-serif text-4xl font-normal tracking-[-0.02em] text-foreground">
                How it&apos;s built
              </h2>
              <ul className="flex flex-col gap-3">
                {p.built.map((b) => (
                  <li key={b} className="flex gap-3 leading-relaxed text-foreground/85">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-tomato" aria-hidden="true" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </section>

            {p.decisions && (
              <section aria-labelledby="decisions">
                <h2 id="decisions" className="mb-5 font-serif text-4xl font-normal tracking-[-0.02em] text-foreground">
                  Decisions worth explaining
                </h2>
                <div className="flex flex-col gap-4">
                  {p.decisions.map((d) => (
                    <div key={d.title} className="rounded-2xl bg-surface p-6">
                      <h3 className="mb-2 text-lg font-semibold text-foreground">{d.title}</h3>
                      <p className="leading-relaxed text-muted-foreground">{d.body}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Next project */}
        <TransitionLink
          href={`/work/${next.slug}`}
          className="group mt-20 flex items-center justify-between gap-6 rounded-[28px] bg-sage p-8 text-ink transition-transform duration-300 hover:-translate-y-0.5 md:p-12"
        >
          <span className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-ink/70">Next project</span>
            <span className="font-serif text-[clamp(2.25rem,5vw,4rem)] leading-none tracking-[-0.03em]">{next.title}</span>
          </span>
          <ArrowRight
            size={36}
            className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </TransitionLink>
      </div>
    </article>
  );
}
