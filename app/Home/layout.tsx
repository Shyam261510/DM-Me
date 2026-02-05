import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/frontendComponents/Sidebar/AppSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="sticky top-5 z-10 bg-white border-b ">
            <SidebarTrigger />
          </div>

          <div className="mx-auto max-w-7xl px-4 py-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
