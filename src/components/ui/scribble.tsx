import { cn } from "@/lib/utils";

/**
 * One emphasised word per screen: italic serif with a hand-drawn tomato
 * underline that draws itself once (CSS in globals.css → .scribble).
 */
export function Scribble({
  children,
  className,
  delay,
}: {
  children: React.ReactNode;
  className?: string;
  /** CSS time, e.g. "0.9s". Defaults to 0.7s. */
  delay?: string;
}) {
  return (
    <em
      className={cn("scribble font-serif italic font-normal", className)}
      style={delay ? ({ "--scribble-delay": delay } as React.CSSProperties) : undefined}
    >
      {children}
      <svg viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M2 13 C 60 3, 130 5, 198 12" pathLength={1} />
      </svg>
    </em>
  );
}
