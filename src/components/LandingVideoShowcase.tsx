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
  Sparkles,
} from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { portfolio, type PortfolioItem } from "@/lib/constants";
import { getPortfolioItems } from "@/lib/cms";
import { cn } from "@/lib/utils";

interface VideoCardProps {
  video: PortfolioItem & { videoSrc: string };
  index: number;
  onSelect?: (video: PortfolioItem) => void;
}

/* ─── Interactive Reel Card (Hover to Play on Desktop, Tap to Play on Mobile) ─── */
function ReelCard({ video, index, onSelect }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Lazy-load with IntersectionObserver
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
      { rootMargin: "150px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.muted = true;
      const p = videoRef.current.play();
      if (p !== undefined) {
        p.then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleCardClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.muted = true;
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
    if (onSelect) onSelect(video);
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      className="group relative flex flex-col w-full cursor-pointer transition-all duration-500 text-left select-none hover:scale-[1.03]"
    >
      {/* Smartphone Frame Container */}
      <div
        className={cn(
          "relative aspect-[9/16] w-full overflow-hidden rounded-[2rem] p-1.5 sm:p-2 bg-gradient-to-b border-2 transition-all duration-500 shadow-2xl",
          isHovered || isPlaying
            ? "from-white/30 via-sage/40 to-sage/20 border-sage shadow-[0_0_35px_rgba(77,184,154,0.35)]"
            : "from-white/15 via-white/10 to-white/5 border-white/20 hover:border-white/40"
        )}
      >
        {/* Phone Screen */}
        <div className="relative h-full w-full overflow-hidden rounded-[1.6rem] bg-forest-dark/50">
          {/* Speaker Notch */}
          <div className="absolute top-2 left-1/2 z-20 h-1 w-8 sm:w-10 -translate-x-1/2 rounded-full bg-black/60 backdrop-blur-md border border-white/20" />

          {/* Video — only plays on hover or tap */}
          {isVisible && (
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
              src={encodeURI(video.videoSrc)}
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
            />
          )}

          {/* Fallback ambient glow before load */}
          {!isVisible && (
            <div className="absolute inset-0 flex items-center justify-center bg-forest-deep">
              <Film size={20} className="text-sage/30 animate-pulse" />
            </div>
          )}

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

          {/* Play Overlay Icon (shows when paused) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            {!isPlaying && (
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md border border-white/25 transition-transform duration-300 group-hover:scale-110 group-hover:bg-sage group-hover:text-forest-deep">
                <Play size={16} fill="currentColor" className="ml-0.5" />
              </div>
            )}
          </div>

          {/* Card Info Badge */}
          <div className="absolute bottom-3 left-2.5 right-2.5 z-10">
            <span className="font-sans text-[9px] sm:text-[10px] font-bold text-sage-light uppercase tracking-wider block truncate">
              {video.client || video.industry || "Brand Reel"}
            </span>
            <p className="font-display text-xs font-bold text-white truncate mt-0.5">
              {video.title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LandingVideoShowcase() {
  const [items, setItems] = useState<PortfolioItem[]>(portfolio.items);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const mainVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    async function fetchDynamicData() {
      const data = await getPortfolioItems();
      if (data && data.length > 0) {
        setItems(data.filter((item) => Boolean(item.videoSrc)));
      }
    }
    fetchDynamicData();
  }, []);

  // Filter 5 Content Videos + 5 AI Videos for Full Width Desktop Grid (no empty right green space)
  const contentVideos = items
    .filter((item): item is PortfolioItem & { videoSrc: string } =>
      typeof item.videoSrc === "string" &&
      item.videoSrc.length > 0 &&
      (item.section === "content-videos" || (!item.section && !item.videoSrc.includes("/AI/")))
    )
    .slice(0, 5);

  const aiVideos = items
    .filter((item): item is PortfolioItem & { videoSrc: string } =>
      typeof item.videoSrc === "string" &&
      item.videoSrc.length > 0 &&
      (item.section === "ai-concept-ads" || item.videoSrc.includes("/AI/"))
    )
    .slice(0, 5);

  // Standalone Main Featured Showcase Video (Independent of cards)
  const standaloneHeroVideo = contentVideos[0] || aiVideos[0] || {
    id: "hero-featured",
    title: "Crown Plaza Turn Up Aftermovie",
    client: "Crowne Plaza Hotels",
    videoSrc: "/videos/Content_video_webm/TURN UP CROWN PLAZA.webm",
  };

  const togglePlayMain = () => {
    if (!mainVideoRef.current) return;
    if (isPlaying) {
      mainVideoRef.current.pause();
      setIsPlaying(false);
    } else {
      mainVideoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMuteMain = () => {
    if (!mainVideoRef.current) return;
    mainVideoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="relative overflow-hidden bg-forest-deep py-20 md:py-32">
      {/* Ambient background lighting */}
      <div
        className="pointer-events-none absolute left-1/2 top-10 h-[32rem] w-[50rem] -translate-x-1/2 rounded-full bg-sage/10 blur-[130px]"
        aria-hidden
      />
      <div className="bg-grid absolute inset-0 opacity-15" />
      <div className="grain-texture absolute inset-0" />

      <div className="container-wide relative z-10">
        {/* Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-sage flex items-center justify-center gap-2">
            <Film size={14} />
            Featured Showreels
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Craft in Motion
          </h2>
          <p className="mt-5 font-sans text-base leading-relaxed text-white/65 md:text-lg">
            Hover or tap to preview featured commercial films and AI concept ads.
          </p>
        </ScrollReveal>

        {/* ── Standalone Main Featured Brand Video ── */}
        <ScrollReveal className="mb-20">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/15 bg-black/60 shadow-[0_25px_60px_rgba(0,0,0,0.5)]">
            <div className="relative aspect-video w-full">
              <video
                ref={(el) => {
                  if (el) {
                    el.muted = isMuted;
                    el.defaultMuted = isMuted;
                    el.setAttribute("playsinline", "true");
                    el.setAttribute("webkit-playsinline", "true");
                    const p = el.play();
                    if (p !== undefined) p.catch(() => {});
                  }
                  mainVideoRef.current = el;
                }}
                src={encodeURI(standaloneHeroVideo.videoSrc)}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload="auto"
                onClick={togglePlayMain}
                className="h-full w-full object-cover cursor-pointer"
              />

              {/* Controls bar */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl bg-forest-deep/80 p-3.5 backdrop-blur-md border border-white/10 z-20">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlayMain}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage text-forest-deep transition-transform hover:scale-105"
                  >
                    {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
                  </button>
                  <div>
                    <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-sage-light block">
                      Featured Brand Film
                    </span>
                    <h3 className="font-display text-sm font-bold text-white line-clamp-1">
                      {standaloneHeroVideo.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={toggleMuteMain}
                  className="flex items-center gap-2 rounded-xl bg-white/10 px-3.5 py-2 font-sans text-xs font-semibold text-white hover:bg-white/20 transition-all border border-white/10"
                >
                  {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                  <span className="hidden sm:inline">{isMuted ? "Unmute" : "Mute"}</span>
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Section 1: Content Videos (5 Cards Grid - Full Width) ── */}
        <div className="mb-16 md:mb-24">
          <div className="mb-8 px-2">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-sage">
              Content Studio
            </p>
            <h3 className="font-display text-2xl font-bold text-white md:text-3xl mt-1">
              Content Videos
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5 w-full">
            {contentVideos.map((video, idx) => (
              <ReelCard key={video.id} video={video} index={idx} />
            ))}
          </div>
        </div>

        {/* ── Section 2: AI Concept Ads (5 Cards Grid - Full Width) ── */}
        <div className="mb-16 md:mb-20">
          <div className="mb-8 px-2">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-sage flex items-center gap-1.5">
              <Sparkles size={13} />
              AI Creative Lab
            </p>
            <h3 className="font-display text-2xl font-bold text-white md:text-3xl mt-1">
              AI Concept Ads
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5 w-full">
            {aiVideos.map((video, idx) => (
              <ReelCard key={video.id} video={video} index={idx} />
            ))}
          </div>
        </div>

        {/* Explore Full Portfolio CTA */}
        <ScrollReveal className="text-center mt-12">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-2xl bg-sage px-8 py-4 font-sans text-sm font-bold text-forest-deep hover:bg-sage-light transition-all shadow-xl hover:scale-105"
          >
            Explore Full Portfolio (39+ Reels)
            <ArrowUpRight size={18} />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
