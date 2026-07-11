"use client";

import { motion } from "framer-motion";
import leadership from "@/data/leadership.json";
import Divider from "./Divider";

export default function Leadership() {
  return (
    <section id="leadership" className="container-px py-16 md:py-24 snap-section">
      <Divider className="mb-10" />
      <p className="section-label">06 — Leadership</p>
      <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3">
        Management &amp; leadership roles
      </h2>
      <p className="mt-3 text-muted max-w-lg">
        Running research labs is one kind of ownership — running events for thousands of people is
        another. Both taught me how to plan under constraints and deliver anyway.
      </p>

      <div className="mt-12 grid sm:grid-cols-2 gap-6">
        {leadership.map((v, idx) => (
          <motion.div
            key={v.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="card relative overflow-hidden rounded-2xl p-7"
          >
            <div
              className="pointer-events-none absolute -left-10 -bottom-10 h-32 w-32 rounded-full blur-2xl opacity-30"
              style={{ background: idx % 2 === 0 ? "var(--accent)" : "var(--accent-2)" }}
            />
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-lg font-semibold">{v.role}</h3>
                <p className="text-sm text-accent mt-1">{v.org}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-display text-2xl font-semibold" style={{ color: "var(--accent-2)" }}>
                  {v.impactValue}
                </p>
                <p className="font-mono text-[10px] text-muted uppercase tracking-wide">
                  {v.impactLabel}
                </p>
              </div>
            </div>
            <p className="text-sm text-muted mt-4 leading-relaxed">{v.detail}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
