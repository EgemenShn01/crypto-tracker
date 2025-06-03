// Header.tsx
"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-30 w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-zinc-900/80 shadow-md mb-8 backdrop-blur transition-colors duration-300">
      <Link href="/" className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
        Crypto Tracker
      </Link>
      <nav className="flex items-center gap-3">
        <Link
          href="/tokens"
          className="inline-block px-4 py-2 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-semibold shadow hover:bg-zinc-700 hover:dark:bg-zinc-100 transition"
        >
          Tokens
        </Link>
        {mounted && (
          <button
            aria-label="Toggle Theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="ml-2 p-2 rounded-full bg-zinc-200 dark:bg-zinc-800 transition hover:bg-zinc-300 hover:dark:bg-zinc-700"
          >
            {theme === "dark" ? <Sun className="w-5 h-5 text-yellow-700" /> : <Moon className="w-5 h-5 text-zinc-700" />}
          </button>
        )}
      </nav>
    </header>
  );
}
