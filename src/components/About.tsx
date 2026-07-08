"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { about, images } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

function AboutHero() {
  return (
    <div className="grain-texture relative overflow-hidden bg-cream section-padding !pb-20 !pt-32 md:!pt-44">
      <div className="bg-mesh absolute inset-0" />
      <div className="container-wide relative">
        <ScrollReveal className="max-w-4xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-sage">
            {about.label}
          </p>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight text-forest-deep md:text-6xl lg:text-7xl">
            {about.headline}
          </h1>
        </ScrollReveal>
      </div>
    </div>
  );
}

export function About({ standalone = false }: { standalone?: boolean }) {
  const reduceMotion = useReducedMotion();

  return (
    <>
      {standalone && <AboutHero />}

      <section
        id="about"
        className={cn(
          "grain-texture content-auto relative overflow-hidden bg-cream section-padding",
          standalone && "!pt-10 md:!pt-16",
        )}
      >
        <div className="bg-mesh absolute inset-0" />

        <div className="container-wide relative">
          {/* Intro split */}
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
            <ScrollReveal>
              <motion.div
                className="relative"
                whileHover={reduceMotion ? undefined : { scale: 1.01 }}
                transition={{ duration: 0.4, ease }}
              >
                <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-sage/15 to-transparent blur-2xl" />
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_28px_80px_rgba(15,61,46,0.15)]">
                  <Image
                    src={images.about}
                    alt="Bougain Media creative team collaborating on marketing strategy"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </motion.div>
            </ScrollReveal>

            <div>
              {!standalone && (
                <ScrollReveal delay={60}>
                  <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-sage">
                    {about.label}
                  </p>
                  <h2 className="mt-4 max-w-xl font-display text-4xl font-bold leading-tight tracking-tight text-forest-deep md:text-5xl">
                    {about.headline}
                  </h2>
                </ScrollReveal>
              )}

              <ScrollReveal delay={100} className={standalone ? "" : "mt-8"}>
                <p className="font-sans text-lg leading-relaxed text-forest-deep/85 md:text-xl">
                  {about.intro}
                </p>
                <p className="mt-5 font-sans text-base leading-relaxed text-grey-muted md:text-lg">
                  {about.extended}
                </p>
              </ScrollReveal>
            </div>
          </div>

          {/* Mission / Vision — large editorial type, no cards */}
          <div className="mt-28 grid gap-16 border-t border-forest-deep/8 pt-20 md:mt-36 md:grid-cols-2 md:gap-20 md:pt-28">
            <ScrollReveal>
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-sage">
                Mission
              </p>
              <p className="mt-5 font-display text-2xl font-bold leading-snug tracking-tight text-forest-deep md:text-3xl lg:text-4xl">
                {about.mission}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-sage">
                Vision
              </p>
              <p className="mt-5 font-display text-2xl font-bold leading-snug tracking-tight text-forest-deep md:text-3xl lg:text-4xl">
                {about.vision}
              </p>
            </ScrollReveal>
          </div>

          {/* Timeline */}
          {standalone && (
            <div className="mt-28 md:mt-36">
              <ScrollReveal className="mb-14 max-w-lg md:mb-20">
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-sage">
                  How we partner
                </p>
                <h2 className="mt-4 font-display text-3xl font-bold text-forest-deep md:text-4xl">
                  A clear path from idea to impact
                </h2>
              </ScrollReveal>

              <div className="relative space-y-10 md:space-y-0">
                <div
                  className="absolute left-[1.15rem] top-3 hidden h-[calc(100%-1.5rem)] w-px bg-forest-deep/10 md:block"
                  aria-hidden
                />
                {about.timeline.map((item, i) => (
                  <ScrollReveal key={item.year} delay={i * 60}>
                    <div className="relative flex gap-6 md:gap-10 md:py-8">
                      <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sage/30 bg-cream">
                        <span className="h-2 w-2 rounded-full bg-sage" />
                      </div>
                      <div className="pb-2">
                        <span className="font-display text-4xl font-bold text-sage/35 md:text-5xl">
                          {item.year}
                        </span>
                        <h3 className="mt-2 font-sans text-xl font-semibold text-forest-deep">
                          {item.title}
                        </h3>
                        <p className="mt-2 max-w-md font-sans text-sm leading-relaxed text-grey-muted md:text-[15px]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          )}

          {/* Values — flowing, not heavy cards */}
          <div className="mt-28 md:mt-36">
            <ScrollReveal className="mb-12 md:mb-16">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-sage">
                Values
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-forest-deep md:text-4xl">
                What we protect
              </h2>
            </ScrollReveal>

            <div className="grid gap-10 border-t border-forest-deep/8 pt-10 sm:grid-cols-3 sm:gap-12">
              {about.values.map((value, i) => (
                <ScrollReveal key={value.title} delay={i * 70}>
                  <span className="font-display text-5xl font-bold text-sage/20">
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 font-sans text-lg font-semibold text-forest-deep">
                    {value.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-grey-muted">
                    {value.description}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Closing */}
          <ScrollReveal delay={100} className="mt-24 max-w-2xl md:mt-32">
            <p className="font-sans text-lg leading-relaxed text-grey-muted md:text-xl">
              {about.consultation}
            </p>
            <p className="mt-4 font-sans text-sm font-semibold text-sage">
              {about.closing}
            </p>
            {standalone && (
              <Button href="/contact" variant="primary" size="lg" className="mt-10">
                Book a consultation
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </Button>
            )}
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
