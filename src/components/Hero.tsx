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
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-forest-deep content-auto sm:items-center"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover object-center"
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

      <div className="container-wide relative z-10 px-4 pb-20 pt-28 sm:px-5 sm:pb-24 sm:pt-36 md:px-8 md:pb-28 md:pt-44 lg:px-12">
        <div className="max-w-3xl">
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-sage"
          >
            {siteConfig.name}
          </motion.p>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-5 font-display text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl"
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
            className="mt-6 max-w-lg font-sans text-lg leading-relaxed text-white/55 md:text-xl"
          >
            {hero.subheadline}
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4"
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
