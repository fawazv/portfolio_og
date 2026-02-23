"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Skip Lenis entirely on touch/mobile — native scroll is faster and
        // a stopped Lenis instance still intercepts touch events, blocking scroll.
        const isTouchDevice = window.innerWidth < 768 || 'ontouchstart' in window;
        if (isTouchDevice) {
            // Still sync ScrollTrigger on mobile using native scroll
            window.addEventListener('scroll', ScrollTrigger.update, { passive: true });
            gsap.ticker.lagSmoothing(0);
            return () => {
                window.removeEventListener('scroll', ScrollTrigger.update);
            };
        }

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            syncTouch: false,
        });

        // Sync Lenis scroll with ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        // Add Lenis update to GSAP ticker
        gsap.ticker.add((time: number) => {
            lenis.raf(time * 1000);
        });

        // Disable lag smoothing to prevent jumpiness
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(lenis.raf);
            lenis.destroy();
        };
    }, []);

    return null;
}
