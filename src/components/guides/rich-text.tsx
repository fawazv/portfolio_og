import { Fragment, type ReactNode } from "react";

/*
 * Tiny inline renderer for guide copy: **bold**, *italic*, `code` and
 * [text](href). Content is our own (src/content/guides.ts), never user input.
 */

const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;

export function RichText({ text }: { text: string }): ReactNode {
  const parts = text.split(pattern).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`")) {
      return (
        <code
          key={i}
          className="rounded-md bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-foreground [overflow-wrap:anywhere]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("[")) {
      const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (m) {
        const external = /^https?:/.test(m[2]);
        return (
          <a
            key={i}
            href={m[2]}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="font-medium text-foreground underline decoration-tomato decoration-2 underline-offset-4 hover:text-accent"
          >
            {m[1]}
          </a>
        );
      }
    }
    if (part.startsWith("*") && part.length > 2) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}
