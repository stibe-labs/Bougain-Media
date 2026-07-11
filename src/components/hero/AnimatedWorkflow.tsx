"use client";

import { motion } from "framer-motion";
import { Clapperboard, Film, Scissors } from "lucide-react";

const timelineClips = [
  { label: "Script", width: "22%" },
  { label: "Shoot", width: "34%" },
  { label: "Edit", width: "28%" },
  { label: "Delivery", width: "16%" },
];

export function AnimatedWorkflow() {
  return (
    <div className="flex h-full w-full flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-emerald-accent/15 px-2 py-0.5 font-sans text-[8px] font-semibold uppercase tracking-wider text-emerald-accent">
          Video
        </span>
        <span className="font-sans text-[8px] text-white/40">Campaign film</span>
      </div>

      <div className="grid grid-cols-3 gap-2 rounded-xl border border-white/10 bg-[#0a2e24]/60 p-2.5">
        <div>
          <p className="font-sans text-[8px] text-white/40">Videos</p>
          <p className="font-sans text-[11px] font-semibold text-white/90">300+</p>
        </div>
        <div>
          <p className="font-sans text-[8px] text-white/40">Films</p>
          <p className="font-sans text-[11px] font-semibold text-white/90">50+</p>
        </div>
        <div>
          <p className="font-sans text-[8px] text-white/40">On-time</p>
          <p className="font-sans text-[11px] font-semibold text-emerald-accent">95%</p>
        </div>
      </div>

      <div className="flex-1 rounded-xl border border-white/10 bg-[#0a2e24]/60 p-2.5">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Clapperboard size={10} className="text-emerald-accent/70" />
            <span className="font-sans text-[8px] text-white/50">Production timeline</span>
          </div>
          <Film size={10} className="text-white/30" />
        </div>

        <div className="mb-2 flex h-8 overflow-hidden rounded-lg bg-black/30">
          {timelineClips.map((clip, i) => (
            <motion.div
              key={clip.label}
              className="flex items-center justify-center border-r border-white/10 bg-emerald-accent/15"
              style={{ width: clip.width }}
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
            >
              <span className="font-sans text-[6px] text-white/50">{clip.label}</span>
            </motion.div>
          ))}
        </div>

        <div className="relative h-1 overflow-hidden rounded-full bg-white/8">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-emerald-accent"
            animate={{ width: ["0%", "72%", "72%", "0%"], left: ["0%", "0%", "0%", "0%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="mt-2 flex items-center gap-2">
          <Scissors size={10} className="text-emerald-accent/60" />
          <motion.p
            className="font-sans text-[8px] text-white/50"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Editing & motion in progress
          </motion.p>
        </div>
      </div>
    </div>
  );
}
