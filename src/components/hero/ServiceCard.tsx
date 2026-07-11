"use client";

import { motion } from "framer-motion";
import { AnimatedAnalytics } from "./AnimatedAnalytics";
import { AnimatedBranding } from "./AnimatedBranding";
import { AnimatedBrowser } from "./AnimatedBrowser";
import { AnimatedChart } from "./AnimatedChart";
import { AnimatedSocial } from "./AnimatedSocial";
import { AnimatedWorkflow } from "./AnimatedWorkflow";
import { cn } from "@/lib/utils";

export type ServiceType =
  | "performance"
  | "social"
  | "content"
  | "video"
  | "brand-shoots"
  | "visual-ads";

export interface ServiceData {
  id: ServiceType;
  title: [string, string];
  subtitle?: string;
  tag: string;
}

export const services: ServiceData[] = [
  {
    id: "performance",
    tag: "Paid Growth",
    title: ["Performance", "Marketing"],
    subtitle: "3.2× avg. ROAS · 500M+ reach",
  },
  {
    id: "social",
    tag: "Social",
    title: ["Social Media", "Management"],
    subtitle: "4.8× engagement · 2M+ reach",
  },
  {
    id: "content",
    tag: "Creative",
    title: ["Content", "Creation"],
    subtitle: "1.2K+ assets · 98% retention",
  },
  {
    id: "video",
    tag: "Video",
    title: ["Video", "Production"],
    subtitle: "300+ videos · 95% on-time",
  },
  {
    id: "brand-shoots",
    tag: "Branding",
    title: ["Brand", "Shoots"],
    subtitle: "120+ shoots · 2.5K+ visuals",
  },
  {
    id: "visual-ads",
    tag: "Design",
    title: ["Visual", "Ads"],
    subtitle: "900+ creatives · 3.9× CTR lift",
  },
];

function ServiceVisual({ type }: { type: ServiceType }) {
  switch (type) {
    case "performance":
      return <AnimatedChart />;
    case "social":
      return <AnimatedSocial />;
    case "content":
      return <AnimatedBrowser />;
    case "video":
      return <AnimatedWorkflow />;
    case "brand-shoots":
      return <AnimatedBranding />;
    case "visual-ads":
      return <AnimatedAnalytics />;
  }
}

interface ServiceCardProps {
  service: ServiceData;
  isActive: boolean;
  offset: number;
  onClick?: () => void;
}

export function ServiceCard({
  service,
  isActive,
  offset,
  onClick,
}: ServiceCardProps) {
  const absOffset = Math.abs(offset);
  const isVisible = absOffset <= 2;

  return (
    <motion.div
      className={cn(
        "gpu-layer absolute left-1/2 top-1/2 w-[260px] sm:w-[280px]",
        isActive ? "cursor-grab active:cursor-grabbing" : "cursor-pointer",
        !isVisible && "pointer-events-none"
      )}
      style={{ zIndex: 10 - absOffset }}
      animate={{
        x: `calc(-50% + ${offset * 140}px)`,
        y: "-50%",
        scale: isActive ? 1 : 0.82,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        type: "tween",
        duration: 0.75,
        ease: [0.32, 0.72, 0, 1],
      }}
      onClick={onClick}
    >
      <motion.div
        className={cn(
          "relative flex h-[360px] flex-col overflow-hidden rounded-[28px]",
          "border border-white/15 bg-gradient-to-br from-forest-dark to-forest-deep",
          "shadow-[0_24px_64px_rgba(0,0,0,0.35)]"
        )}
        animate={{
          boxShadow: isActive
            ? "0 28px 72px rgba(0,0,0,0.32), 0 0 40px rgba(110,235,131,0.12)"
            : "0 16px 48px rgba(0,0,0,0.2)",
        }}
        whileHover={
          isActive
            ? {
                y: -6,
                scale: 1.03,
                borderColor: "rgba(255,255,255,0.18)",
                boxShadow:
                  "0 32px 80px rgba(0,0,0,0.35), 0 0 56px rgba(110,235,131,0.2)",
              }
            : undefined
        }
        transition={{ type: "tween", duration: 0.75, ease: [0.32, 0.72, 0, 1] }}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-accent/10 via-transparent to-sage/5" />

        <div className="relative flex flex-1 flex-col p-4">
          <div className="min-h-0 flex-1">
            <ServiceVisual type={service.id} />
          </div>

          <div className="mt-3 border-t border-white/8 pt-3">
            <span className="font-sans text-[8px] font-semibold uppercase tracking-wider text-emerald-accent/70">
              {service.tag}
            </span>
            <h3 className="mt-1 font-hero text-base font-bold leading-tight tracking-tight text-white">
              {service.title[0]}
              <span className="text-white/50"> · </span>
              {service.title[1]}
            </h3>
            {service.subtitle && (
              <p className="mt-1 font-sans text-[10px] text-white/45">
                {service.subtitle}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
