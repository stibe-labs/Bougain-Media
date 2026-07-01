import Image from "next/image";
import { logos } from "@/lib/constants";
import { cn } from "@/lib/utils";

type BrandWatermarkProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  opacity?: number;
};

const sizes = {
  sm: 120,
  md: 200,
  lg: 320,
};

export function BrandWatermark({
  className,
  size = "md",
  opacity = 0.04,
}: BrandWatermarkProps) {
  const dim = sizes[size];

  return (
    <div
      className={cn("pointer-events-none absolute select-none", className)}
      aria-hidden
      style={{ opacity }}
    >
      <Image
        src={logos.iconGreen}
        alt=""
        width={dim}
        height={dim}
        className="object-contain"
      />
    </div>
  );
}
