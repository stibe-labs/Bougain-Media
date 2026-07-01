"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle, Send } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { contact, contactSection, services } from "@/lib/constants";
import { cn } from "@/lib/utils";

const contactPills = [
  { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  { icon: Phone, label: "Phone", value: contact.phone, href: contact.phoneHref },
  { icon: MessageCircle, label: "WhatsApp", value: contact.whatsapp, href: contact.whatsappHref },
];

function ContactHero() {
  return (
    <div className="grain-texture relative overflow-hidden border-b border-forest-deep/8 bg-cream section-padding !pb-12 !pt-32 md:!pt-40">
      <div className="bg-mesh absolute inset-0" />
      <div className="container-wide relative">
        <SectionLabel>Get in Touch</SectionLabel>
        <h1 className="font-display text-4xl font-bold tracking-tight text-forest-deep md:text-6xl">
          {contactSection.headline}
        </h1>
        <p className="mt-5 max-w-md font-serif text-lg leading-relaxed text-grey-muted">
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
          standalone && "!pt-12",
        )}
      >
        <div className="bg-mesh absolute inset-0" />

        <div className="container-wide relative">
          <div className="grid gap-16 lg:grid-cols-2">
            <ScrollReveal>
              {!standalone && (
                <>
                  <SectionLabel>Get in Touch</SectionLabel>
                  <h2 className="font-display text-4xl font-bold tracking-tight text-forest-deep md:text-6xl">
                    {contactSection.headline}
                  </h2>
                  <p className="mt-5 max-w-md font-serif text-lg leading-relaxed text-grey-muted">
                    {contactSection.supporting}
                  </p>
                </>
              )}

              <div className={cn("space-y-3", standalone ? "" : "mt-10")}>
                {contactPills.map((pill, i) => (
                  <AnimatedCard key={pill.label} delay={i} className="!shadow-none">
                    <a
                      href={pill.href}
                      target={pill.label === "WhatsApp" ? "_blank" : undefined}
                      rel={pill.label === "WhatsApp" ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-4 px-5 py-4"
                    >
                      <motion.div
                        className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sage/20 to-sage/5"
                        whileHover={{ scale: 1.08, rotate: 3 }}
                        transition={{ duration: 0.3 }}
                      >
                        <pill.icon size={18} className="text-sage" />
                      </motion.div>
                      <div>
                        <p className="font-sans text-xs font-semibold uppercase tracking-wider text-sage">
                          {pill.label}
                        </p>
                        <p className="font-sans text-sm font-medium text-forest-deep">
                          {pill.value}
                        </p>
                      </div>
                    </a>
                  </AnimatedCard>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <AnimatedCard hover={false} className="p-8 md:p-10">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="name" className="mb-2 block font-sans text-sm font-medium text-forest-deep">
                        Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        required
                        className="w-full rounded-xl border border-forest-deep/15 bg-white px-4 py-3 font-sans text-sm outline-none transition-colors focus:border-sage focus:ring-2 focus:ring-sage/20"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block font-sans text-sm font-medium text-forest-deep">
                        Email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full rounded-xl border border-forest-deep/15 bg-white px-4 py-3 font-sans text-sm outline-none transition-colors focus:border-sage focus:ring-2 focus:ring-sage/20"
                        placeholder="you@company.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="mb-2 block font-sans text-sm font-medium text-forest-deep">
                        Phone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="w-full rounded-xl border border-forest-deep/15 bg-white px-4 py-3 font-sans text-sm outline-none transition-colors focus:border-sage focus:ring-2 focus:ring-sage/20"
                        placeholder="+91 ..."
                      />
                    </div>
                    <div>
                      <label htmlFor="service" className="mb-2 block font-sans text-sm font-medium text-forest-deep">
                        Service interested in
                      </label>
                      <select
                        id="service"
                        name="service"
                        className="w-full rounded-xl border border-forest-deep/15 bg-white px-4 py-3 font-sans text-sm outline-none transition-colors focus:border-sage focus:ring-2 focus:ring-sage/20"
                        defaultValue=""
                      >
                        <option value="" disabled>Select a service</option>
                        {services.items.map((s) => (
                          <option key={s.title} value={s.title}>{s.title}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="mb-2 block font-sans text-sm font-medium text-forest-deep">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        className="w-full resize-none rounded-xl border border-forest-deep/15 bg-white px-4 py-3 font-sans text-sm outline-none transition-colors focus:border-sage focus:ring-2 focus:ring-sage/20"
                        placeholder="Tell us about your project..."
                      />
                    </div>
                  </div>

                  <Button type="submit" disabled={loading} className={cn("mt-6 w-full", loading && "opacity-70")}>
                    <Send size={16} />
                    {loading ? "Sending..." : "Send Message"}
                  </Button>

                  {status === "success" && (
                    <p className="mt-4 text-center font-sans text-sm text-green-600">
                      Message sent! We&apos;ll get back to you soon.
                    </p>
                  )}
                  {status === "error" && (
                    <p className="mt-4 text-center font-sans text-sm text-red-600">
                      Something went wrong. Please try again or email us directly.
                    </p>
                  )}
                </form>
              </AnimatedCard>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
