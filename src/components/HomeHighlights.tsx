import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { images, portfolio } from "@/lib/constants";

const highlights = [
  {
    title: "Our Story",
    description: "Storytelling, strategy, and growth with meaning.",
    href: "/about",
    image: images.about,
    span: "lg" as const,
  },
  {
    title: "Selected Work",
    description: portfolio.subtitle,
    href: "/portfolio",
    videoSrc: portfolio.items[0]?.videoSrc,
    image: portfolio.items[0]?.image,
    span: "sm" as const,
  },
  {
    title: "Capabilities",
    description: "Six specialized practices. One coherent system.",
    href: "/services",
    image: images.cta,
    span: "sm" as const,
  },
];

export function HomeHighlights() {
  return (
    <section className="content-auto relative overflow-hidden bg-cream section-padding">
      <div className="bg-mesh absolute inset-0" />

      <div className="container-wide relative">
        <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <ScrollReveal>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-sage">
              Explore
            </p>
            <h2 className="mt-4 max-w-xl font-display text-4xl font-bold tracking-tight text-forest-deep md:text-5xl lg:text-6xl">
              A studio of ideas,
              <br />
              <span className="text-sage">built for results.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <p className="max-w-md font-sans text-base leading-relaxed text-grey-muted md:text-lg">
              Dive into our story, work, and ways of working — then start a
              conversation when you&apos;re ready.
            </p>
          </ScrollReveal>
        </div>

        <div className="mt-16 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {highlights.map((item, i) => (
            <ScrollReveal
              key={item.href}
              delay={i * 70}
              className={item.span === "lg" ? "sm:col-span-2 lg:col-span-1 lg:row-span-1" : ""}
            >
              <Link
                href={item.href}
                className="group relative flex h-full min-h-[320px] flex-col justify-end overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(15,61,46,0.1)] md:min-h-[380px]"
              >
                {item.videoSrc ? (
                  <video
                    src={`${item.videoSrc}#t=0.5`}
                    muted
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <Image
                    src={item.image!}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95" />

                <ArrowUpRight
                  size={22}
                  strokeWidth={1.5}
                  className="absolute right-5 top-5 text-white/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sage-light"
                />

                <div className="relative z-10 p-7 md:p-8">
                  <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-xs font-sans text-sm leading-relaxed text-white/65">
                    {item.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-sans text-sm font-semibold text-sage-light">
                    Discover
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
