"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { logos } from "@/lib/constants";

/* ─── Timing ─── */
const LOADING_DURATION_MS = 3400; // 3.4s total loader visible time
const EXIT_DURATION_MS = 900;      // curtain reveal animation

type Step = "loading" | "exit" | "done";

export function PageLoader() {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState<Step>("loading");
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef(Date.now());

  /* 
   * Set data attribute for site-shell CSS reveal.
   * Key fix: reveal the site-shell as soon as exit starts (curtains begin splitting),
   * NOT after exit completes — this prevents the blank green screen flash.
   */
  useEffect(() => {
    document.documentElement.dataset.loaderPhase =
      step === "loading" ? "loading" : "done";
  }, [step]);

  /* Lock scroll during loading */
  useEffect(() => {
    if (step === "loading") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [step]);

  /* Animate progress 0→100 over LOADING_DURATION_MS, then trigger exit */
  useEffect(() => {
    if (reduceMotion) {
      setStep("done");
      return;
    }

    if (step !== "loading") return;

    startTimeRef.current = Date.now();

    const frame = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const p = Math.min(elapsed / LOADING_DURATION_MS, 1);
      // Ease-out cubic for smooth deceleration near 100%
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));

      if (p < 1) {
        rafId = requestAnimationFrame(frame);
      } else {
        // Loading complete → begin exit
        setTimeout(() => setStep("exit"), 150);
      }
    };

    let rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, [step, reduceMotion]);

  /* Exit phase → done */
  useEffect(() => {
    if (step === "exit") {
      const doneTimer = setTimeout(() => setStep("done"), EXIT_DURATION_MS);
      return () => clearTimeout(doneTimer);
    }
  }, [step]);

  if (step === "done") return null;

  const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

  return (
    <div
      className="fixed inset-0 z-[200] pointer-events-none"
      aria-hidden={step === "exit"}
      aria-label="Loading"
      style={{ pointerEvents: step === "loading" ? "auto" : "none" }}
    >
      {/* ─── Split curtain panels (for reveal exit) ─── */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 bg-forest-deep z-[3]"
        initial={false}
        animate={step === "exit" ? { x: "-100%" } : { x: "0%" }}
        transition={{
          duration: 0.85,
          ease,
        }}
      />
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 bg-forest-deep z-[3]"
        initial={false}
        animate={step === "exit" ? { x: "100%" } : { x: "0%" }}
        transition={{
          duration: 0.85,
          ease,
        }}
      />

      {/* ─── Decorative background (behind curtains, but above site content) ─── */}
      <motion.div
        className="absolute inset-0 z-[2] bg-forest-deep"
        initial={false}
        animate={step === "exit" ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.5, delay: step === "exit" ? 0.3 : 0, ease }}
      >
        <div
          className="bg-hero-grid pointer-events-none absolute inset-0 opacity-30"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-accent/10 blur-[100px]"
          aria-hidden
        />
      </motion.div>

      {/* ─── Loader content (logo + progress) ─── */}
      <motion.div
        className="relative z-[5] flex h-full w-full flex-col items-center justify-center px-6"
        animate={
          step === "exit"
            ? { opacity: 0, scale: 0.92 }
            : { opacity: 1, scale: 1 }
        }
        transition={{ duration: 0.35, ease }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="loader-logo-pulse relative h-20 w-[17.5rem] sm:h-24 sm:w-[21rem]"
        >
          <Image
            src={logos.fullWhite}
            alt="Bougain Media"
            fill
            sizes="(max-width: 640px) 280px, 336px"
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease }}
          className="mt-10 flex flex-col items-center"
        >
          <div className="h-[3px] w-48 overflow-hidden rounded-full bg-white/10 sm:w-56 md:w-64">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-sage to-emerald-accent"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.08 }}
            />
          </div>

          {/* Percentage counter */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 font-sans text-xs font-semibold tabular-nums tracking-[0.3em] text-white/40"
          >
            {progress}%
          </motion.span>
        </motion.div>
      </motion.div>
    </div>
  );
}
