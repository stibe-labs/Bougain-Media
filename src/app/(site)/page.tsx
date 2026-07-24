import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { ServicesPreview } from "@/components/ServicesPreview";
import { LandingVideoShowcase } from "@/components/LandingVideoShowcase";
import { CtaBand } from "@/components/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <ServicesPreview />
      <LandingVideoShowcase />
      <CtaBand />
    </>
  );
}
