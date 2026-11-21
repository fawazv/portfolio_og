import Image from "next/image";
import { ArrowRight, ArrowUpRight, Download } from "lucide-react";
import { Scribble } from "@/components/ui/scribble";

/*
 * Hero — "Kitchen Table" layout (Sage & Tomato brand).
 * An inset sage panel: eyebrow with a rule, a serif headline with one italic
 * word underlined in tomato, lead and actions on the left; the grayscale
 * portrait multiplied into the sage on the right, with a card showing Elite
 * Hotel's real compose services. Below the panel: three shipped projects and
 * one big number.
 *
 * The sage panel keeps the same colours in both themes (ink on sage, 8.4:1).
 * The entrance is pure CSS: complete without JavaScript, instant under
 * reduced motion.
 */

// From fawazv/Elite-hotel docker-compose.yml (11 services + gateway + RabbitMQ)
const services = ["gateway", "auth", "reservation", "payment", "billing", "notification"];

const work = [
  {
    title: "Elite Hotel",
    meta: "11 services",
    stack: "Node.js · Docker · RabbitMQ",
    image: "/images/projects/elite-hotel.webp",
  },
  {
    title: "Nxtcart",
    meta: "Live",
    stack: "Next.js · Auth.js · Stripe",
    image: "/images/projects/nxtcart.webp",
  },
  {
    title: "Dropbox Clone",
    meta: "Live",
    stack: "Next.js · Firebase",
    image: "/images/projects/dropbox-clone.webp",
  },
];

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
              Mohammed Fawaz · Full-stack developer · Kerala
            </p>

            <h1
              id="hero-heading"
              className="hero-rise font-serif text-[clamp(2.9rem,6.4vw,5.6rem)] font-normal leading-[0.95] tracking-[-0.03em]"
              style={d(160)}
            >
              Backends that hold up, <Scribble delay="0.9s">interfaces</Scribble> worth using.
            </h1>

            <p className="hero-rise max-w-[42ch] text-[17px] leading-relaxed text-ink/80" style={d(260)}>
              I split monoliths into Node.js services, run them in Docker, and ship the React front end on top.
              Self-taught since 2024.
            </p>

            <div className="hero-rise flex flex-wrap items-center gap-3" style={d(340)}>
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-tomato-deep px-6 py-3.5 text-sm font-semibold text-paper transition-[background-color,transform] duration-150 hover:-translate-y-px hover:bg-[#9E2A17] active:translate-y-px"
              >
                See my work
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download resume (opens in new tab)"
                className="inline-flex items-center gap-2 rounded-full border border-ink/45 px-6 py-3.5 text-sm font-semibold text-ink transition-[border-color,background-color,transform] duration-150 hover:-translate-y-px hover:border-ink hover:bg-ink/5 active:translate-y-px"
              >
                <Download size={16} aria-hidden="true" />
                Download resume
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

            {/* Services card — the developer version of the booking widget */}
            <div
              role="group"
              aria-label="Elite Hotel services, from its docker-compose file"
              className="hero-rise relative z-10 mx-4 mb-4 w-auto rounded-2xl sm:ml-auto sm:w-[310px] lg:absolute lg:bottom-4 lg:right-4 lg:m-0 lg:w-[310px] bg-[#FFFDF8] p-4 text-ink shadow-[0_18px_40px_-18px_rgba(27,30,25,0.45)]"
              style={d(520)}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold">Elite Hotel</span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-ink/60">docker compose</span>
              </div>
              <ul className="grid grid-cols-2 gap-1.5">
                {services.map((s) => (
                  <li
                    key={s}
                    className="flex items-center justify-between gap-2 rounded-lg bg-[#ECE7DC] px-2.5 py-1.5 font-mono text-[12px]"
                  >
                    {s}
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#2F7A3E]" aria-hidden="true" />
                    <span className="sr-only">running</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex items-center justify-between text-xs text-ink/65">
                <span>RabbitMQ · 11 services</span>
                <a
                  href="https://github.com/fawazv/Elite-hotel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full bg-tomato-deep px-3 py-1 text-[12px] font-medium text-paper transition-colors hover:bg-[#9E2A17]"
                  aria-label="Elite Hotel source on GitHub (opens in new tab)"
                >
                  View source
                  <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Below the panel: shipped work + one big number */}
        <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-6 md:mt-10 lg:grid-cols-[240px_minmax(0,1fr)_170px] lg:items-start lg:gap-8">
          <div className="hero-rise flex flex-col gap-2" style={d(600)}>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Selected work</p>
            <p className="font-serif text-[28px] leading-[1.05] tracking-[-0.02em] text-foreground">Shipped, short and real.</p>
          </div>

          <ul className="hero-rise grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-3" style={d(660)}>
            {work.map((w) => (
              <li key={w.title}>
                <a
                  href="#projects"
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
                </a>
              </li>
            ))}
          </ul>

          <div className="hero-rise flex items-end gap-4 lg:flex-col lg:items-start lg:gap-1" style={d(720)}>
            <span className="font-serif text-[64px] leading-[0.85] tracking-[-0.03em] text-foreground">5</span>
            <span className="text-sm leading-snug text-muted-foreground">
              projects shipped
              <br />2 with live demos
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
