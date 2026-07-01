import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { HomeServices } from "@/components/HomeServices";
import { Stats } from "@/components/Stats";
import { Portfolio } from "@/components/Portfolio";
import { CtaBand } from "@/components/CtaBand";
import { Contact } from "@/components/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <HomeServices />
      <Stats />
      <Portfolio />
      <CtaBand />
      <Contact />
    </>
  );
}
