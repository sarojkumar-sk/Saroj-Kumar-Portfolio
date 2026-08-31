"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";

// ── Navigation links ──────────────────────────────────────────────────────
// Easy to update: add/remove/reorder entries here.
const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Learning", href: "#learning" },
  { label: "AI Chat", href: "#ai-assistant" },
  { label: "Contact", href: "#contact" },
];

// ── Theme toggle ──────────────────────────────────────────────────────────

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-9 h-9 rounded-lg border border-[var(--border)] animate-pulse" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="w-9 h-9 flex items-center justify-center rounded-lg border border-[var(--border)]
                 bg-[var(--bg-card)] text-[var(--text-secondary)]
                 hover:border-blue-500/60 hover:text-[var(--accent-blue)]
                 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
    >
      {isDark ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
          className="w-4 h-4">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
          className="w-4 h-4">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--border)] shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav
        className="section-container flex items-center justify-between h-16"
        aria-label="Main navigation"
      >
        {/* ── Logo / Name ── */}
        <Link
          href="#hero"
          className="text-base font-bold tracking-tight hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500/40 rounded-md px-1"
          onClick={closeMenu}
          aria-label="Saroj Kumar — back to top"
        >
          <span className="accent-gradient">Saroj</span>
          <span className="text-[var(--text-primary)]"> Kumar</span>
        </Link>

        {/* ── Desktop links ── */}
        <ul className="hidden lg:flex items-center gap-0.5" role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-[var(--text-secondary)]
                           hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]
                           transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ── Right controls ── */}
        <div className="flex items-center gap-2">
          {/* Resume download — update href to your real PDF path */}
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            aria-label="Download Resume (coming soon)"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg
                       text-xs font-semibold border border-[var(--border)] bg-[var(--bg-card)]
                       text-[var(--text-secondary)] hover:border-blue-500/50 hover:text-[var(--accent-blue)]
                       transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
              className="w-3 h-3" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Resume
          </a>

          <ThemeToggle />

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg
                       border border-[var(--border)] bg-[var(--bg-card)]
                       hover:border-blue-500/60 transition-all duration-300
                       focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            <span className={`block h-0.5 w-5 bg-current transition-transform duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-current transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-current transition-transform duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {/* ── Mobile dropdown ── */}
      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out
                    bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--border)]
                    ${menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
        aria-hidden={!menuOpen}
      >
        <ul className="section-container flex flex-col py-3 gap-0.5" role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={closeMenu}
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--text-secondary)]
                           hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]
                           transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              >
                {label}
              </Link>
            </li>
          ))}
          {/* Resume in mobile menu too */}
          <li className="pt-2 border-t border-[var(--border)] mt-1">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); closeMenu(); }}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium
                         text-[var(--text-secondary)] hover:text-[var(--accent-blue)]
                         transition-all duration-200"
            >
              Download Resume
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
