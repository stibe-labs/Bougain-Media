"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { logos } from "@/lib/constants";

export function HeroLogoAnimation() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        className="pointer-events-none absolute h-56 w-56 rounded-full bg-emerald-accent/10 blur-[70px] sm:h-64 sm:w-64"
        animate={reduceMotion ? undefined : { scale: [1, 1.2, 1], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
      >
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, -12, 0],
                  rotate: [0, 3, -3, 0],
                  scale: [1, 1.04, 1],
                }
          }
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src={logos.iconWhite}
            alt="Bougain Media"
            width={220}
            height={220}
            className="h-40 w-40 object-contain drop-shadow-[0_12px_48px_rgba(255,255,255,0.18)] sm:h-48 sm:w-48 lg:h-52 lg:w-52"
            priority
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
