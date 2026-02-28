"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
      aria-label="Toggle theme"
    >
      {/* Sun icon — visible in dark mode to switch to light */}
      <span
        className="absolute inset-0 flex items-center justify-center p-2 transition-all duration-200"
        style={{
          opacity: isDark ? 0 : 1,
          transform: isDark ? "scale(0)" : "scale(1)",
        }}
        aria-hidden={isDark}
      >
        <Sun className="h-5 w-5 text-black" />
      </span>

      {/* Moon icon — visible in light mode to switch to dark */}
      <span
        className="flex items-center justify-center transition-all duration-200"
        style={{
          opacity: isDark ? 1 : 0,
          transform: isDark ? "scale(1)" : "scale(0)",
        }}
        aria-hidden={!isDark}
      >
        <Moon className="h-5 w-5 text-white" />
      </span>

      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
