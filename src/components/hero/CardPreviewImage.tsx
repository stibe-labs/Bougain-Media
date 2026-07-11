"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface CardPreviewImageProps {
  src: string;
  alt: string;
}

export function CardPreviewImage({ src, alt }: CardPreviewImageProps) {
  return (
    <motion.div
      className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10"
      animate={{ scale: [1, 1.02, 1] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="280px"
        priority={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a2e24]/90 via-[#0a2e24]/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-accent/5 to-transparent" />
    </motion.div>
  );
}
