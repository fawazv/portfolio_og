import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github, Package } from "lucide-react";
import { getGuide, guides, type Guide, type GuideSkill } from "@/content/guides";
import { TransitionLink } from "@/components/ui/transition-link";
import { GuideBlockView, GuideFigure, GuideTable } from "@/components/guides/guide-blocks";
import { RichText } from "@/components/guides/rich-text";

type Params = { slug: string };

const site = "https://fawazv.online";

export function generateStaticParams(): Params[] {
  return guides.map((g) => ({ slug: g.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  const title = `${g.shortTitle} — guide | Mohammed Fawaz`;
  const url = `${site}/guides/${g.slug}`;
  return {
    title,
    description: g.summary,
    alternates: { canonical: url },
    openGraph: { type: "article", title, description: g.summary, url, images: [g.cover.src], modifiedTime: g.updatedIso },
    twitter: { card: "summary_large_image", title, description: g.summary, images: [g.cover.src] },
  };
}

function toc(g: Guide) {
  return [
    { id: "needs", label: "What you'll need" },
    { id: "parts", label: "How it fits together" },
    { id: "skills", label: "Skills I use" },
    ...g.sections.map((s) => ({ id: s.id, label: s.title, step: s.step })),
    { id: "result", label: "What it did in my reel" },
    { id: "practices", label: "Best practices" },
    { id: "troubleshooting", label: "If it breaks" },
  ];
}

function howToJsonLd(g: Guide) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: g.title,
    description: g.summary,
    image: `${site}${g.cover.src}`,
    dateModified: g.updatedIso,
    author: { "@type": "Person", name: g.author.name, url: site },
    tool: g.tools.map((name) => ({ "@type": "HowToTool", name })),
    step: g.sections.map((s) => ({
      "@type": "HowToStep",
      name: s.title,
      url: `${site}/guides/${g.slug}#${s.id}`,
      text: s.blocks
        .map((b) => (b.type === "p" || b.type === "prompt" ? b.text : ""))
        .filter(Boolean)
        .join(" ")
        .replace(/[*`]/g, ""),
    })),
  };
}

function SectionHeading({ id, step, children }: { id: string; step?: string; children: React.ReactNode }) {
  return (
    <h2 id={`${id}-heading`} className="flex items-baseline gap-4 font-serif text-[clamp(2.25rem,4vw,3rem)] font-normal leading-[1.05] tracking-[-0.02em] text-foreground">
      {step && <span className="font-mono text-sm tracking-normal text-accent">{step}</span>}
      {children}
    </h2>
  );
}

function SkillCard({ skill }: { skill: GuideSkill }) {
  const { source } = skill;
  const Icon = source.kind === "github" ? Github : Package;
  return (
    <li className="flex flex-col gap-4 rounded-2xl border border-line bg-raised p-5">
      <ul className="flex flex-wrap gap-1.5" aria-label="Skill names">
        {skill.names.map((n) => (
          <li key={n} className="rounded-full bg-surface px-2.5 py-1 font-mono text-xs text-foreground">
            {n}
          </li>
        ))}
      </ul>
      <p className="flex-1 leading-relaxed text-muted-foreground">{skill.job}</p>
      {source.href ? (
        <a
          href={source.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 text-sm font-medium text-foreground underline decoration-tomato decoration-2 underline-offset-4 hover:text-accent"
        >
          <Icon size={15} aria-hidden="true" />
          {source.label}
          <ArrowUpRight size={14} aria-hidden="true" />
          <span className="sr-only">(opens in new tab)</span>
        </a>
      ) : (
        <span className="inline-flex w-fit items-center gap-2 font-mono text-xs text-muted-foreground">
          {source.kind === "bundled" ? <code>{source.label}</code> : source.label}
        </span>
      )}
    </li>
  );
}

export default async function GuidePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();

  const contents = toc(g);

  return (
    <article className="pt-28 pb-24 md:pt-32">
      <script
        type="application/ld+json"
        // Our own static content, serialised once at build time.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd(g)).replace(/</g, "\\u003c") }}
      />
      <div className="container mx-auto px-4 md:px-6">
        <TransitionLink
          href="/guides"
          className="inline-flex items-center gap-2 rounded-full py-2 pr-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          All guides
        </TransitionLink>

        {/* Header */}
        <header className="mt-8 flex max-w-[60rem] flex-col gap-5">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
            <span className="h-px w-6 bg-foreground/60" aria-hidden="true" />
            Guide · Updated {g.updated} · {g.readTime}
          </p>
          <h1 className="font-serif text-[clamp(2.75rem,7vw,5.5rem)] font-normal leading-[0.95] tracking-[-0.035em] text-foreground">
            {g.title}
          </h1>
          <p className="max-w-[56ch] text-xl leading-relaxed text-muted-foreground">{g.summary}</p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span>
              By <span className="font-medium text-foreground">{g.author.name}</span>
            </span>
            <a
              href={g.author.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-foreground underline decoration-tomato decoration-2 underline-offset-4 hover:text-accent"
            >
              {g.author.handle}
              <span className="sr-only"> on Instagram (opens in new tab)</span>
            </a>
          </div>
        </header>

        {/* Cover — shares its view-transition-name with the /guides card */}
        <div className="mt-10 md:mt-14" style={{ viewTransitionName: `guide-${g.slug}` }}>
          <GuideFigure image={g.cover} priority />
        </div>

        {/* Facts */}
        <dl className="mt-10 grid grid-cols-1 gap-6 border-b border-line pb-10 sm:grid-cols-3 sm:gap-4 md:mt-14">
          {g.facts.map((f) => (
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
          <nav aria-label="On this page" className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">On this page</p>
            <ol className="flex flex-col gap-1 border-l border-line">
              {contents.map((c) => (
                <li key={c.id}>
                  <a
                    href={`#${c.id}`}
                    className="-ml-px flex gap-2 border-l-2 border-transparent py-1 pl-4 text-sm text-muted-foreground transition-colors hover:border-tomato hover:text-foreground"
                  >
                    {"step" in c && c.step && <span className="font-mono text-xs leading-5 text-accent">{c.step}</span>}
                    {c.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex min-w-0 max-w-[760px] flex-col gap-20">
            <section id="needs" aria-labelledby="needs-heading" className="flex scroll-mt-28 flex-col gap-6">
              <SectionHeading id="needs">What you&apos;ll need</SectionHeading>
              <ul className="flex flex-col gap-3">
                {g.needs.map((n) => (
                  <li key={n} className="flex gap-3 leading-relaxed text-foreground/85">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-tomato" aria-hidden="true" />
                    <span className="min-w-0">
                      <RichText text={n} />
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="parts" aria-labelledby="parts-heading" className="flex scroll-mt-28 flex-col gap-6">
              <SectionHeading id="parts">How it fits together</SectionHeading>
              <GuideTable head={["Piece", "Its one job"]} rows={g.parts.map((p) => [p.name, p.job])} />
            </section>

            <section id="skills" aria-labelledby="skills-heading" className="flex scroll-mt-28 flex-col gap-6">
              <SectionHeading id="skills">Skills I use</SectionHeading>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Skills are the playbook Claude reads before it edits. Install these, then start a new chat so they load.
              </p>
              <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {g.skills.map((s) => (
                  <SkillCard key={s.names[0]} skill={s} />
                ))}
              </ul>
              <div className="flex flex-col gap-3">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Tools underneath</p>
                <ul className="flex flex-wrap gap-2">
                  {g.tools.map((t) => (
                    <li key={t} className="rounded-full border border-line px-3 py-1 text-sm text-foreground">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {g.sections.map((s) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-heading`} className="flex scroll-mt-28 flex-col gap-6">
                <SectionHeading id={s.id} step={s.step}>
                  {s.title}
                </SectionHeading>
                {s.blocks.map((b, i) => (
                  <GuideBlockView key={i} block={b} />
                ))}
              </section>
            ))}

            <section id="result" aria-labelledby="result-heading" className="flex scroll-mt-28 flex-col gap-6">
              <SectionHeading id="result">What it did in my reel</SectionHeading>
              <GuideFigure image={g.didIt.image} />
              <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                {g.didIt.items.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-foreground/85">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-tomato" aria-hidden="true" />
                    <span className="min-w-0">
                      <RichText text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="practices" aria-labelledby="practices-heading" className="flex scroll-mt-28 flex-col gap-6">
              <SectionHeading id="practices">Best practices</SectionHeading>
              <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {g.practices.map((p) => (
                  <li key={p} className="rounded-2xl bg-surface p-5 leading-relaxed text-muted-foreground">
                    <RichText text={p} />
                  </li>
                ))}
              </ul>
            </section>

            <section id="troubleshooting" aria-labelledby="troubleshooting-heading" className="flex scroll-mt-28 flex-col gap-6">
              <SectionHeading id="troubleshooting">If it breaks</SectionHeading>
              <GuideTable head={["Problem", "Say this"]} rows={g.troubleshooting} />
            </section>

            <p className="rounded-[28px] bg-sage p-8 font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight tracking-[-0.02em] text-ink md:p-10">
              {g.closing}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
