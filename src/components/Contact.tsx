"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { contact, contactSection, images, services } from "@/lib/constants";
import { cn } from "@/lib/utils";

function ContactHero() {
  return (
    <div className="grain-texture relative overflow-hidden bg-forest-deep section-padding !pb-20 !pt-32 md:!pt-44">
      <div
        className="pointer-events-none absolute left-1/3 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-sage/20 blur-[100px]"
        aria-hidden
      />
      <div className="bg-grid absolute inset-0 opacity-20" />
      <div className="container-wide relative">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-sage">
          Get in Touch
        </p>
        <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
          {contactSection.headline}
        </h1>
        <p className="mt-6 max-w-lg font-sans text-lg leading-relaxed text-white/55">
          {contactSection.supporting}
        </p>
      </div>
    </div>
  );
}

export function Contact({ standalone = false }: { standalone?: boolean }) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      await new Promise((r) => setTimeout(r, 800));
      console.log(Object.fromEntries(data));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {standalone && <ContactHero />}

      <section
        id="contact"
        className={cn(
          "grain-texture content-auto relative overflow-hidden bg-cream section-padding",
          standalone && "!pt-14 md:!pt-20",
        )}
      >
        <div className="bg-mesh absolute inset-0" />

        <div className="container-wide relative">
          {!standalone && (
            <ScrollReveal className="mb-14 max-w-2xl">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-sage">
                Get in Touch
              </p>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-forest-deep md:text-5xl lg:text-6xl">
                {contactSection.headline}
              </h2>
              <p className="mt-5 max-w-md font-sans text-lg leading-relaxed text-grey-muted">
                {contactSection.supporting}
              </p>
            </ScrollReveal>
          )}

          <div className="grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            {/* Left — premium contact channels */}
            <ScrollReveal>
              <div className="space-y-10">
                {/* WhatsApp primary CTA */}
                <a
                  href={contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 rounded-3xl bg-forest-deep p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,61,46,0.3)] md:p-7"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-whatsapp/20 text-whatsapp transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
                    <WhatsAppIcon size={26} />
                  </span>
                  <div>
                    <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-sage">
                      Preferred
                    </p>
                    <p className="mt-1 font-display text-xl font-bold text-white md:text-2xl">
                      Chat on WhatsApp
                    </p>
                    <p className="mt-1 font-sans text-sm text-white/50">
                      {contact.whatsapp}
                    </p>
                  </div>
                  <MessageCircle
                    size={20}
                    className="ml-auto text-white/30 transition-colors group-hover:text-sage"
                    strokeWidth={1.5}
                  />
                </a>

                <div className="space-y-5">
                  <a
                    href={contact.phoneHref}
                    className="group flex items-center gap-4 py-2"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-forest-deep/10 bg-white transition-colors group-hover:border-sage/40 group-hover:bg-sage/10">
                      <Phone size={18} className="text-sage" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-sage">
                        Phone
                      </p>
                      <p className="mt-0.5 font-sans text-base font-medium text-forest-deep">
                        {contact.phone}
                      </p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${contact.email}`}
                    className="group flex items-center gap-4 py-2"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-forest-deep/10 bg-white transition-colors group-hover:border-sage/40 group-hover:bg-sage/10">
                      <Mail size={18} className="text-sage" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-sage">
                        Email
                      </p>
                      <p className="mt-0.5 break-all font-sans text-base font-medium text-forest-deep">
                        {contact.email}
                      </p>
                    </div>
                  </a>
                </div>

                <div className="grid gap-5 border-t border-forest-deep/8 pt-8 sm:grid-cols-2">
                  <div className="flex gap-3">
                    <Clock size={18} className="mt-0.5 shrink-0 text-sage" strokeWidth={1.75} />
                    <div>
                      <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-sage">
                        Response time
                      </p>
                      <p className="mt-1 font-sans text-sm text-forest-deep/80">
                        {contact.responseTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <MapPin size={18} className="mt-0.5 shrink-0 text-sage" strokeWidth={1.75} />
                    <div>
                      <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-sage">
                        Hours & office
                      </p>
                      <p className="mt-1 font-sans text-sm text-forest-deep/80">
                        {contact.businessHours}
                      </p>
                      <p className="mt-0.5 font-sans text-sm text-grey-muted">
                        {contact.office}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Office image */}
                <div className="relative mt-2 aspect-[16/10] overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(15,61,46,0.12)]">
                  <Image
                    src={images.about}
                    alt="Bougain Mediaa studio"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/50 to-transparent" />
                  <p className="absolute bottom-4 left-5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                    {contact.office}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Right — form */}
            <ScrollReveal delay={100}>
              <div className="rounded-3xl border border-forest-deep/6 bg-white p-7 shadow-[0_24px_60px_rgba(15,61,46,0.07)] md:p-10">
                <h3 className="font-display text-2xl font-bold text-forest-deep md:text-3xl">
                  Send a message
                </h3>
                <p className="mt-2 font-sans text-sm text-grey-muted">
                  Prefer email? Fill this in — we reply personally.
                </p>

                <form onSubmit={handleSubmit} className="mt-8">
                  <div className="space-y-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block font-sans text-sm font-medium text-forest-deep"
                      >
                        Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        required
                        className="w-full rounded-2xl border border-forest-deep/12 bg-cream/50 px-4 py-3.5 font-sans text-sm outline-none transition-colors focus:border-sage focus:bg-white focus:ring-2 focus:ring-sage/20"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block font-sans text-sm font-medium text-forest-deep"
                      >
                        Email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full rounded-2xl border border-forest-deep/12 bg-cream/50 px-4 py-3.5 font-sans text-sm outline-none transition-colors focus:border-sage focus:bg-white focus:ring-2 focus:ring-sage/20"
                        placeholder="you@company.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 block font-sans text-sm font-medium text-forest-deep"
                      >
                        Phone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="w-full rounded-2xl border border-forest-deep/12 bg-cream/50 px-4 py-3.5 font-sans text-sm outline-none transition-colors focus:border-sage focus:bg-white focus:ring-2 focus:ring-sage/20"
                        placeholder="+91 ..."
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="service"
                        className="mb-2 block font-sans text-sm font-medium text-forest-deep"
                      >
                        Service interested in
                      </label>
                      <select
                        id="service"
                        name="service"
                        className="w-full rounded-2xl border border-forest-deep/12 bg-cream/50 px-4 py-3.5 font-sans text-sm outline-none transition-colors focus:border-sage focus:bg-white focus:ring-2 focus:ring-sage/20"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select a service
                        </option>
                        {services.items.map((s) => (
                          <option key={s.title} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="mb-2 block font-sans text-sm font-medium text-forest-deep"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        className="w-full resize-none rounded-2xl border border-forest-deep/12 bg-cream/50 px-4 py-3.5 font-sans text-sm outline-none transition-colors focus:border-sage focus:bg-white focus:ring-2 focus:ring-sage/20"
                        placeholder="Tell us about your project..."
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    size="lg"
                    className={cn("mt-7 w-full", loading && "opacity-70")}
                  >
                    <Send size={16} strokeWidth={1.75} />
                    {loading ? "Sending..." : "Send Message"}
                  </Button>

                  {status === "success" && (
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 text-center font-sans text-sm text-forest-deep"
                    >
                      Message sent — we&apos;ll get back to you soon.
                    </motion.p>
                  )}
                  {status === "error" && (
                    <p className="mt-4 text-center font-sans text-sm text-red-700">
                      Something went wrong. Please try again or email us directly.
                    </p>
                  )}
                </form>
              </div>
            </ScrollReveal>
          </div>

          {/* Interactive map */}
          {standalone && (
            <ScrollReveal delay={120} className="mt-20 md:mt-28">
              <div className="overflow-hidden rounded-3xl border border-forest-deep/8 shadow-[0_20px_60px_rgba(15,61,46,0.08)]">
                <iframe
                  title="Bougain Mediaa office location"
                  src={contact.mapEmbedUrl}
                  className="h-[280px] w-full border-0 md:h-[400px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>
    </>
  );
}
