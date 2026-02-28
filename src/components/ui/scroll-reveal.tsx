"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Set initial state via GSAP to avoid race condition with inline styles
        gsap.set(el, { y: 30, opacity: 0 });

        gsap.to(el, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: delay / 1000,
            ease: "power2.out",
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
                once: true,
            },
        });

        return () => {
            ScrollTrigger.getAll()
                .filter((st) => st.trigger === el)
                .forEach((st) => st.kill());
        };
    }, [delay]);

    return (
        <div ref={ref} className={cn(className)}>
            {children}
        </div>
    );
}
