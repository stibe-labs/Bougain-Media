"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  motion,
  useMotionValue,
  animate,
  useReducedMotion,
} from "framer-motion";
import { ServiceCard, services } from "./ServiceCard";

const AUTO_INTERVAL = 3000;
const DRAG_THRESHOLD = 50;

const slideEase = [0.32, 0.72, 0, 1] as [number, number, number, number];

function normalizeOffset(index: number, active: number, total: number) {
  let diff = index - active;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

export function CardCarousel() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragX = useMotionValue(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = services.length;

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % total) + total) % total);
    },
    [total]
  );

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (reduceMotion || isHovered || isDragging) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(goNext, AUTO_INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [reduceMotion, isHovered, isDragging, goNext]);

  const handleDragEnd = () => {
    const offset = dragX.get();
    if (offset < -DRAG_THRESHOLD) goNext();
    else if (offset > DRAG_THRESHOLD) goPrev();

    animate(dragX, 0, {
      type: "tween",
      duration: 0.5,
      ease: slideEase,
    });
    setIsDragging(false);
  };

  const handlePointerDown = (e: ReactPointerEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
  };

  return (
    <div
      className="relative h-[440px] w-full max-w-[520px] select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Bougain Media services carousel"
      role="region"
    >
      <motion.div
        className="relative h-full w-full touch-pan-y"
        style={{ x: dragX }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.08}
        dragMomentum={false}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        onPointerDown={handlePointerDown}
      >
        {services.map((service, index) => {
          const offset = normalizeOffset(index, activeIndex, total);
          return (
            <ServiceCard
              key={service.id}
              service={service}
              isActive={offset === 0}
              offset={offset}
              onClick={() => {
                if (offset !== 0) goTo(index);
              }}
            />
          );
        })}
      </motion.div>

      <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
        {services.map((service, index) => (
          <button
            key={service.id}
            type="button"
            aria-label={`Go to ${service.title.join(" ")}`}
            onClick={() => goTo(index)}
            className="group p-1"
          >
            <span
              className={`block h-1 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-5 bg-emerald-accent/80"
                  : "w-1.5 bg-white/25 group-hover:bg-white/40"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
