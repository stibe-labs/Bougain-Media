"use client";

import { motion } from "framer-motion";
import { PenLine } from "lucide-react";

const drafts = [
  { platform: "Instagram", copy: "Your growth, our grind." },
  { platform: "LinkedIn", copy: "Strategy meets storytelling." },
];

export function AnimatedBrowser() {
  return (
    <div className="flex h-full w-full flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-emerald-accent/15 px-2 py-0.5 font-sans text-[8px] font-semibold uppercase tracking-wider text-emerald-accent">
          Creative
        </span>
        <span className="font-sans text-[8px] text-white/40">Content studio</span>
      </div>

      <div className="grid grid-cols-3 gap-2 rounded-xl border border-white/10 bg-[#0a2e24]/60 p-2.5">
        <div>
          <p className="font-sans text-[8px] text-white/40">Assets</p>
          <p className="font-sans text-[11px] font-semibold text-white/90">1.2K+</p>
        </div>
        <div>
          <p className="font-sans text-[8px] text-white/40">Brands</p>
          <p className="font-sans text-[11px] font-semibold text-white/90">40+</p>
        </div>
        <div>
          <p className="font-sans text-[8px] text-white/40">Retention</p>
          <p className="font-sans text-[11px] font-semibold text-emerald-accent">98%</p>
        </div>
      </div>

      <div className="flex-1 space-y-1.5 rounded-xl border border-white/10 bg-[#0a2e24]/60 p-2.5">
        <div className="mb-1 flex items-center gap-1.5">
          <PenLine size={10} className="text-emerald-accent/70" />
          <span className="font-sans text-[8px] font-medium text-white/50">Brand-first copy</span>
        </div>
        {drafts.map((draft, i) => (
          <motion.div
            key={draft.platform}
            className="rounded-lg border border-white/8 bg-white/5 p-2"
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.4, duration: 0.4 }}
          >
            <p className="font-sans text-[7px] font-medium text-emerald-accent/70">{draft.platform}</p>
            <p className="mt-0.5 font-sans text-[8px] text-white/70">{draft.copy}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
