import React from "react";
import { Send } from "lucide-react";
function NavbarLogo() {
  return (
    <div className="flex items-center gap-1 cursor-pointer select-none">
      <div className="rotate-icon">
        <Send />
      </div>

      <span className="text-xl font-bold tracking-tight">
        DM <span className="text-blue-600">Me</span>
      </span>
    </div>
  );
}

export default NavbarLogo;
