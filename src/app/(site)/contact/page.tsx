import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { contactSection } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: contactSection.supporting,
};

export default function ContactPage() {
  return <Contact standalone />;
}
