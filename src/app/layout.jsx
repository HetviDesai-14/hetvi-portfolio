import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-provider";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "Hetvi Desai — AI / ML Engineer",
  description:
    "Portfolio of Hetvi Desai — AI/ML engineer working on activation steering, multimodal emotion AI, speech synthesis, and reinforcement-learned robot locomotion.",
  keywords: [
    "Hetvi Desai",
    "AI Engineer",
    "ML Engineer",
    "Activation Steering",
    "Emotion AI",
    "Reinforcement Learning",
    "NLP",
  ],
  authors: [{ name: "Hetvi Desai" }],
  openGraph: {
    title: "Hetvi Desai — AI / ML Engineer",
    description:
      "Activation steering, multimodal emotion AI, speech synthesis, and RL-driven robot locomotion.",
    type: "website",
  },
};

const noFlashScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} font-body antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
