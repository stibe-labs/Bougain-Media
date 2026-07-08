import { Mail } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { careers, contact } from "@/lib/constants";

export function CareersCtaBand() {
  return (
    <section className="relative overflow-hidden bg-forest-deep section-padding">
      <div className="bg-grid absolute inset-0 opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-r from-sage/10 via-transparent to-sage/5" />

      <div className="container-wide relative text-center">
        <ScrollReveal>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
            {careers.ctaBand.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-sans text-lg text-white/60">
            {careers.ctaBand.subheadline}
          </p>
          <Button href={`mailto:${contact.email}`} variant="primary" size="lg" className="mt-8">
            <Mail size={18} />
            {contact.email}
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
