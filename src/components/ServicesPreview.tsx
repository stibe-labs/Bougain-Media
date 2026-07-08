"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

function ServicePreviewCard({
  service,
  index,
}: {
  service: (typeof services.items)[number];
  index: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay: index * 0.1, ease }}
      whileHover={
        reduceMotion
          ? undefined
          : { y: -8, transition: { duration: 0.35, ease } }
      }
      className={cn(
        "group relative flex h-full min-w-[85vw] max-w-md flex-col overflow-hidden rounded-3xl sm:min-w-0 sm:max-w-none",
        "border border-white/10 bg-white/[0.07] backdrop-blur-xl",
        "shadow-[0_24px_60px_rgba(0,0,0,0.2)]",
        "transition-shadow duration-500 hover:shadow-[0_32px_80px_rgba(107,158,143,0.22)]",
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/50 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-forest-deep/40 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-light backdrop-blur-md">
          {service.tag}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <h3 className="font-display text-2xl font-bold tracking-tight text-white md:text-[1.65rem]">
          {service.title}
        </h3>
        <p className="mt-3 font-sans text-sm leading-relaxed text-white/55 md:text-[15px]">
          {service.description}
        </p>

        <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5">
          {service.features.slice(0, 3).map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2.5 font-sans text-sm text-white/70"
            >
              <Check
                size={15}
                className="mt-0.5 shrink-0 text-sage"
                strokeWidth={1.75}
              />
              {feature}
            </li>
          ))}
        </ul>

        <Link
          href="/services"
          className="mt-auto inline-flex items-center gap-2 pt-7 font-sans text-sm font-semibold text-sage transition-colors group-hover:text-sage-light"
        >
          Explore service
          <ArrowRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </motion.article>
  );
}

export function ServicesPreview() {
  const featured = services.items.slice(0, 3);

  return (
    <section className="content-auto relative overflow-hidden bg-forest-deep section-padding">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-sage/10 blur-[120px]"
        aria-hidden
      />
      <div className="bg-grid absolute inset-0 opacity-20" />

      <div className="container-wide relative">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <ScrollReveal>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-sage">
              {services.label}
            </p>
            <h2 className="mt-4 max-w-lg font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
              Full-funnel digital marketing
            </h2>
            <p className="mt-5 max-w-md font-sans text-base leading-relaxed text-white/55">
              From paid ads to organic growth — every channel that drives results,
              crafted with editorial precision.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={80} className="hidden md:block">
            <Button href="/services" variant="secondary" size="md" className="!text-white !border-white/25 hover:!bg-white/10">
              View all services
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover/btn:translate-x-1"
              />
            </Button>
          </ScrollReveal>
        </div>

        {/* Mobile carousel */}
        <div className="mt-14 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar sm:hidden">
          {featured.map((service, i) => (
            <div key={service.title} className="snap-center">
              <ServicePreviewCard service={service} index={i} />
            </div>
          ))}
        </div>

        {/* Desktop / tablet grid */}
        <div className="mt-14 hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {featured.map((service, i) => (
            <ServicePreviewCard key={service.title} service={service} index={i} />
          ))}
        </div>

        <ScrollReveal delay={160} className="mt-12 text-center md:hidden">
          <Link
            href="/services"
            className="inline-flex min-h-11 items-center gap-2 font-sans text-sm font-semibold text-sage hover:text-sage-light"
          >
            View all services
            <ArrowRight size={16} />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
