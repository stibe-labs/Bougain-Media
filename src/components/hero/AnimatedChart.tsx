"use client";

import { motion } from "framer-motion";

const chartLine = "M0,48 L24,42 L48,36 L72,28 L96,20 L120,14 L144,8 L168,2";

function Metric({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-sans text-[8px] uppercase tracking-wider text-white/40">{label}</span>
      <span className={`font-sans text-[11px] font-semibold tabular-nums ${accent ? "text-emerald-accent" : "text-white/90"}`}>
        {value}
      </span>
    </div>
  );
}

export function AnimatedChart() {
  return (
    <div className="flex h-full w-full flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="rounded-full bg-emerald-accent/15 px-2 py-0.5 font-sans text-[8px] font-semibold uppercase tracking-wider text-emerald-accent">
            Paid Growth
          </span>
        </div>
        <span className="rounded-full bg-white/8 px-2 py-0.5 font-sans text-[8px] text-white/50">
          Live
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 rounded-xl border border-white/10 bg-[#0a2e24]/60 p-2.5">
        <Metric label="Campaigns" value="250+" />
        <Metric label="Reach" value="500M+" />
        <Metric label="ROAS" value="3.2×" accent />
      </div>

      <div className="flex flex-wrap gap-1">
        {["Meta Ads", "Google Ads", "WhatsApp", "Email"].map((channel) => (
          <span
            key={channel}
            className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-sans text-[7px] text-white/55"
          >
            {channel}
          </span>
        ))}
      </div>

      <div className="relative flex-1 overflow-hidden rounded-xl border border-white/10 bg-[#0a2e24]/60 p-2">
        <div className="mb-1 flex items-center justify-between">
          <span className="font-sans text-[8px] text-white/40">Conversion trend</span>
          <motion.span
            className="font-sans text-[9px] font-medium text-emerald-accent"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            +32%
          </motion.span>
        </div>
        <svg viewBox="0 0 168 52" className="h-full w-full" preserveAspectRatio="none" aria-hidden>
          <defs>
            <linearGradient id="perfChartFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(110,235,131,0.3)" />
              <stop offset="100%" stopColor="rgba(110,235,131,0)" />
            </linearGradient>
          </defs>
          <motion.path
            d={`${chartLine} L168,52 L0,52 Z`}
            fill="url(#perfChartFill)"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.path
            d={chartLine}
            stroke="#6eeb83"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </svg>
      </div>
    </div>
  );
}
