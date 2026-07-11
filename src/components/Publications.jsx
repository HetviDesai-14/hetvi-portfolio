"use client";

import { motion } from "framer-motion";
import publications from "@/data/publications.json";
import Divider from "./Divider";

export default function Publications() {
  return (
    <section id="publications" className="container-px py-16 md:py-24 snap-section">
      <Divider className="mb-10" />
      <p className="section-label">04 — Publications</p>
      <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3">Published research</h2>
      <p className="mt-3 text-muted max-w-lg">
        Three peer-reviewed papers on AI-driven plant disease detection and agricultural
        recommendation systems, published with Elsevier and Springer.
      </p>

      <div className="mt-12 flex flex-col gap-5">
        {publications.map((pub, idx) => (
          <motion.article
            key={pub.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: idx * 0.06 }}
            className="card group relative overflow-hidden rounded-2xl p-7 md:p-8"
          >
            <div
              className="pointer-events-none absolute left-0 top-0 h-full w-1.5"
              style={{ background: idx % 2 === 0 ? "var(--accent)" : "var(--accent-2)" }}
            />
            <div className="flex flex-wrap items-start justify-between gap-4 pl-3">
              <div className="flex-1 min-w-[240px]">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-mono text-xs text-muted">{pub.year}</span>
                  <span className="tag-chip">{pub.tag}</span>
                </div>
                <h3 className="font-display text-lg md:text-xl font-semibold mt-3 leading-snug">
                  {pub.title}
                </h3>
                <p className="text-sm text-muted mt-3 leading-relaxed">{pub.authors}</p>
                <p className="text-xs text-muted mt-2 italic">
                  {pub.journal} — {pub.publisher}
                </p>
                {pub.doi && (
                  <p className="font-mono text-[11px] text-muted mt-2">DOI: {pub.doi}</p>
                )}
              </div>

              <a
                href={pub.link}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wide transition-colors hover:border-accent hover:text-accent focus-ring"
                style={{ borderColor: "var(--line)" }}
              >
                Read paper
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M3 9L9 3M9 3H4M9 3V8"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
