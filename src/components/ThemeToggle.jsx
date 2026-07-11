"use client";

import { useTheme } from "@/lib/theme-provider";

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      className="focus-ring relative flex h-9 w-16 items-center rounded-full border transition-colors"
      style={{ borderColor: "var(--line)", background: "var(--surface-2)" }}
    >
      <span
        className="absolute left-1 flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-mono transition-transform duration-300 ease-out"
        style={{
          background: "var(--accent)",
          color: "var(--bg)",
          transform: mounted && theme === "dark" ? "translateX(28px)" : "translateX(0px)",
        }}
      >
        {mounted ? (theme === "dark" ? "🌙" : "☀") : ""}
      </span>
    </button>
  );
}
