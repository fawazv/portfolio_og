"use client";

import { useEffect, useRef, useState } from "react";
import { Scribble } from "@/components/ui/scribble";

/*
 * Journey (F2) — pinned chapters, done with CSS `position: sticky` (no
 * scroll-jacking, no GSAP pin). The sage frame holds the year, which counts
 * up as each chapter crosses the middle of the screen, and a tomato rail
 * fills. Below lg, and under reduced motion, it's a plain stacked timeline
 * (the frame is hidden and each chapter shows its own year).
 */

const chapters = [
  {
    year: 2018,
    span: "2018 – 2020",
    title: "Commerce with computer applications",
    place: "GHSS Tirurangadi · Higher secondary",
    body: "My first programs, written in the computer applications classes. The first sign that I liked building things.",
  },
  {
    year: 2020,
    span: "2020 – 2023",
    title: "Bachelor of Commerce",
    place: "Calicut University · Co-operation",
    body: "A degree in how businesses and co-operatives run: accounts, operations and the logic behind the numbers.",
  },
  {
    year: 2024,
    span: "2024",
    title: "The pivot",
    place: "Self-taught",
    body: "A year of teaching myself the MERN stack and software fundamentals, one project at a time.",
  },
  {
    year: 2025,
    span: "2025",
    title: "Full-stack developer",
    place: "Independent projects",
    body: "Built Elite Hotel on ten services and RabbitMQ, and Nxtcart on Next.js 15. Five projects shipped that year.",
  },
  {
    year: 2026,
    span: "2026 – now",
    title: "Creator and AI workflows",
    place: "@_.fawaz_v · Claude Code",
    body: "Making reels in Malayalam and English, and building AI agent workflows. My AI video editor now edits them from one take.",
  },
];

export default function Journey() {
  const [active, setActive] = useState(0);
  const [shownYear, setShownYear] = useState(chapters[0].year);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const yearRef = useRef(chapters[0].year);

  // Which chapter is crossing the middle of the screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Count the year up (or down) to the active chapter's year
  useEffect(() => {
    const to = chapters[active].year;
    const from = yearRef.current;
    if (from === to) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = reduce ? 1 : Math.min(1, (t - start) / 450);
      const value = Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3)));
      yearRef.current = value;
      setShownYear(value);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active]);

  const progress = (active + 1) / chapters.length;

  return (
    <section id="journey" aria-labelledby="journey-heading" className="relative py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 flex flex-col gap-4 md:mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Journey</p>
          <h2
            id="journey-heading"
            className="font-serif text-[clamp(2.5rem,5vw,4.25rem)] font-normal leading-[1] tracking-[-0.03em] text-foreground"
          >
            Commerce first, <Scribble delay="0.2s">code</Scribble> since.
          </h2>
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-16">
          {/* Sticky frame (wide screens, full motion only) */}
          <div className="hidden lg:block motion-reduce:lg:hidden">
            <div
              className="sticky top-28 flex aspect-[4/3.4] flex-col justify-between overflow-hidden rounded-[28px] bg-sage p-10 text-ink"
              aria-hidden="true"
            >
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-ink/70">
                Chapter {active + 1} of {chapters.length}
              </span>
              <span className="font-serif text-[clamp(6rem,11vw,10rem)] leading-[0.85] tracking-[-0.04em] tabular-nums">
                {shownYear}
              </span>
              <div className="flex flex-col gap-3">
                <span className="text-lg font-semibold">{chapters[active].title}</span>
                <span className="relative h-1 overflow-hidden rounded-full bg-ink/15">
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-tomato-deep transition-[width] duration-500 ease-out"
                    style={{ width: `${progress * 100}%` }}
                  />
                </span>
              </div>
            </div>
          </div>

          {/* Chapters */}
          <ol className="flex flex-col gap-6 lg:gap-[22vh] lg:py-[12vh]">
            {chapters.map((c, i) => (
              <li
                key={c.span}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                data-index={i}
                className={`rounded-2xl border border-line bg-raised p-6 transition-opacity duration-500 md:p-8 ${
                  i === active ? "lg:opacity-100" : "lg:opacity-45"
                } motion-reduce:lg:opacity-100`}
              >
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">{c.span}</p>
                <h3 className="mt-3 font-serif text-3xl font-normal leading-tight tracking-[-0.02em] text-foreground md:text-4xl">
                  {c.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.place}</p>
                <p className="mt-4 max-w-[54ch] leading-relaxed text-foreground/85">{c.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
