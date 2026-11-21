import Image from "next/image";
import { ArrowRight, ArrowUpRight, Download, Github, Linkedin } from "lucide-react";

/*
 * Hero — "Marker" layout (Sage & Tomato brand).
 * Left: availability pill, name eyebrow, headline with one marker word, lead,
 * actions, and a stats row. Right: grayscale portrait on a sage panel with two
 * floating cards (Elite Hotel's real compose services, and a live demo link).
 *
 * The entrance is pure CSS (.hero-rise / .marker-draw in globals.css), so the
 * hero is complete without JavaScript and instant under reduced motion.
 */

const stats = [
  { value: "5", label: "projects shipped" },
  { value: "2", label: "live demos" },
  { value: "11", label: "services in Elite Hotel" },
];

// From fawazv/Elite-hotel docker-compose.yml (11 services + gateway + RabbitMQ)
const services = ["gateway", "auth-service", "reservation-service", "payment-service"];

export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-28 pb-16 md:pt-32 lg:min-h-svh lg:pb-12 lg:flex lg:items-center"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          {/* Copy */}
          <div className="flex flex-col gap-7">
            <p className="hero-rise inline-flex w-fit max-w-full items-center gap-2 rounded-full bg-surface py-1 pl-1 pr-3 text-sm text-foreground">
              <span className="rounded-full bg-foreground px-2 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider text-canvas">
                2026
              </span>
              <span className="truncate">Open to full-stack &amp; backend roles · remote or hybrid</span>
            </p>

            <div className="flex flex-col gap-4">
              <p
                className="hero-rise font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground"
                style={{ "--d": "60ms" } as React.CSSProperties}
              >
                Mohammed Fawaz · Full-stack developer · Kerala, India
              </p>
              <h1
                id="hero-heading"
                className="text-[clamp(2.75rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-foreground"
              >
                <span className="hero-rise block" style={{ "--d": "120ms" } as React.CSSProperties}>
                  The backend
                </span>{" "}
                <span className="hero-rise block" style={{ "--d": "200ms" } as React.CSSProperties}>
                  you <span className="marker-draw">won&apos;t</span> rewrite.
                </span>
              </h1>
            </div>

            <p
              className="hero-rise max-w-[46ch] text-lg leading-relaxed text-muted-foreground"
              style={{ "--d": "300ms" } as React.CSSProperties}
            >
              I split monoliths into Node.js services that talk over RabbitMQ, run them in Docker, and build the React
              and Next.js interfaces people use on top.
            </p>

            <div
              className="hero-rise flex flex-wrap items-center gap-3"
              style={{ "--d": "380ms" } as React.CSSProperties}
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-on-accent transition-[background-color,transform] duration-150 hover:-translate-y-px hover:bg-accent-hover active:translate-y-px"
              >
                See my work
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download resume (opens in new tab)"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/25 px-6 py-3.5 text-sm font-semibold text-foreground transition-[border-color,transform] duration-150 hover:-translate-y-px hover:border-foreground/60 active:translate-y-px"
              >
                <Download size={16} aria-hidden="true" />
                Resume
              </a>
              <div className="ml-1 flex items-center gap-1">
                <a
                  href="https://github.com/fawazv/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile (opens in new tab)"
                  className="grid h-11 w-11 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                >
                  <Github size={20} strokeWidth={1.6} aria-hidden="true" />
                </a>
                <a
                  href="https://www.linkedin.com/in/mohammed-fawaz-216314280/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile (opens in new tab)"
                  className="grid h-11 w-11 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                >
                  <Linkedin size={20} strokeWidth={1.6} aria-hidden="true" />
                </a>
              </div>
            </div>

            <dl
              className="hero-rise mt-2 grid max-w-xl grid-cols-3 gap-4 border-t border-line pt-5"
              style={{ "--d": "460ms" } as React.CSSProperties}
            >
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col gap-1">
                  <dt className="order-2 text-xs leading-snug text-muted-foreground">{s.label}</dt>
                  <dd className="order-1 text-3xl font-semibold tracking-[-0.04em] text-foreground tabular-nums md:text-4xl">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Portrait panel */}
          <div
            className="hero-settle relative mx-auto aspect-[4/5] w-full max-w-[560px] overflow-hidden rounded-[28px] bg-sage-soft dark:bg-surface"
            style={{ "--d": "100ms" } as React.CSSProperties}
          >
            <Image
              src="/images/hero/portrait-light.webp"
              alt="Mohammed Fawaz"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 560px"
              className="object-cover object-top grayscale mix-blend-multiply dark:hidden"
            />
            <Image
              src="/images/hero/portrait-dark.webp"
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 560px"
              className="hidden object-cover object-top grayscale opacity-90 dark:block"
            />

            {/* Terminal card: real service names from the Elite Hotel compose file */}
            <div
              className="absolute right-3 top-3 w-[min(240px,calc(100%-24px))] rounded-2xl bg-ink p-4 text-paper ring-1 ring-transparent dark:ring-white/10 shadow-[0_18px_40px_-18px_rgba(27,30,25,0.55)] sm:right-4 sm:top-4"
              aria-label="Elite Hotel services, from its docker-compose file"
              role="group"
            >
              <p className="font-mono text-[11px] uppercase tracking-wider text-paper/60">~/elite-hotel</p>
              {/* Compact below xl (2 services) so the card never covers the face on shorter panels */}
              <div className="mt-2 font-mono text-[11px] leading-relaxed text-sage-soft sm:text-[12px]">
                <p>$ docker compose up</p>
                {services.map((s, i) => (
                  <p key={s} className={i >= 2 ? "hidden xl:block" : undefined}>
                    ✓ {s}
                  </p>
                ))}
                <p className="pl-3 xl:hidden">+ {11 - 2} more · rabbitmq</p>
                <p className="hidden pl-3 xl:block">+ {11 - services.length} more · rabbitmq</p>
              </div>
            </div>

            {/* Live demo card */}
            <a
              href="https://nxt-cart.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group absolute bottom-3 left-3 flex w-[min(260px,calc(100%-24px))] items-center gap-3 rounded-2xl bg-raised p-3 text-foreground shadow-[0_18px_40px_-18px_rgba(27,30,25,0.45)] transition-transform duration-300 hover:-translate-y-0.5 sm:bottom-4 sm:left-4"
              aria-label="Nxtcart live demo (opens in new tab)"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-foreground text-canvas">
                <span className="h-2 w-2 rounded-full bg-live" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold">Nxtcart is live</span>
                <span className="block truncate text-xs text-muted-foreground">Next.js · Auth.js · Stripe</span>
              </span>
              <ArrowUpRight
                size={16}
                className="shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
