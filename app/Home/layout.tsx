"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/frontendComponents/Sidebar/AppSidebar";
import { useUserData } from "@/hooks/useUserData";
import Loader from "../frontendComponents/Loader/Loader";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isLoading } = useUserData();

  // Loading Screen
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-[#0B0B0F]">
        <Loader />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#0B0B0F] text-white">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Header */}
          <div
            className="
            sticky top-0 z-20
            h-16 flex items-center
            px-6
            bg-[#0B0B0F]/80
            backdrop-blur-xl
            border-b border-[#23232E]
          "
          >
            <SidebarTrigger
              className="
              p-2 rounded-lg
              text-[#A1A1AA]
              hover:text-white
              hover:bg-[#16161F]
              transition-all duration-300
            "
            />
          </div>

          {/* Page Content */}
          <div className="mx-auto max-w-7xl px-6 py-8">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
