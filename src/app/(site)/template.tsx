import { PageTransition } from "@/components/PageTransition";

export default function SiteTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageTransition>{children}</PageTransition>;
}
