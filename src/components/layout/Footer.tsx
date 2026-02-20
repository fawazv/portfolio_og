"use client";

import { Github, Linkedin, ArrowUp, Mail, Download } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-accent/30 border-t border-black/5 dark:border-white/5">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

          {/* Left — Logo + Tagline */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold uppercase tracking-tighter text-foreground">
              Fawaz<span className="font-serif italic normal-case text-secondary opacity-80">.</span>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Full Stack Developer crafting scalable systems and cinematic web experiences.
            </p>
            <p className="text-xs text-muted-foreground/60 uppercase tracking-widest mt-6">
              © {currentYear} Mohammed Fawaz. All rights reserved.
            </p>
          </div>

          {/* Center — Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
              Quick Links
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors group w-fit"
                aria-label="Download Resume (opens in new tab)"
              >
                <Download size={14} className="group-hover:-translate-y-0.5 transition-transform" />
                Download Resume
              </a>
              <a
                href="mailto:fawazv.business@gmail.com"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors group w-fit"
              >
                <Mail size={14} className="group-hover:scale-110 transition-transform" />
                fawazv.business@gmail.com
              </a>
              <a
                href="#contact"
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors w-fit"
              >
                Get in Touch →
              </a>
            </div>
          </div>

          {/* Right — Socials + Back to Top */}
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
                Connect
              </h4>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/mohammed-fawaz-216314280/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile (opens in new tab)"
                  className="p-2.5 border border-foreground/10 rounded-full hover:border-foreground/40 hover:bg-foreground/5 transition-all text-foreground/60 hover:text-foreground"
                >
                  <Linkedin size={18} strokeWidth={1.5} />
                </a>
                <a
                  href="https://github.com/fawazv/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile (opens in new tab)"
                  className="p-2.5 border border-foreground/10 rounded-full hover:border-foreground/40 hover:bg-foreground/5 transition-all text-foreground/60 hover:text-foreground"
                >
                  <Github size={18} strokeWidth={1.5} />
                </a>
              </div>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors group mt-4"
            >
              <span className="p-1.5 border border-foreground/10 rounded-full group-hover:border-foreground/40 group-hover:bg-foreground/5 transition-all">
                <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
              </span>
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
