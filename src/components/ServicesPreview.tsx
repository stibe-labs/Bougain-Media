import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/constants";

export function ServicesPreview() {
  const featured = services.items.slice(0, 3);

  return (
    <section className="content-auto bg-forest-deep section-padding">
      <div className="container-wide">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <ScrollReveal>
            <SectionLabel dark>{services.label}</SectionLabel>
            <h2 className="max-w-lg font-sans text-3xl font-bold tracking-tight text-white md:text-4xl">
              Full-funnel digital marketing
            </h2>
            <p className="mt-4 max-w-md text-white/60">
              From paid ads to organic growth — we handle every channel that
              drives results.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <Button href="/services" variant="secondary" size="md">
              View all services
              <ArrowRight size={16} />
            </Button>
          </ScrollReveal>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {featured.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 80}>
              <div className="glass group rounded-2xl p-6 transition-all duration-300 hover:bg-white/10">
                <span className="font-sans text-xs font-semibold uppercase tracking-wider text-sage">
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-sans text-lg font-semibold capitalize text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  {service.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={200} className="mt-10 text-center md:hidden">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-sage hover:text-sage-light"
          >
            View all services
            <ArrowRight size={16} />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
