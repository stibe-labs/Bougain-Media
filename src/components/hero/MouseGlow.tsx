"use client";

import { motion } from "framer-motion";

type MouseGlowProps = {
  pointer: { x: number; y: number };
  reduceMotion: boolean | null;
};

export function MouseGlow({ pointer, reduceMotion }: MouseGlowProps) {
  if (reduceMotion) return null;

  return (
    <motion.div
      className="pointer-events-none absolute z-[2] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(110,235,131,0.07)_0%,transparent_70%)] blur-2xl"
      aria-hidden
      animate={{
        left: `${pointer.x}%`,
        top: `${pointer.y}%`,
      }}
      transition={{ type: "spring", stiffness: 30, damping: 22, mass: 1.2 }}
    />
  );
}
