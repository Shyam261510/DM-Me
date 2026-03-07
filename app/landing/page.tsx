import LandingNavbar from "./components/LandingNavbar";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import dynamic from "next/dynamic";

const ProblemSection = dynamic(() => import("./components/ProblemSection"));

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
      <ProblemSection />
      <ProductDemoSection />
      <UseCasesSection />
      <SocialProofSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}
