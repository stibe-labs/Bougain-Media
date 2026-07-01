"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { careers } from "@/lib/constants";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function CareersWhyJoin() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-forest-deep section-padding">
      <div className="bg-grid absolute inset-0 opacity-30" />
      <div className="container-wide relative">
        <ScrollReveal className="text-center">
          <SectionLabel dark className="text-center">
            Why Join Us
          </SectionLabel>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
            Grow With Us
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {careers.whyJoin.map((item, i) => (
            <motion.div
              key={item.title}
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease }}
              whileHover={reduceMotion ? undefined : { y: -6 }}
            >
              <div className="glass h-full rounded-2xl p-8 text-center transition-colors duration-300 hover:border-sage/30 hover:bg-white/15">
                <h3 className="font-sans text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 font-serif text-sm leading-relaxed text-white/50">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
