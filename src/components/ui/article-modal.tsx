"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
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
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    // Handle Esc key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!article) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-background/80 backdrop-blur-xl"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-4xl max-h-[90vh] bg-background border border-foreground/10 overflow-hidden flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-foreground/10 bg-background/50 backdrop-blur-md sticky top-0 z-10">
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
                            className="flex-1 overflow-y-auto custom-scrollbar"
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
                                <div className="absolute inset-0 bg-linear-to-t from-background to-transparent" />
                            </div>

                            <div className="max-w-2xl mx-auto px-6 pb-12">
                                <motion.h2
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-8 leading-tight"
                                >
                                    {article.title}
                                </motion.h2>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="prose prose-invert prose-neutral max-w-none"
                                >
                                    <p className="text-xl text-muted-foreground mb-8 font-medium leading-relaxed italic">
                                        {article.excerpt}
                                    </p>

                                    <div className="space-y-6 text-foreground/80 text-lg leading-relaxed whitespace-pre-wrap">
                                        {article.content}
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Footer / Progress Indicator Placeholder */}
                        <div className="p-4 border-t border-foreground/10 bg-background/50 text-center">
                            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/50">
                                End of Insight
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
