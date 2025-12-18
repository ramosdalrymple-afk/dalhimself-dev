"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevents hydration mismatch by waiting for the component to mount
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-900 bg-white/50 dark:bg-black/50 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-6">
        
        {/* Logo */}
        <Link href="/" className="text-lg font-bold tracking-tighter text-zinc-900 dark:text-white transition-opacity hover:opacity-70">
          dalhimself.<span className="text-zinc-500">dev</span>
        </Link>

        {/* Right Side Items */}
        <div className="flex items-center gap-5">
          
          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label="Toggle Theme"
          >
            {mounted && (
              theme === "dark" ? (
                <Sun className="h-4 w-4 text-zinc-400 hover:text-yellow-500 transition-colors" />
              ) : (
                <Moon className="h-4 w-4 text-zinc-500 hover:text-blue-600 transition-colors" />
              )
            )}
          </button>

          {/* Subtle Divider */}
          <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <Link 
              href="https://github.com/ramosdalrymple-afk" 
              target="_blank" 
              className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              <Github className="h-4 w-4" />
            </Link>
            <Link 
              href="https://www.linkedin.com/in/dalrymple-ramos/" 
              target="_blank" 
              className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </Link>
            <Link 
              href="https://mail.google.com/mail/u/0/#inbox?compose=jrjtXSpVtxQPMsvmrSvTfqhBHfjXPlFmdZbvGrRDLdnvKMcwFsmhwzztCZLjMncGsQZccvzl" 
              className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              <Mail className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}