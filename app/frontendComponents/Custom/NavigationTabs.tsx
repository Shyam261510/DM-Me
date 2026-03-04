import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface TabsTypes {
  title: string;
  icons: React.ReactNode;
  link: string;
}

interface NavigationTabsProps {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  Tabs: TabsTypes[];
}
function NavigationTabs({
  Tabs,
  activeTab,
  setActiveTab,
}: NavigationTabsProps) {
  const pathName = usePathname();

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-md z-50">
      <div
        className="
      bg-zinc-900/80 
      backdrop-blur-xl 
      border border-white/10
      shadow-[0_8px_30px_rgba(0,0,0,0.6)]
      rounded-2xl
      px-4 py-2
      flex justify-between items-center
    "
      >
        {Tabs.map((tab, index) => {
          const isActive = pathName === tab.link; // <-- your state

          return (
            <Link
              href={tab.link}
              key={tab.title}
              onClick={() => setActiveTab(index)}
              className="relative flex flex-col items-center justify-center flex-1 cursor-pointer"
            >
              {/* Active Background Bubble */}
              {isActive && (
                <div
                  className="
                absolute inset-0 
                bg-gradient-to-r 
                from-[#6C5CE7]/20 
                via-[#FF4D8D]/20 
                to-[#FF8A00]/20 
                rounded-xl
              "
                />
              )}

              {/* Icon */}
              <div
                className={`relative z-10 transition-all duration-300 ${
                  isActive ? "text-white scale-110" : "text-zinc-400"
                }`}
              >
                {tab.icons}
              </div>

              {/* Label */}
              <span
                className={`relative z-10 text-xs mt-1 transition-all duration-300 ${
                  isActive ? "text-white" : "text-zinc-500"
                }`}
              >
                {tab.title}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default NavigationTabs;
