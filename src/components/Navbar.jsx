"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import profile from "@/data/profile.json";

const LINKS = [
  { href: "#work", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#publications", label: "Publications" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 z-50 w-full transition-colors duration-300"
      style={{
        background: scrolled ? "var(--bg)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
      }}
    >
      <nav className="container-px flex h-16 items-center justify-between">
        <a href="#top" className="font-display text-sm font-semibold tracking-tight flex items-center gap-2">
          <span
            className="inline-flex h-7 w-7 items-center justify-center rounded-full font-mono text-[11px]"
            style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
          >
            HD
          </span>
          <span>{profile.name}</span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono text-xs tracking-wide uppercase text-muted hover:text-accent transition-colors focus-ring"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={profile.resumeFile}
            download
            className="hidden sm:inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wide border transition-colors hover:border-accent hover:text-accent focus-ring"
            style={{ borderColor: "var(--line)" }}
          >
            Resume ↓
          </a>
          <ThemeToggle />
          <button
            className="md:hidden focus-ring"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
          >
            <div className="flex flex-col gap-1.5 w-6">
              <span className="h-px w-full" style={{ background: "var(--text)" }} />
              <span className="h-px w-full" style={{ background: "var(--text)" }} />
            </div>
          </button>
        </div>
      </nav>

      {open && (
        <div
          className="md:hidden container-px pb-6 flex flex-col gap-4 border-t"
          style={{ background: "var(--bg)", borderColor: "var(--line)" }}
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-mono text-xs uppercase tracking-wide text-muted hover:text-accent pt-4"
            >
              {link.label}
            </a>
          ))}
          <a
            href={profile.resumeFile}
            download
            className="font-mono text-xs uppercase tracking-wide text-accent"
          >
            Download Resume ↓
          </a>
        </div>
      )}
    </header>
  );
}
