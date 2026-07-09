"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  phase: number;
};

type ParticleFieldProps = {
  mouseRef: React.RefObject<{ x: number; y: number }>;
};

const MOUSE_RADIUS = 120;
const MOUSE_STRENGTH = 0.35;
const DESKTOP_COUNT = 580;
const MOBILE_COUNT = 280;

function createParticles(count: number, width: number, height: number): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.3) * 0.25,
    vy: (Math.random() - 0.5) * 0.12,
    size: Math.random() * 3 + 1,
    opacity: Math.random() * 0.35 + 0.12,
    phase: Math.random() * Math.PI * 2,
  }));
}

export function ParticleField({ mouseRef }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef(0);
  const timeRef = useRef(0);
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    reduceMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = width < 768 ? MOBILE_COUNT : DESKTOP_COUNT;
      particlesRef.current = createParticles(count, width, height);
    };

    const simulate = (time: number) => {
      const mouse = mouseRef.current ?? { x: -9999, y: -9999 };

      for (const particle of particlesRef.current) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        particle.x += Math.sin(time * 0.4 + particle.phase) * 0.08;
        particle.y += Math.cos(time * 0.35 + particle.phase) * 0.06;

        const mdx = particle.x - mouse.x;
        const mdy = particle.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mDist < MOUSE_RADIUS && mDist > 0) {
          const force = (1 - mDist / MOUSE_RADIUS) * MOUSE_STRENGTH;
          particle.vx += (mdx / mDist) * force;
          particle.vy += (mdy / mDist) * force;
        }

        particle.vx *= 0.985;
        particle.vy *= 0.985;

        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = height + 20;
        if (particle.y > height + 20) particle.y = -20;
      }
    };

    const draw = (timestamp: number) => {
      if (!reduceMotionRef.current) {
        timeRef.current = timestamp * 0.001;
        simulate(timeRef.current);
      }

      ctx.clearRect(0, 0, width, height);

      for (const particle of particlesRef.current) {
        const glow = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 2.5,
        );
        glow.addColorStop(0, `rgba(110, 235, 131, ${particle.opacity})`);
        glow.addColorStop(0.5, `rgba(110, 235, 131, ${particle.opacity * 0.35})`);
        glow.addColorStop(1, "rgba(110, 235, 131, 0)");

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    resize();
    frameRef.current = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [mouseRef]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[2] h-full w-full"
      aria-hidden
    />
  );
}
