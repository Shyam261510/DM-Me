import LandingNavbar from "./components/LandingNavbar";
import HeroSection from "./components/HeroSection";
import ProblemSection from "./components/ProblemSection";
import HowItWorksSection from "./components/HowItWorksSection";
import FeaturesSection from "./components/FeaturesSection";
import { UseCasesSection } from "./components/UseCasesSection";
import ProductDemoSection from "./components/ProductDemoSection";
import SocialProofSection from "./components/SocialProofSection";
import FinalCTASection from "./components/FinalCTASection";
import Footer from "./components/Footer";
import SetupVideoSection from "./components/SetupVideoSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white">
      <LandingNavbar />
      <HeroSection />
      <SetupVideoSection />
      <ProblemSection />
      <HowItWorksSection />
      <FeaturesSection />
      <UseCasesSection />
      <ProductDemoSection />
      <SocialProofSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}
