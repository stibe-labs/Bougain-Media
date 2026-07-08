"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

type ServicePillProps = {
  title: string;
  description: string;
  tag: string;
  index: number;
};

export function ServicePill({ title, description, tag, index }: ServicePillProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease }}
      className="group relative"
    >
      <motion.div
        className={cn(
          "relative overflow-hidden rounded-full border border-forest-deep/10 bg-black px-6 py-4",
          "transition-colors duration-500 group-hover:border-sage/40 group-hover:bg-forest-deep",
        )}
        whileHover={reduceMotion ? undefined : { scale: 1.02 }}
        transition={{ duration: 0.35, ease }}
      >
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-sans text-sm font-medium capitalize text-white md:text-base">
            {title}
          </h3>
          <span className="shrink-0 rounded-full border border-sage/30 bg-sage/10 px-2.5 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-wider text-sage-light">
            {tag}
          </span>
        </div>

        <motion.div
          initial={false}
          animate={{ height: "auto" }}
          className="overflow-hidden"
        >
          <motion.p
            className="mt-0 max-h-0 font-sans text-sm leading-relaxed text-white/0 transition-all duration-500 group-hover:mt-3 group-hover:max-h-24 group-hover:text-white/70"
          >
            {description}
          </motion.p>
        </motion.div>

        <span
          className="absolute -right-2 -top-2 font-sans text-5xl font-bold text-white/[0.03] transition-colors duration-500 group-hover:text-sage/10"
          aria-hidden
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </motion.div>
    </motion.article>
  );
}
