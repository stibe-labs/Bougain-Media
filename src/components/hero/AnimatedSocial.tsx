"use client";

import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import { motion } from "framer-motion";

const calendarDays = ["M", "T", "W", "T", "F", "S", "S"];
const scheduled = [1, 3, 4, 6];

export function AnimatedSocial() {
  return (
    <div className="flex h-full w-full flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-emerald-accent/15 px-2 py-0.5 font-sans text-[8px] font-semibold uppercase tracking-wider text-emerald-accent">
          Social
        </span>
        <span className="font-sans text-[8px] text-white/40">Content calendar</span>
      </div>

      <div className="grid grid-cols-3 gap-2 rounded-xl border border-white/10 bg-[#0a2e24]/60 p-2.5">
        <div>
          <p className="font-sans text-[8px] text-white/40">Accounts</p>
          <p className="font-sans text-[11px] font-semibold text-white/90">180+</p>
        </div>
        <div>
          <p className="font-sans text-[8px] text-white/40">Reach</p>
          <p className="font-sans text-[11px] font-semibold text-white/90">2M+</p>
        </div>
        <div>
          <p className="font-sans text-[8px] text-white/40">Engagement</p>
          <p className="font-sans text-[11px] font-semibold text-emerald-accent">4.8×</p>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#0a2e24]/60 p-2.5">
        <p className="mb-2 font-sans text-[8px] font-medium text-white/50">March publishing plan</p>
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day) => (
            <span key={day} className="text-center font-sans text-[6px] text-white/30">
              {day}
            </span>
          ))}
          {Array.from({ length: 7 }).map((_, i) => (
            <motion.div
              key={i}
              className={`flex h-5 items-center justify-center rounded-md ${
                scheduled.includes(i)
                  ? "bg-emerald-accent/25 border border-emerald-accent/30"
                  : "bg-white/5"
              }`}
              animate={scheduled.includes(i) ? { opacity: [0.6, 1, 0.6] } : undefined}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
            >
              {scheduled.includes(i) && (
                <span className="h-1 w-1 rounded-full bg-emerald-accent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0a2e24]/60 px-2.5 py-2">
        <div className="flex items-center gap-2">
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
            <Heart size={12} className="fill-emerald-accent text-emerald-accent" />
          </motion.div>
          <MessageCircle size={11} className="text-white/50" />
          <Send size={11} className="text-white/50" />
        </div>
        <div className="text-right">
          <p className="font-sans text-[8px] text-white/40">Community</p>
          <p className="font-sans text-[9px] font-medium text-white/70">Active</p>
        </div>
        <Bookmark size={11} className="text-white/50" />
      </div>
    </div>
  );
}
