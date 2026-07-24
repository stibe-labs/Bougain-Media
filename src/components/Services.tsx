"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Grid,
  Columns,
  CheckCircle2,
  PhoneCall,
  Flame,
} from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/ServiceCard";
import { ServiceMedia } from "@/components/ui/ServiceMedia";
import { ServiceMatrix } from "@/components/ui/ServiceMatrix";
import { ServiceEstimator } from "@/components/ui/ServiceEstimator";
import { services } from "@/lib/constants";
import { cn } from "@/lib/utils";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const filterCategories = [
  "All Capabilities",
  "Creative & Video",
  "Growth & Ads",
  "Brand & Social",
] as const;

type CategoryFilter = (typeof filterCategories)[number];

function getCategoryForService(tag: string): CategoryFilter {
  if (tag === "Creative" || tag === "Video") return "Creative & Video";
  if (tag === "Paid Growth" || tag === "Design") return "Growth & Ads";
  if (tag === "Social" || tag === "Branding") return "Brand & Social";
  return "All Capabilities";
}

function ServicesHero() {
  return (
    <div className="relative overflow-hidden bg-forest-deep">
      <div
        className="pointer-events-none absolute left-1/4 top-0 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-sage/20 blur-[120px] animate-hero-glow"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/40 via-forest-deep/90 to-forest-deep" />
      <div className="bg-grid absolute inset-0 opacity-20" />
      <div className="grain-texture absolute inset-0" />

      <div className="container-wide relative z-10 px-4 pb-20 pt-28 sm:px-5 sm:pb-24 sm:pt-36 md:px-8 md:pb-28 md:pt-44 lg:px-12">
        <div className="grid items-end gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-sage/30 bg-sage/15 px-4 py-1.5 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-sage-light" />
              <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-sage-light">
                {services.label}
              </span>
            </div>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-7xl leading-[1.08]">
              Engineered for <br className="hidden sm:block" />
              <span className="text-gradient">Maximum Growth.</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: easeOut }}
          >
            <p className="font-sans text-lg leading-relaxed text-white/70 md:text-xl">
              {services.subtitle} We combine cinematic storytelling with performance marketing to scale ambitious brands.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                href="/contact"
                variant="primary"
                size="md"
                className="!bg-white !text-forest-deep hover:!bg-sage-light shadow-xl"
              >
                Start a project
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </Button>
              <Button
                href="https://wa.me/918138869120"
                variant="outline"
                size="md"
                className="!border-white/20 !text-white hover:!bg-white/10"
              >
                <PhoneCall size={15} />
                <span>Quick WhatsApp Chat</span>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Aggregate Impact Stats Counter Strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: easeOut }}
          className="mt-16 grid grid-cols-2 gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:grid-cols-4 lg:p-8"
        >
          <div>
            <p className="font-display text-3xl font-bold text-white sm:text-4xl">50+</p>
            <p className="mt-1 font-sans text-xs font-medium uppercase tracking-wider text-sage-light">
              Projects Delivered
            </p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold text-sage-glow sm:text-4xl">3.9×</p>
            <p className="mt-1 font-sans text-xs font-medium uppercase tracking-wider text-sage-light">
              Average CTR Lift
            </p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold text-white sm:text-4xl">500M+</p>
            <p className="mt-1 font-sans text-xs font-medium uppercase tracking-wider text-sage-light">
              Social Impressions
            </p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold text-sage-glow sm:text-4xl">98%</p>
            <p className="mt-1 font-sans text-xs font-medium uppercase tracking-wider text-sage-light">
              Client Retention Rate
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ServicesApproach() {
  const steps = [
    {
      step: "01",
      title: "Discover & Audit",
      description:
        "We unpack your business objectives, target audience, competitive gaps, and current performance metrics.",
    },
    {
      step: "02",
      title: "Strategy & Positioning",
      description:
        "Developing a bespoke growth strategy, content messaging system, and high-converting performance funnel.",
    },
    {
      step: "03",
      title: "Creative Execution",
      description:
        "High-production photo shoots, scroll-stopping video edits, and visual ad assets engineered for action.",
    },
    {
      step: "04",
      title: "Scale & Optimize",
      description:
        "Continuous ad testing, campaign optimization, community management, and transparent data reporting.",
    },
  ];

  return (
    <div className="relative mt-24 overflow-hidden rounded-[2.5rem] bg-forest-deep px-6 py-14 sm:px-10 md:mt-36 md:px-14 md:py-20">
      <div className="bg-grid absolute inset-0 opacity-15" />
      <div
        className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-sage/20 blur-[100px]"
        aria-hidden
      />

      <ScrollReveal className="relative max-w-xl">
        <p className="font-sans text-xs font-bold uppercase tracking-[0.28em] text-sage">
          How We Work
        </p>
        <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          Strategy first. Results always.
        </h2>
      </ScrollReveal>

      <div className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {steps.map((step, i) => (
          <ScrollReveal key={step.step} delay={i * 90}>
            <div className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md transition-all duration-300 hover:border-sage/40 hover:bg-white/[0.08]">
              <span className="font-display text-5xl font-bold text-sage/40 transition-colors duration-300 group-hover:text-sage">
                {step.step}
              </span>
              <h3 className="mt-4 font-sans text-lg font-bold text-white">
                {step.title}
              </h3>
              <p className="mt-2 font-sans text-xs leading-relaxed text-white/60 sm:text-sm">
                {step.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

export function Services({ standalone = false }: { standalone?: boolean }) {
  const [activeCategory, setActiveCategory] =
    useState<CategoryFilter>("All Capabilities");
  const [viewMode, setViewMode] = useState<"grid" | "split">("grid");
  const [selectedSpotlightIndex, setSelectedSpotlightIndex] = useState(0);

  const filteredItems = services.items.filter((service) => {
    if (activeCategory === "All Capabilities") return true;
    const cat = getCategoryForService(service.tag);
    return cat === activeCategory;
  });

  const activeSpotlightService =
    filteredItems[selectedSpotlightIndex] || filteredItems[0] || services.items[0];

  return (
    <>
      {standalone && <ServicesHero />}

      <section
        id="services"
        className={cn(
          "content-auto relative overflow-hidden bg-cream section-padding",
          standalone && "!pt-14 md:!pt-20",
        )}
      >
        <div className="bg-mesh absolute inset-0" />

        <div className="container-wide relative">
          {!standalone && (
            <ScrollReveal className="mx-auto max-w-2xl text-center">
              <p className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.28em] text-sage">
                {services.label}
              </p>
              <h2 className="font-display text-4xl font-bold tracking-tight text-forest-deep md:text-5xl lg:text-6xl">
                {services.headline}
              </h2>
              <p className="mx-auto mt-6 max-w-xl font-sans text-lg leading-relaxed text-grey-muted">
                {services.subtitle}
              </p>
            </ScrollReveal>
          )}

          {/* Interactive Navigation Filter Bar & View Toggle */}
          {standalone && (
            <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="font-sans text-xs font-bold uppercase tracking-[0.28em] text-sage">
                  Capabilities Overview
                </span>
                <h2 className="mt-2 font-display text-3xl font-bold leading-tight tracking-tight text-forest-deep sm:text-4xl lg:text-5xl">
                  Six specialized capabilities —
                  <span className="text-sage"> one growth system.</span>
                </h2>
              </div>

              {/* Controls Group */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Category Filter Pills */}
                <div className="flex flex-wrap gap-1.5 rounded-2xl border border-forest-deep/10 bg-white/90 p-1.5 shadow-sm backdrop-blur-md">
                  {filterCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setSelectedSpotlightIndex(0);
                      }}
                      className={cn(
                        "rounded-xl px-3.5 py-2 font-sans text-xs font-semibold transition-all duration-300",
                        activeCategory === cat
                          ? "bg-forest-deep text-white shadow-sm"
                          : "text-forest-deep/70 hover:bg-forest-deep/5 hover:text-forest-deep",
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* View Mode Switcher (Grid vs Split Spotlight) */}
                <div className="hidden sm:flex rounded-2xl border border-forest-deep/10 bg-white/90 p-1.5 shadow-sm backdrop-blur-md">
                  <button
                    onClick={() => setViewMode("grid")}
                    title="Grid View"
                    className={cn(
                      "flex items-center gap-1.5 rounded-xl px-3 py-2 font-sans text-xs font-semibold transition-all duration-300",
                      viewMode === "grid"
                        ? "bg-forest-deep text-white shadow-sm"
                        : "text-forest-deep/70 hover:bg-forest-deep/5",
                    )}
                  >
                    <Grid size={14} />
                    <span>Grid</span>
                  </button>
                  <button
                    onClick={() => setViewMode("split")}
                    title="Spotlight Split View"
                    className={cn(
                      "flex items-center gap-1.5 rounded-xl px-3 py-2 font-sans text-xs font-semibold transition-all duration-300",
                      viewMode === "split"
                        ? "bg-forest-deep text-white shadow-sm"
                        : "text-forest-deep/70 hover:bg-forest-deep/5",
                    )}
                  >
                    <Columns size={14} />
                    <span>Spotlight</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Grid View Showcase */}
          {viewMode === "grid" && (
            <>
              {/* Mobile Swipe Carousel */}
              <div
                className={cn(
                  "flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar md:hidden",
                  !standalone && "mt-16",
                )}
              >
                {filteredItems.map((service, i) => (
                  <div
                    key={service.title}
                    className="w-[88vw] max-w-sm shrink-0 snap-center"
                  >
                    <ServiceCard service={service} index={i} />
                  </div>
                ))}
              </div>

              {/* Desktop Normalized Grid View */}
              <div
                className={cn(
                  "hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-8",
                  !standalone && "mt-16",
                )}
              >
                {filteredItems.map((service, i) => (
                  <ServiceCard key={service.title} service={service} index={i} />
                ))}
              </div>
            </>
          )}

          {/* Spotlight Split View Showcase */}
          {standalone && viewMode === "split" && (
            <div className="hidden lg:grid lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
              {/* Left Selector List */}
              <div className="space-y-3">
                {filteredItems.map((service, i) => {
                  const isSelected =
                    activeSpotlightService.title === service.title;
                  return (
                    <button
                      key={service.title}
                      onClick={() => setSelectedSpotlightIndex(i)}
                      className={cn(
                        "group relative flex w-full items-center justify-between rounded-2xl border p-5 text-left transition-all duration-300",
                        isSelected
                          ? "border-forest-deep bg-forest-deep text-white shadow-xl shadow-forest-deep/15"
                          : "border-forest-deep/10 bg-white/90 text-forest-deep hover:border-sage/40 hover:bg-white",
                      )}
                    >
                      <div>
                        <span
                          className={cn(
                            "font-sans text-[10px] font-bold uppercase tracking-wider",
                            isSelected ? "text-sage-light" : "text-sage",
                          )}
                        >
                          {service.tag}
                        </span>
                        <h4 className="font-display text-xl font-bold">
                          {service.title}
                        </h4>
                      </div>
                      <ArrowRight
                        size={18}
                        className={cn(
                          "transition-transform duration-300",
                          isSelected
                            ? "translate-x-1 text-sage-light"
                            : "text-forest-deep/30 group-hover:translate-x-1 group-hover:text-forest-deep",
                        )}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Right Spotlight Details Display */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSpotlightService.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: easeOut }}
                  className="rounded-3xl border border-forest-deep/10 bg-white p-8 shadow-2xl shadow-forest-deep/10 flex flex-col justify-between"
                >
                  <div>
                    {/* Media Frame */}
                    <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
                      <ServiceMedia
                        title={activeSpotlightService.title}
                        image={activeSpotlightService.image}
                        sizes="50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/70 via-transparent to-transparent" />
                      <span className="absolute left-4 top-4 rounded-full bg-forest-deep/80 px-3 py-1 font-sans text-xs font-bold text-sage-light backdrop-blur-md">
                        {activeSpotlightService.tag}
                      </span>
                    </div>

                    <h3 className="mt-6 font-display text-3xl font-bold text-forest-deep">
                      {activeSpotlightService.title}
                    </h3>
                    <p className="mt-3 font-sans text-base text-grey-muted leading-relaxed">
                      {activeSpotlightService.description}
                    </p>

                    {/* Features checklist */}
                    {activeSpotlightService.features && (
                      <div className="mt-6 space-y-2.5 border-t border-forest-deep/10 pt-5">
                        <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-forest-deep/70">
                          Included Deliverables
                        </h4>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {activeSpotlightService.features.map((feat) => (
                            <div
                              key={feat}
                              className="flex items-center gap-2 font-sans text-sm text-forest-deep/90"
                            >
                              <CheckCircle2 size={16} className="text-sage shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 pt-6 border-t border-forest-deep/10 flex items-center justify-between">
                    <div>
                      <p className="font-sans text-xs text-grey-muted">
                        Ready to start?
                      </p>
                      <p className="font-sans text-sm font-bold text-forest-deep">
                        Book a campaign for {activeSpotlightService.title}
                      </p>
                    </div>

                    <Link
                      href={`/contact?service=${encodeURIComponent(activeSpotlightService.title)}`}
                      className="inline-flex items-center gap-2 rounded-2xl bg-forest-deep px-5 py-3 font-sans text-sm font-bold text-white shadow-lg transition-transform hover:scale-105"
                    >
                      <span>Inquire Now</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* Interactive Capability Matrix */}
          {standalone && (
            <div className="mt-24 md:mt-36">
              <ServiceMatrix />
            </div>
          )}

          {/* Strategy Workflow Stepper */}
          {standalone && <ServicesApproach />}

          {/* Interactive Scope Estimator */}
          {standalone && (
            <div className="mt-24 md:mt-36">
              <ServiceEstimator />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
