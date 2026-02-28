"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface RevealHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function RevealHeader({ children, className }: RevealHeaderProps) {
  const wrapperRef = useRef<HTMLHeadingElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner) return;

    // Set initial state via GSAP (not inline style) to avoid flash/race condition
    gsap.set(inner, { yPercent: 100 });

    gsap.to(inner, {
      yPercent: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: wrapper,
        start: "top 90%",
        once: true,
      },
    });

    return () => {
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === wrapper)
        .forEach((st) => st.kill());
    };
  }, []);

  return (
    <h2 ref={wrapperRef} className={cn("relative overflow-hidden", className)}>
      <span ref={innerRef} className="block">
        {children}
      </span>
    </h2>
  );
}
