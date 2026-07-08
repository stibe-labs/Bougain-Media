"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { contact, ctaBand, images } from "@/lib/constants";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function CtaBand() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden section-padding">
      <Image
        src={images.cta}
        alt=""
        fill
        quality={75}
        sizes="100vw"
        className="object-cover"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-br from-forest-deep/95 via-forest-dark/92 to-forest-deep/95" />
      <div className="bg-grid absolute inset-0 opacity-20" />
      <div className="grain-texture absolute inset-0" />

      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sage/15 blur-3xl max-md:hidden"
        animate={
          reduceMotion
            ? undefined
            : { scale: [1, 1.12, 1], opacity: [0.25, 0.45, 0.25] }
        }
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <div className="container-wide relative z-10 text-center">
        <ScrollReveal>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {ctaBand.headline}
          </h2>
          <p className="mx-auto mt-6 max-w-lg font-sans text-base leading-relaxed text-white/55 md:text-lg">
            {ctaBand.subheadline}
          </p>
          <motion.div
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
          >
            <Button href="/contact" variant="primary" size="lg" className="!bg-white !text-forest-deep hover:!bg-sage-light">
              Get a Free Consultation
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover/btn:translate-x-1"
              />
            </Button>
            <Button
              href={contact.whatsappHref}
              variant="outline"
              size="lg"
              className="!border-whatsapp/35 hover:!bg-whatsapp/10"
            >
              WhatsApp Us
            </Button>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
