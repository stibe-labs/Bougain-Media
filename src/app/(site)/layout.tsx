import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { ScrollOptimizer } from "@/components/ScrollOptimizer";
import { PageLoader } from "@/components/PageLoader";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageLoader />
      <div className="site-shell">
        <ScrollOptimizer />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </>
  );
}
