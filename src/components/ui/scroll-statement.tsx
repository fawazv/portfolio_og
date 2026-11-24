"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * F1 · A statement that lights up word by word as it crosses the screen.
 *
 * - Without JavaScript, and under prefers-reduced-motion, every word is lit:
 *   the dim state only applies once the component arms itself
 *   (`data-armed`), so the text is never hidden.
 * - `highlight` words (marked with *asterisks* in `text`) land in the accent.
 */
export function ScrollStatement({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const words = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-w]"));
    el.dataset.armed = "true";

    let frame = 0;
    let lit = -1;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the statement's top reaches 85% of the screen, 1 once it has
      // travelled a bit more than half a screen.
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.5 + r.height * 0.35)));
      const n = Math.round(p * words.length);
      if (n === lit) return;
      lit = n;
      words.forEach((w, i) => {
        if (i < n) w.dataset.on = "";
        else delete w.dataset.on;
      });
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      delete el.dataset.armed;
    };
  }, []);

  // "*distributed backends*" → highlighted words
  const parts = text.split("*");

  return (
    <p ref={ref} className={cn("scroll-statement", className)}>
      {parts.map((part, i) =>
        part
          .split(/(\s+)/)
          .map((token, j) =>
            token.trim() ? (
              <span key={`${i}-${j}`} data-w="" className={i % 2 === 1 ? "is-key" : undefined}>
                {token}
              </span>
            ) : (
              token
            )
          )
      )}
    </p>
  );
}
