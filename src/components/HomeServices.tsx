"use client";

import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ServicePill } from "@/components/ui/ServicePill";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/constants";
import { ScrollReveal } from "@/components/ScrollReveal";

export function HomeServices() {
  return (
    <section
      id="services"
      className="grain-texture content-auto relative overflow-hidden bg-cream-textured section-padding"
    >
      <div className="bg-mesh absolute inset-0" />

      <div className="container-wide relative">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <SectionLabel className="text-center">{services.label}</SectionLabel>
          <h2 className="font-display text-4xl font-bold tracking-tight text-forest-deep md:text-6xl">
            {services.headline}
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-sans text-lg text-grey-muted">
            {services.subtitle}
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((service, i) => (
            <ServicePill
              key={service.title}
              title={service.title}
              description={service.description}
              tag={service.tag}
              index={i}
            />
          ))}
        </div>

        <ScrollReveal delay={120} className="mt-12 text-center">
          <Button href="/services" variant="ghost" size="md">
            Explore all services
            <ArrowRight size={16} />
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
