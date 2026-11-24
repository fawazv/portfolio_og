import Image from "next/image";
import { ArrowRight, ArrowUpRight, Download, Instagram } from "lucide-react";
import { Scribble } from "@/components/ui/scribble";
import { TransitionLink } from "@/components/ui/transition-link";
import { projects } from "@/content/projects";

/*
 * Hero — "Kitchen Table" layout (Sage & Tomato brand).
 * An inset sage panel: eyebrow with a rule, a serif headline with one italic
 * word underlined in tomato, lead and actions on the left; the grayscale
 * portrait multiplied into the sage on the right, with a card showing the AI
 * video editor's real pipeline (from its docs/WORKFLOW.md). Below the panel:
 * three projects and one big number, counted from src/content/projects.ts.
 *
 * The sage panel keeps the same colours in both themes (ink on sage, 8.4:1).
 * The entrance is pure CSS: complete without JavaScript, instant under
 * reduced motion.
 */

// The AI video editor's pipeline, in order (docs/WORKFLOW.md in that project)
const pipeline = ["transcribe", "cut", "captions", "effects", "sound", "storyboard"];

const work = [
  {
    slug: "ai-video-editor",
    title: "AI Video Editor",
    meta: "Agent",
    stack: "Claude Code · HyperFrames · ffmpeg",
    image: "/images/projects/ai-video-editor.webp",
  },
  {
    slug: "elite-hotel",
    title: "Elite Hotel",
    meta: "11 services",
    stack: "Node.js · Docker · RabbitMQ",
    image: "/images/projects/elite-hotel.webp",
  },
  {
    slug: "nxtcart",
    title: "Nxtcart",
    meta: "Live",
    stack: "Next.js · Auth.js · Stripe",
    image: "/images/projects/nxtcart.webp",
  },
];

const liveCount = projects.filter((p) => p.liveUrl).length;

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative pt-24 pb-12 md:pt-28">
      <div className="container mx-auto px-4 md:px-6">
        {/* Sage panel */}
        <div className="hero-settle relative grid grid-cols-[minmax(0,1fr)] overflow-hidden rounded-[28px] bg-sage text-ink lg:min-h-[600px] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]" style={d(0)}>
          {/* Copy */}
          <div className="relative z-10 flex flex-col justify-center gap-6 px-6 py-10 sm:px-10 md:py-14 lg:px-14">
            <p className="hero-rise flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em]" style={d(80)}>
              <span className="h-px w-6 bg-ink" aria-hidden="true" />
              Mohammed Fawaz · Developer · Creator · Kerala
            </p>

            <h1
              id="hero-heading"
              className="hero-rise font-serif text-[clamp(2.9rem,6.4vw,5.6rem)] font-normal leading-[0.95] tracking-[-0.03em]"
              style={d(160)}
            >
              Code, content, and the <Scribble delay="0.9s">AI agents</Scribble> in between.
            </h1>

            <p className="hero-rise max-w-[42ch] text-[17px] leading-relaxed text-ink/80" style={d(260)}>
              Full-stack developer and content creator. I build Node.js services and React apps, make reels in
              Malayalam and English, and design Claude agent workflows, like the one that now edits my videos.
            </p>

            <div className="hero-rise flex flex-wrap items-center gap-3" style={d(340)}>
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-tomato-deep px-6 py-3.5 text-sm font-semibold text-paper transition-[background-color,transform] duration-150 hover:-translate-y-px hover:bg-[#9E2A17] active:translate-y-px"
              >
                See my work
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
              <TransitionLink
                href="/guides/claude-video-editing"
                className="inline-flex items-center gap-2 rounded-full border border-ink/45 px-6 py-3.5 text-sm font-semibold text-ink transition-[border-color,background-color,transform] duration-150 hover:-translate-y-px hover:border-ink hover:bg-ink/5 active:translate-y-px"
              >
                How I edit with AI
              </TransitionLink>
            </div>

            <div className="hero-rise flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink/75" style={d(400)}>
              <a
                href="https://www.instagram.com/_.fawaz_v/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
              >
                <Instagram size={15} aria-hidden="true" />
                @_.fawaz_v
                <span className="sr-only">on Instagram (opens in new tab)</span>
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
              >
                <Download size={15} aria-hidden="true" />
                Resume
                <span className="sr-only">(opens in new tab)</span>
              </a>
            </div>
          </div>

          {/* Portrait, multiplied into the sage */}
          <div className="relative flex min-h-[440px] flex-col justify-end sm:min-h-[520px] lg:block lg:min-h-0">
            <Image
              src="/images/hero/portrait-light.webp"
              alt="Mohammed Fawaz"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[50%_18%] grayscale contrast-[1.05] mix-blend-multiply"
            />
            {/* soften the seam with the copy column on wide screens */}
            <div
              className="pointer-events-none absolute inset-0 hidden bg-linear-to-r from-sage to-transparent to-30% lg:block"
              aria-hidden="true"
            />

            {/* AI video editor card: the agent's real pipeline */}
            <div
              role="group"
              aria-label="AI video editor pipeline, from its workflow file"
              className="hero-rise relative z-10 mx-4 mb-4 w-auto rounded-2xl sm:ml-auto sm:w-[310px] lg:absolute lg:bottom-4 lg:right-4 lg:m-0 lg:w-[310px] bg-[#FFFDF8] p-4 text-ink shadow-[0_18px_40px_-18px_rgba(27,30,25,0.45)]"
              style={d(520)}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold">AI video editor</span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-ink/60">claude code</span>
              </div>
              <ol className="grid grid-cols-2 gap-1.5">
                {pipeline.map((step, i) => (
                  <li
                    key={step}
                    className="flex items-center justify-between gap-2 rounded-lg bg-[#ECE7DC] px-2.5 py-1.5 font-mono text-[12px]"
                  >
                    <span>
                      <span className="text-ink/45">{i + 1}</span> {step}
                    </span>
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#2F7A3E]" aria-hidden="true" />
                    <span className="sr-only">done</span>
                  </li>
                ))}
              </ol>
              <div className="mt-3 flex items-center justify-between text-xs text-ink/65">
                <span>1 take → 66.4 s reel</span>
                <TransitionLink
                  href="/work/ai-video-editor"
                  className="inline-flex items-center gap-1 rounded-full bg-tomato-deep px-3 py-1 text-[12px] font-medium text-paper transition-colors hover:bg-[#9E2A17]"
                  aria-label="AI video editor case study"
                >
                  Case study
                  <ArrowUpRight size={12} aria-hidden="true" />
                </TransitionLink>
              </div>
            </div>
          </div>
        </div>

        {/* Below the panel: shipped work + one big number */}
        <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-6 md:mt-10 lg:grid-cols-[240px_minmax(0,1fr)_170px] lg:items-start lg:gap-8">
          <div className="hero-rise flex flex-col gap-2" style={d(600)}>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Selected work</p>
            <p className="font-serif text-[28px] leading-[1.05] tracking-[-0.02em] text-foreground">Built, used and real.</p>
          </div>

          <ul className="hero-rise grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-3" style={d(660)}>
            {work.map((w) => (
              <li key={w.title}>
                <TransitionLink
                  href={`/work/${w.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-line bg-raised transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <span className="relative block aspect-[16/10] overflow-hidden">
                    <Image
                      src={w.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </span>
                  <span className="flex flex-col gap-0.5 px-3.5 py-3">
                    <span className="flex items-baseline justify-between gap-2 font-medium text-foreground">
                      {w.title}
                      <span className="font-mono text-xs text-muted-foreground">{w.meta}</span>
                    </span>
                    <span className="text-xs text-muted-foreground">{w.stack}</span>
                  </span>
                </TransitionLink>
              </li>
            ))}
          </ul>

          <div className="hero-rise flex items-end gap-4 lg:flex-col lg:items-start lg:gap-1" style={d(720)}>
            <span className="font-serif text-[64px] leading-[0.85] tracking-[-0.03em] text-foreground">{projects.length}</span>
            <span className="text-sm leading-snug text-muted-foreground">
              projects built
              <br />
              {liveCount} with live demos
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
