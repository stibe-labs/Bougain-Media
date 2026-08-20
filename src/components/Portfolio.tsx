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

/* ─── Fullscreen Interactive Lightbox Modal ─── */
function LightboxModal({
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
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showHud, setShowHud] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

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

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
    setShowHud(true);
    setTimeout(() => setShowHud(false), 800);
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    const el = containerRef.current;
    if (!el) return;
    try {
      if (!document.fullscreenElement) {
        if (el.requestFullscreen) {
          await el.requestFullscreen();
        } else if ((el as unknown as { webkitRequestFullscreen?: () => Promise<void> }).webkitRequestFullscreen) {
          await (el as unknown as { webkitRequestFullscreen: () => Promise<void> }).webkitRequestFullscreen();
        }
        setIsFullscreen(true);
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as unknown as { webkitExitFullscreen?: () => Promise<void> }).webkitExitFullscreen) {
          await (document as unknown as { webkitExitFullscreen: () => Promise<void> }).webkitExitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch (err) {
      console.warn("Fullscreen toggle error:", err);
    }
  }, []);

  const handleRestart = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().then(() => setIsPlaying(true)).catch(() => {});
  }, []);

  // Keyboard navigation & controls
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "ArrowRight") handleNext();
      else if (e.key === " " || e.key === "k" || e.key === "K") {
        e.preventDefault();
        togglePlay();
      } else if (e.key === "m" || e.key === "M") {
        toggleMute();
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      }
    },
    [onClose, handlePrev, handleNext, togglePlay, toggleMute, toggleFullscreen]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    document.addEventListener("webkitfullscreenchange", handleFsChange);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("fullscreenchange", handleFsChange);
      document.removeEventListener("webkitfullscreenchange", handleFsChange);
      document.body.style.overflow = "unset";
    };
  }, [handleKeyDown]);

  // Video load & playback initialization
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setIsLoading(true);
    setIsPlaying(true);
    setCurrentTime(0);
    setDuration(0);

    video.muted = isMuted;
    video.defaultMuted = isMuted;
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");

    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    const onLoadedMetadata = () => {
      setDuration(video.duration || 0);
      setIsLoading(false);
    };
    const onCanPlay = () => setIsLoading(false);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      if (hasNext) {
        handleNext();
      } else {
        setIsPlaying(false);
      }
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEnded);

    video.load();
    const p = video.play();
    if (p !== undefined) {
      p.then(() => {
        setIsPlaying(true);
        setIsLoading(false);
      }).catch(() => {
        // If unmuted autoplay blocked by browser policy, fallback to muted
        if (!video.muted) {
          video.muted = true;
          setIsMuted(true);
          video.play().then(() => {
            setIsPlaying(true);
            setIsLoading(false);
          }).catch(() => {
            setIsPlaying(false);
            setIsLoading(false);
          });
        } else {
          setIsPlaying(false);
          setIsLoading(false);
        }
      });
    }

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnded);
    };
  }, [item.id, item.videoSrc, hasNext, handleNext, isMuted]);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !videoRef.current || duration <= 0) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newTime = pos * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-2 sm:p-4 md:p-6 select-none overflow-hidden"
      onClick={onClose}
    >
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute h-[36rem] w-[36rem] rounded-full bg-sage/15 blur-[140px]"
        aria-hidden
      />

      {/* Side Navigation Arrow: Previous */}
      {hasPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          aria-label="Previous video"
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-xl border border-white/20 transition-all hover:bg-sage hover:text-forest-deep hover:scale-110 shadow-2xl"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Side Navigation Arrow: Next */}
      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          aria-label="Next video"
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-xl border border-white/20 transition-all hover:bg-sage hover:text-forest-deep hover:scale-110 shadow-2xl"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Main Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3, ease }}
        className={cn(
          "relative flex flex-col overflow-hidden bg-black/90 border border-white/20 text-white shadow-[0_25px_80px_rgba(0,0,0,0.8)]",
          isReel
            ? "w-full max-w-[420px] aspect-[9/16] max-h-[88vh] rounded-[2.5rem]"
            : "w-full max-w-5xl aspect-video max-h-[85vh] rounded-3xl"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-4 bg-gradient-to-b from-black/85 via-black/40 to-transparent">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 rounded-full bg-sage/20 border border-sage/30 px-3 py-1 text-xs font-semibold text-sage backdrop-blur-md">
              {isReel ? <Smartphone size={12} /> : <Film size={12} />}
              {item.category || "Showreel"}
            </span>
            <div className="hidden sm:block">
              <h3 className="font-display text-sm font-bold text-white truncate max-w-[200px] md:max-w-[320px]">
                {item.title}
              </h3>
              {item.client && (
                <p className="text-[11px] text-white/60 font-sans">{item.client}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 1 && (
              <span className="text-xs font-medium text-white/50 px-2">
                {currentIndex + 1} / {items.length}
              </span>
            )}

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white/80 backdrop-blur-md transition-all hover:bg-white/20 hover:text-white border border-white/15"
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>

            {/* Close Modal Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white/80 backdrop-blur-md transition-all hover:bg-white/20 hover:text-white border border-white/15"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Video Canvas */}
        <div
          onClick={togglePlay}
          className="relative flex-1 h-full w-full flex items-center justify-center bg-black cursor-pointer overflow-hidden"
        >
          {/* Spinner when loading */}
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-10">
              <div className="h-10 w-10 animate-spin rounded-full border-3 border-sage border-t-transparent mb-3" />
              <span className="text-xs font-medium text-white/60 tracking-wider">Loading video...</span>
            </div>
          )}

          {sources ? (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              preload="auto"
              className="h-full w-full object-contain pointer-events-none"
            >
              {sources.mp4 && <source src={sources.mp4} type="video/mp4" />}
              {sources.webm && <source src={sources.webm} type="video/webm" />}
            </video>
          ) : (
            <div className="flex flex-col items-center justify-center text-white/40">
              <Film size={40} className="mb-2" />
              <p className="text-sm">Video file not found</p>
            </div>
          )}

          {/* Central Play/Pause Flash Indicator */}
          <AnimatePresence>
            {showHud && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                className="pointer-events-none absolute z-20 flex h-20 w-20 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-xl border border-white/20 shadow-2xl"
              >
                {isPlaying ? (
                  <Play size={32} fill="currentColor" className="ml-1 text-sage" />
                ) : (
                  <Pause size={32} fill="currentColor" className="text-sage" />
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Center Play Button (visible when paused) */}
          {!isPlaying && !isLoading && (
            <div className="pointer-events-none absolute z-10 flex h-16 w-16 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md border border-white/25 shadow-2xl transition-transform group-hover:scale-110">
              <Play size={26} fill="currentColor" className="ml-1 text-sage" />
            </div>
          )}
        </div>

        {/* Bottom Custom Glassmorphic Controls Bar */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-0 left-0 right-0 z-30 flex flex-col p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent"
        >
          {/* Progress Timeline Scrubber */}
          <div
            ref={progressBarRef}
            onClick={handleSeek}
            className="group/progress relative h-2 w-full cursor-pointer rounded-full bg-white/20 transition-all hover:h-3 mb-3"
          >
            {/* Progress Fill */}
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-sage-dark via-sage to-sage-light transition-all shadow-[0_0_12px_rgba(77,184,154,0.6)]"
              style={{ width: `${progressPercent}%` }}
            />
            {/* Scrubber Knob */}
            <div
              className="absolute top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-white border-2 border-sage shadow-md opacity-0 group-hover/progress:opacity-100 transition-opacity pointer-events-none"
              style={{ left: `calc(${progressPercent}% - 7px)` }}
            />
          </div>

          {/* Controls row */}
          <div className="flex items-center justify-between gap-3">
            {/* Left: Play/Pause, Restart & Time */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={togglePlay}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-sage hover:text-forest-deep"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
              </button>

              <button
                type="button"
                onClick={handleRestart}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 backdrop-blur-md transition-all hover:bg-white/20 hover:text-white"
                aria-label="Restart video"
              >
                <RotateCcw size={14} />
              </button>

              <span className="text-xs font-mono text-white/70 ml-1">
                {formatTime(currentTime)} <span className="text-white/30">/</span> {formatTime(duration)}
              </span>
            </div>

            {/* Right: Sound Mute/Unmute & Fullscreen */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleMute}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold backdrop-blur-md border transition-all",
                  isMuted
                    ? "bg-white/10 border-white/20 text-white/70 hover:bg-white/20 hover:text-white"
                    : "bg-sage/20 border-sage/40 text-sage hover:bg-sage/30"
                )}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                <span className="hidden sm:inline text-[11px] uppercase tracking-wider">
                  {isMuted ? "Unmute" : "Mute"}
                </span>
              </button>

              <button
                type="button"
                onClick={toggleFullscreen}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20"
                aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
              </button>
            </div>
          </div>
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
        "group relative cursor-pointer overflow-hidden rounded-[1.5rem] mb-5 break-inside-avoid",
        "shadow-[0_12px_40px_rgba(15,61,46,0.12)] border border-white/10 bg-black",
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

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />

      {/* Play icon hint */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        {!isPlaying && (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-xl transition-transform duration-300 group-hover:scale-110 group-hover:bg-sage group-hover:text-forest-deep">
            <Play size={18} fill="currentColor" className="ml-0.5 text-white group-hover:text-forest-deep" />
          </div>
        )}
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
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (videoRef.current) {
            videoRef.current.muted = true;
            const p = videoRef.current.play();
            if (p !== undefined) p.catch(() => {});
          }
        } else {
          if (videoRef.current && typeof window !== "undefined" && window.innerWidth < 768) {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.15, rootMargin: "100px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
      ref={cardRef}
      initial={reduceMotion ? false : { opacity: 0, y: 50, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_20px_60px_rgba(15,61,46,0.2)] min-h-[340px] sm:min-h-[420px] lg:min-h-[480px]"
    >
      {/* Background video */}
      {(() => {
        const sources = getVideoSources(videoSrc);
        return (
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
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-all duration-1000",
              isHovered ? "scale-110 brightness-75" : "scale-100 brightness-50",
            )}
          >
            {sources?.mp4 && <source src={sources.mp4} type="video/mp4" />}
            {sources?.webm && <source src={sources.webm} type="video/webm" />}
          </video>
        );
      })()}

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

  const contentVideoItems = useMemo(
    () => items.filter((item) => item.section === "content-videos"),
    [items],
  );
  const aiConceptItems = useMemo(
    () =>
      items.filter(
        (item) =>
          item.section === "ai-concept-ads" ||
          (!item.section && item.videoSrc?.includes("/AI/")),
      ),
    [items],
  );

  const handleBack = () => {
    setActiveCategory(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentCategoryItems = useMemo(
    () =>
      activeCategory === "content-videos"
        ? contentVideoItems
        : activeCategory === "ai-concept-ads"
          ? aiConceptItems
          : [],
    [activeCategory, contentVideoItems, aiConceptItems],
  );

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
                    videoSrc={contentVideoItems[0]?.videoSrc || "/videos/AI/turn-up-crown-plaza.webm"}
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
                    videoSrc={aiConceptItems[0]?.videoSrc || "videos/Bougain AI videos/HNA AD GST.webm"}
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

                {/* Video Masonry Grid */}
                <motion.div
                  layout
                  className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5"
                >
                  <AnimatePresence mode="popLayout">
                    {currentCategoryItems.map((item, i) => (
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
            items={currentCategoryItems.length > 0 ? currentCategoryItems : items}
            onSelect={(item) => setActiveModalItem(item)}
            onClose={() => setActiveModalItem(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
