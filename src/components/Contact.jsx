"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import profile from "@/data/profile.json";
import Divider from "./Divider";

const initialForm = { name: "", email: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Something went wrong. Please try again.");
      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="container-px py-16 md:py-24 snap-section">
      <Divider className="mb-10" />
      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label">07 — Contact</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3 max-w-md">
            Have a role, a dataset, or a hard problem?
          </h2>
          <p className="mt-4 text-muted leading-relaxed max-w-md">
            I read every message myself. Tell me what you're building — I'll reply from{" "}
            <span className="text-accent font-mono text-sm">{profile.email}</span>.
          </p>
          <div className="mt-8 flex flex-col gap-3 font-mono text-sm">
            <a href={`mailto:${profile.email}`} className="hover:text-accent transition-colors w-fit">
              {profile.email}
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors w-fit">
              linkedin.com/in/hetvi-d-13651227a
            </a>
            <span className="text-muted">{profile.phone} (WhatsApp)</span>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={onSubmit}
          className="card rounded-2xl p-6 md:p-8 flex flex-col gap-5"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-mono text-xs uppercase tracking-wide text-muted">
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              value={form.name}
              onChange={onChange}
              placeholder="Your name"
              className="focus-ring rounded-lg px-4 py-3 text-sm bg-transparent border outline-none"
              style={{ borderColor: "var(--line)" }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-mono text-xs uppercase tracking-wide text-muted">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              value={form.email}
              onChange={onChange}
              placeholder="you@company.com"
              className="focus-ring rounded-lg px-4 py-3 text-sm bg-transparent border outline-none"
              style={{ borderColor: "var(--line)" }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="font-mono text-xs uppercase tracking-wide text-muted">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={onChange}
              placeholder="What are you working on?"
              className="focus-ring rounded-lg px-4 py-3 text-sm bg-transparent border outline-none resize-none"
              style={{ borderColor: "var(--line)" }}
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="focus-ring mt-2 rounded-full px-6 py-3 font-mono text-xs uppercase tracking-wide transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
            style={{ background: "var(--accent)", color: "var(--bg)" }}
          >
            {status === "loading" ? "Sending…" : "Send message"}
          </button>

          {status === "success" && (
            <p className="font-mono text-xs text-accent">
              ✓ Sent — check your inbox for a confirmation email.
            </p>
          )}
          {status === "error" && (
            <p className="font-mono text-xs" style={{ color: "#f87171" }}>
              ✗ {errorMsg}
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
