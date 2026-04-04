import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import ProductsSection from "@/components/home/ProductsSection";
import ValuesSection from "@/components/home/ValuesSection";
import CtaSection from "@/components/home/CtaSection";
import EmberDivider from "@/components/EmberDivider";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <EmberDivider />
      <AboutSection />
      <EmberDivider />
      <ProductsSection />
      <EmberDivider />
      <ValuesSection />
      <EmberDivider />
      <CtaSection />
    </>
  );
}
