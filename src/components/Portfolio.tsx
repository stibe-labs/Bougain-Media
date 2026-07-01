"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { AnimatedMesh } from "@/components/AnimatedMesh";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { images, portfolio } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const spanClasses = {
  lg: "sm:col-span-2 sm:row-span-2 sm:aspect-auto sm:min-h-[480px]",
  sm: "sm:col-span-1 sm:aspect-[4/5]",
  md: "sm:col-span-1 sm:aspect-[4/5]",
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
        className="object-cover opacity-25"
        aria-hidden
      />
      <AnimatedMesh rgb="107, 158, 143" rgb2="184, 219, 212" />
      <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/50 via-forest-deep/85 to-forest-deep" />
      <div className="bg-grid absolute inset-0 opacity-25" />

      <div className="container-wide relative z-10 px-5 pb-20 pt-32 md:px-8 md:pb-24 md:pt-40 lg:px-12">
        <ScrollReveal className="max-w-2xl">
          <SectionLabel dark>{portfolio.label}</SectionLabel>
          <h1 className="font-display text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
            {portfolio.headline}
          </h1>
          <p className="mt-6 font-serif text-lg text-white/60 md:text-xl">
            Campaigns, content, and digital experiences crafted for real brands.
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
      transition={{ duration: 0.6, delay: index * 0.08, ease }}
      className={cn(
        "group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-2xl",
        spanClasses[item.span],
      )}
    >
      <motion.div
        className="relative h-full w-full"
        whileHover={reduceMotion ? undefined : { scale: 1.02 }}
        transition={{ duration: 0.45, ease }}
      >
        <Image
          src={item.image}
          alt={`${item.title} — ${item.category} project`}
          fill
          quality={60}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/30 to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-95" />

        <motion.div
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowUpRight size={20} className="text-white" />
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 translate-y-1 p-6 transition-transform duration-500 group-hover:translate-y-0">
          <span className="inline-block rounded-full bg-sage/30 px-3 py-1 font-sans text-xs font-medium uppercase tracking-wider text-sage-light backdrop-blur-sm">
            {item.category}
          </span>
          <h3 className="mt-3 font-sans text-xl font-semibold text-white md:text-2xl">
            {item.title}
          </h3>
        </div>
      </motion.div>
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
          standalone && "!pt-12",
        )}
      >
        <div className="bg-dots absolute inset-0 opacity-40" />

        <div className="container-wide relative">
          {!standalone && (
            <ScrollReveal>
              <SectionLabel>{portfolio.label}</SectionLabel>
              <h2 className="font-display text-3xl font-bold tracking-tight text-forest-deep md:text-5xl">
                {portfolio.headline}
              </h2>
              <p className="mt-4 max-w-xl font-serif text-grey-muted">
                Campaigns, content, and digital experiences crafted for real brands.
              </p>
            </ScrollReveal>
          )}

          {standalone && (
            <ScrollReveal className="mb-12">
              <p className="font-sans text-sm font-semibold uppercase tracking-[0.2em] text-sage">
                Selected work
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold text-forest-deep md:text-3xl">
                Projects across every channel
              </h2>
            </ScrollReveal>
          )}

          <div
            className={cn(
              "grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5",
              !standalone && "mt-14",
            )}
          >
            {portfolio.items.map((item, i) => (
              <PortfolioCard key={item.title} item={item} index={i} />
            ))}
          </div>

          {!standalone && (
            <ScrollReveal delay={160} className="mt-12 text-center">
              <Button href="/portfolio" variant="ghost" size="md">
                Explore full portfolio
                <ArrowUpRight size={16} />
              </Button>
            </ScrollReveal>
          )}
        </div>
      </section>
    </>
  );
}
