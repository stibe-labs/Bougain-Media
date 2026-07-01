"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { stats } from "@/lib/constants";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
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
  }, [value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function Stats() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="content-auto relative overflow-hidden bg-forest-deep section-padding">
      <div className="bg-grid absolute inset-0 opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-r from-sage/10 via-transparent to-sage/5" />

      <div className="container-wide relative">
        <ScrollReveal className="mb-14 text-center">
          <SectionLabel dark className="text-center">
            Track Record
          </SectionLabel>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
            Numbers that speak for themselves
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease }}
              whileHover={reduceMotion ? undefined : { y: -4, scale: 1.02 }}
            >
              <div className="glass group rounded-2xl p-6 text-center transition-colors duration-300 hover:border-sage/30 hover:bg-white/15 md:p-8">
                <div className="font-sans text-4xl font-bold text-gradient md:text-5xl lg:text-6xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-3 font-sans text-xs font-medium uppercase tracking-wider text-white/60">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
