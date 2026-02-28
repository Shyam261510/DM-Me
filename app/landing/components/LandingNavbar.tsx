import NavbarLogo from "@/app/Logo/NavbarLogo";
import Link from "next/link";

const LandingNavbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-[#23232E] bg-[#0B0B0F]/50 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <NavbarLogo />

        {/* Right Section */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              className="text-sm font-medium text-[#A1A1AA] transition-colors hover:text-white"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-[#A1A1AA] transition-colors hover:text-white"
            >
              How It Works
            </a>
            <a
              href="#demo"
              className="text-sm font-medium text-[#A1A1AA] transition-colors hover:text-white"
            >
              Demo
            </a>
          </nav>

          <Link
            href="/login"
            className="px-6 py-2 text-sm font-semibold text-white rounded-2xl bg-gradient-to-r from-[#6C5CE7] to-[#FF4D8D] transition-all hover:shadow-lg hover:shadow-[#6C5CE7]/50 hover:scale-105 active:scale-95"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default LandingNavbar;
