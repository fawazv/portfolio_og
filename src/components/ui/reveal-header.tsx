"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface RevealHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function RevealHeader({ children, className }: RevealHeaderProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <h2
        ref={ref}
        className={cn("relative overflow-hidden", className)}
    >
      <motion.span
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : { y: "100%" }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }} // Cubic bezier for "cinematic" feel
        className="block"
      >
        {children}
      </motion.span>
    </h2>
  );
}
