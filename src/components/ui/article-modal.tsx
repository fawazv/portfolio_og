"use client";

import { useRef, useEffect, useCallback } from "react";
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

    // Prevent scrolling when modal is open
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

    // GSAP open/close animation
    useEffect(() => {
        const backdrop = backdropRef.current;
        const modal = modalRef.current;
        const container = containerRef.current;
        if (!backdrop || !modal || !container) return;

        if (isOpen) {
            // Show container, then animate in
            gsap.set(container, { display: "flex" });
            tl.current = gsap.timeline()
                .fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.25 })
                .fromTo(
                    modal,
                    { opacity: 0, scale: 0.92, y: 24 },
                    { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: "power3.out" },
                    "-=0.15"
                );
        } else {
            // Animate out then hide
            tl.current = gsap.timeline({
                onComplete: () => gsap.set(container, { display: "none" }),
            })
                .to(modal, { opacity: 0, scale: 0.92, y: 24, duration: 0.25, ease: "power2.in" })
                .to(backdrop, { opacity: 0, duration: 0.2 }, "-=0.15");
        }
    }, [isOpen]);

    if (!article) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-100 items-center justify-center p-4 md:p-8"
            style={{ display: "none" }}
        >
            {/* Backdrop */}
            <div
                ref={backdropRef}
                onClick={onClose}
                className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-xl"
                style={{ opacity: 0 }}
            />

            {/* Modal Content */}
            <div
                ref={modalRef}
                className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-black border border-foreground/10 overflow-hidden flex flex-col shadow-2xl"
                style={{ opacity: 0, transform: "scale(0.92) translateY(24px)" }}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-foreground/10 bg-white/50 dark:bg-black/50 backdrop-blur-md sticky top-0 z-10">
                    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        <span>{article.category}</span>
                        <span className="w-1 h-1 bg-secondary rounded-full" />
                        <span>{article.readTime}</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-foreground/5 rounded-full transition-colors group"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                </div>

                {/* Scrollable Area */}
                <div
                    className="flex-1 overflow-y-auto custom-scrollbar overscroll-contain"
                    data-lenis-prevent
                >
                    <div className="relative h-64 md:h-96 w-full mb-8">
                        <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-white dark:from-black to-transparent" />
                    </div>

                    <div className="max-w-2xl mx-auto px-6 pb-12">
                        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-8 leading-tight">
                            {article.title}
                        </h2>
                        <div className="prose dark:prose-invert prose-neutral max-w-none">
                            <p className="text-xl text-muted-foreground mb-8 font-medium leading-relaxed italic">
                                {article.excerpt}
                            </p>
                            <div className="space-y-6 text-foreground/80 text-lg leading-relaxed whitespace-pre-wrap">
                                {article.content}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-foreground/10 bg-white/50 dark:bg-black/50 text-center">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/50">
                        End of Insight
                    </p>
                </div>
            </div>
        </div>
    );
}
