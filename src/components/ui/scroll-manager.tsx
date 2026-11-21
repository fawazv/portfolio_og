"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Native scrolling (Lenis removed in B3). This component only keeps GSAP's
 * ScrollTrigger positions correct and fixes deep links:
 *
 * - Sections below the fold are loaded with next/dynamic and images load
 *   late, so pinned sections (Projects, Journey) add their pin spacing after
 *   the browser has already jumped to `/#contact`. We refresh ScrollTrigger
 *   once things settle, then re-scroll to the hash target.
 * - Under prefers-reduced-motion, time-based GSAP tweens finish instantly
 *   (scroll-scrubbed effects are switched off in the sections themselves).
 */
export default function ScrollManager() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyMotion = () => gsap.globalTimeline.timeScale(reduce.matches ? 1000 : 1);
    applyMotion();
    reduce.addEventListener("change", applyMotion);

    const scrollToHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const el = document.getElementById(id);
      // "instant": "auto" would inherit the CSS smooth scroll and glide from the top.
      if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
    };

    let timer: number | undefined;
    const settle = () => {
      ScrollTrigger.refresh();
      // Wait for the refresh (pin spacers) to apply before jumping.
      window.requestAnimationFrame(() => window.requestAnimationFrame(scrollToHash));
    };

    if (document.readyState === "complete") {
      timer = window.setTimeout(settle, 300);
    } else {
      window.addEventListener("load", settle, { once: true });
    }

    // Fonts change line heights, which moves every trigger.
    document.fonts?.ready.then(() => ScrollTrigger.refresh()).catch(() => {});

    return () => {
      reduce.removeEventListener("change", applyMotion);
      window.removeEventListener("load", settle);
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  return null;
}
