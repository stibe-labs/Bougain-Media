import type { Metadata } from "next";
import { Portfolio } from "@/components/Portfolio";
import { CtaBand } from "@/components/CtaBand";
import { portfolio } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Campaigns, content, and digital experiences crafted for real brands.",
};

export default function PortfolioPage() {
  return (
    <>
      <Portfolio standalone />
      <CtaBand />
    </>
  );
}
