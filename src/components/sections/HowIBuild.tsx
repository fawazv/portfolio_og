import { ArrowRight } from "lucide-react";
import { getProject } from "@/content/projects";
import { Scribble } from "@/components/ui/scribble";
import { TransitionLink } from "@/components/ui/transition-link";

/*
 * How I build — Elite Hotel's real architecture (from its README and
 * docker-compose.yml) drawn as an HTML diagram on the sage panel, beside the
 * three principles from its case study (same source data, so they never
 * drift apart). One small pulse travels along the RabbitMQ bus; it is hidden
 * under reduced motion.
 */

const services = [
  "auth",
  "user",
  "room",
  "guest",
  "reservation",
  "payment",
  "billing",
  "housekeeping",
  "communication",
  "notification",
];

function Down({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-1 py-1.5" aria-hidden="true">
      <span className="h-5 w-px bg-ink/40" />
      {label && <span className="font-mono text-[10.5px] uppercase tracking-wider text-ink/60">{label}</span>}
      <span className="h-0 w-0 border-x-[4px] border-t-[6px] border-x-transparent border-t-ink/50" />
    </div>
  );
}

export default function HowIBuild() {
  const elite = getProject("elite-hotel");
  const principles = elite?.decisions ?? [];

  return (
    <section id="how-i-build" aria-labelledby="how-heading" className="relative py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 flex flex-col gap-4 md:mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">How I build</p>
          <h2
            id="how-heading"
            className="font-serif text-[clamp(2.5rem,5vw,4.25rem)] font-normal leading-[1] tracking-[-0.03em] text-foreground"
          >
            Small services, <Scribble delay="0.2s">clear</Scribble> boundaries.
          </h2>
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-12">
          {/* Diagram */}
          <figure className="rounded-[28px] bg-sage p-5 text-ink sm:p-8">
            <div
              role="img"
              aria-label="Elite Hotel architecture: a React client calls one API gateway, which routes to ten services. The services exchange events over RabbitMQ, and each has its own MongoDB database."
              className="flex flex-col items-center"
            >
              <div className="rounded-xl bg-[#FFFDF8] px-4 py-2.5 text-center shadow-[0_10px_24px_-16px_rgba(27,30,25,0.5)]">
                <p className="text-sm font-semibold">Client</p>
                <p className="font-mono text-[11px] text-ink/65">React 19 · Vite · Socket.io</p>
              </div>
              <Down label="HTTP" />
              <div className="w-full max-w-md rounded-xl bg-ink px-4 py-3 text-center text-paper">
                <p className="text-sm font-semibold">API gateway</p>
                <p className="font-mono text-[11px] text-paper/70">routing · rate limit · Helmet · JWT</p>
              </div>
              <Down />
              <ul className="grid w-full grid-cols-2 gap-2 sm:grid-cols-5">
                {services.map((s) => (
                  <li
                    key={s}
                    className="rounded-lg bg-[#FFFDF8]/85 px-2 py-2 text-center font-mono text-[11px] leading-tight sm:text-[11.5px]"
                  >
                    {s}
                  </li>
                ))}
              </ul>
              <div className="flex w-full justify-around py-1.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="h-4 w-px bg-ink/35" />
                ))}
              </div>
              <div className="relative w-full overflow-hidden rounded-full bg-tomato-deep px-4 py-2.5 text-center text-paper">
                <span className="font-mono text-[11.5px] uppercase tracking-wider">RabbitMQ · events</span>
                <span
                  className="bus-pulse pointer-events-none absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-paper motion-reduce:hidden"
                  aria-hidden="true"
                />
              </div>
              <div className="flex w-full justify-around py-1.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="h-4 w-px bg-ink/35" />
                ))}
              </div>
              <div className="flex w-full flex-wrap items-center justify-center gap-1.5">
                {services.map((s) => (
                  <span
                    key={s}
                    className="h-6 w-6 rounded-[6px] border border-ink/25 bg-sage-soft"
                    title={`${s} database`}
                    aria-hidden="true"
                  />
                ))}
                <span className="ml-2 font-mono text-[11px] text-ink/70">10 × MongoDB, one per service</span>
              </div>
            </div>
            <figcaption className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-ink/15 pt-4 text-sm text-ink/75">
              <span>Elite Hotel&apos;s architecture, from its README and compose file.</span>
              <TransitionLink
                href="/work/elite-hotel"
                className="group inline-flex items-center gap-1.5 font-semibold text-ink hover:underline hover:decoration-tomato hover:decoration-2 hover:underline-offset-4"
              >
                Read the case study
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </TransitionLink>
            </figcaption>
          </figure>

          {/* Principles */}
          <ol className="flex flex-col gap-4">
            {principles.map((p, i) => (
              <li key={p.title} className="flex gap-5 rounded-2xl border border-line bg-raised p-6">
                <span className="font-serif text-4xl leading-none text-tomato" aria-hidden="true">
                  {i + 1}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold text-foreground">{p.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
