"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { hero, siteConfig } from "@/lib/constants";

const HERO_VIDEO = encodeURI(
  "/videos/Firefly Ultra-realistic cinematic luxury digital marketing agency office, modern Scandinavian creati.webm",
);

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.15 + i * 0.12, ease },
  }),
};

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-forest-deep content-auto"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover object-center lg:object-[72%_center]"
        aria-hidden
      >
        <source src={HERO_VIDEO} type="video/webm" />
      </video>

      <div
        className="pointer-events-none absolute -left-1/4 top-1/4 h-[50vmax] w-[50vmax] rounded-full bg-sage/25 blur-[120px] animate-hero-glow max-md:opacity-60"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-[40vmax] w-[40vmax] rounded-full bg-sage-light/15 blur-[100px] animate-pulse-glow"
        aria-hidden
      />

      <div className="absolute inset-0 bg-gradient-to-r from-forest-deep via-forest-deep/88 to-forest-deep/30 lg:from-forest-deep lg:via-forest-deep/75 lg:to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/70 via-transparent to-forest-deep/35" />
      <div className="bg-grid absolute inset-0 opacity-[0.15]" />
      <div className="grain-texture absolute inset-0" />

      <div className="container-wide relative z-10 section-padding !pb-20 !pt-28 sm:!pb-24 sm:!pt-32 md:!pt-40">
        <div className="max-w-3xl">
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mb-8 font-sans text-[11px] font-semibold uppercase tracking-[0.32em] text-sage-light sm:mb-10 sm:text-xs"
          >
            {siteConfig.name}
          </motion.p>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-display text-[clamp(2.75rem,8vw,6.75rem)] font-bold leading-[0.95] tracking-tight text-white"
          >
            {hero.headline[0]}
            <br />
            {hero.headline[1]}{" "}
            <span className="text-gradient-warm">{hero.headline[2]}</span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-8 max-w-md font-sans text-base leading-relaxed text-white/70 sm:mt-10 sm:text-lg md:text-xl"
          >
            {hero.subheadline}
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-10 flex flex-col gap-4 sm:mt-12 sm:flex-row sm:items-center sm:gap-6"
          >
            <Button href="/contact" variant="primary" size="lg" className="w-full sm:w-auto">
              {hero.primaryCta}
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover/btn:translate-x-1"
              />
            </Button>
            <Button
              href="/services"
              variant="outline"
              size="lg"
              className="w-full border-white/20 bg-transparent font-medium text-white/80 hover:text-white sm:w-auto"
            >
              {hero.secondaryCta}
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 md:block"
        >
          <div className="flex h-11 w-6 justify-center rounded-full border border-white/20 pt-2">
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="h-2 w-1 rounded-full bg-sage"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
