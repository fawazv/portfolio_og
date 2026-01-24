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
  { name: "Insights", href: "#blog" },
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
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(0);
      } else {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 py-4",
          isScrolled
            ? "bg-white/80 dark:bg-black/80 backdrop-blur-md py-3"
            : "bg-transparent py-5"
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
            className="text-xl font-bold tracking-tighter uppercase z-50 text-foreground dark:text-white"
          >
            Dev<span className="opacity-50">.Portfolio</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-8">
            {navItems.map((item) => (
              <MagneticButton key={item.name}>
                <Link
                  href={item.href}
                  className="text-sm font-medium uppercase tracking-wide hover:text-secondary transition-colors text-foreground dark:text-gray-300 px-2 py-1 block"
                >
                  {item.name}
                </Link>
              </MagneticButton>
            ))}
            <div className="pl-4 border-l border-foreground/20 dark:border-white/20 flex gap-4">
              <ThemeToggle />
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:inline-flex items-center justify-center px-4 py-1 text-sm font-bold uppercase tracking-wide bg-white text-black hover:bg-white/90 transition-colors rounded-sm"
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
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
            className="fixed inset-0 z-40 bg-white dark:bg-black flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-bold uppercase tracking-tighter hover:text-secondary transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-4xl font-bold uppercase tracking-tighter hover:text-secondary transition-colors text-white/50"
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
