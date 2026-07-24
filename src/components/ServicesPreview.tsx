"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { services } from "@/lib/constants";
import { ScrollReveal } from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";

export function ServicesPreview() {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const activeService = services.items[activeServiceIndex] || services.items[0];

  const handleNext = () => {
    setActiveServiceIndex((prev) => (prev + 1) % services.items.length);
  };

  const handlePrev = () => {
    setActiveServiceIndex((prev) => (prev - 1 + services.items.length) % services.items.length);
  };

  return (
    <section className="relative overflow-hidden bg-forest-deep section-padding text-white">
      {/* Background accents */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[45rem] w-[45rem] -translate-x-1/2 rounded-full bg-sage/10 blur-[140px]" aria-hidden />
      <div className="bg-grid absolute inset-0 opacity-15" aria-hidden />
      <div className="grain-texture absolute inset-0" aria-hidden />

      <div className="container-wide relative z-10">
        {/* Section Header */}
        <ScrollReveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end mb-8 md:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-sage/20 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-sage-light">
              <Sparkles size={14} />
              <span>{services.label}</span>
            </div>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
              {services.headline}
            </h2>
          </div>

          <p className="max-w-md font-sans text-base leading-relaxed text-white/70 md:text-lg">
            {services.subtitle}
          </p>
        </ScrollReveal>

        {/* Scrollable Category Tabs Bar */}
        <ScrollReveal delay={80}>
          <div className="flex items-center gap-2.5 overflow-x-auto pb-4 pt-1 scrollbar-none overscroll-x-contain select-none">
            {services.items.map((service, idx) => {
              const isActive = idx === activeServiceIndex;
              return (
                <button
                  key={service.title}
                  onClick={() => setActiveServiceIndex(idx)}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 border",
                    isActive
                      ? "bg-sage text-forest-deep border-sage shadow-[0_0_20px_rgba(77,184,154,0.35)] scale-105"
                      : "bg-white/10 text-white/80 border-white/15 hover:bg-white/20 hover:text-white"
                  )}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                  <span>{service.title}</span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Dynamic Showcase Card */}
        <ScrollReveal delay={120} className="mt-4 md:mt-8">
          <div className="relative overflow-hidden rounded-3xl bg-white/[0.07] border border-white/15 p-6 sm:p-8 md:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.5)] backdrop-blur-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-12"
              >
                {/* Left Media Area */}
                <div className="relative aspect-[16/10] w-full lg:col-span-6 overflow-hidden rounded-2xl bg-black/40 border border-white/10 shadow-2xl">
                  <Image
                    src={activeService.image}
                    alt={activeService.title}
                    fill
                    quality={90}
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent opacity-60" />

                  {/* Badge Tag */}
                  <div className="absolute left-4 top-4 z-10">
                    <span className="rounded-full bg-forest-deep/80 border border-white/20 px-3.5 py-1 backdrop-blur-md font-sans text-[10px] font-bold uppercase tracking-widest text-white">
                      {activeService.tag}
                    </span>
                  </div>
                </div>

                {/* Right Content Area */}
                <div className="flex flex-col justify-between lg:col-span-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-xs font-bold uppercase tracking-widest text-sage">
                        Service 0{activeServiceIndex + 1} of 0{services.items.length}
                      </span>
                    </div>

                    <h3 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
                      {activeService.title}
                    </h3>
                    <p className="mt-3 font-sans text-sm sm:text-base leading-relaxed text-white/75">
                      {activeService.description}
                    </p>

                    <div className="my-6 h-px w-full bg-white/10" />

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {activeService.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-3 rounded-xl bg-white/5 p-3 border border-white/5">
                          <Check size={16} className="text-sage shrink-0" />
                          <span className="font-sans text-xs sm:text-sm font-medium text-white/90">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Navigation & CTA */}
                  <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
                    <Link
                      href="/services"
                      className="inline-flex items-center gap-2.5 rounded-full bg-sage px-6 py-3 font-sans text-sm font-bold text-forest-deep transition-all hover:bg-sage-light hover:shadow-lg hover:scale-105 active:scale-95"
                    >
                      <span>Explore {activeService.title}</span>
                      <ArrowRight size={16} />
                    </Link>

                    {/* Prev / Next Arrows & Dots */}
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5 mr-2">
                        {services.items.map((_, dotIdx) => (
                          <button
                            key={dotIdx}
                            onClick={() => setActiveServiceIndex(dotIdx)}
                            aria-label={`Go to service ${dotIdx + 1}`}
                            className={cn(
                              "h-2 rounded-full transition-all duration-300",
                              dotIdx === activeServiceIndex ? "w-6 bg-sage" : "w-2 bg-white/30 hover:bg-white/60"
                            )}
                          />
                        ))}
                      </div>

                      <button
                        onClick={handlePrev}
                        aria-label="Previous service"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/25 active:scale-95 border border-white/15"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        onClick={handleNext}
                        aria-label="Next service"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/25 active:scale-95 border border-white/15"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
