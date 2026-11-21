import Image from "next/image";
import { ArrowRight, Download } from "lucide-react";
import { ScrollStatement } from "@/components/ui/scroll-statement";
import { Scribble } from "@/components/ui/scribble";

/*
 * About — opens with the F1 statement (lights up word by word on scroll),
 * then the story in two paragraphs, what I'm looking for, what I'm learning,
 * and the portrait. No scroll reveals: the only scroll-driven motion here is
 * the statement.
 */
export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* F1 · Statement */}
        <div className="mx-auto max-w-5xl py-10 md:py-24">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">In one sentence</p>
          <ScrollStatement
            className="font-serif text-[clamp(2.2rem,5.4vw,4.75rem)] font-normal leading-[1.05] tracking-[-0.025em] text-foreground"
            text="I studied commerce, taught myself to code in 2024, and now I build *distributed backends* and the interfaces on top of them."
          />
        </div>

        <div className="mt-16 grid grid-cols-[minmax(0,1fr)] items-start gap-12 md:mt-24 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
          {/* Story */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">About</p>
              <h2
                id="about-heading"
                className="font-serif text-[clamp(2.5rem,5vw,4.25rem)] font-normal leading-[1] tracking-[-0.03em] text-foreground"
              >
                From commerce <Scribble delay="0.3s">to code</Scribble>.
              </h2>
            </div>

            <div className="flex max-w-[60ch] flex-col gap-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                I finished a B.Com at Calicut University in 2023, then spent 2024 teaching myself the MERN stack. A
                year later I was splitting a hotel booking system into eleven Docker services behind one gateway.
              </p>
              <p>
                Most of my work sits on the backend: Node.js and Express services, RabbitMQ between them, MongoDB and
                PostgreSQL underneath, deployed on AWS EC2 and S3. On the front end I use React and Next.js, with GSAP
                when motion helps.
              </p>
            </div>

            <dl className="grid gap-6 border-t border-line pt-8 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <dt className="font-mono text-xs uppercase tracking-[0.18em] text-accent">What I&apos;m looking for</dt>
                <dd className="leading-relaxed text-foreground">
                  A full-stack or backend role on a team that ships often, where I can own services from the database
                  up.
                </dd>
              </div>
              <div className="flex flex-col gap-2">
                <dt className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Learning now</dt>
                <dd className="leading-relaxed text-foreground">
                  React Native for mobile apps, and Python for backend scripts and AI tooling.
                </dd>
              </div>
            </dl>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-on-accent transition-[background-color,transform] duration-150 hover:-translate-y-px hover:bg-accent-hover active:translate-y-px"
              >
                Get in touch
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
            </div>
          </div>

          {/* Portrait */}
          <figure className="relative mx-auto w-full max-w-[520px] lg:sticky lg:top-28">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-sage-soft dark:bg-surface">
              <Image
                src="/portrait.webp"
                alt="Mohammed Fawaz, full-stack developer based in Kerala, India"
                fill
                sizes="(max-width: 1024px) 90vw, 520px"
                className="object-cover object-top grayscale"
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
