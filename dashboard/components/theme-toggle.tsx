"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const isDark =
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    document.documentElement.classList.toggle("dark", isDark);
    // Synchronize the browser preference after static hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDark(isDark);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next = !dark;

    setDark(next);
    document.documentElement.classList.toggle("dark", next);

    if (next) {
      localStorage.theme = "dark";
    } else {
      localStorage.theme = "light";
    }
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted"
      aria-label="Toggle theme"
    >
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
