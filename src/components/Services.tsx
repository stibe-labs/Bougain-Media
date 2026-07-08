"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/constants";
import { cn } from "@/lib/utils";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

function ServicesHero() {
  return (
    <div className="relative overflow-hidden bg-forest-deep">
      <div
        className="pointer-events-none absolute left-1/4 top-0 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-sage/20 blur-[100px] animate-hero-glow"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/40 via-forest-deep/85 to-forest-deep" />
      <div className="bg-grid absolute inset-0 opacity-20" />
      <div className="grain-texture absolute inset-0" />

      <div className="container-wide relative z-10 px-4 pb-20 pt-28 sm:px-5 sm:pb-24 sm:pt-36 md:px-8 md:pb-28 md:pt-44 lg:px-12">
        <div className="grid items-end gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut }}
          >
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-sage">
              {services.label}
            </p>
            <h1 className="mt-5 font-display text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
              {services.headline}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: easeOut }}
          >
            <p className="font-sans text-lg leading-relaxed text-white/60 md:text-xl">
              {services.subtitle}
            </p>
            <Button href="/contact" variant="primary" size="md" className="mt-8 !bg-white !text-forest-deep hover:!bg-sage-light">
              Start a project
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover/btn:translate-x-1"
              />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services.items)[number];
  index: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: reduced ? 0 : (index % 2) * 0.1, ease: easeOut }}
      whileHover={
        reduced ? undefined : { y: -10, transition: { duration: 0.35, ease: easeOut } }
      }
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl",
        "border border-forest-deep/6 bg-white/90 backdrop-blur-xl",
        "shadow-[0_20px_60px_rgba(15,61,46,0.08)]",
        "transition-shadow duration-500",
        "hover:shadow-[0_32px_80px_rgba(107,158,143,0.22)]",
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/40 via-transparent to-transparent" />
        <span className="absolute left-5 top-5 rounded-full border border-white/25 bg-forest-deep/45 px-3.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-light backdrop-blur-md">
          {service.tag}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-7 md:p-8">
        <h3 className="font-display text-2xl font-bold tracking-tight text-forest-deep md:text-3xl">
          {service.title}
        </h3>
        <p className="mt-3 font-sans text-[15px] leading-relaxed text-grey-muted md:text-base">
          {service.description}
        </p>

        <ul className="mt-6 space-y-3 border-t border-forest-deep/6 pt-6">
          {service.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 font-sans text-sm text-forest-deep/75"
            >
              <Check
                size={16}
                className="mt-0.5 shrink-0 text-sage"
                strokeWidth={1.75}
              />
              {feature}
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className={cn(
            "group/cta mt-auto inline-flex w-fit items-center gap-2.5 pt-8",
            "rounded-2xl border border-forest-deep/15 bg-transparent px-5 py-3",
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
    </motion.article>
  );
}

function ServicesApproach() {
  return (
    <div className="relative mt-28 overflow-hidden rounded-[2rem] bg-forest-deep px-8 py-14 md:mt-36 md:px-14 md:py-20">
      <div className="bg-grid absolute inset-0 opacity-15" />
      <div
        className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-sage/20 blur-[80px]"
        aria-hidden
      />

      <ScrollReveal className="relative max-w-xl">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-sage">
          How We Work
        </p>
        <h2 className="mt-4 font-display text-3xl font-bold text-white md:text-4xl">
          Strategy first. Results always.
        </h2>
      </ScrollReveal>

      <div className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
        {services.approach.map((step, i) => (
          <ScrollReveal key={step.step} delay={i * 90}>
            <div className="relative">
              <span className="font-display text-5xl font-bold text-sage/30 md:text-6xl">
                {step.step}
              </span>
              <h3 className="mt-4 font-sans text-lg font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-white/50">
                {step.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

function ServicesCtaStrip() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.75, ease: easeOut }}
      className="relative mt-28 text-center md:mt-36"
    >
      <h2 className="font-display text-3xl font-bold tracking-tight text-forest-deep md:text-5xl">
        Ready to grow your brand?
      </h2>
      <p className="mx-auto mt-5 max-w-md font-sans text-base leading-relaxed text-grey-muted md:text-lg">
        Let&apos;s create something exceptional together.
      </p>
      <Button href="/contact" variant="primary" size="lg" className="mt-10">
        Book Free Consultation
        <ArrowRight
          size={16}
          className="transition-transform duration-300 group-hover/btn:translate-x-1"
        />
      </Button>
    </motion.div>
  );
}

export function Services({ standalone = false }: { standalone?: boolean }) {
  return (
    <>
      {standalone && <ServicesHero />}

      <section
        id="services"
        className={cn(
          "content-auto relative overflow-hidden bg-cream section-padding",
          standalone && "!pt-16 md:!pt-24",
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

          {standalone && (
            <ScrollReveal className="mb-16 max-w-2xl md:mb-24">
              <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-forest-deep md:text-4xl lg:text-5xl">
                Six specialized capabilities —
                <span className="text-sage"> one growth system.</span>
              </h2>
            </ScrollReveal>
          )}

          {/* Mobile swipe carousel */}
          <div
            className={cn(
              "flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar md:hidden",
              !standalone && "mt-16",
            )}
          >
            {services.items.map((service, i) => (
              <div key={service.title} className="w-[85vw] max-w-sm shrink-0 snap-center">
                <ServiceCard service={service} index={i} />
              </div>
            ))}
          </div>

          {/* Desktop asymmetrical / editorial grid */}
          <div
            className={cn(
              "hidden gap-7 md:grid md:grid-cols-2",
              !standalone && "mt-20",
            )}
          >
            {services.items.map((service, i) => (
              <div
                key={service.title}
                className={cn(i % 3 === 0 && "md:col-span-2 lg:col-span-1", i === 0 && "lg:mt-0", i === 1 && "lg:mt-16")}
              >
                <ServiceCard service={service} index={i} />
              </div>
            ))}
          </div>

          {standalone && <ServicesApproach />}
          <ServicesCtaStrip />
        </div>
      </section>
    </>
  );
}
