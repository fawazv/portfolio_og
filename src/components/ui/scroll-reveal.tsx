"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number; // Delay in milliseconds
}

export function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <motion.div
            ref={ref}
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{
                duration: 0.8,
                ease: [0.33, 1, 0.68, 1], // Cinematic ease matching reveal-header
                delay: delay / 1000 // Convert ms to seconds for Framer Motion
            }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
}
