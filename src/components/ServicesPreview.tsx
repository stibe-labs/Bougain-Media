"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { services } from "@/lib/constants";

export function ServicesPreview() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-forest-deep section-padding text-white">
      {/* Background accents */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[45rem] w-[45rem] -translate-x-1/2 rounded-full bg-sage/10 blur-[140px]" aria-hidden />
      <div className="bg-grid absolute inset-0 opacity-15" aria-hidden />
      <div className="grain-texture absolute inset-0" aria-hidden />

      <div className="container-wide relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end mb-12 md:mb-16">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-sage-light">
              {services.label}
            </p>
            <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
              {services.headline}
            </h2>
          </motion.div>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-md font-sans text-base leading-relaxed text-white/70 md:text-lg"
          >
            {services.subtitle}
          </motion.p>
        </div>

        {/* 3-Column Service Card Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {services.items.map((service, i) => (
            <motion.div
              key={service.title}
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl bg-white/[0.06] border border-white/10 backdrop-blur-md transition-all duration-500 hover:border-sage/40 hover:bg-white/[0.09] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            >
              {/* Card Image Area */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  quality={85}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
              <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                <div>
                  <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-white/70">
                    {service.description}
                  </p>

                  <div className="my-6 h-px w-full bg-white/10" />

                  {/* Feature Checklist */}
                  <div className="space-y-3">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <Check size={16} className="text-sage shrink-0" />
                        <span className="font-sans text-xs font-medium text-white/85 sm:text-sm">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Explore Link */}
                <div className="mt-8 border-t border-white/10 pt-6">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-white transition-colors hover:text-sage-light"
                  >
                    <span>Explore service</span>
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
