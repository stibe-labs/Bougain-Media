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

    const onScroll = () => {
      if (!scrolling) {
        scrolling = true;
        document.documentElement.classList.add("is-scrolling");
      }
      clearTimeout(timer);
      timer = setTimeout(() => {
        scrolling = false;
        document.documentElement.classList.remove("is-scrolling");
      }, 120);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
      document.documentElement.classList.remove("is-scrolling");
    };
  }, []);

  return null;
}
