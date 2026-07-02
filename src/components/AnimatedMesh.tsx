"use client";

import { motion, useReducedMotion } from "framer-motion";

const orbs = [
  {
    className: "left-[10%] top-[15%] h-[280px] w-[280px] md:h-[420px] md:w-[420px]",
    color: "rgba(var(--mesh-rgb, 77, 184, 154), 0.35)",
    duration: 18,
    delay: 0,
  },
  {
    className: "right-[5%] top-[30%] h-[240px] w-[240px] md:h-[360px] md:w-[360px]",
    color: "rgba(var(--mesh-rgb-2, 168, 230, 207), 0.25)",
    duration: 22,
    delay: 2,
  },
  {
    className: "bottom-[10%] left-[35%] h-[200px] w-[200px] md:h-[300px] md:w-[300px]",
    color: "rgba(var(--mesh-rgb, 77, 184, 154), 0.2)",
    duration: 20,
    delay: 4,
  },
];

export function AnimatedMesh({
  rgb = "77, 184, 154",
  rgb2 = "168, 230, 207",
}: {
  rgb?: string;
  rgb2?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden max-md:opacity-60"
      style={
        {
          "--mesh-rgb": rgb,
          "--mesh-rgb-2": rgb2,
        } as React.CSSProperties
      }
      aria-hidden
    >
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-2xl md:blur-3xl ${orb.className}`}
          style={{ background: orb.color }}
          animate={{
            x: [0, 40, -30, 20, 0],
            y: [0, -30, 20, -15, 0],
            scale: [1, 1.12, 0.95, 1.08, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  );
}
