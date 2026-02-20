"use client";

import { useEffect } from "react";
import { RevealHeader } from "@/components/ui/reveal-header";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service if available
        console.error(error);
    }, [error]);

    return (
        <div className="flex h-screen min-h-[500px] w-full flex-col items-center justify-center bg-background px-6 text-center">
            <RevealHeader className="mb-4 text-4xl md:text-6xl font-black uppercase tracking-tighter text-foreground">
                Something went wrong
            </RevealHeader>

            <p className="mb-8 max-w-md text-lg text-muted-foreground font-serif italic">
                We encountered an unexpected error. Please try reloading the page or
                come back later.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={() => reset()}
                    className="relative group overflow-hidden bg-secondary px-8 py-4 text-sm font-bold uppercase tracking-widest text-secondary-foreground transition-all hover:bg-secondary/90 shadow-[0_0_20px_-5px_var(--secondary)]"
                >
                    <span className="relative z-10">Try Again</span>
                </button>

                <a
                    href="/"
                    className="relative group overflow-hidden border border-foreground/20 px-8 py-4 text-sm font-bold uppercase tracking-widest text-foreground transition-all hover:bg-foreground/5"
                >
                    <span className="relative z-10">Return Home</span>
                </a>
            </div>
        </div>
    );
}
