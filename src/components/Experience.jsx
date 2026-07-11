"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import experience from "@/data/experience.json";
import Divider from "./Divider";

function fmt(ym) {
  const [y, m] = ym.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[parseInt(m, 10) - 1]} ${y}`;
}

function OrgMark({ job, accentVar }) {
  const [broken, setBroken] = useState(false);
  if (job.logo && !broken) {
    return (
      <img
        src={job.logo}
        alt={`${job.org} logo`}
        onError={() => setBroken(true)}
        className="h-9 w-9 rounded-full border object-contain bg-white p-1"
        style={{ borderColor: "var(--line)" }}
      />
    );
  }
  return (
    <span
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-mono text-xs font-semibold"
      style={{ borderColor: accentVar, color: accentVar, background: "var(--surface)" }}
    >
      {job.org?.[0] ?? "•"}
    </span>
  );
}

export default function Experience() {
  const [activeId, setActiveId] = useState(null);

  return (
    <section id="work" className="container-px py-16 md:py-24 snap-section">
      <Divider className="mb-10" />
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="section-label">02 — Experience</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3">
            Where the research happened
          </h2>
        </div>
        <p className="font-mono text-xs text-muted max-w-xs">
          Three labs, one thread. Hover a role — on touch, tap it — to open the details.
        </p>
      </div>

      <div className="relative mt-14">
        {/* the spine */}
        <div
          className="absolute left-[27px] top-2 bottom-2 w-px md:left-1/2 md:-translate-x-1/2"
          style={{ background: "var(--line)" }}
          aria-hidden="true"
        />

        <div className="flex flex-col gap-10 md:gap-6">
          {experience.map((job, idx) => {
            const accentVar = idx % 2 === 0 ? "var(--accent)" : "var(--accent-2)";
            const softVar = idx % 2 === 0 ? "var(--accent-soft)" : "var(--accent2-soft)";
            const isOpen = activeId === job.id;
            const sideRight = idx % 2 === 1;

            return (
              <div
                key={job.id}
                className={`relative flex items-start gap-6 md:gap-0 ${
                  sideRight ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* node on the spine */}
                <div className="relative z-10 flex w-14 shrink-0 justify-center md:absolute md:left-1/2 md:w-0 md:-translate-x-1/2">
                  <span
                    className="mt-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border-4"
                    style={{ background: accentVar, borderColor: "var(--bg)" }}
                  />
                </div>

                {/* card */}
                <motion.div
                  onMouseEnter={() => setActiveId(job.id)}
                  onMouseLeave={() => setActiveId(null)}
                  onClick={() => setActiveId(isOpen ? null : job.id)}
                  onFocus={() => setActiveId(job.id)}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isOpen}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                  className="card focus-ring w-full cursor-pointer overflow-hidden rounded-2xl md:w-[calc(50%-2.5rem)]"
                  style={{ borderColor: isOpen ? accentVar : "var(--line)" }}
                >
                  <div className="flex items-center gap-4 px-6 py-5">
                    <OrgMark job={job} accentVar={accentVar} />
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-lg font-semibold truncate">{job.role}</p>
                      <p className="text-sm text-muted truncate">{job.org}</p>
                      <p className="font-mono text-[11px] text-muted mt-1">
                        {fmt(job.start)} — {fmt(job.end)} · {job.location}
                      </p>
                    </div>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0"
                      style={{ color: accentVar }}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2 5L8 11L14 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.span>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-7" style={{ background: softVar }}>
                          <p className="pt-5 text-sm leading-relaxed">{job.summary}</p>
                          <ul className="mt-4 space-y-2">
                            {job.highlights.map((h, i) => (
                              <li key={i} className="text-sm text-muted leading-relaxed flex gap-2">
                                <span className="shrink-0" style={{ color: accentVar }}>▸</span>
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-5 flex flex-wrap gap-2">
                            {job.tags.map((t) => (
                              <span
                                key={t}
                                className="font-mono text-[11px] tracking-wide uppercase px-2.5 py-1 rounded-full border"
                                style={{ borderColor: "var(--line)", color: "var(--muted)", background: "var(--surface)" }}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
