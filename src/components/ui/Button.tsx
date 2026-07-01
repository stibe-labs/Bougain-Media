import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
};

const variants = {
  primary:
    "bg-forest-deep text-white hover:bg-forest-hover border border-forest-deep shadow-lg shadow-forest-deep/20 hover:shadow-forest-deep/30 hover:-translate-y-0.5",
  secondary:
    "bg-white text-forest-deep hover:bg-cream border border-white/20 shadow-lg shadow-black/10 hover:-translate-y-0.5",
  outline:
    "bg-transparent text-white border border-white/30 hover:bg-white/10 hover:border-white/50",
  ghost: "bg-transparent text-forest-deep hover:bg-forest-deep/5",
};

const sizes = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
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
    "inline-flex items-center justify-center gap-2 rounded-xl font-sans font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
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
