import VorqNav from "./components/VorqNav";
import { VorqHero } from "./components/VorqHero";
import { VideoShowcase } from "./components/VideoShowcase";
import { ProjectShowcase } from "./components/ProjectShowcase";
import { TestimonialSection } from "./components/TestimonialSection";
import { HorizontalScrollSection } from "./components/HorizontalScrollSection";
import { ServicesGrid } from "./components/ServicesGrid";
import { ToolStack } from "./components/ToolStack";
import { WhyVorqSection } from "./components/WhyVorqSection";
import { VorqFAQ } from "./components/VorqFAQ";
import { VorqFooter } from "./components/VorqFooter";

export default function VorqPage() {
  return (
    <main className="min-h-screen bg-[#ffffff] font-[var(--font-archivo)]">
      <VorqNav />
      <VorqHero />
      <VideoShowcase />
      <HorizontalScrollSection />
      <ServicesGrid />
      <ToolStack />
      <WhyVorqSection />
      <ProjectShowcase />
      <TestimonialSection />
      <VorqFAQ />
      <VorqFooter />
    </main>
  );
}
