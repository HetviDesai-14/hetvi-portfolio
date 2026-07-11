"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import profile from "@/data/profile.json";

// Depth-ordered with zIndex (not translateZ) so stacking is always correct —
// translateZ fights with framer-motion's own animated transforms, so we keep
// the "3D" feel from the parent's rotateX/rotateY tilt instead, and use a
// wide orbit radius so badges trace a ring clearly outside the portrait.
const ORBIT_CHIPS = [
  { label: "LLM", radius: 196, duration: 22, delay: 0 },
  { label: "RL", radius: 196, duration: 22, delay: -7.3 },
  { label: "Vision", radius: 196, duration: 22, delay: -14.6 },
];

export default function ProfileAura() {
  const stageRef = useRef(null);

  // raw pointer offset (-0.5 .. 0.5), springed for smooth 3D tilt
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const springX = useSpring(px, { stiffness: 140, damping: 16, mass: 0.4 });
  const springY = useSpring(py, { stiffness: 140, damping: 16, mass: 0.4 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-14, 14]);
  const glareX = useTransform(springX, [-0.5, 0.5], ["10%", "90%"]);
  const glareY = useTransform(springY, [-0.5, 0.5], ["10%", "90%"]);

  const handleMove = (e) => {
    const rect = stageRef.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div
      ref={stageRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="hero-3d-stage relative mx-auto flex h-[340px] w-[340px] items-center justify-center sm:h-[400px] sm:w-[400px]"
    >
      <motion.div
        className="hero-3d-layer relative flex h-full w-full items-center justify-center"
        style={{ rotateX, rotateY }}
      >
        {/* back ambient glow — z 0 */}
        <div
          className="absolute inset-2 animate-blobMorph opacity-70 blur-3xl"
          style={{
            background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
            zIndex: 0,
          }}
        />
        <div
          className="absolute inset-8 animate-blobMorph opacity-90"
          style={{
            background: "linear-gradient(155deg, var(--accent-soft), var(--accent2-soft))",
            animationDuration: "16s",
            animationDirection: "reverse",
            zIndex: 0,
          }}
        />

        {/* rotating dashed orbit ring — z 1 */}
        <svg
          viewBox="0 0 400 400"
          className="absolute inset-0 h-full w-full animate-[spin_30s_linear_infinite] opacity-40"
          style={{ zIndex: 1 }}
        >
          <circle
            cx="200"
            cy="200"
            r="196"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1"
            strokeDasharray="2 10"
          />
        </svg>

        {/* floor shadow beneath the cutout — z 2 */}
        <div className="absolute bottom-3 h-8 w-48 rounded-full bg-black/30 blur-xl dark:bg-black/50" style={{ zIndex: 2 }} />

        {/* orbiting skill chips — z 3, always behind the portrait */}
        {ORBIT_CHIPS.map((c) => (
          <div
            key={c.label}
            className="absolute left-1/2 top-1/2 h-0 w-0"
            style={{ zIndex: 3 }}
          >
            <div
              style={{
                animation: `orbit ${c.duration}s linear infinite`,
                animationDelay: `${c.delay}s`,
                "--orbit-r": `${c.radius}px`,
              }}
            >
              <span
                className="flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border font-mono text-[10px] font-medium shadow-lg backdrop-blur-sm"
                style={{
                  background: "var(--surface)",
                  borderColor: "var(--line)",
                  color: "var(--accent)",
                  boxShadow: "0 12px 24px -8px rgba(0,0,0,0.25)",
                }}
              >
                {c.label}
              </span>
            </div>
          </div>
        ))}

        {/* the cutout photo — z 10, always on top, floats gently */}
        <div className="relative h-64 w-64 sm:h-72 sm:w-72" style={{ zIndex: 10 }}>
          <motion.div
            className="h-full w-full"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src={profile.profileImage}
              alt={profile.fullName}
              className="h-full w-full select-none object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.35)]"
              draggable={false}
            />

            {/* glare that follows the cursor for a glassy, 3D sheen */}
            <motion.div
              className="pointer-events-none absolute inset-0 mix-blend-overlay"
              style={{
                background: "radial-gradient(circle at var(--gx) var(--gy), rgba(255,255,255,0.55), transparent 45%)",
                "--gx": glareX,
                "--gy": glareY,
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
