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
                src={encodeURI(item.videoSrc)}
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
        "shadow-[0_12px_40px_rgba(15,61,46,0.12)] border border-white/10 bg-forest-dark/40",
        spanClasses[item.span],
      )}
    >
      {/* Video — only plays on hover or tap */}
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
            src={encodeURI(item.videoSrc) + "#t=0.001"}
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}

        {/* Ambient background while video initializes */}
        {!isVisible && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <Film size={28} className="text-sage/30 animate-pulse" />
          </div>
        )}
      </div>

      {/* Subtle overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-85" />

      {/* Play icon overlay hint on hover (hidden when video is playing) */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        {!isPlaying && (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-xl transition-transform duration-300 group-hover:scale-110 group-hover:bg-sage group-hover:text-forest-deep">
            <Play size={18} fill="currentColor" className="ml-0.5 text-white group-hover:text-forest-deep" />
          </div>
        )}
      </div>

      {/* Card Info Overlay */}
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <span className="font-sans text-[11px] font-bold text-sage uppercase tracking-wider block truncate">
          {item.client || item.industry || item.category}
        </span>
        <h3 className="font-display text-base font-bold text-white line-clamp-1 mt-0.5">
          {item.title}
        </h3>
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

/* ─── Category Card (Landing View) ─── */
function CategoryCard({
  title,
  label,
  subtitle,
  videoSrc,
  itemCount,
  icon,
  index,
  onClick,
}: {
  title: string;
  label: string;
  subtitle: string;
  videoSrc: string;
  itemCount: number;
  icon: React.ReactNode;
  index: number;
  onClick: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.muted = true;
      const p = videoRef.current.play();
      if (p !== undefined) p.catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 50, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_20px_60px_rgba(15,61,46,0.2)] min-h-[340px] sm:min-h-[420px] lg:min-h-[480px]"
    >
      {/* Background video */}
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
        src={encodeURI(videoSrc) + "#t=0.001"}
        muted
        loop
        playsInline
        preload="auto"
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-all duration-1000",
          isHovered ? "scale-110 brightness-75" : "scale-100 brightness-50",
        )}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br transition-opacity duration-700",
        isHovered ? "opacity-40" : "opacity-60",
        index === 0
          ? "from-forest-deep/80 via-transparent to-transparent"
          : "from-indigo-900/60 via-transparent to-transparent",
      )} />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-8 sm:p-10 md:p-12">
        {/* Top: icon & count badge */}
        <div className="flex items-start justify-between">
          <div className={cn(
            "flex h-14 w-14 items-center justify-center rounded-2xl border backdrop-blur-xl transition-all duration-500",
            isHovered
              ? "bg-sage/30 border-sage/40 scale-110"
              : "bg-white/10 border-white/20",
          )}>
            {icon}
          </div>
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.15 }}
            className="flex items-center gap-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md px-4 py-1.5"
          >
            <span className="text-sm font-semibold text-white">{itemCount}</span>
            <span className="text-xs text-white/60">videos</span>
          </motion.div>
        </div>

        {/* Bottom: text + CTA */}
        <div>
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-sage mb-3">
            {label}
          </p>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-3 max-w-md font-sans text-sm leading-relaxed text-white/60 sm:text-base">
            {subtitle}
          </p>

          <div className={cn(
            "mt-6 flex items-center gap-3 transition-all duration-500",
            isHovered ? "translate-x-2" : "",
          )}>
            <div className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full transition-all duration-500",
              isHovered
                ? "bg-sage text-forest-deep scale-110"
                : "bg-white/15 text-white border border-white/20",
            )}>
              <ArrowUpRight size={18} />
            </div>
            <span className={cn(
              "font-sans text-sm font-semibold uppercase tracking-wider transition-colors duration-300",
              isHovered ? "text-sage" : "text-white/70",
            )}>
              Explore Collection
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Portfolio Component ─── */
export function Portfolio({ standalone = false }: { standalone?: boolean }) {
  const [items, setItems] = useState<PortfolioItem[]>(portfolio.items);
  const [activeModalItem, setActiveModalItem] = useState<PortfolioItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<"content-videos" | "ai-concept-ads" | null>(null);

  useEffect(() => {
    async function fetchDynamicData() {
      const data = await getPortfolioItems();
      if (data && data.length > 0) {
        setItems(data.filter((item) => Boolean(item.videoSrc)));
      }
    }
    fetchDynamicData();
  }, []);

  const contentVideoItems = items.filter(
    (item) => item.section === "content-videos",
  );
  const aiConceptItems = items.filter(
    (item) => item.section === "ai-concept-ads" || (!item.section && item.videoSrc?.includes("/AI/")),
  );

  const handleBack = () => {
    setActiveCategory(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeItems =
    activeCategory === "content-videos"
      ? contentVideoItems
      : activeCategory === "ai-concept-ads"
        ? aiConceptItems
        : [];

  const activeSectionTitle =
    activeCategory === "content-videos"
      ? "Content Videos"
      : "AI Concept Ads";

  const activeSectionLabel =
    activeCategory === "content-videos"
      ? "Content Studio"
      : "AI Creative Lab";

  const activeSectionSubtitle =
    activeCategory === "content-videos"
      ? "Branded content, commercial reels, and digital marketing films."
      : "AI-generated concept advertisements and video explorations.";

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
          <AnimatePresence mode="wait">
            {/* ═══════════════════════════════════════════ */}
            {/* CATEGORY LANDING VIEW                       */}
            {/* ═══════════════════════════════════════════ */}
            {activeCategory === null && (
              <motion.div
                key="category-landing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease }}
              >
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

                {standalone && (
                  <ScrollReveal className="mb-12 text-center max-w-2xl mx-auto">
                    <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-sage">
                      Choose a collection
                    </p>
                    <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-forest-deep md:text-4xl">
                      Explore Our Work
                    </h2>
                    <p className="mt-4 font-sans text-base leading-relaxed text-grey-muted">
                      Select a category to dive into our portfolio of creative work.
                    </p>
                  </ScrollReveal>
                )}

                {/* Two Category Cards */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                  <CategoryCard
                    title="Content Videos"
                    label="Content Studio"
                    subtitle="Branded content, commercial reels, and digital marketing films crafted for real brands."
                    videoSrc={contentVideoItems[0]?.videoSrc || "/videos/Content_video_webm/TURN UP CROWN PLAZA.webm"}
                    itemCount={contentVideoItems.length}
                    icon={<Film size={24} className="text-white" />}
                    index={0}
                    onClick={() => {
                      setActiveCategory("content-videos");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  />
                  <CategoryCard
                    title="AI Videos"
                    label="AI Creative Lab"
                    subtitle="AI-generated concept advertisements and cinematic video explorations."
                    videoSrc={aiConceptItems[0]?.videoSrc || "/videos/AI/AMRUTH CONCEPT AD.webm"}
                    itemCount={aiConceptItems.length}
                    icon={<Sparkles size={24} className="text-white" />}
                    index={1}
                    onClick={() => {
                      setActiveCategory("ai-concept-ads");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  />
                </div>

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

                {!standalone && (
                  <ScrollReveal delay={160} className="mt-14 text-center">
                    <Button href="/portfolio" variant="secondary" size="md">
                      Explore full portfolio
                      <ArrowUpRight size={16} />
                    </Button>
                  </ScrollReveal>
                )}
              </motion.div>
            )}

            {/* ═══════════════════════════════════════════ */}
            {/* CATEGORY DETAIL VIEW                        */}
            {/* ═══════════════════════════════════════════ */}
            {activeCategory !== null && (
              <motion.div
                key={`category-${activeCategory}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.5, ease }}
              >
                {/* Back Button */}
                <motion.button
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                  onClick={handleBack}
                  className="mb-8 flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-wider text-sage hover:text-forest-deep transition-colors group"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-sage/30 bg-sage/10 transition-all group-hover:bg-sage group-hover:text-forest-deep">
                    <ArrowUpRight size={14} className="rotate-[225deg]" />
                  </div>
                  Back to Categories
                </motion.button>

                {/* Section Header */}
                <SectionHeader
                  label={activeSectionLabel}
                  title={activeSectionTitle}
                  subtitle={activeSectionSubtitle}
                />

                {/* Video Grid */}
                <motion.div
                  layout
                  className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
                >
                  <AnimatePresence mode="popLayout">
                    {activeItems.map((item, i) => (
                      <PortfolioCard
                        key={item.id}
                        item={item}
                        index={i}
                        onSelect={(selected) => setActiveModalItem(selected)}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>

                {/* CTA at bottom */}
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
              </motion.div>
            )}
          </AnimatePresence>
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
