"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { X } from "lucide-react";
import Image from "next/image";

interface Post {
    category: string;
    readTime: string;
    title: string;
    image: string;
    excerpt: string;
    content: string;
}

interface ArticleModalProps {
    isOpen: boolean;
    onClose: () => void;
    article: Post | null;
}

export function ArticleModal({ isOpen, onClose, article }: ArticleModalProps) {
    const backdropRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const tl = useRef<gsap.core.Timeline | null>(null);

    // Prevent body scroll when open
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    // ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    // GSAP open/close — bottom-sheet on mobile, scale-in on desktop
    useEffect(() => {
        const backdrop = backdropRef.current;
        const modal = modalRef.current;
        const container = containerRef.current;
        if (!backdrop || !modal || !container) return;

        const isMobile = window.innerWidth < 768;

        if (isOpen) {
            gsap.set(container, { display: "flex" });
            tl.current = gsap.timeline()
                .fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.25 })
                .fromTo(
                    modal,
                    isMobile
                        ? { y: "100%", opacity: 1 }         // slide up from bottom on mobile
                        : { opacity: 0, scale: 0.93, y: 20 }, // scale-in on desktop
                    isMobile
                        ? { y: "0%", duration: 0.4, ease: "power3.out" }
                        : { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: "power3.out" },
                    "-=0.15"
                );
        } else {
            tl.current = gsap.timeline({
                onComplete: () => gsap.set(container, { display: "none" }),
            })
                .to(modal, isMobile
                    ? { y: "100%", duration: 0.3, ease: "power2.in" }
                    : { opacity: 0, scale: 0.93, y: 20, duration: 0.25, ease: "power2.in" }
                )
                .to(backdrop, { opacity: 0, duration: 0.2 }, "-=0.1");
        }
    }, [isOpen]);

    if (!article) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-100 flex items-end md:items-center justify-center md:p-6 lg:p-8"
            style={{ display: "none" }}
        >
            {/* Backdrop */}
            <div
                ref={backdropRef}
                onClick={onClose}
                className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-xl"
                style={{ opacity: 0 }}
            />

            {/* Modal — full-screen bottom-sheet on mobile, floating card on desktop */}
            <div
                ref={modalRef}
                className={[
                    "relative w-full flex flex-col",
                    "bg-white dark:bg-[#0B0F23]",
                    "border-t md:border border-foreground/10",
                    "shadow-2xl overflow-hidden",
                    // Mobile: full height bottom sheet with rounded top corners
                    "h-[92dvh] md:h-auto",
                    "rounded-t-3xl md:rounded-2xl",
                    "max-w-none md:max-w-4xl",
                    "md:max-h-[90vh]",
                ].join(" ")}
                style={{ opacity: 1 }}
            >
                {/* Mobile drag handle */}
                <div className="flex justify-center pt-3 pb-1 md:hidden shrink-0">
                    <div className="w-10 h-1 rounded-full bg-foreground/20" />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 border-b border-foreground/10 bg-white/50 dark:bg-black/30 backdrop-blur-md sticky top-0 z-10 shrink-0">
                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        <span className="px-2 py-0.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-300">
                            {article.category}
                        </span>
                        <span className="hidden sm:inline">{article.readTime}</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-foreground/5 rounded-full transition-colors group"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                </div>

                {/* Scrollable content */}
                <div
                    className="flex-1 overflow-y-auto custom-scrollbar overscroll-contain"
                    data-lenis-prevent
                >
                    {/* Hero image — shorter on mobile */}
                    <div className="relative h-44 sm:h-56 md:h-80 w-full shrink-0">
                        <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-white dark:from-[#0B0F23] to-transparent" />
                    </div>

                    {/* Article body */}
                    <div className="px-4 sm:px-6 md:px-10 pb-10 max-w-2xl mx-auto">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tighter mb-5 leading-tight">
                            {article.title}
                        </h2>

                        <p className="text-base md:text-lg text-muted-foreground mb-6 font-medium leading-relaxed italic border-l-2 border-violet-500/50 pl-4">
                            {article.excerpt}
                        </p>

                        <div className="space-y-4 text-foreground/80 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                            {article.content}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-4 py-3 border-t border-foreground/10 bg-white/50 dark:bg-black/30 text-center shrink-0">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/50">
                        End of Insight
                    </p>
                </div>
            </div>
        </div>
    );
}
