"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { BrandWatermark } from "@/components/BrandWatermark";
import { about, images } from "@/lib/constants";
import { cn } from "@/lib/utils";

function AboutHero() {
  return (
    <div className="grain-texture relative overflow-hidden border-b border-forest-deep/8 bg-cream section-padding !pb-16 !pt-32 md:!pt-40">
      <div className="bg-mesh absolute inset-0" />
      <BrandWatermark className="right-8 top-16 md:right-16" size="lg" opacity={0.06} />
      <div className="container-wide relative text-center">
        <ScrollReveal>
          <SectionLabel className="text-center">{about.label}</SectionLabel>
          <h1 className="mx-auto mt-4 max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight text-forest-deep md:text-5xl lg:text-6xl">
            {about.headline}
          </h1>
        </ScrollReveal>
      </div>
    </div>
  );
}

export function About({ standalone = false }: { standalone?: boolean }) {
  return (
    <>
      {standalone && <AboutHero />}

      <section
        id="about"
        className={cn(
          "grain-texture content-auto relative overflow-hidden bg-cream section-padding",
          standalone && "!pt-16",
        )}
      >
        <div className="bg-mesh absolute inset-0" />
        <BrandWatermark className="-left-16 bottom-20 hidden md:block" size="lg" opacity={0.05} />

        <div className="container-wide relative">
          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
            <ScrollReveal>
              <motion.div
                className="relative"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.4 }}
              >
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-sage/20 to-transparent blur-2xl" />
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl shadow-forest-deep/15">
                  <Image
                    src={images.about}
                    alt="Bougain Media creative team collaborating on marketing strategy"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/40 to-transparent" />
                </div>
              </motion.div>
            </ScrollReveal>

            <div>
              {!standalone && (
                <ScrollReveal delay={80}>
                  <SectionLabel>{about.label}</SectionLabel>
                  <h2 className="max-w-xl font-display text-3xl font-bold leading-tight tracking-tight text-forest-deep md:text-4xl lg:text-5xl">
                    {about.headline}
                  </h2>
                </ScrollReveal>
              )}

              <ScrollReveal delay={120} className={standalone ? "" : "mt-6"}>
                <p className="font-serif text-lg leading-relaxed text-black/80">{about.intro}</p>
                <p className="mt-5 font-serif text-lg leading-relaxed text-grey-muted">
                  {about.extended}
                </p>
              </ScrollReveal>
            </div>
          </div>

          <div className="mt-16 grid gap-5 sm:grid-cols-3">
            {about.cards.map((card, i) => (
              <AnimatedCard key={card.title} delay={i + 2} className="p-7">
                <motion.span
                  className="font-sans text-4xl font-bold text-sage/25"
                  whileHover={{ color: "rgba(107, 158, 143, 0.5)" }}
                >
                  0{i + 1}
                </motion.span>
                <h3 className="mt-2 font-sans text-sm font-semibold uppercase tracking-wider text-sage">
                  {card.title}
                </h3>
                <p className="mt-3 font-serif text-sm leading-relaxed text-grey-muted">
                  {card.content}
                </p>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-sage to-sage-light transition-all duration-500 group-hover:w-full" />
              </AnimatedCard>
            ))}
          </div>

          <ScrollReveal delay={200} className="mt-14 max-w-3xl">
            <p className="font-serif text-lg leading-relaxed text-grey-muted">
              {about.consultation}
            </p>
            <p className="mt-4 font-sans text-sm font-semibold text-sage">{about.closing}</p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
