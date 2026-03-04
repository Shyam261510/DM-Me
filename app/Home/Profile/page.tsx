"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, LogOut } from "lucide-react";
import { useSignOut } from "@/hooks/useSignOut";
const Links = [
  {
    title: "Privacy Policy",
    url: "/privacy-policy",
  },
  {
    title: "Terms and Conditions",
    url: "/terms-and-conditions",
  },
];
function Profile() {
  const { data: session } = useSession();

  const handelSignOut = useSignOut();

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0B0B0F] to-[#07070A] text-zinc-100 px-4 py-8">
      {/* Page Title */}
      <h2 className="text-2xl font-semibold mb-6">Profile</h2>

      {/* Profile Card */}
      <div
        className="
    bg-zinc-900/70 
    backdrop-blur-xl 
    border border-white/10 
    rounded-2xl 
    p-6 
    flex flex-col items-center 
    shadow-[0_10px_40px_rgba(0,0,0,0.6)]
  "
      >
        {/* Profile Image */}
        <div className="relative">
          <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-white/10 shadow-xl">
            <Image
              src={session?.user?.image as string}
              width={200}
              height={200}
              alt="Profile Picture"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Online Glow Ring (Optional Premium Touch) */}
          <div className="absolute inset-0 rounded-full ring-2 ring-[#6C5CE7]/40 animate-pulse" />
        </div>

        {/* Name & Email */}
        <div className="mt-5 text-center">
          <h3 className="text-lg font-semibold">{session?.user?.name}</h3>
          <p className="text-sm text-zinc-400">{session?.user?.email}</p>
        </div>
      </div>

      {/* Links Section */}
      <div className="mt-8 space-y-3">
        {Links.map((linkInfo) => (
          <Link
            key={linkInfo.title}
            href={linkInfo.url}
            target="_blank"
            className="
          flex items-center justify-between
          bg-zinc-900/60
          border border-white/5
          rounded-xl
          px-4 py-3
          hover:bg-zinc-800/80
          hover:border-white/10
          transition-all duration-200
        "
          >
            <span className="text-sm font-medium">{linkInfo.title}</span>
            <ChevronRight className="text-zinc-500" size={18} />
          </Link>
        ))}
      </div>

      {/* Logout Section */}
      <div className="mt-10">
        <button
          onClick={handelSignOut}
          className="
        w-full
        flex items-center justify-center gap-2
        bg-red-500/10
        border border-red-500/20
        text-red-400
        rounded-xl
        py-3
        hover:bg-red-500/20
        transition-all duration-200
        active:scale-95
      "
        >
          <LogOut size={18} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Profile;
