"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Play, Volume2, VolumeX, X, Film, Image as ImageIcon, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/Button";
import {
  images,
  portfolio,
  portfolioCategories,
  type PortfolioCategory,
  type PortfolioItem,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const spanClasses = {
  lg: "sm:col-span-2 sm:row-span-2 min-h-[340px] sm:min-h-[520px]",
  sm: "sm:col-span-1 min-h-[300px] sm:aspect-[4/5]",
  md: "sm:col-span-1 min-h-[300px] sm:aspect-[4/5] lg:min-h-[360px]",
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
        className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-forest-deep text-white shadow-2xl lg:flex-row"
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

        {/* Media Side */}
        <div className="relative flex flex-1 items-center justify-center bg-black/60 min-h-[300px] md:min-h-[420px] lg:min-h-[500px]">
          {item.type === "video" && item.videoSrc ? (
            <div className="relative h-full w-full flex items-center justify-center">
              <video
                ref={videoRef}
                src={item.videoSrc}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload="metadata"
                className="max-h-[70vh] w-full object-contain"
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
            <div className="relative h-full w-full min-h-[350px]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
          )}
        </div>

        {/* Details Side */}
        <div className="flex w-full flex-col justify-between p-6 sm:p-8 lg:w-[380px] lg:shrink-0 lg:border-l lg:border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-sage/20 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-wider text-sage-light">
                {item.category}
              </span>
              <span className="flex items-center gap-1 font-sans text-[10px] uppercase tracking-wider text-white/50">
                {item.type === "video" ? <Film size={12} /> : <ImageIcon size={12} />}
                {item.type}
              </span>
            </div>

            <h3 className="mt-4 font-display text-2xl font-bold text-white md:text-3xl">
              {item.title}
            </h3>

            <p className="mt-1 font-sans text-sm font-medium text-sage-light">
              Client: {item.client}
            </p>

            <p className="mt-4 font-sans text-sm leading-relaxed text-white/70">
              {item.description}
            </p>

            <div className="mt-6 rounded-2xl bg-white/5 p-4 border border-white/10">
              <p className="font-sans text-xs font-semibold uppercase tracking-wider text-sage">
                Key Performance Outcome
              </p>
              <p className="mt-1 font-display text-xl font-bold text-white">
                {item.result}
              </p>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10">
            <Button href="/contact" variant="primary" size="md" className="w-full justify-center">
              Request Similar Project
              <ArrowUpRight size={16} />
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

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
  const [isHovered, setIsHovered] = useState(false);

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

  const isVertical = item.aspect === "9:16";

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay: index * 0.06, ease }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(item)}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-[2rem]",
        "shadow-[0_20px_60px_rgba(15,61,46,0.15)] border border-white/10",
        spanClasses[item.span],
      )}
    >
      {/* Top Phone Speaker Notch for Vertical Reels */}
      {isVertical && (
        <div className="absolute top-3 left-1/2 z-20 h-1 w-12 -translate-x-1/2 rounded-full bg-black/60 backdrop-blur-md border border-white/20" />
      )}

      {/* Video Background Thumbnail & Hover Preview */}
      {item.type === "video" && item.videoSrc ? (
        <video
          ref={videoRef}
          src={item.videoSrc}
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <Image
          src={item.image}
          alt={`${item.title} — ${item.category} project`}
          fill
          quality={75}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      )}

      {/* Media Type Badge */}
      <div className="absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full bg-forest-deep/70 px-3 py-1 backdrop-blur-md text-[10px] font-semibold uppercase tracking-wider text-white">
        {item.type === "video" ? (
          <>
            <Film size={12} className="text-sage-light" />
            <span>Video</span>
          </>
        ) : (
          <>
            <ImageIcon size={12} className="text-sage-light" />
            <span>Photo</span>
          </>
        )}
      </div>

      {/* Gradient overlay for text legibility without blocking video clarity */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-300" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-10">
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-sage-light">
          {item.client}
        </p>
        <h3 className="mt-1 font-display text-2xl font-bold text-white md:text-3xl">
          {item.title}
        </h3>
        <p className="mt-2 max-w-xs font-sans text-xs leading-relaxed text-white/80 transition-all duration-300">
          {item.result}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 font-sans text-xs font-semibold text-sage-light group-hover:text-white transition-colors duration-300">
          Watch Video & Details
          <ArrowUpRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </motion.div>
  );
}

export function Portfolio({ standalone = false }: { standalone?: boolean }) {
  const [activeModalItem, setActiveModalItem] = useState<PortfolioItem | null>(null);

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

          {standalone && (
            <ScrollReveal className="mb-10 md:mb-12">
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div>
                  <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-sage">
                    Featured Gallery & Reels
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-bold text-forest-deep md:text-4xl">
                    Campaign films, reels & commercial video production
                  </h2>
                </div>
                <p className="max-w-sm font-sans text-sm leading-relaxed text-grey-muted md:text-right">
                  Hover to preview videos. Click any item to watch full-screen and see project metrics.
                </p>
              </div>
            </ScrollReveal>
          )}

          {/* Portfolio Grid */}
          <motion.div
            layout
            className={cn(
              "grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6",
            )}
          >
            <AnimatePresence mode="popLayout">
              {portfolio.items.map((item, i) => (
                <PortfolioCard
                  key={item.id}
                  item={item}
                  index={i}
                  onSelect={(selected) => setActiveModalItem(selected)}
                />
              ))}
            </AnimatePresence>
          </motion.div>

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
