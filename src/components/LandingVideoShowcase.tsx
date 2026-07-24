"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ArrowUpRight,
  Film,
  ChevronLeft,
  ChevronRight,
  Smartphone,
} from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { portfolio, type PortfolioItem } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Filter video items from constants
const featuredVideos = portfolio.items.filter(
  (item): item is PortfolioItem & { videoSrc: string } =>
    item.type === "video" && Boolean(item.videoSrc),
);

export function LandingVideoShowcase() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);

  // Drag-to-scroll state for desktop
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

  const currentVideo = featuredVideos[activeVideoIndex] || featuredVideos[0];

  // Guaranteed video playback handling
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
    
    const playVideo = async () => {
      try {
        await video.play();
        setIsPlaying(true);
      } catch (err) {
        setIsPlaying(false);
      }
    };

    video.load();
    playVideo();
  }, [currentVideo.id, isMuted]);

  // Feather-light smooth scroll animation
  const smoothScrollTo = (targetScrollLeft: number, duration = 750) => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const startScrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const boundedTarget = Math.max(0, Math.min(targetScrollLeft, maxScroll));
    const distance = boundedTarget - startScrollLeft;
    const startTime = performance.now();

    if (animRef.current) cancelAnimationFrame(animRef.current);

    // Quintic ease-out for ultra feather-soft deceleration
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);

      container.scrollLeft = startScrollLeft + distance * easedProgress;

      if (progress < 1) {
        animRef.current = requestAnimationFrame(step);
      }
    };

    animRef.current = requestAnimationFrame(step);
  };

  const scrollSlider = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const scrollAmount = direction === "left" ? -360 : 360;
    smoothScrollTo(sliderRef.current.scrollLeft + scrollAmount, 750);
  };

  const handleSelectVideo = (index: number, e?: React.MouseEvent<HTMLButtonElement>) => {
    if (hasMoved) return; // Prevent selection if user was dragging
    setActiveVideoIndex(index);
    setIsPlaying(true);

    // Feather glide selected card to center of slider
    if (sliderRef.current && e?.currentTarget) {
      const container = sliderRef.current;
      const card = e.currentTarget;
      const cardOffsetLeft = card.offsetLeft;
      const cardWidth = card.clientWidth;
      const containerWidth = container.clientWidth;
      const targetScroll = cardOffsetLeft - containerWidth / 2 + cardWidth / 2;

      smoothScrollTo(Math.max(0, targetScroll), 800);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Mouse Drag Events for Feather Desktop Dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollStart(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.4; // Feather drag speed ratio
    if (Math.abs(walk) > 5) {
      setHasMoved(true);
    }
    sliderRef.current.scrollLeft = scrollStart - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Feather-soft mouse wheel scroll handler
  const handleWheel = (e: React.WheelEvent) => {
    if (!sliderRef.current) return;
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // Allow trackpad horizontal gesture
    e.preventDefault();
    const scrollDelta = e.deltaY * 2.2;
    smoothScrollTo(sliderRef.current.scrollLeft + scrollDelta, 600);
  };

  if (!featuredVideos.length) return null;

  return (
    <section className="content-auto relative overflow-hidden bg-forest-deep py-20 text-white md:py-28 lg:py-32">
      {/* Background ambient accents */}
      <div className="pointer-events-none absolute -left-20 top-1/3 h-96 w-96 rounded-full bg-sage/10 blur-[140px]" aria-hidden />
      <div className="pointer-events-none absolute right-0 bottom-10 h-80 w-80 rounded-full bg-sage/15 blur-[120px]" aria-hidden />
      <div className="bg-grid absolute inset-0 opacity-15" aria-hidden />
      <div className="grain-texture absolute inset-0" aria-hidden />

      <div className="container-wide relative z-10">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 rounded-full bg-sage/20 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-sage-light">
              <Film size={14} />
              <span>Work In Motion</span>
            </div>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Campaign Films &<br />
              <span className="text-sage">Mobile Video Reels</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <p className="max-w-md font-sans text-base leading-relaxed text-white/65 md:text-lg">
              High-impact mobile reels and brand films engineered for scroll-stopping social engagement.
            </p>
          </ScrollReveal>
        </div>

        {/* Featured Main Video Screen */}
        <ScrollReveal delay={120} className="mt-10 md:mt-14">
          <div className="relative overflow-hidden rounded-3xl bg-black border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.6)]">
            <div className="relative aspect-video w-full max-h-[620px] bg-black">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentVideo.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="h-full w-full"
                >
                  <video
                    ref={videoRef}
                    src={currentVideo.videoSrc}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    preload="auto"
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/20 to-transparent opacity-95" />

              {/* Status Badge */}
              <div className="absolute top-6 left-6 z-10 flex items-center gap-2 rounded-full bg-black/60 px-3.5 py-1.5 backdrop-blur-md border border-white/10 text-[11px] font-semibold uppercase tracking-wider text-white">
                <span className="h-2 w-2 rounded-full bg-sage animate-pulse" />
                <span>Now Playing • {activeVideoIndex + 1} of {featuredVideos.length}</span>
              </div>

              {/* Controls at Top Right */}
              <div className="absolute top-6 right-6 z-10 flex items-center gap-3">
                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md border border-white/10 transition-all hover:bg-white/20 hover:scale-105"
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md border border-white/10 transition-all hover:bg-white/20 hover:scale-105"
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>
              </div>

              {/* Video Info Overlay */}
              <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 z-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div className="max-w-2xl">
                  <p className="font-sans text-xs font-semibold uppercase tracking-widest text-sage-light">
                    Client: {currentVideo.client}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl lg:text-4xl">
                    {currentVideo.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-white/80 md:text-base">
                    {currentVideo.description}
                  </p>
                </div>

                <div className="shrink-0 rounded-2xl bg-white/10 p-5 backdrop-blur-md border border-white/15 min-w-[220px]">
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-wider text-sage">
                    Campaign Impact
                  </p>
                  <p className="mt-1 font-display text-xl font-bold text-white">
                    {currentVideo.result}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Mobile Phone Screen Reel Slider Header */}
        <ScrollReveal delay={160} className="mt-14">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone size={20} className="text-sage" />
              <div>
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-sage">
                  Mobile Screen Showcase
                </p>
                <h3 className="mt-0.5 font-display text-xl font-bold text-white md:text-2xl">
                  Tap to Preview Mobile Video Reels
                </h3>
              </div>
            </div>

            {/* Nav Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollSlider("left")}
                aria-label="Previous mobile reel"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/25 active:scale-95"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={() => scrollSlider("right")}
                aria-label="Next mobile reel"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/25 active:scale-95"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>

          {/* Smartphone Frame Cards Feather-Glide Carousel */}
          <div
            ref={sliderRef}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className={cn(
              "-mx-4 px-4 sm:-mx-6 sm:px-6 md:-mx-8 md:px-8 mt-6 flex gap-6 overflow-x-auto py-8 scrollbar-none overscroll-x-contain select-none",
              isDragging ? "cursor-grabbing" : "cursor-grab"
            )}
          >
            {featuredVideos.map((video, idx) => {
              const isActive = idx === activeVideoIndex;
              return (
                <button
                  key={video.id}
                  onClick={(e) => handleSelectVideo(idx, e)}
                  className={cn(
                    "group relative flex flex-col shrink-0 w-[200px] sm:w-[230px] transition-all duration-500 text-left",
                    isActive ? "scale-105" : "hover:scale-[1.02] opacity-85 hover:opacity-100"
                  )}
                >
                  {/* Smartphone Frame Body */}
                  <div
                    className={cn(
                      "relative aspect-[9/16] w-full overflow-hidden rounded-[2.5rem] p-2 bg-gradient-to-b border-2 transition-all duration-500 shadow-2xl",
                      isActive
                        ? "from-white/30 via-sage/40 to-sage/20 border-sage shadow-[0_0_35px_rgba(77,184,154,0.35)]"
                        : "from-white/15 via-white/10 to-white/5 border-white/20 hover:border-white/40"
                    )}
                  >
                    {/* Inner Phone Screen */}
                    <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-black">
                      {/* Speaker Notch */}
                      <div className="absolute top-2 left-1/2 z-20 h-1 w-10 -translate-x-1/2 rounded-full bg-black/60 backdrop-blur-md border border-white/20" />

                      {/* Live Muted Video inside Smartphone Screen */}
                      <video
                        src={video.videoSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                      />

                      {/* Screen Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                      {/* Status / Play Icon Overlay */}
                      <div className="absolute top-4 right-3 z-10">
                        {isActive ? (
                          <span className="rounded-full bg-sage px-2 py-0.5 font-sans text-[9px] font-extrabold uppercase tracking-wider text-forest-deep">
                            Active
                          </span>
                        ) : (
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md group-hover:bg-sage group-hover:text-forest-deep transition-colors">
                            <Play size={12} fill="currentColor" />
                          </div>
                        )}
                      </div>

                      {/* Phone Screen Bottom Info */}
                      <div className="absolute bottom-4 left-3 right-3 z-10">
                        <p className="font-sans text-[9px] font-bold uppercase tracking-wider text-sage-light">
                          {video.client}
                        </p>
                        <p className="mt-0.5 truncate font-display text-xs font-bold text-white">
                          {video.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Bottom CTA */}
        <ScrollReveal delay={200} className="mt-12 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <p className="font-sans text-sm text-white/70">
            Need custom video production or brand shoots for your business?
          </p>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-sage link-underline"
          >
            Explore all portfolio videos
            <ArrowUpRight size={16} />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
