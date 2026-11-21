"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

import { cn } from "@/lib/utils";
import gsap from "gsap";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Work", href: "#projects" },
  { name: "Stack", href: "#skills" },
  { name: "Journey", href: "#journey" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Case Studies", href: "#blog" },
  { name: "Contact", href: "#contact" },
];

const sectionIds = navItems.map((item) => item.href.slice(1));

// Links to pages of their own (not home-page sections)
const pageItems = [{ name: "Guides", href: "/guides" }];

const istTime = new Intl.DateTimeFormat("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Kolkata",
});

/** "Open to work · 14:32 IST" — time filled in on the client only (no hydration mismatch). */
function StatusChip({ className }: { className?: string }) {
  const timeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tick = () => {
      if (timeRef.current) timeRef.current.textContent = istTime.format(new Date());
    };
    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1 text-xs text-muted-foreground whitespace-nowrap",
        className
      )}
    >
      <span className="h-2 w-2 rounded-full bg-live" aria-hidden="true" />
      <span>
        Open to work · <span ref={timeRef} className="tabular-nums" /> IST
      </span>
    </span>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const onHome = pathname === "/";
  // On case-study pages the section links point back to the home page.
  const hrefFor = (hash: string) => (onHome ? hash : `/${hash}`);

  // Entrance: slide down once (instant under reduced motion via ScrollManager)
  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current, { y: -100 }, { y: 0, duration: 0.6, ease: "power3.out" });
    }
  }, []);

  // Scrolled state + progress fallback for browsers without scroll-driven CSS
  useEffect(() => {
    const supportsTimeline = typeof CSS !== "undefined" && CSS.supports("animation-timeline: scroll()");
    let lastScrolled = false;
    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > 50;
      if (shouldBeScrolled !== lastScrolled) {
        lastScrolled = shouldBeScrolled;
        setIsScrolled(shouldBeScrolled);
      }
      if (!supportsTimeline && progressRef.current) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progressRef.current.style.setProperty("--progress", String(max > 0 ? window.scrollY / max : 0));
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section: the one crossing the middle band of the viewport.
  // Sections load lazily, so re-scan for them until all are present.
  useEffect(() => {
    const observed = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    const scan = () => {
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && !observed.has(id)) {
          observer.observe(el);
          observed.add(id);
        }
      }
      return observed.size === sectionIds.length;
    };
    let tries = 0;
    const interval = window.setInterval(() => {
      if (scan() || ++tries > 20) window.clearInterval(interval);
    }, 500);
    scan();
    return () => {
      window.clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  // Mobile menu: open/close animation, scroll lock, Escape to close
  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;

    if (isMobileMenuOpen) {
      document.documentElement.style.overflow = "hidden";
      gsap.set(menu, { display: "flex" });
      gsap.fromTo(menu, { opacity: 0, y: "-100%" }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" });
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsMobileMenuOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }

    document.documentElement.style.overflow = "";
    gsap.to(menu, {
      opacity: 0,
      y: "-100%",
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => {
        gsap.set(menu, { display: "none" });
      },
    });
  }, [isMobileMenuOpen]);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.history.replaceState(null, "", "/");
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Main"
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,padding] duration-300 ease-in-out px-6 border-b",
          isScrolled ? "bg-canvas/85 backdrop-blur-xl border-line py-3" : "bg-transparent border-transparent py-5"
        )}
      >
        <div className="container mx-auto flex items-center justify-between gap-6">
          <div className="flex items-center gap-4 min-w-0">
            <Link
              href="/"
              onClick={handleLogoClick}
              className="text-xl font-semibold tracking-tight text-foreground z-50"
              aria-label="Fawaz — Home"
            >
              Fawaz<span className="text-tomato" aria-hidden="true">.</span>
            </Link>
            <StatusChip className="hidden 2xl:inline-flex" />
          </div>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = onHome && activeId === item.href.slice(1);
              return (
                <Link
                  key={item.name}
                  href={hrefFor(item.href)}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative text-sm font-medium transition-colors px-2 py-1 block",
                    "after:block after:h-0.5 after:mt-0.5 after:rounded-full after:bg-tomato after:origin-left after:transition-transform",
                    isActive
                      ? "text-foreground after:scale-x-100"
                      : "text-muted-foreground hover:text-foreground after:scale-x-0 hover:after:scale-x-100"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
            {pageItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative text-sm font-medium transition-colors px-2 py-1 block",
                    "after:block after:h-0.5 after:mt-0.5 after:rounded-full after:bg-tomato after:origin-left after:transition-transform",
                    isActive
                      ? "text-foreground after:scale-x-100"
                      : "text-muted-foreground hover:text-foreground after:scale-x-0 hover:after:scale-x-100"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="pl-4 border-l border-line flex gap-4 items-center">
              <ThemeToggle />
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download Resume (opens in new tab)"
                className="inline-flex items-center justify-center px-4 py-1.5 text-sm font-medium rounded-full bg-accent text-on-accent hover:bg-accent-hover transition-colors"
              >
                Resume
              </a>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center xl:hidden gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="z-50 grid h-11 w-11 place-items-center text-foreground"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {isMobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Reading progress */}
        <div
          ref={progressRef}
          className="scroll-progress pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-tomato"
          aria-hidden="true"
        />
      </nav>

      {/* Mobile Menu Overlay — always in DOM, GSAP controls display/opacity */}
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 bg-canvas flex-col items-center justify-center overflow-hidden"
        style={{ display: "none", opacity: 0 }}
      >
        <div className="flex flex-col items-center gap-6 relative z-10">
          <StatusChip className="mb-2" />
          {navItems.map((item) => {
            const isActive = onHome && activeId === item.href.slice(1);
            return (
              <Link
                key={item.name}
                href={hrefFor(item.href)}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "text-3xl font-semibold tracking-tight transition-colors",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.name}
              </Link>
            );
          })}
          {pageItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "text-3xl font-semibold tracking-tight transition-colors",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.name}
              </Link>
            );
          })}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Download Resume (opens in new tab)"
            className="mt-2 px-6 py-3 text-lg font-medium rounded-full bg-accent text-on-accent hover:bg-accent-hover transition-colors"
          >
            Resume
          </a>
        </div>
      </div>
    </>
  );
}
