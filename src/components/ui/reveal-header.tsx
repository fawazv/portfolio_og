"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface RevealHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function RevealHeader({ children, className }: RevealHeaderProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { rootMargin: "-10px" } // Fire slightly before it comes into view
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <h2
      ref={ref}
      className={cn("relative overflow-hidden", className)}
    >
      <span
        className={cn(
          "block transition-transform duration-800 ease-[cubic-bezier(0.33,1,0.68,1)]",
          isInView ? "translate-y-0" : "translate-y-full"
        )}
      >
        {children}
      </span>
    </h2>
  );
}
