"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calculator, Check, ArrowRight, Sparkles, RefreshCw } from "lucide-react";
import { services } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function ServiceEstimator() {
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "Video Production",
    "Performance Marketing",
  ]);

  const toggleService = (title: string) => {
    if (selectedServices.includes(title)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== title));
      }
    } else {
      setSelectedServices([...selectedServices, title]);
    }
  };

  const contactUrl = `/contact?services=${encodeURIComponent(
    selectedServices.join(", "),
  )}`;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-forest-deep/10 bg-white/90 p-6 backdrop-blur-xl sm:p-8 md:p-12 shadow-[0_24px_80px_rgba(15,61,46,0.08)]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-sage/30 bg-sage/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-forest-deep">
            <Calculator className="h-3.5 w-3.5 text-sage" />
            <span>Interactive Scope Builder</span>
          </div>
          <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-forest-deep sm:text-3xl md:text-4xl">
            Build your custom growth stack
          </h3>
          <p className="mt-2 font-sans text-sm text-grey-muted md:text-base">
            Select the capabilities your brand needs right now. We will craft a tailored strategy and execution roadmap.
          </p>
        </div>

        <button
          onClick={() =>
            setSelectedServices(["Video Production", "Performance Marketing"])
          }
          className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-sage hover:text-forest-deep transition-colors"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Reset selection</span>
        </button>
      </div>

      {/* Service Checkbox Grid */}
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {services.items.map((service) => {
          const isSelected = selectedServices.includes(service.title);
          return (
            <button
              key={service.title}
              onClick={() => toggleService(service.title)}
              type="button"
              className={cn(
                "group relative flex items-start justify-between rounded-2xl border p-4 text-left transition-all duration-300",
                isSelected
                  ? "border-forest-deep bg-forest-deep text-white shadow-lg shadow-forest-deep/15 scale-[1.01]"
                  : "border-forest-deep/10 bg-white text-forest-deep hover:border-sage/40 hover:bg-forest-deep/[0.02]",
              )}
            >
              <div className="space-y-1">
                <span
                  className={cn(
                    "font-sans text-[10px] font-bold uppercase tracking-wider",
                    isSelected ? "text-sage-light" : "text-sage",
                  )}
                >
                  {service.tag}
                </span>
                <p
                  className={cn(
                    "font-sans text-base font-bold transition-colors",
                    isSelected ? "text-white" : "text-forest-deep",
                  )}
                >
                  {service.title}
                </p>
              </div>

              <div
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition-all duration-300",
                  isSelected
                    ? "border-sage bg-sage text-forest-deep"
                    : "border-forest-deep/20 bg-transparent text-transparent group-hover:border-forest-deep/40",
                )}
              >
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Summary & Direct Action Banner */}
      <div className="mt-8 flex flex-col gap-6 rounded-2xl border border-sage/30 bg-gradient-to-br from-forest-deep/5 via-forest-deep/10 to-forest-deep/5 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="font-sans text-xs font-semibold uppercase tracking-wider text-sage">
            Selected Capabilities ({selectedServices.length})
          </span>
          <p className="mt-1 font-sans text-sm font-semibold text-forest-deep md:text-base">
            {selectedServices.join(" • ")}
          </p>
        </div>

        <Link
          href={contactUrl}
          className="group inline-flex items-center justify-center gap-2.5 rounded-2xl bg-forest-deep px-6 py-3.5 font-sans text-sm font-bold text-white shadow-xl shadow-forest-deep/20 transition-all duration-300 hover:bg-forest-hover hover:scale-[1.02] shrink-0"
        >
          <Sparkles className="h-4 w-4 text-sage-light" />
          <span>Request Customized Proposal</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
