import LandingNavbar from "./components/LandingNavbar";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import dynamic from "next/dynamic";

// Keep above-the-fold components normal (no loader flash)
// Dynamic import everything below the fold

const SetupVideoSection = dynamic(
  () => import("./components/SetupVideoSection"),
);
const ProblemSection = dynamic(() => import("./components/ProblemSection"));
const HowItWorksSection = dynamic(
  () => import("./components/HowItWorksSection"),
);
const FeaturesSection = dynamic(() => import("./components/FeaturesSection"));
const UseCasesSection = dynamic(() =>
  import("./components/UseCasesSection").then((mod) => ({
    default: mod.UseCasesSection,
  })),
);
const ProductDemoSection = dynamic(
  () => import("./components/ProductDemoSection"),
);
const SocialProofSection = dynamic(
  () => import("./components/SocialProofSection"),
);
const FinalCTASection = dynamic(() => import("./components/FinalCTASection"));

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white">
      <LandingNavbar />
      <HeroSection />
      {/* Below sections load as user scrolls */}
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
