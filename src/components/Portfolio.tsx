"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  X,
  Film,
  Sparkles,
  Smartphone,
  Monitor,
} from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/Button";
import {
  images,
  portfolio,
  type PortfolioItem,
  type PortfolioSection,
} from "@/lib/constants";
import { getPortfolioItems, normalizeVideoSrc, getVideoSources } from "@/lib/cms";
import { cn } from "@/lib/utils";
import Image from "next/image";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const safeEncodeURI = (url: string) => {
  if (!url) return "";
  const normalized = normalizeVideoSrc(url) || url;
  try {
    return encodeURI(decodeURIComponent(normalized));
  } catch {
    return encodeURI(normalized);
  }
};


function PortfolioHero() {
  return (
    <div className="relative overflow-hidden bg-forest-deep">
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-[24rem] w-[24rem] rounded-full bg-sage/15 blur-[90px]"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/60 via-forest-deep/90 to-forest-deep" />
      <div className="bg-grid absolute inset-0 opacity-15" />
      <div className="grain-texture absolute inset-0" />

      <div className="container-wide relative z-10 px-4 pb-12 pt-24 sm:px-6 sm:pb-14 sm:pt-28 md:px-8 md:pb-16 md:pt-32">
        <ScrollReveal className="max-w-3xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-sage">
            {portfolio.label}
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            {portfolio.headline}
          </h1>
          <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-white/70 md:text-lg">
            {portfolio.subtitle}
          </p>
        </ScrollReveal>
      </div>
    </div>
  );
}

/* ─── Clean Standard Video Modal Window ─── */
export function LightboxModal({
  item,
  items,
  onSelect,
  onClose,
}: {
  item: PortfolioItem;
  items: PortfolioItem[];
  onSelect: (item: PortfolioItem) => void;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isReel = item.aspect === "9:16";
  const currentIndex = items.findIndex((i) => i.id === item.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < items.length - 1;

  const sources = useMemo(() => getVideoSources(item.videoSrc), [item.videoSrc]);

  const handlePrev = useCallback(() => {
    if (hasPrev) onSelect(items[currentIndex - 1]);
  }, [hasPrev, currentIndex, items, onSelect]);

  const handleNext = useCallback(() => {
    if (hasNext) onSelect(items[currentIndex + 1]);
  }, [hasNext, currentIndex, items, onSelect]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "ArrowRight") handleNext();
    },
    [onClose, handlePrev, handleNext]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  // Lock body scroll when modal is open (fixes iOS scroll-behind)
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevPosition = document.body.style.position;
    const prevWidth = document.body.style.width;
    const scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.position = prevPosition;
      document.body.style.top = "";
      document.body.style.width = prevWidth;
      window.scrollTo(0, scrollY);
    };
  }, []);

  // Autoplay video on mount or when item changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    const p = video.play();
    if (p !== undefined) {
      p.catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  }, [item.id, item.videoSrc]);

  // Derive the best playable src
  const videoSrc = useMemo(() => {
    if (!sources) return "";
    return sources.webm || sources.mp4 || "";
  }, [sources]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center select-none"
      style={{
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        backgroundColor: "rgba(0,0,0,0.88)",
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 28 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 28 }}
        transition={{ duration: 0.24, ease }}
        className={cn(
          "relative flex flex-col overflow-hidden rounded-2xl bg-[#0a150c] border border-white/15 text-white",
          "shadow-[0_32px_80px_rgba(0,0,0,0.9)] mx-3",
          // Width: phone-style for reels, wide for landscape
          isReel ? "w-full max-w-[340px] sm:max-w-sm" : "w-full max-w-[95vw] sm:max-w-3xl",
          // Height: always fit within viewport — no scrolling needed
          "max-h-[calc(100dvh-32px)]"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="flex shrink-0 items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-2 truncate mr-3">
            <span className="flex items-center gap-1 rounded-full bg-sage/20 border border-sage/30 px-2.5 py-0.5 text-[11px] font-semibold text-sage shrink-0">
              {isReel ? <Smartphone size={11} /> : <Film size={11} />}
              {item.category || (isReel ? "Reel" : "Film")}
            </span>
            <div className="truncate min-w-0">
              <h3 className="font-display text-sm font-bold text-white truncate">{item.title}</h3>
              {item.client && <p className="text-[11px] text-white/50 truncate">{item.client}</p>}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {items.length > 1 && (
              <span className="text-[11px] font-mono text-white/40">
                {currentIndex + 1}/{items.length}
              </span>
            )}
            <button
              onClick={onClose}
              aria-label="Close"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* ── Video — flex-1 fills remaining space, never overflows ── */}
        <div className="flex-1 min-h-0 overflow-hidden bg-black flex items-center justify-center">
          {videoSrc ? (
            <video
              key={item.id}
              ref={videoRef}
              src={videoSrc}
              controls
              autoPlay
              playsInline
              className={cn(
                "block bg-black",
                isReel ? "h-full w-auto max-w-full" : "w-full h-auto max-h-full"
              )}
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-white/40">
              <Film size={36} className="mb-2" />
              <p className="text-sm">Video not available</p>
            </div>
          )}
        </div>

        {/* ── Footer nav ── */}
        {items.length > 1 && (
          <div className="flex shrink-0 items-center justify-between px-5 py-3 border-t border-white/10 bg-black/40">
            <button
              type="button"
              onClick={handlePrev}
              disabled={!hasPrev}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all",
                hasPrev
                  ? "bg-white/10 text-white hover:bg-sage hover:text-forest-deep"
                  : "bg-white/5 text-white/30 cursor-not-allowed"
              )}
            >
              <ChevronLeft size={14} />
              <span>Previous</span>
            </button>

            <span className="text-xs text-white/50 hidden sm:inline font-sans">
              ← → keys to navigate
            </span>

            <button
              type="button"
              onClick={handleNext}
              disabled={!hasNext}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all",
                hasNext
                  ? "bg-white/10 text-white hover:bg-sage hover:text-forest-deep"
                  : "bg-white/5 text-white/30 cursor-not-allowed"
              )}
            >
              <span>Next</span>
              <ChevronRight size={14} />
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─── Hover-to-Play Portfolio Card ─── */
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
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (videoRef.current) {
            videoRef.current.muted = true;
            const p = videoRef.current.play();
            if (p !== undefined) {
              p.then(() => setIsPlaying(true)).catch(() => {});
            }
          }
        } else {
          if (videoRef.current && typeof window !== "undefined" && window.innerWidth < 768) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      const p = videoRef.current.play();
      if (p !== undefined) {
        p.then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTap = () => {
    onSelect(item);
  };

  const isReel = item.aspect === "9:16";

  return (
    <motion.div
      ref={cardRef}
      initial={reduceMotion ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.03, 0.25), ease }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleTap}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-[1.8rem] mb-5 break-inside-avoid",
        "shadow-[0_12px_40px_rgba(15,61,46,0.12)] border border-white/15 bg-black transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(77,184,154,0.25)]",
        isReel ? "aspect-[9/16]" : "aspect-[16/9]",
      )}
    >
      {/* Video */}
      <div className="relative h-full w-full">
        {isVisible && item.videoSrc && (
          <video
            ref={(el) => {
              if (el) {
                el.muted = true;
                el.defaultMuted = true;
                el.setAttribute("playsinline", "true");
                el.setAttribute("webkit-playsinline", "true");
                const p = el.play();
                if (p !== undefined) p.catch(() => {});
              }
              videoRef.current = el;
            }}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          >
            {(() => {
              const s = getVideoSources(item.videoSrc);
              return (
                <>
                  {s && <source src={s.mp4} type="video/mp4" />}
                  {s && <source src={s.webm} type="video/webm" />}
                </>
              );
            })()}
          </video>
        )}

        {!isVisible && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <Film size={28} className="text-sage/30 animate-pulse" />
          </div>
        )}
      </div>

      {/* Subtle vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

      {/* Play icon button */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md border border-white/30 shadow-2xl transition-all duration-300 group-hover:scale-115 group-hover:bg-sage group-hover:text-forest-deep">
          <Play size={22} fill="currentColor" className="ml-1 text-white group-hover:text-forest-deep" />
        </div>
      </div>


    </motion.div>
  );
}

/* ─── Main Portfolio Component ─── */
export function Portfolio({ standalone = false }: { standalone?: boolean }) {
  const [items, setItems] = useState<PortfolioItem[]>(portfolio.items);
  const [activeModalItem, setActiveModalItem] = useState<PortfolioItem | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "content-videos" | "ai-concept-ads">("all");

  useEffect(() => {
    async function fetchDynamicData() {
      const data = await getPortfolioItems();
      if (data && data.length > 0) {
        setItems(data.filter((item) => Boolean(item.videoSrc)));
      }
    }
    fetchDynamicData();
  }, []);

  const contentVideoItems = useMemo(
    () => items.filter((item) => item.section === "content-videos" || (!item.section && !item.videoSrc?.includes("/AI/"))),
    [items],
  );
  const aiConceptItems = useMemo(
    () =>
      items.filter(
        (item) =>
          item.section === "ai-concept-ads" ||
          item.videoSrc?.includes("/AI/") ||
          item.videoSrc?.includes("Bougain AI videos"),
      ),
    [items],
  );

  const filteredItems = useMemo(() => {
    if (activeTab === "content-videos") return contentVideoItems;
    if (activeTab === "ai-concept-ads") return aiConceptItems;
    return items;
  }, [activeTab, contentVideoItems, aiConceptItems, items]);

  return (
    <>
      {standalone && <PortfolioHero />}

      <section
        id="portfolio"
        className={cn(
          "content-auto relative overflow-hidden bg-white",
          standalone ? "py-8 md:py-14" : "section-padding"
        )}
      >
        <div className="container-wide relative">
          {/* Header for non-standalone mode (Home page embed) */}
          {!standalone && (
            <ScrollReveal className="mb-10 max-w-2xl">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-sage">
                {portfolio.label}
              </p>
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-forest-deep md:text-5xl">
                {portfolio.headline}
              </h2>
              <p className="mt-4 max-w-lg font-sans text-base leading-relaxed text-grey-muted md:text-lg">
                {portfolio.subtitle}
              </p>
            </ScrollReveal>
          )}

          {/* Clean Category Filter Tabs */}
          <div className="mb-8 md:mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-grey-light/60 pb-6">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={cn(
                  "flex items-center gap-2 rounded-full px-5 py-2.5 font-sans text-xs sm:text-sm font-semibold transition-all duration-300",
                  activeTab === "all"
                    ? "bg-forest-deep text-white shadow-lg scale-105"
                    : "bg-forest-cream/70 text-forest-deep/70 hover:bg-forest-cream hover:text-forest-deep"
                )}
              >
                <span>All Films</span>
                <span className={cn(
                  "rounded-full px-2 py-0.5 text-[11px] font-bold",
                  activeTab === "all" ? "bg-white/20 text-white" : "bg-forest-deep/10 text-forest-deep"
                )}>
                  {items.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("content-videos")}
                className={cn(
                  "flex items-center gap-2 rounded-full px-5 py-2.5 font-sans text-xs sm:text-sm font-semibold transition-all duration-300",
                  activeTab === "content-videos"
                    ? "bg-forest-deep text-white shadow-lg scale-105"
                    : "bg-forest-cream/70 text-forest-deep/70 hover:bg-forest-cream hover:text-forest-deep"
                )}
              >
                <Film size={14} />
                <span>Content Studio</span>
                <span className={cn(
                  "rounded-full px-2 py-0.5 text-[11px] font-bold",
                  activeTab === "content-videos" ? "bg-white/20 text-white" : "bg-forest-deep/10 text-forest-deep"
                )}>
                  {contentVideoItems.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("ai-concept-ads")}
                className={cn(
                  "flex items-center gap-2 rounded-full px-5 py-2.5 font-sans text-xs sm:text-sm font-semibold transition-all duration-300",
                  activeTab === "ai-concept-ads"
                    ? "bg-forest-deep text-white shadow-lg scale-105"
                    : "bg-forest-cream/70 text-forest-deep/70 hover:bg-forest-cream hover:text-forest-deep"
                )}
              >
                <Sparkles size={14} />
                <span>AI Creative Lab</span>
                <span className={cn(
                  "rounded-full px-2 py-0.5 text-[11px] font-bold",
                  activeTab === "ai-concept-ads" ? "bg-white/20 text-white" : "bg-forest-deep/10 text-forest-deep"
                )}>
                  {aiConceptItems.length}
                </span>
              </button>
            </div>

            <p className="hidden md:block text-xs font-sans text-grey-muted">
              Tap any video to play with sound and full screen
            </p>
          </div>

          {/* Direct Video Masonry Grid */}
          <motion.div
            layout
            className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, i) => (
                <PortfolioCard
                  key={item.id}
                  item={item}
                  index={i}
                  onSelect={(selected) => setActiveModalItem(selected)}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Bottom CTA for Standalone Portfolio Page */}
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

      {/* Fullscreen Video Popup Lightbox Modal */}
      <AnimatePresence>
        {activeModalItem && (
          <LightboxModal
            item={activeModalItem}
            items={filteredItems.length > 0 ? filteredItems : items}
            onSelect={(item) => setActiveModalItem(item)}
            onClose={() => setActiveModalItem(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
