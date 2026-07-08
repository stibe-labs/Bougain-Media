import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { contact, footer } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest-deep text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sage/50 to-transparent" />
      <div className="bg-grid absolute inset-0 opacity-10" />

      <div className="container-wide relative section-padding !pb-10">
        <div className="grid gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="md:col-span-2 lg:col-span-1">
            <Logo onDarkBg className="mb-5" size="xl" />
            <p className="max-w-xs font-sans text-sm leading-relaxed text-white/50">
              Big Ideas. Bigger Results. Digital marketing that helps your brand
              grow beyond boundaries.
            </p>
          </div>

          <div>
            <h3 className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-sage">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footer.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-white/50 transition-colors hover:text-sage-light link-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-sage">
              Support
            </h3>
            <ul className="space-y-3">
              {footer.supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-white/50 transition-colors hover:text-sage-light link-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-sage">
              Contact
            </h3>
            <ul className="space-y-4 text-sm text-white/50">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-3 break-all font-sans transition-colors hover:text-sage-light sm:break-normal"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                    <Mail size={14} />
                  </span>
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={contact.phoneHref}
                  className="inline-flex items-center gap-3 font-sans transition-colors hover:text-sage-light"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                    <Phone size={14} />
                  </span>
                  {contact.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/8 pt-8 text-center font-sans text-sm text-white/30">
          {footer.copyright}
        </div>
      </div>
    </footer>
  );
}
