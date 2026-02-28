"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Disable lag smoothing globally — prevents GSAP from "catching up"
        // after dropped frames which causes visible jumps
        gsap.ticker.lagSmoothing(0);

        // Skip Lenis on touch/mobile — native scroll is faster
        const isTouchDevice = window.innerWidth < 768 || 'ontouchstart' in window;
        if (isTouchDevice) {
            window.addEventListener('scroll', ScrollTrigger.update, { passive: true });
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

        // Sync Lenis scroll position to ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        // Store the callback reference so cleanup removes the EXACT same function
        const tickerCallback = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tickerCallback);

        return () => {
            // Use stored reference — fixes double-RAF bug on dev remount
            gsap.ticker.remove(tickerCallback);
            lenis.destroy();
        };
    }, []);

    return null;
}
