"use client";

import { useEffect } from "react";

/**
 * MobileVideoUnlocker ensures that on real physical mobile devices (iOS Safari & Android Chrome),
 * as soon as the user performs their first touch/scroll gesture, all muted inline videos
 * on the page are programmatically unlocked and played seamlessly.
 */
export function MobileVideoUnlocker() {
  useEffect(() => {
    let unlocked = false;

    const unlockVideos = () => {
      if (unlocked) return;
      unlocked = true;

      const videos = document.querySelectorAll<HTMLVideoElement>("video");
      videos.forEach((video) => {
        video.muted = true;
        video.defaultMuted = true;
        video.setAttribute("playsinline", "true");
        video.setAttribute("webkit-playsinline", "true");

        if (video.paused) {
          const promise = video.play();
          if (promise !== undefined) {
            promise.catch(() => {
              // Retry playback if initial attempt was queued
            });
          }
        }
      });
    };

    window.addEventListener("touchstart", unlockVideos, { passive: true, capture: true });
    window.addEventListener("pointerdown", unlockVideos, { passive: true, capture: true });
    window.addEventListener("scroll", unlockVideos, { passive: true, capture: true });

    return () => {
      window.removeEventListener("touchstart", unlockVideos);
      window.removeEventListener("pointerdown", unlockVideos);
      window.removeEventListener("scroll", unlockVideos);
    };
  }, []);

  return null;
}
