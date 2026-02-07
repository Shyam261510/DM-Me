"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/frontendComponents/Sidebar/AppSidebar";
import { useUserData } from "@/hooks/useUserData";
import Loader from "../frontendComponents/Loader/Loader";
export default function Layout({ children }: { children: React.ReactNode }) {
  const { isLoading } = useUserData();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Loader />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="sticky top-5 z-10 bg-white border-b header">
            <SidebarTrigger />
          </div>

          <div className="mx-auto max-w-7xl px-4 py-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
