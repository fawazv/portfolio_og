"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

export default function Cursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const rafId = useRef<number>(0);

    const updateCursorDot = useCallback(() => {
        if (cursorRef.current) {
            cursorRef.current.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px) translate(-50%, -50%)`;
        }
        rafId.current = requestAnimationFrame(updateCursorDot);
    }, []);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        if (!cursor || !follower) return;

        // Start RAF loop for cursor dot (high-fidelity, no GSAP overhead)
        rafId.current = requestAnimationFrame(updateCursorDot);

        const moveCursor = (e: MouseEvent) => {
            // Dot: update ref directly (RAF reads it)
            mousePos.current.x = e.clientX;
            mousePos.current.y = e.clientY;

            // Follower: keep GSAP for smooth trailing
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.5,
                ease: "power2.out",
                overwrite: "auto",
            });
        };

        const handleHoverStart = () => {
            gsap.to(cursor, { scale: 0.5, opacity: 0, duration: 0.2 });
            gsap.to(follower, {
                scale: 3,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderColor: "rgba(255, 255, 255, 0.5)",
                mixBlendMode: "difference",
                duration: 0.3,
            });
        };

        const handleHoverEnd = () => {
            gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.2 });
            gsap.to(follower, {
                scale: 1,
                backgroundColor: "transparent",
                borderColor: "rgba(100, 100, 100, 0.5)",
                mixBlendMode: "normal",
                duration: 0.3,
            });
        };

        window.addEventListener("mousemove", moveCursor);

        const links = document.querySelectorAll("a, button, .cursor-pointer");
        links.forEach(link => {
            link.addEventListener("mouseenter", handleHoverStart);
            link.addEventListener("mouseleave", handleHoverEnd);
        });

        return () => {
            cancelAnimationFrame(rafId.current);
            window.removeEventListener("mousemove", moveCursor);
            links.forEach(link => {
                link.removeEventListener("mouseenter", handleHoverStart);
                link.removeEventListener("mouseleave", handleHoverEnd);
            });
        };
    }, [updateCursorDot]);

    return (
        <div className="pointer-events-none fixed inset-0 z-9999 hidden md:block mix-blend-difference">
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 h-2 w-2 rounded-full bg-white"
                style={{ willChange: "transform" }}
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 h-8 w-8 rounded-full border border-white/50 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200"
            />
        </div>
    );
}
