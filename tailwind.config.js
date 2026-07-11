/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        surface2: "var(--surface-2)",
        text: "var(--text)",
        muted: "var(--muted)",
        line: "var(--line)",
        accent: "var(--accent)",
        accent2: "var(--accent-2)",
        "accent-soft": "var(--accent-soft)",
        "accent2-soft": "var(--accent2-soft)",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        grid: "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
      },
      keyframes: {
        blobMorph: {
          "0%, 100%": { borderRadius: "42% 58% 65% 35% / 45% 40% 60% 55%" },
          "34%": { borderRadius: "60% 40% 42% 58% / 55% 65% 35% 45%" },
          "67%": { borderRadius: "48% 52% 38% 62% / 40% 50% 50% 60%" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(var(--orbit-r)) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(var(--orbit-r)) rotate(-360deg)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: 0.55 },
          "50%": { opacity: 1 },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        bounceChevron: {
          "0%, 100%": { transform: "translateY(0)", opacity: 0.5 },
          "50%": { transform: "translateY(6px)", opacity: 1 },
        },
        drift: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(3%, -4%) scale(1.06)" },
        },
      },
      animation: {
        blobMorph: "blobMorph 12s ease-in-out infinite",
        orbit: "orbit 22s linear infinite",
        pulseSoft: "pulseSoft 2.6s ease-in-out infinite",
        floatY: "floatY 5s ease-in-out infinite",
        marquee: "marquee 26s linear infinite",
        bounceChevron: "bounceChevron 1.8s ease-in-out infinite",
        drift: "drift 14s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
