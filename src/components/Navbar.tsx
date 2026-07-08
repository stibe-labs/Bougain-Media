"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { navLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";

const darkHeroPaths = ["/", "/services", "/portfolio", "/contact"];

function hasDarkHero(pathname: string) {
  return darkHeroPaths.some(
    (p) => pathname === p || (p !== "/" && pathname.startsWith(p)),
  );
}

function isActiveLink(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const darkHero = hasDarkHero(pathname);
  const [scrolled, setScrolled] = useState(!darkHero);
  const [mobileOpen, setMobileOpen] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    if (!darkHero) {
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
  }, [darkHero, pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const onHero = darkHero && !scrolled;
  const navbarLinks = navLinks.filter((link) => link.href !== "/careers");

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        onHero ? "bg-transparent" : "glass-nav shadow-sm max-md:!backdrop-blur-none max-md:bg-cream/95",
      )}
    >
      <div className="container-wide flex h-16 items-center justify-between px-4 sm:h-20 sm:px-5 md:px-8 lg:px-12">
        <Logo
          onDarkBg={onHero}
          type={isHome && onHero ? "icon" : "full"}
          size={isHome && onHero ? "md" : "lg"}
          className="shrink-0 sm:!w-auto"
        />

        <nav className="hidden items-center gap-6 lg:flex">
          {navbarLinks.map((link) => {
            const active = isActiveLink(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative font-sans text-sm font-medium transition-colors duration-200",
                  "after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-out",
                  "hover:after:scale-x-100",
                  active && "after:scale-x-100",
                  onHero
                    ? "text-white/70 after:bg-sage-light hover:text-white"
                    : "text-forest-deep/60 after:bg-sage hover:text-forest-deep",
                  active && (onHero ? "text-white" : "text-forest-deep"),
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button
            href="/contact"
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
          "fixed inset-0 top-16 z-40 bg-forest-deep transition-all duration-300 sm:top-20 lg:hidden",
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <nav className="flex flex-col gap-2 px-6 py-8">
          {navbarLinks.map((link) => {
            const active = isActiveLink(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
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
            href="/contact"
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
