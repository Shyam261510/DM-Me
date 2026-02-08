import React from "react";
import { Send } from "lucide-react";
import Link from "next/link";
function NavbarLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 cursor-pointer select-none"
    >
      <div className="rotate-icon">
        <Send className="w-5 h-5 text-[#6C5CE7]" />
      </div>
      <span className="text-xl font-bold tracking-tight text-white">
        Just
        <span className="bg-gradient-to-r from-[#6C5CE7] to-[#FF4D8D] bg-clip-text text-transparent">
          DM
        </span>
      </span>
    </Link>
  );
}

export default NavbarLogo;
