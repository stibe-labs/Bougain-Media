"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { logos } from "@/lib/constants";
import { cn } from "@/lib/utils";

const LOADER_KEY = "bougain-loader-shown";
const MIN_DISPLAY_MS = 500;
const FADE_MS = 300;
const MAX_DISPLAY_MS = 2500;

function wasLoaderShown() {
  try {
    return sessionStorage.getItem(LOADER_KEY) === "1";
  } catch {
    return false;
  }
}

function markLoaderShown() {
  try {
    sessionStorage.setItem(LOADER_KEY, "1");
  } catch {
    // sessionStorage unavailable (e.g. private mode)
  }
}

export function PageLoader() {
  const [phase, setPhase] = useState<"loading" | "exit" | "done">("loading");

  useEffect(() => {
    if (wasLoaderShown()) {
      setPhase("done");
      return;
    }

    const startedAt = Date.now();
    let exitTimer: ReturnType<typeof setTimeout> | undefined;
    let doneTimer: ReturnType<typeof setTimeout> | undefined;
    let dismissed = false;

    const dismiss = () => {
      if (dismissed) return;
      dismissed = true;

      const elapsed = Date.now() - startedAt;
      const wait = Math.max(0, MIN_DISPLAY_MS - elapsed);

      exitTimer = setTimeout(() => {
        setPhase("exit");
        doneTimer = setTimeout(() => {
          markLoaderShown();
          setPhase("done");
        }, FADE_MS);
      }, wait);
    };

    if (document.readyState === "complete") {
      dismiss();
    } else {
      const onReady = () => {
        if (document.readyState === "complete") dismiss();
      };

      document.addEventListener("readystatechange", onReady);
      window.addEventListener("load", dismiss, { once: true });

      const safetyTimer = setTimeout(dismiss, MAX_DISPLAY_MS);

      return () => {
        document.removeEventListener("readystatechange", onReady);
        window.removeEventListener("load", dismiss);
        clearTimeout(safetyTimer);
        if (exitTimer) clearTimeout(exitTimer);
        if (doneTimer) clearTimeout(doneTimer);
      };
    }

    const safetyTimer = setTimeout(dismiss, MAX_DISPLAY_MS);

    return () => {
      clearTimeout(safetyTimer);
      if (exitTimer) clearTimeout(exitTimer);
      if (doneTimer) clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={cn(
        "loader-splash fixed inset-0 z-[200] flex flex-col items-center justify-center bg-forest-deep",
        phase === "exit" && "loader-splash-exit",
      )}
      aria-hidden={phase === "exit"}
      aria-label="Loading"
    >
      <div className="loader-logo-pulse relative h-48 w-[22rem] sm:h-56 sm:w-[26rem] md:h-64 md:w-[30rem]">
        <Image
          src={logos.fullWhite}
          alt="Bougain Mediaa"
          fill
          priority
          sizes="(max-width: 640px) 352px, 480px"
          className="object-contain"
        />
      </div>

      <div className="loader-progress-track absolute bottom-16 left-1/2 h-0.5 w-48 -translate-x-1/2 overflow-hidden rounded-full bg-white/10 md:bottom-20 md:w-56">
        <div className="loader-progress-bar h-full rounded-full bg-sage-light" />
      </div>
    </div>
  );
}
