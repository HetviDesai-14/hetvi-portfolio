"use client";

import { motion } from "framer-motion";
import profile from "@/data/profile.json";
import ProfileAura from "./ProfileAura";
import Ticker from "./Ticker";

export default function Hero() {
  return (
    <section id="top" className="snap-section relative overflow-hidden pt-28 pb-10 md:pt-24">
      {/* ambient drifting background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-24 -left-24 h-72 w-72 rounded-full opacity-30 blur-3xl animate-drift"
          style={{ background: "var(--accent)" }}
        />
        <div
          className="absolute top-1/3 -right-32 h-96 w-96 rounded-full opacity-20 blur-3xl animate-drift"
          style={{ background: "var(--accent-2)", animationDelay: "-6s" }}
        />
      </div>

      <div className="container-px grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="section-label mb-5"
          >
            {profile.role}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-display text-4xl sm:text-5xl lg:text-[3.3rem] leading-[1.1] font-semibold tracking-tight"
          >
            I build AI that{" "}
            <span className="italic text-accent">sees</span>,{" "}
            <span className="italic text-accent2">reasons</span>, and{" "}
            <span className="italic text-accent">acts</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-6 max-w-xl text-base sm:text-lg text-muted leading-relaxed"
          >
            {profile.subline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#contact"
              className="group relative overflow-hidden rounded-full px-6 py-3 font-mono text-xs uppercase tracking-wide focus-ring"
              style={{ background: "var(--accent)", color: "#fff" }}
            >
              <span className="relative z-10">Start a conversation</span>
              <span
                className="absolute inset-0 -translate-x-full transition-transform duration-300 group-hover:translate-x-0"
                style={{ background: "var(--accent-2)" }}
              />
            </a>
            <a
              href={profile.resumeFile}
              download
              className="rounded-full px-6 py-3 font-mono text-xs uppercase tracking-wide border transition-colors hover:border-accent hover:text-accent focus-ring"
              style={{ borderColor: "var(--line)" }}
            >
              Download résumé ↓
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <ProfileAura />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="container-px mt-16"
      >
        <Ticker items={profile.tickerItems} />
      </motion.div>

      <div className="mt-8 flex justify-center">
        <a
          href="#about"
          aria-label="Scroll to About"
          className="flex flex-col items-center gap-1 text-muted hover:text-accent transition-colors focus-ring"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="animate-bounceChevron"
          >
            <path d="M2 5L8 11L14 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}
