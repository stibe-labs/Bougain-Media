"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { navLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";

function isActiveLink(pathname: string, href: string) {
  if (href === "/#home" || href === "/") return pathname === "/";
  if (href.startsWith("/#")) return pathname === "/";
  if (href === "/careers") return pathname.startsWith("/careers");
  return pathname === href || pathname.startsWith(`${href}/`);
}

function resolveHref(href: string, onHome: boolean) {
  if (onHome && href.startsWith("/#")) return href.slice(1);
  return href;
}

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(!isHome);
  const [mobileOpen, setMobileOpen] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        ticking.current = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome, pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const onHero = isHome && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        onHero
          ? "bg-transparent"
          : "glass-nav shadow-sm",
      )}
    >
      <div className="container-wide flex h-20 items-center justify-between px-5 md:px-8 lg:px-12">
        <Logo
          onDarkBg={onHero}
          type={isHome && onHero ? "icon" : "full"}
          size="2xl"
          className="shrink-0"
        />

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => {
            const active = isActiveLink(pathname, link.href);
            const href = resolveHref(link.href, isHome);
            return (
              <Link
                key={link.href}
                href={href}
                className={cn(
                  "relative font-sans text-sm font-medium transition-colors duration-200",
                  active
                    ? onHero
                      ? "text-white"
                      : "text-forest-deep"
                    : onHero
                      ? "text-white/70 hover:text-white"
                      : "text-forest-deep/60 hover:text-forest-deep",
                )}
              >
                {link.label}
                {active && (
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-px w-full",
                      onHero ? "bg-sage-light" : "bg-sage",
                    )}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button
            href={isHome ? "#contact" : "/#contact"}
            size="sm"
            variant={onHero ? "secondary" : "primary"}
          >
            Let&apos;s Talk
          </Button>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className={cn(
            "rounded-xl p-2.5 transition-colors lg:hidden",
            onHero
              ? "text-white hover:bg-white/10"
              : "text-forest-deep hover:bg-forest-deep/5",
          )}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        className={cn(
          "fixed inset-0 top-20 z-40 bg-forest-deep transition-all duration-300 lg:hidden",
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <nav className="flex flex-col gap-2 px-6 py-8">
          {navLinks.map((link) => {
            const active = isActiveLink(pathname, link.href);
            const href = resolveHref(link.href, isHome);
            return (
              <Link
                key={link.href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-xl px-4 py-4 font-sans text-lg font-medium transition-colors",
                  active
                    ? "bg-sage/20 text-sage-light"
                    : "text-white/90 hover:bg-white/10 hover:text-white",
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <Button
            href={isHome ? "#contact" : "/#contact"}
            className="mt-4 w-full"
            onClick={() => setMobileOpen(false)}
          >
            Let&apos;s Talk
          </Button>
        </nav>
      </div>
    </header>
  );
}
