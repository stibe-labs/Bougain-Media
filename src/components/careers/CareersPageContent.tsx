"use client";

import Image from "next/image";
import { useState } from "react";
import { Mail } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { BrandWatermark } from "@/components/BrandWatermark";
import { CareersWhyJoin } from "@/components/careers/CareersWhyJoin";
import { CareersCtaBand } from "@/components/careers/CareersCtaBand";
import { Button } from "@/components/ui/Button";
import { careers, contact, images } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function CareersPageContent() {
  const [activeFilter, setActiveFilter] = useState("All");
  const openJobs: never[] = [];

  return (
    <>
      <section className="grain-texture relative overflow-hidden bg-cream section-padding !pt-36 md:!pt-44">
        <div className="bg-mesh absolute inset-0" />
        <BrandWatermark className="right-8 top-24 md:right-20" size="lg" opacity={0.06} />
        <div className="container-wide relative text-center">
          <ScrollReveal>
            <SectionLabel className="text-center">Careers</SectionLabel>
            <h1 className="font-display text-4xl font-bold tracking-tight text-forest-deep md:text-6xl">
              {careers.headline}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-serif text-lg leading-relaxed text-grey-muted">
              {careers.subheadline}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-white section-padding !pt-0">
        <div className="container-wide">
          <ScrollReveal>
            <h2 className="font-sans text-sm font-semibold uppercase tracking-wider text-sage">
              Open Positions
            </h2>

            <div className="mt-6 flex flex-wrap gap-2">
              {careers.filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "rounded-full border px-4 py-2 font-sans text-xs font-medium uppercase tracking-wider transition-all duration-200",
                    activeFilter === filter
                      ? "border-forest-deep bg-forest-deep text-white"
                      : "border-forest-deep/15 bg-cream text-forest-deep/70 hover:border-sage/40 hover:text-forest-deep",
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
          </ScrollReveal>

          <div className="mt-10">
            {openJobs.length === 0 ? (
              <ScrollReveal delay={100}>
                <AnimatedCard className="overflow-hidden border-dashed p-0">
                  <div className="grid items-center gap-0 lg:grid-cols-2">
                    <div className="px-8 py-12 text-center lg:px-12 lg:py-16 lg:text-left">
                      <p className="font-sans text-sm font-semibold uppercase tracking-wider text-sage">
                        We&apos;re hiring talent
                      </p>
                      <p className="mx-auto mt-4 max-w-lg font-serif text-lg leading-relaxed text-grey-muted lg:mx-0">
                        {careers.emptyState}
                      </p>
                      <Button
                        href={`mailto:${contact.email}`}
                        className="mt-8"
                        variant="primary"
                      >
                        <Mail size={16} />
                        Send Your Resume
                      </Button>
                    </div>

                    <div className="relative aspect-[4/3] min-h-[280px] border-t border-forest-deep/8 lg:aspect-auto lg:min-h-[360px] lg:border-l lg:border-t-0">
                      <Image
                        src={images.careers}
                        alt="Bougain Media team collaborating in a creative workspace"
                        fill
                        quality={75}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover object-center"
                      />
                    </div>
                  </div>
                </AnimatedCard>
              </ScrollReveal>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Job cards from Supabase — filtered by {activeFilter} */}
              </div>
            )}
          </div>
        </div>
      </section>

      <CareersWhyJoin />
      <CareersCtaBand />
    </>
  );
}
