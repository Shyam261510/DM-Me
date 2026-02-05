"use client";

import { Google } from "@/app/icons/Google";
import NavbarLogo from "@/app/Logo/NavbarLogo";
import { signIn } from "next-auth/react";

const Navbar = () => {
  function handleSignIn() {
    signIn("google");
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <NavbarLogo />
        {/* Right Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleSignIn}
            className="flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold transition hover:bg-gray-100 active:scale-95"
          >
            <Google size={18} />
            Login with Google
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
