"use client";

import { motion } from "framer-motion";
import projects from "@/data/projects.json";
import Divider from "./Divider";

export default function Projects() {
  return (
    <section id="projects" className="container-px py-16 md:py-24 snap-section">
      <Divider className="mb-10" />
      <p className="section-label">03 — Projects</p>
      <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3">Selected builds</h2>

      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {projects.map((p, idx) => {
          const accentVar = idx % 2 === 0 ? "var(--accent)" : "var(--accent-2)";
          return (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="card group relative flex flex-col overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2"
              style={{ "--hover-border": accentVar }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = accentVar)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-50"
                style={{ background: accentVar }}
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ boxShadow: `0 0 0 1px ${accentVar}, 0 12px 30px -12px ${accentVar}` }}
              />
              <div className="flex items-start justify-between">
                <span className="font-mono text-[11px] text-muted">{p.period}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="shrink-0 -translate-x-1 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                  style={{ color: accentVar }}
                >
                  <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-display text-lg font-semibold mt-3">{p.title}</h3>
              <p className="text-sm mt-0.5" style={{ color: accentVar }}>
                {p.subtitle}
              </p>
              <p className="text-sm text-muted mt-3 leading-relaxed">{p.description}</p>
              <ul className="mt-3 space-y-1.5">
                {p.details.map((d, i) => (
                  <li key={i} className="text-xs text-muted flex gap-2 leading-relaxed">
                    <span className="shrink-0" style={{ color: accentVar }}>
                      ▸
                    </span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-5 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[10px] tracking-wide uppercase px-2 py-1 rounded-md transition-transform duration-200 hover:-translate-y-0.5"
                    style={{ background: "var(--surface-2)", color: "var(--muted)" }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
