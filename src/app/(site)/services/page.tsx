import type { Metadata } from "next";
import { Services } from "@/components/Services";
import { CtaBand } from "@/components/CtaBand";
import { services } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Services",
  description: services.subtitle,
};

export default function ServicesPage() {
  return (
    <>
      <Services standalone />
      <CtaBand />
    </>
  );
}
