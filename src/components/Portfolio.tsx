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

/* ─── Fullscreen Interactive Lightbox Modal ─── */
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

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-75 transition-opacity duration-300 group-hover:opacity-90" />

      {/* Play icon button */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md border border-white/30 shadow-2xl transition-all duration-300 group-hover:scale-115 group-hover:bg-sage group-hover:text-forest-deep">
          <Play size={22} fill="currentColor" className="ml-1 text-white group-hover:text-forest-deep" />
        </div>
      </div>

      {/* Card Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-10 pointer-events-none">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="rounded-full bg-white/20 border border-white/25 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-sage backdrop-blur-md">
            {item.category || (isReel ? "Reel" : "Film")}
          </span>
          {isReel && (
            <span className="rounded-full bg-black/40 border border-white/15 px-2 py-0.5 text-[10px] text-white/60 font-mono">
              9:16
            </span>
          )}
        </div>
        <h4 className="font-display text-sm sm:text-base font-bold text-white truncate drop-shadow-md">
          {item.title}
        </h4>
        {item.client && (
          <p className="text-xs text-white/70 font-sans truncate">{item.client}</p>
        )}
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
