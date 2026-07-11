"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { logos } from "@/lib/constants";
import { cn } from "@/lib/utils";

const COUNTDOWN_START = 10;
const TICK_MS = 1000;
const HOLD_AT_ZERO_MS = 500;
const LOADING_MS = 3000;
const FADE_MS = 600;

type Step = "intro" | "countdown" | "loading" | "exit" | "done";

export function PageLoader() {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState<Step>("intro");
  const [count, setCount] = useState(COUNTDOWN_START);

  useEffect(() => {
    document.documentElement.dataset.loaderPhase = step === "done" ? "done" : "loading";
  }, [step]);

  useEffect(() => {
    if (step !== "done") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [step]);

  useEffect(() => {
    if (reduceMotion) {
      setStep("done");
      return;
    }

    if (step !== "countdown") return;

    if (count > 0) {
      const tickTimer = setTimeout(() => setCount((value) => value - 1), TICK_MS);
      return () => clearTimeout(tickTimer);
    }

    const loadingTimer = setTimeout(() => setStep("loading"), HOLD_AT_ZERO_MS);
    return () => clearTimeout(loadingTimer);
  }, [count, reduceMotion, step]);

  useEffect(() => {
    if (step === "loading") {
      const exitTimer = setTimeout(() => setStep("exit"), LOADING_MS);
      return () => clearTimeout(exitTimer);
    }

    if (step === "exit") {
      const doneTimer = setTimeout(() => setStep("done"), FADE_MS);
      return () => clearTimeout(doneTimer);
    }
  }, [step]);

  if (step === "done") return null;

  return (
    <div
      className={cn(
        "loader-splash fixed inset-0 z-[200] flex overflow-hidden bg-forest-deep",
        step === "exit" && "loader-splash-exit",
      )}
      aria-hidden={step === "exit"}
      aria-label="Launch gateway"
    >
      <div className="bg-hero-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-accent/10 blur-[100px]"
        aria-hidden
      />

      <div className="relative z-10 flex w-full flex-1 flex-col items-center px-6">
        <AnimatePresence mode="wait">
          {step === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-1 flex-col items-center justify-center"
            >
              <h1 className="font-hero text-[clamp(2rem,6vw,3.25rem)] font-bold leading-tight tracking-tight text-white">
                Website Launch
              </h1>

              <button
                type="button"
                onClick={() => {
                  setCount(COUNTDOWN_START);
                  setStep("countdown");
                }}
                className="group/btn mt-10 inline-flex min-h-14 items-center justify-center gap-2.5 rounded-2xl border border-white bg-white px-12 py-4 font-sans text-base font-semibold uppercase tracking-[0.2em] text-forest-deep transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(110,235,131,0.25)]"
              >
                Start
              </button>
            </motion.div>
          )}

          {step === "countdown" && (
            <motion.div
              key="countdown"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-1 flex-col items-center justify-center"
            >
              <p className="mb-6 font-sans text-[11px] font-semibold uppercase tracking-[0.38em] text-white/40">
                Launching Website
              </p>

              <div
                className="loader-countdown relative flex min-h-[7rem] items-center justify-center sm:min-h-[8rem]"
                aria-live="polite"
                aria-atomic="true"
              >
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={count}
                    initial={{ opacity: 0, scale: 0.8, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.08, y: -14 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="font-hero text-[clamp(5.5rem,18vw,9rem)] font-black leading-none tabular-nums text-white"
                  >
                    {count}
                  </motion.span>
                </AnimatePresence>
              </div>

              <p className="mt-4 font-sans text-xs text-white/35">
                {count > 0 ? "Get ready" : "Welcome"}
              </p>
            </motion.div>
          )}

          {(step === "loading" || step === "exit") && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-1 flex-col items-center justify-center"
            >
              <div className="loader-logo-pulse relative h-20 w-[17.5rem] sm:h-24 sm:w-[21rem]">
                <Image
                  src={logos.fullWhite}
                  alt="Bougain Media"
                  fill
                  sizes="(max-width: 640px) 280px, 336px"
                  className="object-contain"
                  priority
                />
              </div>

              <div className="loader-progress-track mt-10 h-0.5 w-40 overflow-hidden rounded-full bg-white/10 sm:w-48 md:w-56">
                <div className="loader-progress-bar h-full rounded-full bg-sage-light" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
