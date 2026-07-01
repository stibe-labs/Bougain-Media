"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatedMesh } from "@/components/AnimatedMesh";

export function HeroVideo({
  src = "/videos/hero-loop.mp4",
  meshRgb = "77, 184, 154",
  meshRgb2 = "168, 230, 207",
}: {
  src?: string;
  meshRgb?: string;
  meshRgb2?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onCanPlay = () => setShowVideo(true);
    const onError = () => setShowVideo(false);

    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("error", onError);
    video.load();

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("error", onError);
    };
  }, [src]);

  return (
    <>
      <AnimatedMesh rgb={meshRgb} rgb2={meshRgb2} />
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          showVideo ? "opacity-25" : "opacity-0"
        }`}
        aria-hidden
      >
        <source src={src} type="video/mp4" />
      </video>
    </>
  );
}
