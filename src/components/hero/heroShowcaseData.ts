import { services } from "@/lib/constants";

export interface HeroShowcaseSlide {
  id: string;
  title: string;
  tag: string;
  stat: string;
}

export const heroShowcaseSlides: HeroShowcaseSlide[] = [
  {
    id: "content",
    title: "Content Creation",
    tag: "Creative",
    stat: "1.2K+ assets created",
  },
  {
    id: "video",
    title: "Video Production",
    tag: "Video",
    stat: "300+ videos produced",
  },
  {
    id: "visual-ads",
    title: "Visual Ads",
    tag: "Design",
    stat: "3.9× average CTR lift",
  },
  {
    id: "social",
    title: "Social Media Management",
    tag: "Social",
    stat: "2M+ audience reach",
  },
  {
    id: "brand-shoots",
    title: "Brand Shoots",
    tag: "Branding",
    stat: "120+ brand shoots",
  },
  {
    id: "performance",
    title: "Performance Marketing",
    tag: "Paid Growth",
    stat: "3.2× average ROAS",
  },
];

export const heroShowcaseItems = heroShowcaseSlides;
export type HeroShowcaseItem = HeroShowcaseSlide;
export const serviceTitles = services.items.map((s) => s.title);
