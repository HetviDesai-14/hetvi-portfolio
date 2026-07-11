"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import profile from "@/data/profile.json";
import education from "@/data/education.json";
import skills from "@/data/skills.json";
import Divider from "./Divider";

// Whichever entry ends latest (or is ongoing / "Present") is treated as the
// primary, featured degree. Everything else collapses into the list below.
// Add a new degree to education.json with a later end date (or "Present")
// and it automatically becomes the featured one — no component changes needed.
function sortKey(e) {
  if (!e.end || e.end.toLowerCase() === "present") return "9999-99";
  return e.end;
}

export default function About() {
  const sorted = [...education].sort((a, b) => sortKey(b).localeCompare(sortKey(a)));
  const primary = sorted[0];
  const secondary = sorted.slice(1);
  const [openId, setOpenId] = useState(null);

  return (
    <section id="about" className="container-px py-16 md:py-24 snap-section">
      <Divider className="mb-10" />
      <p className="section-label mb-4">01 — About</p>

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-display text-2xl md:text-[1.85rem] leading-snug">
            I'm an AI/ML engineer and researcher who likes taking a model apart to understand{" "}
            <span className="italic text-accent">why</span> it behaves the way it does — then
            using that to build something that actually works.
          </p>
          <p className="mt-6 text-muted leading-relaxed">
            My work spans large language models, computer vision, and reinforcement learning —
            from interpretability and applied NLP to reinforcement-learned robot locomotion. I
            like problems that sit between research and product: understanding a system deeply
            enough to ship it.
          </p>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs text-muted">
            <span>
              <span className="text-accent">◆</span> {profile.availability}
            </span>
          </div>

          <div className="mt-10">
            <p className="font-mono text-xs uppercase tracking-widest text-muted mb-4">
              Languages spoken
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-lg">
              {skills.languagesSpoken.map((l, idx) => (
                <motion.div
                  key={l.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="card rounded-xl p-4 text-center transition-transform hover:-translate-y-1"
                >
                  <p className="font-display text-base font-semibold">{l.name}</p>
                  <p
                    className="mt-1 font-mono text-xs"
                    style={{ color: idx % 2 === 0 ? "var(--accent)" : "var(--accent-2)" }}
                  >
                    {l.level}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="card relative overflow-hidden rounded-2xl p-7"
        >
          <div
            className="absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl opacity-40"
            style={{ background: "var(--accent-2)" }}
          />
          <p className="section-label">Education</p>
          <h3 className="font-display text-xl font-semibold mt-3 leading-snug">
            {primary.degree}
          </h3>
          <p className="text-sm text-accent mt-1">{primary.org}</p>
          <p className="text-xs text-muted mt-1">{primary.location}</p>

          <div className="mt-5 flex items-center gap-3">
            <span
              className="font-mono text-lg font-semibold px-3 py-1.5 rounded-lg"
              style={{ background: "var(--accent2-soft)", color: "var(--accent-2)" }}
            >
              {primary.grade}
            </span>
            <span className="font-mono text-xs text-muted">
              {primary.start?.slice(0, 4)} — {primary.end?.toLowerCase() === "present" ? "Present" : primary.end?.slice(0, 4)}
            </span>
          </div>

          {primary.detail && (
            <p className="mt-5 text-xs text-muted leading-relaxed">{primary.detail}</p>
          )}

          {secondary.length > 0 && (
            <div className="mt-6 pt-5 border-t space-y-1" style={{ borderColor: "var(--line)" }}>
              {secondary.map((e) => {
                const isOpen = openId === e.id;
                const timeline = `${e.start?.slice(0, 4)} — ${
                  e.end?.toLowerCase() === "present" ? "Present" : e.end?.slice(0, 4)
                }`;
                return (
                  <div key={e.id}>
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : e.id)}
                      aria-expanded={isOpen}
                      className="focus-ring flex w-full items-center justify-between gap-3 py-2 text-left"
                    >
                      <div className="min-w-0">
                        <p className="text-sm">{e.degree}</p>
                        <p className="text-xs text-muted truncate">{e.org}</p>
                      </div>
                      <span className="flex shrink-0 items-center gap-2">
                        <span className="font-mono text-xs text-accent">{timeline}</span>
                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.25 }}
                          className="text-muted"
                        >
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <path d="M2 5L8 11L14 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </motion.span>
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (e.detail || e.grade) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pb-3 pl-0.5 pr-6">
                            {e.grade && (
                              <p className="font-mono text-xs text-muted">
                                Grade: <span className="text-accent2">{e.grade}</span>
                              </p>
                            )}
                            {e.detail && (
                              <p className="mt-2 text-xs text-muted leading-relaxed">{e.detail}</p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
