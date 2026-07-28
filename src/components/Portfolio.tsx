"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Play, Volume2, VolumeX, X, Film, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/Button";
import {
  images,
  portfolio,
  type PortfolioItem,
  type PortfolioSection,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import { getPortfolioItems } from "@/lib/cms";
import Image from "next/image";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const spanClasses = {
  lg: "sm:col-span-2 sm:row-span-2 min-h-[280px] sm:min-h-[420px]",
  sm: "sm:col-span-1 min-h-[240px] sm:aspect-[4/5]",
  md: "sm:col-span-1 min-h-[240px] sm:aspect-[4/5] lg:min-h-[300px]",
};

function PortfolioHero() {
  return (
    <div className="relative overflow-hidden bg-forest-deep">
      <Image
        src={images.cta}
        alt=""
        fill
        priority
        quality={60}
        sizes="100vw"
        className="object-cover opacity-20"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-[28rem] w-[28rem] rounded-full bg-sage/20 blur-[100px]"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/50 via-forest-deep/88 to-forest-deep" />
      <div className="bg-grid absolute inset-0 opacity-20" />
      <div className="grain-texture absolute inset-0" />

      <div className="container-wide relative z-10 px-4 pb-20 pt-28 sm:px-5 sm:pb-24 sm:pt-36 md:px-8 md:pb-28 md:pt-44 lg:px-12">
        <ScrollReveal className="max-w-3xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-sage">
            {portfolio.label}
          </p>
          <h1 className="mt-5 font-display text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
            {portfolio.headline}
          </h1>
          <p className="mt-6 max-w-lg font-sans text-lg leading-relaxed text-white/65 md:text-xl">
            {portfolio.subtitle}
          </p>
        </ScrollReveal>
      </div>
    </div>
  );
}

/* ─── Lightbox Modal ─── */
function LightboxModal({
  item,
  onClose,
}: {
  item: PortfolioItem;
  onClose: () => void;
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [handleKeyDown]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-forest-deep/95 p-4 backdrop-blur-md md:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.35, ease }}
        className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-forest-deep text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-white/20"
        >
          <X size={20} />
        </button>

        {/* Video Area */}
        <div className="relative flex flex-1 items-center justify-center bg-black/60 min-h-[300px] md:min-h-[420px] lg:min-h-[500px]">
          {item.videoSrc ? (
            <div className="relative h-full w-full flex items-center justify-center">
              <video
                ref={(el) => {
                  if (el) {
                    el.muted = isMuted;
                    el.defaultMuted = isMuted;
                    el.setAttribute("playsinline", "true");
                    el.setAttribute("webkit-playsinline", "true");
                  }
                  videoRef.current = el;
                }}
                src={item.videoSrc}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload="auto"
                onClick={togglePlay}
                className="max-h-[80vh] w-full object-contain cursor-pointer"
              />

              {/* Controls bar */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl bg-forest-deep/80 p-3 backdrop-blur-md">
                <button
                  onClick={togglePlay}
                  className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wider text-white hover:text-sage-light"
                >
                  <Play size={16} fill={isPlaying ? "currentColor" : "none"} />
                  {isPlaying ? "Pause" : "Play"}
                </button>

                <button
                  onClick={toggleMute}
                  className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wider text-white hover:text-sage-light"
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  {isMuted ? "Unmute Sound" : "Mute Sound"}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center min-h-[350px] bg-forest-deep/40">
              <Film size={48} className="text-white/20" />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Lazy Video Card ─── */
function PortfolioCard({
  item,
  index,
  onSelect,
}: {
  item: PortfolioItem;
  index: number;
  onSelect: (item: PortfolioItem) => void;
}) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // IntersectionObserver for lazy-loading
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Play on hover (desktop) — on mobile, don't autoplay
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  // On mobile, tap to play inline before opening lightbox
  const handleTap = () => {
    if (window.innerWidth < 768 && videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
    onSelect(item);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={reduceMotion ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay: Math.min(index * 0.04, 0.3), ease }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleTap}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-[1.5rem]",
        "shadow-[0_12px_40px_rgba(15,61,46,0.12)] border border-white/10 bg-black/80",
        spanClasses[item.span],
      )}
    >
      {/* Video — only load src when in viewport */}
      <div className="relative h-full w-full">
        {isVisible && item.videoSrc && (
          <video
            ref={(el) => {
              if (el) {
                el.muted = true;
                el.defaultMuted = true;
                el.setAttribute("playsinline", "true");
                el.setAttribute("webkit-playsinline", "true");
              }
              videoRef.current = el;
            }}
            src={item.videoSrc}
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}

        {/* Dark fallback when video hasn't loaded */}
        {!isVisible && (
          <div className="absolute inset-0 flex items-center justify-center bg-forest-deep">
            <Film size={32} className="text-white/15" />
          </div>
        )}
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

      {/* Play icon on hover */}
      <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/20">
          <Play size={22} fill="white" className="text-white ml-0.5" />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Section Header ─── */
function SectionHeader({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <ScrollReveal className="mb-10 md:mb-14">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-sage">
            {label}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-forest-deep md:text-4xl lg:text-5xl">
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className="max-w-sm font-sans text-sm leading-relaxed text-grey-muted md:text-right">
            {subtitle}
          </p>
        )}
      </div>
    </ScrollReveal>
  );
}

/* ─── Main Portfolio Component ─── */
export function Portfolio({ standalone = false }: { standalone?: boolean }) {
  const [items, setItems] = useState<PortfolioItem[]>(portfolio.items);
  const [activeModalItem, setActiveModalItem] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    async function fetchDynamicData() {
      const data = await getPortfolioItems();
      if (data && data.length > 0) {
        setItems(data);
      }
    }
    fetchDynamicData();
  }, []);

  const videoProductionItems = items.filter(
    (item) => !item.section || item.section === "video-production",
  );
  const aiConceptItems = items.filter(
    (item) => item.section === "ai-concept-ads",
  );

  return (
    <>
      {standalone && <PortfolioHero />}

      <section
        id="portfolio"
        className={cn(
          "content-auto relative overflow-hidden bg-white section-padding",
          standalone && "!pt-14 md:!pt-20",
        )}
      >
        <div className="container-wide relative">
          {!standalone && (
            <ScrollReveal className="mb-12 max-w-2xl">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-sage">
                {portfolio.label}
              </p>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-forest-deep md:text-5xl">
                {portfolio.headline}
              </h2>
              <p className="mt-5 max-w-lg font-sans text-base leading-relaxed text-grey-muted md:text-lg">
                {portfolio.subtitle}
              </p>
            </ScrollReveal>
          )}

          {/* ── Section 1: Video Production ── */}
          {videoProductionItems.length > 0 && (
            <div className="mb-20 md:mb-28">
              {standalone && (
                <SectionHeader
                  label="Client Work"
                  title="Video Production"
                  subtitle="Campaign films, reels & commercial video production."
                />
              )}

              <motion.div
                layout
                className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
              >
                <AnimatePresence mode="popLayout">
                  {videoProductionItems.map((item, i) => (
                    <PortfolioCard
                      key={item.id}
                      item={item}
                      index={i}
                      onSelect={(selected) => setActiveModalItem(selected)}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          )}

          {/* ── Section 2: AI Concept Ads ── */}
          {aiConceptItems.length > 0 && (
            <div>
              <SectionHeader
                label="AI Creative Lab"
                title="AI Concept Ads"
                subtitle="AI-generated concept advertisements and creative explorations."
              />

              <motion.div
                layout
                className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
              >
                <AnimatePresence mode="popLayout">
                  {aiConceptItems.map((item, i) => (
                    <PortfolioCard
                      key={item.id}
                      item={item}
                      index={i}
                      onSelect={(selected) => setActiveModalItem(selected)}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          )}

          {!standalone && (
            <ScrollReveal delay={160} className="mt-14 text-center">
              <Button href="/portfolio" variant="secondary" size="md">
                Explore full portfolio
                <ArrowUpRight size={16} />
              </Button>
            </ScrollReveal>
          )}

          {standalone && (
            <ScrollReveal delay={100} className="mt-20 text-center md:mt-28">
              <div className="mx-auto max-w-xl rounded-3xl bg-forest-deep p-8 text-white md:p-12">
                <Sparkles className="mx-auto text-sage" size={32} />
                <h3 className="mt-4 font-display text-2xl font-bold md:text-3xl">
                  Have a campaign or video shoot in mind?
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-white/70">
                  Let&apos;s build something visually extraordinary together.
                </p>
                <div className="mt-8 flex justify-center">
                  <Button href="/contact" variant="primary" size="lg">
                    Start a Conversation
                    <ArrowUpRight size={18} />
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeModalItem && (
          <LightboxModal
            item={activeModalItem}
            onClose={() => setActiveModalItem(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
