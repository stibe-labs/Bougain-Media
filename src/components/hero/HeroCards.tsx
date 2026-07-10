"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HeroIllustration } from "./HeroIllustration";
import type { MousePosition } from "./CommandCenterAnimation";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface HeroCardsProps {
  mouse?: MousePosition;
}

export function HeroCards({ mouse }: HeroCardsProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.8, ease }}
      className="pointer-events-auto relative hidden shrink-0 justify-self-end lg:block"
    >
      <HeroIllustration mouse={mouse} />
    </motion.div>
  );
}
