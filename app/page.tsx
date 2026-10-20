import VorqNav from "./components/VorqNav";
import { VorqHero } from "./components/VorqHero";
import { Statement } from "./components/Statement";
import { ToolsSection } from "./components/ToolsSection";
import { WorkSection } from "./components/WorkSection";
import { ServicesSection } from "./components/ServicesSection";
import { ScopeBuilder } from "./components/ScopeBuilder";
import { ProcessSection } from "./components/ProcessSection";
import { WhyVorqSection } from "./components/WhyVorqSection";
import { StackStrip } from "./components/StackStrip";
import { StudioSection } from "./components/StudioSection";
import { VorqFAQ } from "./components/VorqFAQ";
import { VorqFooter } from "./components/VorqFooter";

export default function VorqPage() {
  return (
    <>
      <VorqNav overHero />
      <main>
        <VorqHero />
        <Statement />
        <ToolsSection />
        <WorkSection />
        <ServicesSection />
        <ScopeBuilder />
        <ProcessSection />
        <WhyVorqSection />
        <StackStrip />
        <StudioSection />
        <VorqFAQ />
      </main>
      <VorqFooter />
    </>
  );
}
