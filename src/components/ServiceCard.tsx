"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { ArrowRight, Check } from "lucide-react";
import { ServiceMedia } from "@/components/ui/ServiceMedia";
import { services } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Custom premium bezier easing curve: [0.16, 1, 0.3, 1]
const CUBIC_EASE = [0.16, 1, 0.3, 1] as const;

export type ServiceItem = (typeof services.items)[number];

export interface ServiceCardProps {
  service: ServiceItem;
  index?: number;
  className?: string;
}

export function ServiceCard({
  service,
  index = 0,
  className,
}: ServiceCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        delay: shouldReduceMotion ? 0 : (index % 3) * 0.12,
        ease: CUBIC_EASE,
      }}
      className={cn("h-full w-full", className)}
    >
      <Tilt
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        glareEnable={true}
        glareMaxOpacity={0.1}
        glareColor="#ffffff"
        glarePosition="all"
        glareBorderRadius="1.5rem"
        className="h-full rounded-3xl"
      >
        <article
          className={cn(
            "group relative flex h-full flex-col overflow-hidden rounded-3xl",
            "border border-forest-deep/10 bg-white/95 backdrop-blur-xl",
            "shadow-[0_20px_60px_rgba(15,61,46,0.08)]",
            "transition-all duration-500",
            "hover:border-sage/40 hover:shadow-[0_30px_80px_rgba(107,158,143,0.25)]",
          )}
        >
          {/* Visual Header */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <ServiceMedia
              title={service.title}
              image={service.image}
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/50 via-forest-deep/10 to-transparent transition-opacity duration-500 group-hover:from-forest-deep/65 group-hover:via-forest-deep/15" />
            <span className="absolute left-5 top-5 rounded-full border border-white/30 bg-forest-deep/45 px-3.5 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-sage-light backdrop-blur-md transition-all duration-500 group-hover:border-sage/40 group-hover:bg-forest-deep/75">
              {service.tag}
            </span>
          </div>

          {/* Card Details */}
          <div className="flex flex-1 flex-col p-7 md:p-8">
            <h3 className="font-display text-2xl font-bold tracking-tight text-forest-deep transition-colors duration-300 group-hover:text-sage md:text-3xl">
              {service.title}
            </h3>
            <p className="mt-3 font-sans text-[15px] leading-relaxed text-grey-muted md:text-base">
              {service.description}
            </p>

            {/* Feature Checklist */}
            {service.features && service.features.length > 0 && (
              <ul className="mt-6 space-y-3 border-t border-forest-deep/6 pt-6">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 font-sans text-sm text-forest-deep/80"
                  >
                    <Check
                      size={16}
                      className="mt-0.5 shrink-0 text-sage"
                      strokeWidth={2}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Interactive Call to Action */}
            <div className="mt-auto pt-8">
              <Link
                href="/contact"
                className={cn(
                  "group/cta inline-flex w-fit items-center gap-2.5 rounded-2xl border border-forest-deep/15 bg-transparent px-5 py-3",
                  "font-sans text-sm font-semibold text-forest-deep",
                  "transition-all duration-300",
                  "hover:border-forest-deep hover:bg-forest-deep hover:text-white",
                  "hover:shadow-[0_12px_32px_rgba(15,61,46,0.2)]",
                )}
              >
                Discuss this service
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
