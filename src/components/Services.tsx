"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Globe,
  Mail,
  PenTool,
  Search,
  Share2,
  Target,
  type LucideIcon,
} from "lucide-react";
import { AnimatedMesh } from "@/components/AnimatedMesh";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/constants";
import { cn } from "@/lib/utils";

const serviceIcons: LucideIcon[] = [
  Target,
  PenTool,
  Share2,
  Globe,
  Search,
  Mail,
];

function ServicesHero() {
  return (
    <div className="relative overflow-hidden bg-forest-deep">
      <AnimatedMesh rgb="77, 184, 154" rgb2="168, 230, 207" />
      <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/60 via-forest-deep/90 to-forest-deep" />
      <div className="bg-grid absolute inset-0 opacity-30" />

      <div className="container-wide relative z-10 px-4 pb-16 pt-24 sm:px-5 sm:pb-20 sm:pt-32 md:px-8 md:pb-24 md:pt-40 lg:px-12">
        <div className="grid items-end gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <SectionLabel dark className="text-center lg:text-left">
              {services.label}
            </SectionLabel>
            <h1 className="font-sans text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
              <span className="font-script text-5xl font-normal text-sage-light md:text-6xl lg:text-7xl">
                {services.headlineScript}
              </span>{" "}
              {services.headline}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <p className="text-lg leading-relaxed text-white/65 md:text-xl">
              {services.subtitle}
            </p>
            <Button href="/contact" variant="primary" size="md" className="mt-8">
              Get a Free Consultation
              <ArrowRight size={16} />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ServiceRow({
  service,
  index,
  icon: Icon,
}: {
  service: (typeof services.items)[number];
  index: number;
  icon: LucideIcon;
}) {
  const reversed = index % 2 === 1;

  return (
    <article
      className={cn(
        "service-row group grid items-center gap-8 lg:grid-cols-2 lg:gap-14",
        index > 0 && "mt-6 border-t border-forest-deep/8 pt-14 lg:mt-0 lg:border-t-0 lg:pt-0",
      )}
    >
      <div className={cn("flex flex-col", reversed && "lg:order-2")}>
        <div className="mb-5 flex items-center gap-4">
          <span className="font-sans text-sm font-bold text-sage/60">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="rounded-full border border-sage/30 bg-sage/10 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-wider text-sage">
            {service.tag}
          </span>
        </div>

        <h3 className="font-sans text-2xl font-bold capitalize text-forest-deep transition-colors duration-300 group-hover:text-sage md:text-3xl">
          {service.title}
        </h3>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-grey-muted">
          {service.description}
        </p>

        <ul className="mt-6 space-y-3">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 font-sans text-sm text-forest-deep/80">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage/15">
                <Check size={12} className="text-sage" strokeWidth={2.5} />
              </span>
              {feature}
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="mt-8 inline-flex w-fit items-center gap-2 font-sans text-sm font-semibold text-sage transition-colors hover:text-forest-deep"
        >
          Discuss this service
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      <div
        className={cn(
          "service-row-visual relative flex aspect-square max-h-[360px] items-center justify-center overflow-hidden rounded-3xl border border-forest-deep/8 bg-gradient-to-br from-sage/20 via-sage/5 to-transparent lg:max-h-none lg:aspect-[4/3]",
          reversed && "lg:order-1",
        )}
      >
        <div className="bg-dots absolute inset-0 opacity-60" />
        <div className="service-row-icon relative flex h-28 w-28 items-center justify-center rounded-3xl border border-sage/20 bg-white shadow-lg shadow-forest-deep/5 transition-transform duration-500 group-hover:scale-110 md:h-32 md:w-32">
          <Icon size={48} className="text-sage" strokeWidth={1.5} />
        </div>
        <span className="absolute bottom-6 right-6 font-sans text-6xl font-bold text-forest-deep/[0.04] md:text-8xl">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </article>
  );
}

function ServicesApproach() {
  return (
    <div className="relative mt-24 overflow-hidden rounded-3xl border border-forest-deep/8 bg-forest-deep p-8 md:p-12">
      <div className="bg-grid absolute inset-0 opacity-20" />

      <ScrollReveal className="relative text-center">
        <SectionLabel dark className="text-center">
          How We Work
        </SectionLabel>
        <h2 className="font-sans text-2xl font-bold text-white md:text-3xl">
          Strategy first. Results always.
        </h2>
      </ScrollReveal>

      <div className="relative mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
        {services.approach.map((step, i) => (
          <ScrollReveal key={step.step} delay={i * 80}>
            <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-500 hover:border-sage/30 hover:bg-white/10">
              <span className="font-sans text-3xl font-bold text-sage/40 transition-colors duration-300 group-hover:text-sage">
                {step.step}
              </span>
              <h3 className="mt-3 font-sans text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{step.description}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

export function Services({ standalone = false }: { standalone?: boolean }) {
  return (
    <>
      {standalone && <ServicesHero />}

      <section
        id="services"
        className={cn(
          "content-auto relative overflow-hidden bg-white section-padding",
          standalone && "!pt-16",
        )}
      >
        <div className="container-wide relative">
          {!standalone && (
            <ScrollReveal className="mx-auto max-w-2xl text-center">
              <SectionLabel className="text-center">{services.label}</SectionLabel>
              <h2 className="font-sans text-4xl font-bold tracking-tight text-forest-deep md:text-6xl">
                {services.headline}
              </h2>
              <p className="mx-auto mt-5 text-lg text-grey-muted">{services.subtitle}</p>
            </ScrollReveal>
          )}

          {standalone && (
            <ScrollReveal className="mb-16">
              <p className="font-sans text-sm font-semibold uppercase tracking-[0.2em] text-sage">
                Capabilities
              </p>
              <h2 className="mt-3 max-w-xl font-sans text-2xl font-bold text-forest-deep md:text-4xl">
                Six ways we help brands win online
              </h2>
            </ScrollReveal>
          )}

          <div className={cn("space-y-14 lg:space-y-20", !standalone && "mt-16")}>
            {services.items.map((service, i) => {
              const Icon = serviceIcons[i] ?? Target;
              return (
                <ScrollReveal key={service.title} delay={i * 50}>
                  <ServiceRow service={service} index={i} icon={Icon} />
                </ScrollReveal>
              );
            })}
          </div>

          {standalone && <ServicesApproach />}
        </div>
      </section>
    </>
  );
}
