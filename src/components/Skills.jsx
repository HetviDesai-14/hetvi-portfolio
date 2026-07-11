"use client";

import { motion } from "framer-motion";
import skills from "@/data/skills.json";
import Divider from "./Divider";

const ROWS = [
  { key: "domains", label: "Domains", icon: "◆" },
  { key: "frameworks", label: "Frameworks", icon: "▲" },
  { key: "languages", label: "Languages", icon: "◇" },
  { key: "tools", label: "Tools", icon: "●" },
];

function SkillRow({ label, icon, items, accentVar }) {
  return (
    <div
      className="relative flex flex-col gap-4 rounded-2xl border p-5 sm:flex-row sm:items-start sm:gap-6 sm:p-6"
      style={{ borderColor: "var(--line)", background: "var(--surface)" }}
    >
      <div
        className="flex shrink-0 items-center gap-2 sm:w-40 sm:flex-col sm:items-start sm:border-r sm:pr-6"
        style={{ borderColor: "var(--line)" }}
      >
        <span style={{ color: accentVar }}>{icon}</span>
        <p className="font-mono text-xs uppercase tracking-widest text-muted">{label}</p>
      </div>

      <div className="flex flex-1 flex-wrap gap-2.5">
        {items.map((it, i) => (
          <span
            key={i}
            className="chip-steady font-mono text-xs px-3 py-1.5 rounded-lg border cursor-default"
            style={{ borderColor: "var(--line)", background: "var(--surface-2)", color: "var(--text)" }}
          >
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="container-px py-16 md:py-24 snap-section">
      <Divider className="mb-10" />
      <p className="section-label">05 — Skills</p>
      <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3">The toolkit</h2>
      <p className="mt-3 text-muted max-w-lg">Steady, hands-on, and hover for a closer look.</p>

      <div className="mt-12 flex flex-col gap-4">
        {ROWS.map((row, idx) => (
          <motion.div
            key={row.key}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: idx * 0.06 }}
          >
            <SkillRow
              label={row.label}
              icon={row.icon}
              items={skills[row.key]}
              accentVar={idx % 2 === 0 ? "var(--accent)" : "var(--accent-2)"}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
