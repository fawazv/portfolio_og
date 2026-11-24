"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

/**
 * Light is the default theme. Which icon shows is decided by CSS (the `dark`
 * class next-themes puts on <html>), so there's no "mounted" state, no layout
 * shift and no hydration mismatch. resolvedTheme is used for the click so it
 * stays correct if system mode is ever turned back on.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="relative grid h-11 w-11 place-items-center rounded-full text-foreground hover:bg-foreground/5 transition-colors"
      aria-label="Switch between light and dark theme"
    >
      {/* Moon in light mode (switch to dark), sun in dark mode (switch to light) */}
      <Moon className="h-5 w-5 dark:hidden" aria-hidden="true" />
      <Sun className="hidden h-5 w-5 dark:block" aria-hidden="true" />
    </button>
  )
}
