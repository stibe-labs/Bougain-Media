"use client";

import { useEffect } from "react";

/**
 * Toggles `is-scrolling` on <html> during active scroll so CSS can
 * pause expensive backdrop-blur / infinite animations for smoother frames.
 */
export function ScrollOptimizer() {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let scrolling = false;
    let rafId: number | undefined;

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = undefined;

        if (!scrolling) {
          scrolling = true;
          document.documentElement.classList.add("is-scrolling");
        }
        clearTimeout(timer);
        timer = setTimeout(() => {
          scrolling = false;
          document.documentElement.classList.remove("is-scrolling");
        }, 180);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
      clearTimeout(timer);
      document.documentElement.classList.remove("is-scrolling");
    };
  }, []);

  return null;
}
