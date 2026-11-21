"use client";

import { Github, Linkedin, ArrowUp, Mail, Download } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    // Smooth by default via CSS scroll-behavior; instant under reduced motion
    window.scrollTo({ top: 0 });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background border-t border-line relative overflow-hidden">
      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid pointer-events-none" aria-hidden="true" />
      {/* Violet ambient orb */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sage/25 dark:bg-sage/25 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Gradient atmosphere divider */}
        <div className="w-full h-px bg-linear-to-r from-transparent via-foreground/20 dark:via-foreground/20 to-transparent mb-16" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

          {/* Left — Logo + Tagline */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold uppercase tracking-tighter">
              <span className="gradient-text">Fawaz</span><span className="font-serif italic normal-case text-accent" aria-hidden="true">.</span>
            </h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-xs">
              Full Stack Developer crafting scalable systems and cinematic web experiences.
            </p>
            <p className="text-xs text-muted-foreground font-mono tracking-wider uppercase mt-6">
              © {currentYear} Mohammed Fawaz. All rights reserved.
            </p>
          </div>

          {/* Center — Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-6">
              Quick Links
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors group w-fit"
                aria-label="Download Resume (opens in new tab)"
              >
                <Download size={14} className="group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
                Download Resume
              </a>
              <a
                href="mailto:fawazv.business@gmail.com"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors group w-fit"
              >
                <Mail size={14} className="group-hover:scale-110 transition-transform" aria-hidden="true" />
                fawazv.business@gmail.com
              </a>
              <a
                href="#contact"
                className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors w-fit"
              >
                Get in Touch →
              </a>
            </div>
          </div>

          {/* Right — Socials + Back to Top */}
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-6">
                Connect
              </h4>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/mohammed-fawaz-216314280/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile (opens in new tab)"
                  className="p-2.5 border border-line dark:border-line rounded-full hover:border-foreground/30 dark:hover:border-foreground/30 hover:bg-sage/25 dark:hover:bg-sage/25 transition-all text-muted-foreground hover:text-accent"
                >
                  <Linkedin size={18} strokeWidth={1.5} aria-hidden="true" />
                </a>
                <a
                  href="https://github.com/fawazv/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile (opens in new tab)"
                  className="p-2.5 border border-line dark:border-line rounded-full hover:border-foreground/30 dark:hover:border-foreground/30 hover:bg-sage/25 dark:hover:bg-sage/25 transition-all text-muted-foreground hover:text-accent"
                >
                  <Github size={18} strokeWidth={1.5} aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-muted-foreground hover:text-foreground transition-colors group mt-4"
            >
              <span className="p-1.5 border border-line rounded-full group-hover:border-foreground/30 group-hover:bg-sage/25 transition-all">
                <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
              </span>
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
