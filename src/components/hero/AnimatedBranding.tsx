"use client";

import { motion } from "framer-motion";
import { Camera, MapPin } from "lucide-react";

export function AnimatedBranding() {
  return (
    <div className="flex h-full w-full flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-emerald-accent/15 px-2 py-0.5 font-sans text-[8px] font-semibold uppercase tracking-wider text-emerald-accent">
          Branding
        </span>
        <span className="font-sans text-[8px] text-white/40">Shoot planner</span>
      </div>

      <div className="grid grid-cols-3 gap-2 rounded-xl border border-white/10 bg-[#0a2e24]/60 p-2.5">
        <div>
          <p className="font-sans text-[8px] text-white/40">Shoots</p>
          <p className="font-sans text-[11px] font-semibold text-white/90">120+</p>
        </div>
        <div>
          <p className="font-sans text-[8px] text-white/40">Visuals</p>
          <p className="font-sans text-[11px] font-semibold text-white/90">2.5K+</p>
        </div>
        <div>
          <p className="font-sans text-[8px] text-white/40">Satisfaction</p>
          <p className="font-sans text-[11px] font-semibold text-emerald-accent">96%</p>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#0a2e24]/60 p-2.5">
        <Camera size={12} className="shrink-0 text-emerald-accent/70" />
        <div className="min-w-0 flex-1">
          <p className="font-sans text-[9px] font-medium text-white/80">Brand identity shoot</p>
          <div className="mt-1 flex items-center gap-1.5">
            <MapPin size={9} className="text-white/40" />
            <span className="font-sans text-[7px] text-white/45">Studio or on-location</span>
          </div>
        </div>
        <motion.div
          className="flex gap-1"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {["Select", "Deliver"].map((step) => (
            <span
              key={step}
              className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-sans text-[7px] text-white/50"
            >
              {step}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
