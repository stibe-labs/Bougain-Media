"use client";

import React from "react";
import { ReactLenis } from "@studio-freight/react-lenis";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisOptions = {
    lerp: 0.1,
    duration: 1.5,
    smoothTouch: false,
    syncTouch: false,
  };

  return (
    <ReactLenis root options={lenisOptions as any}>
      {children as any}
    </ReactLenis>
  );
}
