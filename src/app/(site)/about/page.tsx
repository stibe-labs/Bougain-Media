import type { Metadata } from "next";
import { About } from "@/components/About";
import { Stats } from "@/components/Stats";
import { CtaBand } from "@/components/CtaBand";
import { about } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: about.intro,
};

export default function AboutPage() {
  return (
    <>
      <About standalone />
      <Stats variant="dark" />
      <CtaBand />
    </>
  );
}
