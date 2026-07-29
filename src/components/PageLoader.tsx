"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { logos } from "@/lib/constants";

/* ─── Timing Config ─── */
const LOADING_DURATION_MS = 3200; // 3.2s total progress duration
const EXIT_DURATION_MS = 850;      // Shutter lift duration

type Step = "loading" | "exit" | "done";

export function PageLoader() {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState<Step>("loading");
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef(Date.now());

  /* Synchronize CSS phase attribute so website reveals underneath */
  useEffect(() => {
    document.documentElement.dataset.loaderPhase =
      step === "loading" ? "loading" : "done";
  }, [step]);

  /* Prevent background scrolling during initial load */
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

  /* Smooth 0% -> 100% progress counter */
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
      // Eased curve for realistic loading weight
      const eased = 1 - Math.pow(1 - p, 3.2);
      setProgress(Math.round(eased * 100));

      if (p < 1) {
        rafId = requestAnimationFrame(frame);
      } else {
        setTimeout(() => setStep("exit"), 120);
      }
    };

    let rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, [step, reduceMotion]);

  /* Exit transition completion */
  useEffect(() => {
    if (step === "exit") {
      const timer = setTimeout(() => setStep("done"), EXIT_DURATION_MS);
      return () => clearTimeout(timer);
    }
  }, [step]);

  if (step === "done") return null;

  const easeCurtain = [0.76, 0, 0.24, 1] as const; // Luxurious exponential curve
  const easeContent = [0.16, 1, 0.3, 1] as const;

  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
      aria-hidden={step === "exit"}
      aria-label="Loading"
      style={{ pointerEvents: step === "loading" ? "auto" : "none" }}
    >
      {/* ─── Main Lifting Stage Screen ─── */}
      <motion.div
        className="absolute inset-0 bg-forest-deep z-[10] flex flex-col items-center justify-center shadow-[0_30px_90px_rgba(0,0,0,0.8)]"
        initial={{ y: "0%" }}
        animate={step === "exit" ? { y: "-100%" } : { y: "0%" }}
        transition={{
          duration: 0.85,
          ease: easeCurtain,
        }}
      >
        {/* Background Grid & Emerald Ambient Glow */}
        <div
          className="bg-hero-grid pointer-events-none absolute inset-0 opacity-25"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-accent/15 blur-[120px]"
          aria-hidden
        />

        {/* Shutter Bottom Glowing Edge Accent Line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-accent to-transparent opacity-90 shadow-[0_0_24px_#6EEB83]" />

        {/* Loader Content Container */}
        <motion.div
          className="relative z-15 flex flex-col items-center justify-center px-6"
          animate={
            step === "exit"
              ? { opacity: 0, y: -40, scale: 0.95 }
              : { opacity: 1, y: 0, scale: 1 }
          }
          transition={{ duration: 0.35, ease: easeContent }}
        >
          {/* Brand Logo */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: easeContent }}
            className="loader-logo-pulse relative h-20 w-[17.5rem] sm:h-24 sm:w-[22rem]"
          >
            <Image
              src={logos.fullWhite}
              alt="Bougain Media"
              fill
              sizes="(max-width: 640px) 280px, 350px"
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Progress Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: easeContent }}
            className="mt-11 flex flex-col items-center"
          >
            {/* Minimal High-Precision Progress Bar */}
            <div className="relative h-[2px] w-52 overflow-hidden rounded-full bg-white/10 sm:w-64">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-sage via-emerald-accent to-sage shadow-[0_0_12px_#6EEB83]"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.05 }}
              />
            </div>

            {/* Live Percentage Counter */}
            <span className="mt-4 font-sans text-xs font-semibold tabular-nums tracking-[0.35em] text-white/50">
              {progress}%
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
