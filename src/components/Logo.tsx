import Image from "next/image";
import Link from "next/link";
import { logos } from "@/lib/constants";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Pass true when the logo sits on a dark/green background → shows white logo */
  onDarkBg?: boolean;
  /** @deprecated Use onDarkBg */
  dark?: boolean;
  type?: "full" | "icon";
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
};

const sizes = {
  sm: { full: { h: 48, w: 168 }, icon: { h: 48, w: 48 } },
  md: { full: { h: 56, w: 196 }, icon: { h: 56, w: 56 } },
  lg: { full: { h: 64, w: 224 }, icon: { h: 64, w: 64 } },
  xl: { full: { h: 72, w: 252 }, icon: { h: 72, w: 72 } },
  "2xl": { full: { h: 80, w: 300 }, icon: { h: 80, w: 80 } },
};

export function Logo({
  className,
  onDarkBg,
  dark,
  type = "full",
  size = "md",
}: LogoProps) {
  const useWhite = onDarkBg ?? dark ?? false;

  const src =
    type === "icon"
      ? useWhite
        ? logos.iconWhite
        : logos.iconGreen
      : useWhite
        ? logos.fullWhite
        : logos.fullGreen;

  const dim = sizes[size][type];

  return (
    <Link
      href="/"
      className={cn(
        "relative inline-block shrink-0 bg-transparent transition-opacity hover:opacity-90",
        className,
      )}
      style={{ width: dim.w, height: dim.h }}
    >
      <Image
        src={src}
        alt="Bougain Mediaa"
        fill
        sizes={`${dim.w}px`}
        className="bg-transparent object-contain object-left"
        priority
      />
    </Link>
  );
}
