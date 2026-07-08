import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
};

const variants = {
  primary:
    "bg-forest-deep text-white border border-forest-deep shadow-[0_12px_40px_rgba(15,61,46,0.28)] hover:bg-forest-hover hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(107,158,143,0.35)]",
  secondary:
    "bg-transparent text-forest-deep border border-forest-deep/25 hover:border-forest-deep/50 hover:bg-forest-deep/5 hover:-translate-y-0.5",
  outline:
    "bg-transparent text-white border border-white/25 hover:border-white/50 hover:bg-white/8 hover:-translate-y-0.5",
  ghost: "bg-transparent text-forest-deep hover:bg-forest-deep/5",
};

const sizes = {
  sm: "min-h-11 px-5 py-2.5 text-sm",
  md: "min-h-12 px-7 py-3.5 text-sm",
  lg: "min-h-14 px-9 py-4 text-base",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  href,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "group/btn inline-flex items-center justify-center gap-2.5 rounded-2xl font-sans font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
