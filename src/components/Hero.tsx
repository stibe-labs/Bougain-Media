"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BackgroundEffects } from "@/components/hero/BackgroundEffects";
import { GridOverlay } from "@/components/hero/GridOverlay";
import { MouseGlow } from "@/components/hero/MouseGlow";
import { ParticleField } from "@/components/hero/ParticleField";
import { HeroCards } from "@/components/hero/HeroCards";
import { hero, siteConfig } from "@/lib/constants";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.2 + i * 0.14, ease },
  }),
};

export function Hero() {
  const reduceMotion = useReducedMotion();
  const [pointer, setPointer] = useState({ x: 50, y: 50 });
  const mouseRef = useRef({ x: -9999, y: -9999 });

  const parallaxX = reduceMotion ? 0 : (pointer.x - 50) * 0.12;
  const parallaxY = reduceMotion ? 0 : (pointer.y - 50) * 0.08;

  return (
    <section
      id="home"
      className="hero-grain grain-texture relative flex h-[100svh] items-start overflow-hidden bg-hero-gradient content-auto"
      onMouseMove={(event) => {
        if (reduceMotion) return;
        const rect = event.currentTarget.getBoundingClientRect();
        setPointer({
          x: ((event.clientX - rect.left) / rect.width) * 100,
          y: ((event.clientY - rect.top) / rect.height) * 100,
        });
        mouseRef.current = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        };
      }}
      onMouseLeave={() => {
        mouseRef.current = { x: -9999, y: -9999 };
      }}
    >
      <BackgroundEffects
        parallaxX={parallaxX}
        parallaxY={parallaxY}
        reduceMotion={reduceMotion}
      />
      <GridOverlay />
      <MouseGlow pointer={pointer} reduceMotion={reduceMotion} />

      <ParticleField mouseRef={mouseRef} />

      <div className="container-wide relative z-10 grid w-full grid-cols-1 px-4 pt-24 sm:px-5 sm:pt-28 md:px-8 md:pt-32 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-8 lg:px-12">
        <motion.div
          className="max-w-3xl"
          style={{ x: parallaxX, y: parallaxY }}
          transition={{ type: "spring", stiffness: 50, damping: 22 }}
        >
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-sans text-[11px] font-semibold uppercase tracking-[0.32em] text-white/50 sm:text-xs"
          >
            {siteConfig.name}
          </motion.p>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-hero mt-5 text-[clamp(2.75rem,9vw,7.5rem)] font-black uppercase leading-[0.92] tracking-[-0.04em] text-white"
          >
            <span className="block">
              Your <span className="text-emerald-accent">Growth.</span>
            </span>
            <span className="block">Our Grind.</span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-6 max-w-lg font-sans text-base leading-relaxed text-white/60 sm:mt-7 sm:text-lg md:max-w-xl"
          >
            {hero.subheadline}
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center sm:gap-4"
          >
            <Link
              href="/contact"
              className="group/btn inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-2xl border border-white bg-white px-9 py-4 font-sans text-base font-semibold text-forest-deep transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(110,235,131,0.25)] sm:w-auto"
            >
              {hero.primaryCta}
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover/btn:translate-x-1"
              />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-2xl border border-white/35 bg-transparent px-9 py-4 font-sans text-base font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/8 sm:w-auto"
            >
              {hero.secondaryCta}
            </Link>
          </motion.div>
        </motion.div>

        <HeroCards mouse={pointer} />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 md:block"
        aria-hidden
      >
        <div className="flex h-12 w-7 justify-center rounded-full border border-white/20 pt-2.5">
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-2 w-1 rounded-full bg-white/60"
          />
        </div>
      </motion.div>
    </section>
  );
}
