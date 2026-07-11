"use client";

import { motion } from "framer-motion";
import { Layers } from "lucide-react";

export function AnimatedAnalytics() {
  return (
    <div className="flex h-full w-full flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-emerald-accent/15 px-2 py-0.5 font-sans text-[8px] font-semibold uppercase tracking-wider text-emerald-accent">
          Design
        </span>
        <span className="font-sans text-[8px] text-white/40">Ad creatives</span>
      </div>

      <div className="grid grid-cols-3 gap-2 rounded-xl border border-white/10 bg-[#0a2e24]/60 p-2.5">
        <div>
          <p className="font-sans text-[8px] text-white/40">Creatives</p>
          <p className="font-sans text-[11px] font-semibold text-white/90">900+</p>
        </div>
        <div>
          <p className="font-sans text-[8px] text-white/40">Campaigns</p>
          <p className="font-sans text-[11px] font-semibold text-white/90">120+</p>
        </div>
        <div>
          <p className="font-sans text-[8px] text-white/40">CTR lift</p>
          <p className="font-sans text-[11px] font-semibold text-emerald-accent">3.9×</p>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0a2e24]/60 px-2.5 py-2">
        <div className="flex items-center gap-1.5">
          <Layers size={10} className="text-emerald-accent/70" />
          <span className="font-sans text-[8px] text-white/50">Multi-format · A/B testing</span>
        </div>
        <motion.span
          className="font-sans text-[8px] font-medium text-emerald-accent"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Winner: B
        </motion.span>
      </div>
    </div>
  );
}
