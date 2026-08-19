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
      className="group relative flex flex-col shrink-0 w-[210px] sm:w-[240px] cursor-pointer transition-all duration-500 text-left select-none hover:scale-105"
    >
      {/* Smartphone Frame Container */}
      <div
        className={cn(
          "relative aspect-[9/16] w-full overflow-hidden rounded-[2.2rem] p-2 bg-gradient-to-b border-2 transition-all duration-500 shadow-2xl",
          isHovered || isPlaying
            ? "from-white/30 via-sage/40 to-sage/20 border-sage shadow-[0_0_35px_rgba(77,184,154,0.35)]"
            : "from-white/15 via-white/10 to-white/5 border-white/20 hover:border-white/40"
        )}
      >
        {/* Phone Screen */}
        <div className="relative h-full w-full overflow-hidden rounded-[1.8rem] bg-black">
          {/* Speaker Notch */}
          <div className="absolute top-2 left-1/2 z-20 h-1 w-10 -translate-x-1/2 rounded-full bg-black/60 backdrop-blur-md border border-white/20" />

          {/* Video — shows 1st frame thumbnail via #t=0.001 */}
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
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <Film size={20} className="text-sage/30 animate-pulse" />
            </div>
          )}

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

          {/* Play Overlay Icon (shows when paused) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            {!isPlaying && (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md border border-white/25 transition-transform duration-300 group-hover:scale-110 group-hover:bg-sage group-hover:text-forest-deep">
                <Play size={18} fill="currentColor" className="ml-0.5" />
              </div>
            )}
          </div>

          {/* Card Info Badge */}
          <div className="absolute bottom-3 left-3 right-3 z-10">
            <span className="font-sans text-[10px] font-bold text-sage-light uppercase tracking-wider block truncate">
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
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchDynamicData() {
      const data = await getPortfolioItems();
      if (data && data.length > 0) {
        setItems(data.filter((item) => Boolean(item.videoSrc)));
      }
    }
    fetchDynamicData();
  }, []);

  // Featured Content Videos + Featured AI Videos combined into a single continuous carousel
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

  const allReelCards = [...contentVideos, ...aiVideos];

  // Standalone Main Featured Showcase Video (Independent of cards)
  const standaloneHeroVideo = {
    id: "hero-featured",
    title: "HAPPY 2",
    client: "Bougain Media",
    videoSrc: "/videos/Content_video_webm/HAPPY_2.webm",
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

  const scrollSlider = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const amount = direction === "left" ? -320 : 320;
    sliderRef.current.scrollBy({ left: amount, behavior: "smooth" });
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
                ref={mainVideoRef}
                src={encodeURI(standaloneHeroVideo.videoSrc)}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                onClick={togglePlayMain}
                className="h-full w-full object-cover cursor-pointer"
              />
            </div>
          </div>
        </ScrollReveal>

        {/* ── Single Continuous Mobile Video Reels Slider ── */}
        <div className="mb-16 md:mb-24">
          <div className="flex items-center justify-between mb-8 px-2">
            <div>
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-sage flex items-center gap-2">
                <Smartphone size={14} />
                Mobile Screen Showcase
              </p>
              <h3 className="font-display text-2xl font-bold text-white md:text-3xl mt-1">
                Hover to Preview Mobile Video Reels
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollSlider("left")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/15"
                aria-label="Previous Reels"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scrollSlider("right")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/15"
                aria-label="Next Reels"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Continuous Single Track Carousel */}
          <div
            ref={sliderRef}
            className="flex gap-5 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory"
          >
            {allReelCards.map((video, idx) => (
              <div key={video.id} className="snap-start">
                <ReelCard video={video} index={idx} />
              </div>
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
