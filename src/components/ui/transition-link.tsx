"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

/*
 * View Transitions for client-side navigation, using the browser API directly
 * (no experimental Next flag). A card's image and the case-study hero share a
 * `view-transition-name`, so the photo morphs between the two pages.
 *
 * Falls back to a normal <Link> navigation when the API is missing, when a
 * modifier key or middle-click asks for a new tab, or under reduced motion.
 */

let finishTransition: (() => void) | null = null;

type StartViewTransition = (cb: () => Promise<void>) => { finished: Promise<void> };

export function TransitionLink({
  href,
  children,
  ...rest
}: React.ComponentProps<typeof Link> & { href: string }) {
  const router = useRouter();

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    rest.onClick?.(e);
    if (e.defaultPrevented) return;
    const start = (document as Document & { startViewTransition?: StartViewTransition }).startViewTransition;
    if (
      !start ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return; // let <Link> handle it
    }
    e.preventDefault();
    const transition = start.call(
      document,
      () =>
        new Promise<void>((resolve) => {
          finishTransition = resolve;
          router.push(href);
          // Safety net: never hold the old page frozen for long. Resolving
          // twice is harmless, so this always fires.
          window.setTimeout(() => {
            if (finishTransition === resolve) finishTransition = null;
            resolve();
          }, 1500);
        })
    );
    // An aborted or skipped transition is not an error for the visitor.
    transition.finished.catch(() => {});
  };
  return (
    <Link href={href} {...rest} onClick={onClick}>
      {children}
    </Link>
  );
}

/** Mounted once in the root layout: completes the transition after the new route renders. */
export function ViewTransitionResolver() {
  const pathname = usePathname();
  useEffect(() => {
    if (finishTransition) {
      const done = finishTransition;
      finishTransition = null;
      // The new route has committed to the DOM. Resolve now: rendering (and so
      // requestAnimationFrame) is paused while the transition waits on us.
      done();
    }
  }, [pathname]);
  return null;
}
