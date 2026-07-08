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
        "mb-5 inline-block font-sans text-xs font-semibold uppercase tracking-[0.28em]",
        dark ? "text-sage" : "text-sage",
        className,
      )}
    >
      {children}
    </span>
  );
}
