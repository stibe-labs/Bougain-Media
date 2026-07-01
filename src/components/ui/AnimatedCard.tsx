"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

type AnimatedCardProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
  as?: "div" | "article" | "li";
};

export function AnimatedCard({
  children,
  className,
  delay = 0,
  hover = true,
  as = "div",
}: AnimatedCardProps) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: delay * 0.1, ease }}
      whileHover={
        hover && !reduceMotion
          ? { y: -6, transition: { duration: 0.3, ease } }
          : undefined
      }
      className={cn(
        "card-modern group relative overflow-hidden transition-shadow duration-500",
        hover && "hover:border-sage/30 hover:shadow-xl hover:shadow-sage/10",
        className,
      )}
    >
      {children}
    </Component>
  );
}
