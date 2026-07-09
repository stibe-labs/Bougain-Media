"use client";

import { motion } from "framer-motion";
import { AnimatedMesh } from "@/components/AnimatedMesh";

type BackgroundEffectsProps = {
  parallaxX: number;
  parallaxY: number;
  reduceMotion: boolean | null;
};

export function BackgroundEffects({
  parallaxX,
  parallaxY,
  reduceMotion,
}: BackgroundEffectsProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      <AnimatedMesh rgb="46, 120, 87" rgb2="110, 235, 131" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_20%_80%,rgba(46,120,87,0.08)_0%,transparent_60%)]" />
      <div className="bg-hero-vignette absolute inset-0" />

      <motion.div
        className="absolute left-[38%] top-1/2 h-[min(55vw,520px)] w-[min(65vw,680px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(110,235,131,0.14)_0%,rgba(110,235,131,0.04)_40%,transparent_70%)] blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : {
                x: parallaxX * 1.5,
                y: parallaxY * 1.5,
                scale: [1, 1.04, 1],
                opacity: [0.7, 0.9, 0.7],
              }
        }
        transition={{
          x: { type: "spring", stiffness: 40, damping: 20 },
          y: { type: "spring", stiffness: 40, damping: 20 },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
      />
    </div>
  );
}
