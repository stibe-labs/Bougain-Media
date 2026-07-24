"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { services } from "@/lib/constants";
import { ScrollReveal } from "@/components/ScrollReveal";

export function ServicesPreview() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const scrollAmount = direction === "left" ? -340 : 340;
    sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-forest-deep section-padding text-white">
      {/* Background accents */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[45rem] w-[45rem] -translate-x-1/2 rounded-full bg-sage/10 blur-[140px]" aria-hidden />
      <div className="bg-grid absolute inset-0 opacity-15" aria-hidden />
      <div className="grain-texture absolute inset-0" aria-hidden />

      <div className="container-wide relative z-10">
        {/* Section Header with Navigation Arrows */}
        <ScrollReveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end mb-10 md:mb-14">
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-sage-light">
              {services.label}
            </p>
            <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
              {services.headline}
            </h2>
          </div>

          <div className="flex items-center justify-between w-full md:w-auto gap-6">
            <p className="max-w-md font-sans text-sm leading-relaxed text-white/70 md:text-base hidden sm:block">
              {services.subtitle}
            </p>

            {/* Side-Scrolling Nav Arrow Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => scrollSlider("left")}
                aria-label="Previous services"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/25 active:scale-95 border border-white/15"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scrollSlider("right")}
                aria-label="Next services"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/25 active:scale-95 border border-white/15"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Horizontal Side-Scrolling Service Cards Carousel */}
        <ScrollReveal delay={100}>
          <div
            ref={sliderRef}
            className="-mx-4 px-4 sm:-mx-6 sm:px-6 md:-mx-8 md:px-8 flex gap-6 overflow-x-auto py-4 scrollbar-none scroll-smooth snap-x snap-mandatory select-none"
          >
            {services.items.map((service) => (
              <div
                key={service.title}
                className="group relative flex flex-col shrink-0 w-[290px] sm:w-[340px] md:w-[380px] snap-start overflow-hidden rounded-3xl bg-white/[0.07] border border-white/10 transition-all duration-300 hover:border-sage/40 hover:bg-white/[0.12] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
              >
                {/* Card Image Area */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    quality={85}
                    sizes="(max-width: 640px) 290px, 380px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent opacity-60" />

                  {/* Badge Tag */}
                  <div className="absolute left-4 top-4 z-10">
                    <span className="rounded-full bg-forest-deep/80 border border-white/20 px-3.5 py-1 backdrop-blur-md font-sans text-[10px] font-bold uppercase tracking-widest text-white">
                      {service.tag}
                    </span>
                  </div>
                </div>

                {/* Card Content Area */}
                <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white">
                      {service.title}
                    </h3>
                    <p className="mt-2.5 font-sans text-xs sm:text-sm leading-relaxed text-white/70 line-clamp-3">
                      {service.description}
                    </p>

                    <div className="my-5 h-px w-full bg-white/10" />

                    {/* Feature Checklist */}
                    <div className="space-y-2.5">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2.5">
                          <Check size={15} className="text-sage shrink-0" />
                          <span className="font-sans text-xs font-medium text-white/85 truncate">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Explore Link */}
                  <div className="mt-6 border-t border-white/10 pt-5">
                    <Link
                      href="/services"
                      className="inline-flex items-center gap-2 font-sans text-xs sm:text-sm font-semibold text-white transition-colors hover:text-sage-light"
                    >
                      <span>Explore service</span>
                      <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
