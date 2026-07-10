"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  BarChart3,
  Clapperboard,
  Instagram,
  MessageCircle,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { logos } from "@/lib/constants";

export interface MousePosition {
  x: number;
  y: number;
}

interface DashboardCardConfig {
  id: string;
  title: string;
  icon: LucideIcon;
  iconColor: string;
  x: number;
  y: number;
  z: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  floatDuration: number;
  floatDelay: number;
  Visual: () => ReactNode;
}

const CENTER = { x: 50, y: 50 };

const platformIcons = [
  { id: "meta", label: "M", x: 38, y: 32, color: "#4d9cf8" },
  { id: "ig", label: "IG", x: 68, y: 28, color: "#e879a8" },
  { id: "google", label: "G", x: 72, y: 58, color: "#6eeb83" },
  { id: "wa", label: "WA", x: 28, y: 62, color: "#25d366" },
  { id: "ai", label: "AI", x: 50, y: 72, color: "#b8dbd4" },
];

function MetaVisual() {
  return (
    <div className="flex h-10 items-end gap-0.5">
      {[40, 65, 50, 80, 55].map((h, i) => (
        <motion.div
          key={i}
          className="w-1.5 rounded-sm bg-[#4d9cf8]/70"
          animate={{ height: [`${h * 0.35}%`, `${h}%`, `${h * 0.35}%`] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

function GoogleVisual() {
  return (
    <svg viewBox="0 0 80 28" className="h-9 w-full" aria-hidden>
      <motion.path
        d="M0,22 L20,16 L40,18 L60,10 L80,6"
        stroke="#6eeb83"
        strokeWidth="1.75"
        fill="none"
        strokeLinecap="round"
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </svg>
  );
}

function InstagramVisual() {
  return (
    <div className="flex items-center gap-2">
      <motion.div
        className="h-7 w-7 rounded-full border-2 border-[#e879a8]/60"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <div className="space-y-1">
        <div className="h-1 w-10 rounded-full bg-white/30" />
        <div className="h-1 w-6 rounded-full bg-white/18" />
      </div>
    </div>
  );
}

function WhatsAppVisual() {
  return (
    <div className="space-y-1.5">
      <motion.div
        className="h-2 w-full rounded-full bg-[#25d366]/35"
        animate={{ width: ["40%", "85%", "40%"] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
      <motion.div
        className="ml-2 h-2 w-2/3 rounded-full bg-[#25d366]/20"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
}

function AIVisual() {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="h-2 w-2 rounded-full bg-emerald-accent shadow-[0_0_6px_rgba(110,235,131,0.5)]"
          animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.25 }}
        />
      ))}
      <div className="ml-1 h-px w-8 bg-emerald-accent/40" />
    </div>
  );
}

function VideoVisual() {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-white/12">
      <motion.div
        className="h-full rounded-full bg-emerald-accent/60"
        animate={{ width: ["10%", "80%", "10%"] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </div>
  );
}

const dashboardCards: DashboardCardConfig[] = [
  {
    id: "meta",
    title: "Meta Ads",
    icon: BarChart3,
    iconColor: "text-[#4d9cf8]",
    x: 72,
    y: 16,
    z: 60,
    rotateX: -6,
    rotateY: 14,
    rotateZ: -5,
    floatDuration: 5.5,
    floatDelay: 0,
    Visual: MetaVisual,
  },
  {
    id: "google",
    title: "Google Ads",
    icon: TrendingUp,
    iconColor: "text-emerald-accent",
    x: 84,
    y: 48,
    z: 35,
    rotateX: 4,
    rotateY: -10,
    rotateZ: 3,
    floatDuration: 6.2,
    floatDelay: 0.4,
    Visual: GoogleVisual,
  },
  {
    id: "instagram",
    title: "Instagram",
    icon: Instagram,
    iconColor: "text-[#e879a8]",
    x: 70,
    y: 78,
    z: 50,
    rotateX: -8,
    rotateY: 8,
    rotateZ: -2,
    floatDuration: 5.8,
    floatDelay: 0.8,
    Visual: InstagramVisual,
  },
  {
    id: "whatsapp",
    title: "WhatsApp",
    icon: MessageCircle,
    iconColor: "text-[#25d366]",
    x: 30,
    y: 74,
    z: 45,
    rotateX: 6,
    rotateY: -12,
    rotateZ: 4,
    floatDuration: 6.5,
    floatDelay: 1.2,
    Visual: WhatsAppVisual,
  },
  {
    id: "ai",
    title: "AI Studio",
    icon: Sparkles,
    iconColor: "text-sage-light",
    x: 28,
    y: 44,
    z: 55,
    rotateX: -4,
    rotateY: 16,
    rotateZ: -6,
    floatDuration: 5.2,
    floatDelay: 0.6,
    Visual: AIVisual,
  },
  {
    id: "video",
    title: "Video",
    icon: Clapperboard,
    iconColor: "text-emerald-accent",
    x: 36,
    y: 16,
    z: 40,
    rotateX: 8,
    rotateY: -6,
    rotateZ: 5,
    floatDuration: 6.8,
    floatDelay: 1,
    Visual: VideoVisual,
  },
];

function HolographicCore({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
      style={{ transformStyle: "preserve-3d" }}
    >
      {[0, 45, 90, 135].map((deg) => (
        <motion.div
          key={deg}
          className="absolute left-1/2 top-1/2 h-px w-32 origin-left bg-gradient-to-r from-emerald-accent/40 to-transparent"
          style={{ rotate: `${deg}deg` }}
          animate={reduceMotion ? undefined : { opacity: [0.2, 0.55, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, delay: deg * 0.01 }}
          aria-hidden
        />
      ))}

      <motion.div
        className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-accent/15 blur-[50px]"
        animate={reduceMotion ? undefined : { scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="relative flex h-[104px] w-[104px] items-center justify-center rounded-full border border-emerald-accent/38 bg-white/[0.08] shadow-[0_0_70px_rgba(110,235,131,0.45)] backdrop-blur-md"
        animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src={logos.iconWhite}
          alt=""
          width={64}
          height={64}
          className="h-[52px] w-[52px] object-contain"
          priority
        />
      </motion.div>
    </div>
  );
}

function DataLines({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      {dashboardCards.map((card, i) => (
        <motion.line
          key={card.id}
          x1={CENTER.x}
          y1={CENTER.y}
          x2={card.x}
          y2={card.y}
          stroke="rgba(110,235,131,0.32)"
          strokeWidth="0.22"
          vectorEffect="non-scaling-stroke"
          animate={reduceMotion ? undefined : { opacity: [0.18, 0.5, 0.18] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </svg>
  );
}

function PlatformBadge({
  label,
  x,
  y,
  color,
  reduceMotion,
  parallaxX,
  parallaxY,
}: {
  label: string;
  x: number;
  y: number;
  color: string;
  reduceMotion: boolean | null;
  parallaxX: number;
  parallaxY: number;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute z-20 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/[0.08] text-[8px] font-bold backdrop-blur-md sm:h-8 sm:w-8 sm:text-[9px]"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        color,
        boxShadow: `0 0 20px ${color}44`,
        x: parallaxX * 0.4,
        y: parallaxY * 0.4,
      }}
      animate={
        reduceMotion
          ? undefined
          : { y: [0, -6, 0], opacity: [0.5, 0.9, 0.5] }
      }
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      {label}
    </motion.div>
  );
}

function FloatingDashboardCard({
  card,
  reduceMotion,
  parallaxX,
  parallaxY,
}: {
  card: DashboardCardConfig;
  reduceMotion: boolean | null;
  parallaxX: number;
  parallaxY: number;
}) {
  const { icon: Icon, Visual } = card;
  const depth = card.z / 60;

  return (
    <motion.div
      className="absolute z-10 w-[132px] -translate-x-1/2 -translate-y-1/2 cursor-default sm:w-[148px]"
      style={{
        left: `${card.x}%`,
        top: `${card.y}%`,
        transformStyle: "preserve-3d",
        zIndex: Math.round(card.z),
      }}
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -10, 0, 6, 0],
              rotateX: [card.rotateX, card.rotateX + 3, card.rotateX],
              rotateY: [card.rotateY, card.rotateY - 4, card.rotateY],
              rotateZ: [card.rotateZ, card.rotateZ + 2, card.rotateZ],
            }
      }
      transition={{
        duration: card.floatDuration,
        repeat: Infinity,
        delay: card.floatDelay,
        ease: "easeInOut",
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -14,
              scale: 1.06,
              rotateX: card.rotateX - 4,
              transition: { duration: 0.35 },
            }
      }
    >
      <motion.div
        style={{
          x: parallaxX * depth,
          y: parallaxY * depth,
          rotateX: card.rotateX,
          rotateY: card.rotateY,
          rotateZ: card.rotateZ,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="rounded-[20px] border border-white/20 bg-white/[0.11] p-3.5 shadow-[0_18px_52px_rgba(0,0,0,0.4),0_0_34px_rgba(110,235,131,0.16)] backdrop-blur-[20px] transition-shadow duration-300 hover:border-emerald-accent/38 hover:shadow-[0_22px_60px_rgba(0,0,0,0.44),0_0_42px_rgba(110,235,131,0.22)]">
          <div className="mb-2.5 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-accent/16 shadow-[0_0_14px_rgba(110,235,131,0.2)]">
              <Icon size={16} className={card.iconColor} strokeWidth={1.75} />
            </div>
            <span className="font-sans text-[10px] font-semibold uppercase leading-tight tracking-wider text-white/80 sm:text-[11px]">
              {card.title}
            </span>
          </div>
          <Visual />
        </div>
      </motion.div>
    </motion.div>
  );
}

interface CommandCenterAnimationProps {
  mouse?: MousePosition;
}

export function CommandCenterAnimation({ mouse = { x: 50, y: 50 } }: CommandCenterAnimationProps) {
  const reduceMotion = useReducedMotion();
  const parallaxX = reduceMotion ? 0 : (mouse.x - 50) * 0.35;
  const parallaxY = reduceMotion ? 0 : (mouse.y - 50) * 0.25;

  return (
    <div
      className="relative h-[500px] w-[min(560px,46vw)]"
      style={{ perspective: 1400, transformStyle: "preserve-3d" }}
      aria-hidden
    >
      <motion.div
        className="relative h-full w-full"
        style={{
          x: parallaxX * 0.15,
          y: parallaxY * 0.15,
          transformStyle: "preserve-3d",
        }}
      >
        <DataLines reduceMotion={reduceMotion} />
        <HolographicCore reduceMotion={reduceMotion} />

        {platformIcons.map((icon) => (
          <PlatformBadge
            key={icon.id}
            {...icon}
            reduceMotion={reduceMotion}
            parallaxX={parallaxX}
            parallaxY={parallaxY}
          />
        ))}

        {dashboardCards.map((card) => (
          <FloatingDashboardCard
            key={card.id}
            card={card}
            reduceMotion={reduceMotion}
            parallaxX={parallaxX}
            parallaxY={parallaxY}
          />
        ))}
      </motion.div>
    </div>
  );
}
