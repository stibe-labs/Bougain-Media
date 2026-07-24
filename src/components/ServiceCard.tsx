"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { ArrowRight, Check, ChevronDown, Sparkles } from "lucide-react";
import { ServiceMedia } from "@/components/ui/ServiceMedia";
import { services } from "@/lib/constants";
import { cn } from "@/lib/utils";

const CUBIC_EASE = [0.16, 1, 0.3, 1] as const;

export type ServiceItem = (typeof services.items)[number];

export interface ServiceCardProps {
  service: ServiceItem;
  index?: number;
  className?: string;
  isSpotlight?: boolean;
}

export function ServiceCard({
  service,
  index = 0,
  className,
  isSpotlight = false,
}: ServiceCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isExpanded, setIsExpanded] = useState(false);

  const primaryStat = service.stats && service.stats.length > 0 ? service.stats[0] : null;

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay: shouldReduceMotion ? 0 : (index % 3) * 0.1,
        ease: CUBIC_EASE,
      }}
      className={cn("h-full w-full", className)}
    >
      <Tilt
        tiltMaxAngleX={6}
        tiltMaxAngleY={6}
        glareEnable={true}
        glareMaxOpacity={0.08}
        glareColor="#ffffff"
        glarePosition="all"
        glareBorderRadius="1.75rem"
        className="h-full rounded-[1.75rem]"
      >
        <article
          className={cn(
            "group relative flex h-full flex-col overflow-hidden rounded-[1.75rem]",
            "border border-forest-deep/10 bg-white/95 backdrop-blur-xl",
            "shadow-[0_20px_60px_rgba(15,61,46,0.06)]",
            "transition-all duration-500",
            "hover:border-sage/40 hover:shadow-[0_30px_80px_rgba(107,158,143,0.22)]",
            isSpotlight && "border-sage/40 ring-2 ring-sage/20",
          )}
        >
          {/* Visual Header */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <ServiceMedia
              title={service.title}
              image={service.image}
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/75 via-forest-deep/20 to-transparent transition-opacity duration-500 group-hover:from-forest-deep/85 group-hover:via-forest-deep/30" />

            {/* Tag Badge */}
            <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-forest-deep/60 px-3.5 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-sage-light backdrop-blur-md transition-all duration-500 group-hover:border-sage/50 group-hover:bg-forest-deep/80">
              {service.tag}
            </span>

            {/* Outcome Highlight Stat Pill */}
            {primaryStat && (
              <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-sage/30 bg-forest-deep/80 px-3 py-1 font-sans text-xs font-bold text-white backdrop-blur-md shadow-lg">
                <Sparkles className="h-3 w-3 text-sage-light" />
                <span>
                  {primaryStat.value} {primaryStat.label}
                </span>
              </div>
            )}
          </div>

          {/* Card Body */}
          <div className="flex flex-1 flex-col p-6 sm:p-7">
            <h3 className="font-display text-2xl font-bold tracking-tight text-forest-deep transition-colors duration-300 group-hover:text-sage md:text-3xl">
              {service.title}
            </h3>

            <p className="mt-3 font-sans text-sm leading-relaxed text-grey-muted md:text-base">
              {service.description}
            </p>

            {/* Secondary Stats Grid */}
            {service.stats && service.stats.length > 1 && (
              <div className="mt-5 grid grid-cols-2 gap-2 rounded-2xl bg-forest-deep/[0.03] p-3 border border-forest-deep/5">
                {service.stats.slice(1, 3).map((st) => (
                  <div key={st.label} className="text-center">
                    <p className="font-display text-base font-bold text-forest-deep">
                      {st.value}
                    </p>
                    <p className="font-sans text-[10px] font-semibold uppercase tracking-wider text-grey-muted">
                      {st.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Key Deliverables Expandable Accordion */}
            {service.features && service.features.length > 0 && (
              <div className="mt-5 border-t border-forest-deep/8 pt-4">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex w-full items-center justify-between font-sans text-xs font-bold uppercase tracking-wider text-forest-deep/70 transition-colors hover:text-forest-deep"
                >
                  <span>Key Deliverables ({service.features.length})</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-sage transition-transform duration-300",
                      isExpanded && "rotate-180",
                    )}
                  />
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: CUBIC_EASE }}
                      className="overflow-hidden space-y-2.5 pt-3"
                    >
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 font-sans text-xs sm:text-sm text-forest-deep/80"
                        >
                          <Check
                            size={15}
                            className="mt-0.5 shrink-0 text-sage"
                            strokeWidth={2.5}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Action Footer */}
            <div className="mt-auto pt-6">
              <Link
                href={`/contact?service=${encodeURIComponent(service.title)}`}
                className={cn(
                  "group/cta inline-flex w-full items-center justify-between rounded-2xl border border-forest-deep/15 bg-transparent px-5 py-3",
                  "font-sans text-xs font-bold uppercase tracking-wider text-forest-deep",
                  "transition-all duration-300",
                  "hover:border-forest-deep hover:bg-forest-deep hover:text-white",
                  "hover:shadow-[0_12px_32px_rgba(15,61,46,0.18)]",
                )}
              >
                <span>Discuss {service.title}</span>
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover/cta:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </article>
      </Tilt>
    </motion.div>
  );
}
