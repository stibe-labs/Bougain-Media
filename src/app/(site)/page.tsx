import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { ServicesPreview } from "@/components/ServicesPreview";
import { HomeHighlights } from "@/components/HomeHighlights";
import { CtaBand } from "@/components/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <ServicesPreview />
      <HomeHighlights />
      <CtaBand />
    </>
  );
}
