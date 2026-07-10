"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  CommandCenterAnimation,
  type MousePosition,
} from "./CommandCenterAnimation";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface HeroIllustrationProps {
  mouse?: MousePosition;
}

export function HeroIllustration({ mouse }: HeroIllustrationProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.5, ease }}
    >
      <CommandCenterAnimation mouse={mouse} />
    </motion.div>
  );
}
