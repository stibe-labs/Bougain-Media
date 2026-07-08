"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { images, portfolio } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const spanClasses = {
  lg: "sm:col-span-2 sm:row-span-2 min-h-[320px] sm:min-h-[520px]",
  sm: "sm:col-span-1 min-h-[280px] sm:aspect-[4/5]",
  md: "sm:col-span-1 min-h-[280px] sm:aspect-[4/5] lg:min-h-[340px]",
};

function PortfolioHero() {
  return (
    <div className="relative overflow-hidden bg-forest-deep">
      <Image
        src={images.cta}
        alt=""
        fill
        priority
        quality={60}
        sizes="100vw"
        className="object-cover opacity-20"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-[28rem] w-[28rem] rounded-full bg-sage/20 blur-[100px]"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/50 via-forest-deep/88 to-forest-deep" />
      <div className="bg-grid absolute inset-0 opacity-20" />
      <div className="grain-texture absolute inset-0" />

      <div className="container-wide relative z-10 px-4 pb-20 pt-28 sm:px-5 sm:pb-24 sm:pt-36 md:px-8 md:pb-28 md:pt-44 lg:px-12">
        <ScrollReveal className="max-w-3xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-sage">
            {portfolio.label}
          </p>
          <h1 className="mt-5 font-display text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
            {portfolio.headline}
          </h1>
          <p className="mt-6 max-w-lg font-sans text-lg leading-relaxed text-white/55 md:text-xl">
            {portfolio.subtitle}
          </p>
        </ScrollReveal>
      </div>
    </div>
  );
}

function PortfolioCard({
  item,
  index,
}: {
  item: (typeof portfolio.items)[number];
  index: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay: index * 0.07, ease }}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-3xl",
        "shadow-[0_20px_60px_rgba(15,61,46,0.12)]",
        spanClasses[item.span],
      )}
    >
      <Image
        src={item.image}
        alt={`${item.title} — ${item.category} project`}
        fill
        quality={75}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {/* Default gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/25 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-0" />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-forest-deep/88 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        {/* Default state */}
        <div className="transition-all duration-500 group-hover:translate-y-2 group-hover:opacity-0">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-sage-light">
            {item.category}
          </span>
          <h3 className="mt-2 font-display text-xl font-bold text-white md:text-2xl lg:text-3xl">
            {item.title}
          </h3>
        </div>

        {/* Hover state */}
        <div className="absolute inset-x-6 bottom-6 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:inset-x-8 md:bottom-8">
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-sage">
            {item.industry}
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">
            {item.title}
          </h3>
          <p className="mt-3 max-w-xs font-sans text-sm leading-relaxed text-white/65">
            {item.result}
          </p>
          <span className="mt-5 inline-flex items-center gap-2 font-sans text-sm font-semibold text-sage-light">
            View Case Study
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function Portfolio({ standalone = false }: { standalone?: boolean }) {
  return (
    <>
      {standalone && <PortfolioHero />}

      <section
        id="portfolio"
        className={cn(
          "content-auto relative overflow-hidden bg-white section-padding",
          standalone && "!pt-14 md:!pt-20",
        )}
      >
        <div className="container-wide relative">
          {!standalone && (
            <ScrollReveal className="mb-14 max-w-2xl">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-sage">
                {portfolio.label}
              </p>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-forest-deep md:text-5xl">
                {portfolio.headline}
              </h2>
              <p className="mt-5 max-w-lg font-sans text-base leading-relaxed text-grey-muted md:text-lg">
                {portfolio.subtitle}
              </p>
            </ScrollReveal>
          )}

          {standalone && (
            <ScrollReveal className="mb-14 md:mb-16">
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div>
                  <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-sage">
                    Editorial grid
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-bold text-forest-deep md:text-4xl">
                    Projects across every channel
                  </h2>
                </div>
                <p className="max-w-sm font-sans text-sm leading-relaxed text-grey-muted md:text-right">
                  Uneven, intentional — like a magazine, not a catalogue.
                </p>
              </div>
            </ScrollReveal>
          )}

          <div
            className={cn(
              "grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6",
              !standalone && "mt-4",
            )}
          >
            {portfolio.items.map((item, i) => (
              <PortfolioCard key={item.title} item={item} index={i} />
            ))}
          </div>

          {!standalone && (
            <ScrollReveal delay={160} className="mt-14 text-center">
              <Button href="/portfolio" variant="secondary" size="md">
                Explore full portfolio
                <ArrowUpRight size={16} />
              </Button>
            </ScrollReveal>
          )}

          {standalone && (
            <ScrollReveal delay={100} className="mt-20 text-center md:mt-28">
              <p className="font-display text-2xl font-bold text-forest-deep md:text-3xl">
                Have a project in mind?
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex min-h-12 items-center gap-2 font-sans text-sm font-semibold text-sage link-underline"
              >
                Let&apos;s talk
                <ArrowUpRight size={16} />
              </Link>
            </ScrollReveal>
          )}
        </div>
      </section>
    </>
  );
}
