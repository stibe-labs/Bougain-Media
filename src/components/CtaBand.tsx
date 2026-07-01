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
        quality={60}
        sizes="100vw"
        className="object-cover"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-br from-forest-deep/95 via-forest-dark/90 to-forest-deep/95" />
      <div className="bg-grid absolute inset-0 opacity-30" />

      <motion.div
        className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sage/10 blur-3xl"
        animate={reduceMotion ? undefined : { scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-wide relative z-10 text-center">
        <ScrollReveal>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            {ctaBand.headline}
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-serif text-lg text-white/60">
            {ctaBand.subheadline}
          </p>
          <motion.div
            className="mt-10 flex flex-wrap justify-center gap-4"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
          >
            <Button href="/#contact" variant="primary" size="lg">
              Get a Free Consultation
              <ArrowRight size={18} />
            </Button>
            <Button
              href={contact.whatsappHref}
              variant="outline"
              size="lg"
              className="!border-whatsapp/40 hover:!bg-whatsapp/15"
            >
              WhatsApp Us
            </Button>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
