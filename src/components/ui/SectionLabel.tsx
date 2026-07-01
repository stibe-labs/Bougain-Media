import { cn } from "@/lib/utils";

export function SectionLabel({
  children,
  className,
  dark = false,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <span
      className={cn(
        "mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-[0.2em]",
        dark
          ? "border-sage-light/30 bg-white/10 text-sage-light"
          : "border-sage/30 bg-sage/10 text-sage",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}
