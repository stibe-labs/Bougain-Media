"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { stats } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setCount(value);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;

        const duration = 1400;
        const startTime = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * value));
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, reduceMotion]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function Stats({ variant = "light" }: { variant?: "light" | "dark" }) {
  const reduceMotion = useReducedMotion();
  const isDark = variant === "dark";

  return (
    <section
      className={cn(
        "content-auto relative overflow-hidden section-padding !pb-16 !pt-14 md:!pb-24 md:!pt-20",
        isDark ? "bg-forest-deep" : "section-blend-cream",
      )}
    >
      <div
        className={cn(
          "absolute inset-0",
          isDark ? "bg-grid opacity-25" : "bg-grid-light opacity-50",
        )}
      />
      {!isDark && (
        <>
          <div className="section-edge-fade-top" aria-hidden />
          <div className="section-edge-fade-bottom" aria-hidden />
        </>
      )}
      {isDark && (
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sage/15 blur-3xl"
          aria-hidden
        />
      )}

      <div className="container-wide relative z-[3]">
        <div className="grid items-end gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <ScrollReveal>
            <p
              className={cn(
                "font-sans text-xs font-semibold uppercase tracking-[0.28em]",
                "text-sage",
              )}
            >
              Track Record
            </p>
            <h2
              className={cn(
                "mt-4 max-w-xs font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl",
                isDark ? "text-white" : "text-forest-deep",
              )}
            >
              Numbers that speak quietly —
              <span className="text-sage"> and clearly.</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4 md:gap-x-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.08, ease }}
                className="relative"
              >
                <div
                  className={cn(
                    "font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl",
                    isDark ? "text-gradient" : "text-forest-deep",
                  )}
                >
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <p
                  className={cn(
                    "mt-3 font-sans text-xs font-medium uppercase tracking-[0.18em]",
                    isDark ? "text-white/55" : "text-grey-muted",
                  )}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
