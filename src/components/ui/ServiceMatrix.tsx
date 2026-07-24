"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, Target, Zap, TrendingUp, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface MatrixGoal {
  id: string;
  name: string;
  badge: string;
  icon: typeof Target;
  description: string;
  recommendedServices: string[];
  expectedImpact: string;
}

const matrixGoals: MatrixGoal[] = [
  {
    id: "brand-awareness",
    name: "Brand Visibility & Identity",
    badge: "Top of Funnel",
    icon: Sparkles,
    description:
      "Stunning visuals, cinematic video, and clear storytelling designed to turn heads and establish market presence.",
    recommendedServices: [
      "Content Creation",
      "Video Production",
      "Brand Shoots",
    ],
    expectedImpact: "3.5× higher brand recall and viral social reach",
  },
  {
    id: "social-engagement",
    name: "Community & Retention",
    badge: "Mid Funnel",
    icon: Zap,
    description:
      "Consistent, high-quality social presence that builds trust and maintains active engagement with your audience.",
    recommendedServices: [
      "Social Media Management",
      "Content Creation",
      "Video Production",
    ],
    expectedImpact: "4.8× increase in organic engagement and audience loyalty",
  },
  {
    id: "performance-leads",
    name: "Lead Generation & Sales",
    badge: "Bottom Funnel",
    icon: Target,
    description:
      "Scroll-stopping visual ad creatives paired with data-backed Meta & Google paid ad campaigns for maximum ROAS.",
    recommendedServices: [
      "Performance Marketing",
      "Visual Ads",
      "Video Production",
    ],
    expectedImpact: "3.2× average return on ad spend (ROAS)",
  },
  {
    id: "full-funnel",
    name: "Complete Brand Ecosystem",
    badge: "360 Growth",
    icon: TrendingUp,
    description:
      "End-to-end alignment from production shoots to performance marketing campaigns for rapid business scaling.",
    recommendedServices: [
      "Content Creation",
      "Video Production",
      "Visual Ads",
      "Social Media Management",
      "Brand Shoots",
      "Performance Marketing",
    ],
    expectedImpact: "Full-funnel synergy with measurable revenue growth",
  },
];

const allCapabilities = [
  "Content Creation",
  "Video Production",
  "Visual Ads",
  "Social Media Management",
  "Brand Shoots",
  "Performance Marketing",
];

export function ServiceMatrix() {
  const [activeGoalId, setActiveGoalId] = useState<string>("brand-awareness");
  const activeGoal = matrixGoals.find((g) => g.id === activeGoalId) || matrixGoals[0];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-forest-deep/10 bg-white/80 p-6 backdrop-blur-xl sm:p-8 md:p-12 shadow-[0_20px_60px_rgba(15,61,46,0.06)]">
      <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-sage/30 bg-sage/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-forest-deep">
            <Layers className="h-3.5 w-3.5 text-sage" />
            <span>Synergy Matrix</span>
          </div>
          <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-forest-deep sm:text-3xl md:text-4xl">
            Match capabilities to your growth goals
          </h3>
          <p className="mt-2 max-w-xl font-sans text-sm text-grey-muted md:text-base">
            Select a growth focus to see how our specialized capabilities combine to drive business outcomes.
          </p>
        </div>

        {/* Goal Selector Buttons */}
        <div className="flex flex-wrap gap-2">
          {matrixGoals.map((goal) => {
            const Icon = goal.icon;
            const isActive = goal.id === activeGoalId;
            return (
              <button
                key={goal.id}
                onClick={() => setActiveGoalId(goal.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 font-sans text-xs font-semibold transition-all duration-300 sm:text-sm",
                  isActive
                    ? "bg-forest-deep text-white shadow-lg shadow-forest-deep/20 scale-[1.02]"
                    : "bg-forest-deep/5 text-forest-deep hover:bg-forest-deep/10 hover:text-forest-deep",
                )}
              >
                <Icon className={cn("h-4 w-4", isActive ? "text-sage-light" : "text-sage")} />
                <span>{goal.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Goal Highlight Banner */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeGoal.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="mt-8 rounded-2xl border border-sage/20 bg-gradient-to-r from-forest-deep via-forest-dark to-forest-deep p-6 text-white"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <span className="inline-block rounded-md bg-sage/20 px-2.5 py-0.5 font-sans text-[11px] font-semibold tracking-wider text-sage-light uppercase">
                {activeGoal.badge}
              </span>
              <h4 className="font-display text-xl font-bold">{activeGoal.name}</h4>
              <p className="max-w-2xl font-sans text-sm text-white/70 leading-relaxed">
                {activeGoal.description}
              </p>
            </div>
            <div className="shrink-0 rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
              <p className="font-sans text-[11px] font-medium uppercase tracking-wider text-sage-light">
                Projected Impact
              </p>
              <p className="mt-1 font-display text-base font-bold text-white sm:text-lg">
                {activeGoal.expectedImpact}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Capability Checklist Grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {allCapabilities.map((capability) => {
          const isRecommended = activeGoal.recommendedServices.includes(capability);
          return (
            <motion.div
              key={capability}
              layout
              className={cn(
                "group relative flex items-center justify-between rounded-2xl border p-4 transition-all duration-300",
                isRecommended
                  ? "border-sage/40 bg-white shadow-md shadow-sage/10"
                  : "border-forest-deep/5 bg-forest-deep/[0.02] opacity-60 hover:opacity-100",
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
                    isRecommended
                      ? "bg-forest-deep text-sage-light"
                      : "bg-forest-deep/10 text-grey-muted",
                  )}
                >
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                </div>
                <span
                  className={cn(
                    "font-sans text-sm font-semibold transition-colors duration-300",
                    isRecommended ? "text-forest-deep" : "text-grey-muted",
                  )}
                >
                  {capability}
                </span>
              </div>

              {isRecommended && (
                <span className="rounded-full bg-sage/15 px-2.5 py-0.5 font-sans text-[10px] font-bold text-forest-deep">
                  Active Focus
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
