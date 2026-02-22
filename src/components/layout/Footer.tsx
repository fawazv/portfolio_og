"use client";

import { Github, Linkedin, ArrowUp, Mail, Download } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background border-t border-violet-500/10 relative overflow-hidden">
      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid pointer-events-none" aria-hidden="true" />
      {/* Violet ambient orb */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-400/6 dark:bg-violet-600/8 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Gradient atmosphere divider */}
        <div className="w-full h-px bg-linear-to-r from-transparent via-violet-500/20 dark:via-violet-500/30 to-transparent mb-16" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

          {/* Left — Logo + Tagline */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold uppercase tracking-tighter">
              <span className="gradient-text">Fawaz</span><span className="font-serif italic normal-case text-violet-500 dark:text-cyan-400" aria-hidden="true">.</span>
            </h3>
            <p className="text-sm text-[#6B6F8A] dark:text-[#7B82A8] font-light leading-relaxed max-w-xs">
              Full Stack Developer crafting scalable systems and cinematic web experiences.
            </p>
            <p className="text-xs text-[#6B6F8A] dark:text-[#4A4F6A] font-mono tracking-wider uppercase mt-6">
              © {currentYear} Mohammed Fawaz. All rights reserved.
            </p>
          </div>

          {/* Center — Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-[#6B6F8A] dark:text-[#7B82A8] mb-6">
              Quick Links
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#6B6F8A] dark:text-[#7B82A8] hover:text-violet-600 dark:hover:text-cyan-400 transition-colors group w-fit"
                aria-label="Download Resume (opens in new tab)"
              >
                <Download size={14} className="group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
                Download Resume
              </a>
              <a
                href="mailto:fawazv.business@gmail.com"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#6B6F8A] dark:text-[#7B82A8] hover:text-violet-600 dark:hover:text-cyan-400 transition-colors group w-fit"
              >
                <Mail size={14} className="group-hover:scale-110 transition-transform" aria-hidden="true" />
                fawazv.business@gmail.com
              </a>
              <a
                href="#contact"
                className="text-sm font-medium text-[#6B6F8A] dark:text-[#7B82A8] hover:text-violet-600 dark:hover:text-cyan-400 transition-colors w-fit"
              >
                Get in Touch →
              </a>
            </div>
          </div>

          {/* Right — Socials + Back to Top */}
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-[#6B6F8A] dark:text-[#7B82A8] mb-6">
                Connect
              </h4>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/mohammed-fawaz-216314280/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile (opens in new tab)"
                  className="p-2.5 border border-violet-500/15 dark:border-violet-500/20 rounded-full hover:border-violet-500/40 dark:hover:border-violet-500/50 hover:bg-violet-500/8 dark:hover:bg-violet-500/10 transition-all text-[#6B6F8A] dark:text-[#7B82A8] hover:text-violet-600 dark:hover:text-violet-300"
                >
                  <Linkedin size={18} strokeWidth={1.5} aria-hidden="true" />
                </a>
                <a
                  href="https://github.com/fawazv/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile (opens in new tab)"
                  className="p-2.5 border border-violet-500/15 dark:border-violet-500/20 rounded-full hover:border-violet-500/40 dark:hover:border-violet-500/50 hover:bg-violet-500/8 dark:hover:bg-violet-500/10 transition-all text-[#6B6F8A] dark:text-[#7B82A8] hover:text-violet-600 dark:hover:text-violet-300"
                >
                  <Github size={18} strokeWidth={1.5} aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#6B6F8A] dark:text-[#7B82A8] hover:text-space dark:hover:text-white transition-colors group mt-4"
            >
              <span className="p-1.5 border border-violet-500/20 rounded-full group-hover:border-violet-500/50 group-hover:bg-violet-500/10 transition-all">
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
