import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { guides } from "@/content/guides";
import { TransitionLink } from "@/components/ui/transition-link";

const title = "Guides | Mohammed Fawaz";
const description = "Step-by-step guides on how I work with Claude Code: the prompts, the skills and the checks.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://fawazv.online/guides" },
  openGraph: { title, description, url: "https://fawazv.online/guides", images: guides[0] ? [guides[0].cover.src] : undefined },
  twitter: { card: "summary_large_image", title, description },
};

export default function GuidesPage() {
  return (
    <div className="pt-28 pb-24 md:pt-32">
      <div className="container mx-auto px-4 md:px-6">
        <header className="flex max-w-[52rem] flex-col gap-5">
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
            <span className="h-px w-6 bg-foreground/60" aria-hidden="true" />
            Guides
          </p>
          <h1 className="font-serif text-[clamp(3rem,8vw,6.5rem)] font-normal leading-[0.92] tracking-[-0.035em] text-foreground">
            How I work, <em className="text-accent">step by step</em>.
          </h1>
          <p className="max-w-[48ch] text-xl leading-relaxed text-muted-foreground">{description}</p>
        </header>

        <ul className="mt-14 grid grid-cols-1 gap-6 md:mt-20 lg:grid-cols-2">
          {guides.map((g) => (
            <li key={g.slug}>
              <TransitionLink
                href={`/guides/${g.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-line bg-raised transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-foreground/25"
              >
                <div className="overflow-hidden bg-night" style={{ viewTransitionName: `guide-${g.slug}` }}>
                  <Image
                    src={g.cover.src}
                    width={g.cover.width}
                    height={g.cover.height}
                    alt=""
                    sizes="(max-width: 1024px) 100vw, 640px"
                    className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    {g.updated} · {g.readTime}
                  </p>
                  <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-foreground">
                    {g.title}
                  </h2>
                  <p className="line-clamp-3 leading-relaxed text-muted-foreground">{g.summary}</p>
                  <ul className="flex flex-wrap gap-1.5" aria-label="Topics">
                    {g.tags.map((t) => (
                      <li key={t} className="rounded-full bg-surface px-3 py-1 font-mono text-xs text-foreground/80">
                        {t}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-semibold text-accent">
                    Read the guide
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </TransitionLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
