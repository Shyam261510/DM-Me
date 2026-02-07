import React from "react";
import { Send } from "lucide-react";

function Loader() {
  return (
    <div className="flex h-full w-full justify-center items-center py-4">
      <div className="flex items-center gap-2 text-blue-600 animate-pulse">
        <Send className="rotate-icon" />
        <span className="text-sm font-medium">Loading...</span>
      </div>
    </div>
  );
}

export default Loader;
