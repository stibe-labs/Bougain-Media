import type { Metadata } from "next";
import { CareersPageContent } from "@/components/careers/CareersPageContent";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Bougain Mediaa — explore open positions in digital marketing, content, and strategy.",
};

export default function CareersPage() {
  return <CareersPageContent />;
}
