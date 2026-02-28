"use client";

import { Lock, Video, Users } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import Profile from "../Profile/Profile";
import NavbarLogo from "@/app/Logo/NavbarLogo";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Saved Reels",
    url: "/Home/SavedReels",
    icon: Video,
  },
  {
    title: "Group",
    url: "/Home/Group",
    icon: Users,
  },
];
interface AppSidebarProps {
  reciverId?: string;
  status: "loading" | "unauthenticated" | "authenticated";
}
export function AppSidebar({ reciverId, status }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar className="bg-[#0B0B0F] border-r border-[#23232E]">
      <SidebarContent className="bg-[#0B0B0F]">
        <SidebarGroup>
          {/* Logo */}
          <SidebarGroupLabel className="px-4 py-4 mb-2">
            <NavbarLogo />
          </SidebarGroupLabel>

          <SidebarGroupContent>
            {!reciverId ? (
              <div className="px-2 space-y-2  cursor-not-allowed ">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="text-sm text-neutral-400 flex items-center justify-between bg-gray-800 py-1 px-2 rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      {" "}
                      <item.icon className="w-4 h-4" />
                      <h2>{item.title}</h2>
                    </div>

                    <div>
                      <Lock className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <SidebarMenu className="px-2 space-y-2">
                {items.map((item) => {
                  const isActive = pathname === item.url;

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.url}
                          className={`
                          relative flex items-center gap-3
                          px-4 py-2.5 rounded-lg
                          text-sm font-medium
                          transition-colors
                          
                          ${
                            isActive
                              ? "text-white bg-[#16161F]"
                              : "text-[#A1A1AA] hover:text-black hover:bg-[#16161F]"
                          }
                        `}
                        >
                          <div className="flex gap-2 items-center">
                            {/* Active indicator */}
                            {isActive && (
                              <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r bg-white/80" />
                            )}

                            <item.icon className="w-4 h-4" />
                            <span>{item.title}</span>
                            {status === "unauthenticated" && <Lock />}
                          </div>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-[#23232E] bg-[#0B0B0F] p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <Profile />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
