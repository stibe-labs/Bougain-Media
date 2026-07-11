"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { logos } from "@/lib/constants";

const ease = [0.32, 0.72, 0, 1] as [number, number, number, number];

export function LogoMorphScreen() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="absolute inset-0 bg-grid opacity-[0.12]" aria-hidden />
        <Image
          src={logos.iconGreen}
          alt="Bougain Media"
          width={120}
          height={120}
          className="relative z-10 h-24 w-24 object-contain sm:h-28 sm:w-28"
          priority
        />
      </div>
    );
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.12]" aria-hidden />
      <motion.div
        className="pointer-events-none absolute h-44 w-44 rounded-full bg-emerald-accent/12 blur-[60px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <div
        className="relative z-10 [perspective:900px]"
        style={{ perspective: 900 }}
      >
        <motion.div
          className="relative h-28 w-28 sm:h-32 sm:w-32"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: [0, 180, 360] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease,
            times: [0, 0.5, 1],
          }}
        >
          {/* White logo — front face */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src={logos.iconWhite}
                alt=""
                width={128}
                height={128}
                className="h-24 w-24 object-contain drop-shadow-[0_8px_32px_rgba(255,255,255,0.15)] sm:h-28 sm:w-28"
                priority
                aria-hidden
              />
            </motion.div>
          </div>

          {/* Green logo — back face */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <Image
                src={logos.iconGreen}
                alt=""
                width={128}
                height={128}
                className="h-24 w-24 object-contain drop-shadow-[0_8px_32px_rgba(110,235,131,0.35)] sm:h-28 sm:w-28"
                priority
                aria-hidden
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.p
        className="absolute bottom-[22%] font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-white/30"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
        aria-hidden
      >
        Bougain Media
      </motion.p>
    </div>
  );
}
