"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { logos } from "@/lib/constants";
import { cn } from "@/lib/utils";

const MIN_DISPLAY_MS = 2600;
const FADE_MS = 800;
const MAX_DISPLAY_MS = 5000;

export function PageLoader() {
  const [phase, setPhase] = useState<"loading" | "exit" | "done">("loading");

  useEffect(() => {
    document.documentElement.dataset.loaderPhase = phase;
    return () => {
      delete document.documentElement.dataset.loaderPhase;
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "done") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  useEffect(() => {
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
      <div className="loader-logo-pulse relative h-28 w-48 sm:h-36 sm:w-60 md:h-44 md:w-72 lg:h-48 lg:w-80">
        <Image
          src={logos.fullWhite}
          alt="Bougain Mediaa"
          fill
          priority
          sizes="(max-width: 640px) 256px, 480px"
          className="object-contain"
        />
      </div>

      <div className="loader-progress-track absolute bottom-12 left-1/2 h-0.5 w-40 -translate-x-1/2 overflow-hidden rounded-full bg-white/10 sm:bottom-16 sm:w-48 md:bottom-20 md:w-56">
        <div className="loader-progress-bar h-full rounded-full bg-sage-light" />
      </div>
    </div>
  );
}
