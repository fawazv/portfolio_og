"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

/** A prompt to paste into Claude, with a copy button. */
export function PromptBlock({ label = "Prompt", text }: { label?: string; text: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch {
      // Clipboard API blocked (permission or insecure context): fall back to a hidden textarea.
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      try {
        ok = document.execCommand("copy");
      } catch {
        ok = false;
      }
      area.remove();
    }
    if (!ok) return; // the text stays selectable by hand
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  };

  // A distinct accessible name per button ("Copy prompt: Set up this folder for…"),
  // so screen-reader users can tell several copy buttons on one page apart.
  const preview = text.split(/\s+/).slice(0, 6).join(" ");
  const buttonName = `Copy ${label.toLowerCase()}: ${preview}…`;

  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-raised">
      <figcaption className="flex items-center justify-between gap-4 border-b border-line px-4 py-2.5">
        <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-tomato" aria-hidden="true" />
          {label}
        </span>
        <button
          type="button"
          onClick={copy}
          aria-label={buttonName}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 text-xs font-medium text-foreground transition-colors hover:bg-surface"
        >
          {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
          <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
        </button>
      </figcaption>
      <pre className="whitespace-pre-wrap break-words p-4 font-mono text-[13px] leading-relaxed text-foreground/90 md:p-5 md:text-sm">
        {text}
      </pre>
    </figure>
  );
}
