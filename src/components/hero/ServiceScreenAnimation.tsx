"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Heart, Play, Sparkles, TrendingUp, Zap } from "lucide-react";

const ease = [0.32, 0.72, 0, 1] as [number, number, number, number];

function AmbientBg() {
  return (
    <>
      <div className="absolute inset-0 bg-grid opacity-[0.15]" aria-hidden />
      <motion.div
        className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-accent/10 blur-[50px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
    </>
  );
}

function ContentAnimation() {
  const lines = ["Strategy", "Storytelling", "Creative"];
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <AmbientBg />
      <div className="relative z-10 space-y-3 px-8">
        {lines.map((line, i) => (
          <motion.div
            key={line}
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.4, duration: 0.6, ease }}
          >
            <Sparkles size={14} className="text-emerald-accent/60" />
            <motion.span
              className="font-hero text-lg font-bold uppercase tracking-tight text-white/80"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
            >
              {line}
            </motion.span>
            <motion.div
              className="h-px flex-1 max-w-[80px] bg-emerald-accent/40"
              animate={{ scaleX: [0, 1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
              style={{ originX: 0 }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function VideoAnimation() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-6 px-8">
      <AmbientBg />
      <motion.div
        className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-accent/30 bg-emerald-accent/10"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Play size={24} className="ml-1 fill-emerald-accent text-emerald-accent" />
      </motion.div>
      <div className="relative z-10 w-full max-w-[220px]">
        <div className="mb-2 flex justify-between">
          {["Script", "Shoot", "Edit", "Deliver"].map((s, i) => (
            <span key={s} className="font-sans text-[8px] text-white/35">
              {s}
            </span>
          ))}
        </div>
        <div className="relative h-2 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-emerald-accent"
            animate={{ width: ["0%", "100%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <motion.div
          className="absolute top-6 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-white bg-emerald-accent shadow-[0_0_12px_rgba(110,235,131,0.6)]"
          animate={{ left: ["0%", "100%", "0%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}

function VisualAdsAnimation() {
  const formats = [
    { w: "w-14", h: "h-14", delay: 0 },
    { w: "w-10", h: "h-16", delay: 0.2 },
    { w: "w-20", h: "h-11", delay: 0.4 },
  ];
  return (
    <div className="relative flex h-full w-full items-center justify-center gap-4 px-6">
      <AmbientBg />
      {formats.map((f, i) => (
        <motion.div
          key={i}
          className={`relative z-10 ${f.w} ${f.h} rounded-lg border border-emerald-accent/25 bg-gradient-to-br from-emerald-accent/20 to-transparent`}
          animate={{ y: [0, -8, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: f.delay }}
        />
      ))}
      <motion.div
        className="absolute z-10 font-sans text-[10px] font-medium text-emerald-accent"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ bottom: "28%" }}
      >
        CTR ↑
      </motion.div>
    </div>
  );
}

function SocialAnimation() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <AmbientBg />
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-emerald-accent/20"
          style={{
            width: 60 + i * 40,
            height: 60 + i * 40,
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}
      <motion.div
        animate={{ scale: [1, 1.25, 1] }}
        transition={{ duration: 1.2, repeat: Infinity }}
        className="relative z-10"
      >
        <Heart size={32} className="fill-emerald-accent/50 text-emerald-accent" />
      </motion.div>
      <motion.div
        className="absolute bottom-[28%] flex gap-3"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {[12, 18, 14, 20, 16].map((h, i) => (
          <motion.div
            key={i}
            className="w-1 rounded-full bg-emerald-accent/50"
            animate={{ height: [h * 0.5, h, h * 0.5] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1 }}
            style={{ height: h }}
          />
        ))}
      </motion.div>
    </div>
  );
}

function BrandAnimation() {
  const colors = ["#6eeb83", "#6b9e8f", "#b8dbd4", "#0f3d2e"];
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-5 px-8">
      <AmbientBg />
      <motion.div
        className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/15 bg-emerald-accent/10"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="font-hero text-3xl font-black text-emerald-accent">B</span>
      </motion.div>
      <div className="relative z-10 flex gap-2">
        {colors.map((c, i) => (
          <motion.div
            key={c}
            className="h-5 w-8 rounded-md"
            style={{ backgroundColor: c }}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  );
}

function PerformanceAnimation() {
  const bars = [35, 55, 45, 70, 60, 85];
  const line = "M0,40 L30,35 L60,38 L90,25 L120,28 L150,15 L180,10";
  return (
    <div className="relative flex h-full w-full items-end justify-center gap-2 px-10 pb-16 pt-8">
      <AmbientBg />
      <div className="relative z-10 flex h-full w-full max-w-[200px] flex-col justify-end">
        <div className="mb-3 flex items-center gap-2">
          <TrendingUp size={14} className="text-emerald-accent" />
          <motion.span
            className="font-sans text-xs font-semibold text-emerald-accent"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            3.2× ROAS
          </motion.span>
        </div>
        <div className="flex h-24 items-end justify-center gap-1.5">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="w-4 rounded-t-sm bg-emerald-accent/40"
              animate={{ height: [`${h * 0.4}%`, `${h}%`, `${h * 0.4}%`] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.12 }}
            />
          ))}
        </div>
        <svg viewBox="0 0 180 44" className="mt-2 h-10 w-full" aria-hidden>
          <motion.path
            d={line}
            stroke="#6eeb83"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
      <motion.div
        className="absolute right-8 top-8 z-10"
        animate={{ rotate: [0, 15, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Zap size={20} className="text-emerald-accent/50" />
      </motion.div>
    </div>
  );
}

const animations: Record<string, () => ReactNode> = {
  content: ContentAnimation,
  video: VideoAnimation,
  "visual-ads": VisualAdsAnimation,
  social: SocialAnimation,
  "brand-shoots": BrandAnimation,
  performance: PerformanceAnimation,
};

export function ServiceScreenAnimation({ serviceId }: { serviceId: string }) {
  const Component = animations[serviceId] ?? ContentAnimation;
  return <Component />;
}
