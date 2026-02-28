"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function MagneticButton({ children, className, onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  // gsap.quickTo returns a setter; we cache both axes
  const xTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const yTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    xTo.current = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    yTo.current = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || !xTo.current || !yTo.current) return;
    const { height, width, left, top } = el.getBoundingClientRect();
    xTo.current((e.clientX - (left + width / 2)) * 0.2);
    yTo.current((e.clientY - (top + height / 2)) * 0.2);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!xTo.current || !yTo.current) return;
    xTo.current(0);
    yTo.current(0);
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative cursor-pointer", className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
