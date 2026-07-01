import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Layers,
  MessageCircle,
  Users,
} from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const highlights = [
  {
    title: "About Us",
    description:
      "Storytelling, strategy, and a promise to help your business succeed in the digital world.",
    href: "/about",
    icon: Users,
    accent: "from-sage/20 to-sage/5",
  },
  {
    title: "Our Services",
    description:
      "PPC, content, social media, SEO, web development, and email marketing — tailored to your goals.",
    href: "/services",
    icon: Layers,
    accent: "from-forest-deep/10 to-sage/10",
  },
  {
    title: "Portfolio",
    description:
      "Campaigns, content, and digital experiences crafted for real brands.",
    href: "/portfolio",
    icon: Briefcase,
    accent: "from-sage-light/30 to-sage/10",
  },
  {
    title: "Contact",
    description:
      "Reach out for a free consultation — we'd love to learn about your business.",
    href: "/contact",
    icon: MessageCircle,
    accent: "from-forest-deep/8 to-sage/15",
  },
] as const;

export function HomeHighlights() {
  return (
    <section className="content-auto relative overflow-hidden bg-white section-padding">
      <div className="bg-mesh absolute inset-0" />

      <div className="container-wide relative">
        <ScrollReveal className="text-center">
          <SectionLabel className="text-center">Explore</SectionLabel>
          <h2 className="font-sans text-3xl font-bold tracking-tight text-forest-deep md:text-5xl">
            Everything you need to grow
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-grey-muted">
            Dive into our story, services, work, and ways to get in touch.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {highlights.map((item, i) => (
            <ScrollReveal key={item.href} delay={i * 60}>
              <Link
                href={item.href}
                className="card-modern group relative flex h-full flex-col overflow-hidden p-8"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />
                <div className="relative">
                  <div className="mb-5 inline-flex rounded-xl bg-forest-deep/5 p-3 transition-colors group-hover:bg-sage/20">
                    <item.icon
                      size={22}
                      className="text-forest-deep transition-colors group-hover:text-sage"
                      strokeWidth={1.75}
                    />
                  </div>
                  <h3 className="font-sans text-xl font-semibold text-forest-deep">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-grey-muted">
                    {item.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-sans text-sm font-semibold text-sage transition-colors group-hover:text-forest-deep">
                    Explore
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
                <ArrowUpRight
                  size={20}
                  className="absolute right-6 top-6 text-forest-deep/20 transition-all group-hover:text-sage group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
