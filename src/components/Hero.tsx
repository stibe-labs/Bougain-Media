"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { TopographicLines } from "@/components/TopographicLines";
import { Button } from "@/components/ui/Button";
import { hero } from "@/lib/constants";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: i * 0.12, ease },
  }),
};

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-forest-deep content-auto"
    >
      {/* Hero image — full background, visible on the right */}
      <Image
        src="/images/hero-visual.png"
        alt=""
        fill
        priority
        quality={75}
        sizes="100vw"
        className="object-cover object-center lg:object-right"
        aria-hidden
      />

      <TopographicLines />

      {/* Gradient keeps text readable; image shows through on the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-forest-deep via-forest-deep/92 to-forest-deep/25 lg:from-forest-deep lg:via-forest-deep/80 lg:to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 via-transparent to-forest-deep/30" />
      <div className="bg-grid absolute inset-0 opacity-20" />

      <div className="container-wide relative z-10 section-padding !pb-16 !pt-28 md:!pt-36">
        <div className="grid items-center lg:grid-cols-2 lg:gap-16">
          <div className="max-w-2xl">
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-sage/30 bg-forest-deep/40 px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wider text-sage-light backdrop-blur-sm"
            >
              <Sparkles size={14} className="text-sage" />
              Digital Marketing Agency
            </motion.div>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]"
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
              className="mt-8 max-w-lg font-serif text-lg leading-relaxed text-white/75 md:text-xl"
            >
              {hero.subheadline}
            </motion.p>

            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Button href="/contact" variant="primary" size="lg">
                {hero.primaryCta}
                <ArrowRight size={18} />
              </Button>
              <Button href="/services" variant="outline" size="lg">
                {hero.secondaryCta}
              </Button>
            </motion.div>
          </div>

          {/* Right column — image visible through background; spacer on desktop */}
          <div className="hidden lg:block" aria-hidden />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
        >
          <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/20 pt-2">
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-2 w-1 rounded-full bg-sage"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
