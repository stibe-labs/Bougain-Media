"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatedMesh } from "@/components/AnimatedMesh";
import { normalizeVideoSrc, getVideoSources } from "@/lib/cms";

export function HeroVideo({
  src = "videos/Content Videos/happy-2.webm",
  meshRgb = "77, 184, 154",
  meshRgb2 = "168, 230, 207",
}: {
  src?: string;
  meshRgb?: string;
  meshRgb2?: string;
}) {
  const normalizedSrc = normalizeVideoSrc(src) || src;
  const sources = getVideoSources(normalizedSrc);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");

    const onCanPlay = () => {
      setShowVideo(true);
      const p = video.play();
      if (p !== undefined) p.catch(() => {});
    };
    const onError = () => setShowVideo(false);

    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("error", onError);
    video.load();
    const p = video.play();
    if (p !== undefined) p.catch(() => {});

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("error", onError);
    };
  }, [normalizedSrc]);

  return (
    <>
      <AnimatedMesh rgb={meshRgb} rgb2={meshRgb2} />
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          showVideo ? "opacity-25" : "opacity-0"
        }`}
        aria-hidden
      >
        {sources && <source src={sources.mp4} type="video/mp4" />}
        {sources && <source src={sources.webm} type="video/webm" />}
      </video>
    </>
  );
}
