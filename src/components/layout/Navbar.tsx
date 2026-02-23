"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Journey", href: "#journey" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Case Studies", href: "#blog" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 py-4 border-b",
          isScrolled
            ? "bg-white/80 dark:bg-space/90 backdrop-blur-xl border-violet-500/10 py-3"
            : "bg-transparent border-transparent py-5"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className="gradient-text text-xl font-bold tracking-tight z-50"
            aria-label="Fawaz — Home"
          >
            Fawaz<span className="font-serif italic" style={{ color: "#06B6D4" }} aria-hidden="true">.</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-8">
            {navItems.map((item) => (
              <MagneticButton key={item.name}>
                <Link
                  href={item.href}
                  className="relative text-sm font-medium text-[#6B6F8A] dark:text-[#7B82A8] hover:text-space dark:hover:text-white transition-colors px-2 py-1 block
                    after:block after:h-px after:bg-linear-to-r after:from-violet-500 after:to-cyan-400
                    after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
                >
                  {item.name}
                </Link>
              </MagneticButton>
            ))}
            <div className="pl-4 border-l border-violet-500/20 flex gap-4 items-center">
              <ThemeToggle />
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download Resume (opens in new tab)"
                className="hidden xl:inline-flex items-center justify-center px-4 py-1.5 text-sm rounded-full border border-violet-500/30 dark:border-violet-500/50 text-violet-600 dark:text-violet-300 hover:border-violet-500 dark:hover:border-violet-400 hover:bg-violet-500/10 transition-all"
              >
                Resume
              </a>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center xl:hidden gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="z-50 p-2 text-foreground dark:text-white"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-[#F5F5FF] dark:bg-space flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Violet ambient orb */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-violet-400/15 dark:bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col items-center gap-8 relative z-10">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-bold text-[#6B6F8A] dark:text-[#7B82A8] hover:gradient-text transition-all group"
                >
                  <span className="group-hover:gradient-text">{item.name}</span>
                </Link>
              ))}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Download Resume (opens in new tab)"
                className="mt-2 px-6 py-2 text-lg rounded-full border border-violet-500/50 text-violet-300 hover:border-violet-400 hover:bg-violet-500/10 transition-all"
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
