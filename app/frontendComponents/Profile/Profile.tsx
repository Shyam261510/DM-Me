import Image from "next/image";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { useSignOut } from "@/hooks/useSignOut";

import { useSession } from "next-auth/react";
function Profile() {
  const { data: session } = useSession();

  const handelSignOut = useSignOut();

  return (
    <div
      className="
    flex items-center justify-between gap-3
    px-4 py-3
    bg-[#0B0B0F]/60
    backdrop-blur-xl
  "
    >
      {/* User Info */}
      <div className="flex items-center gap-3 min-w-0">
        <Avatar className="h-9 w-9 ring-1 ring-white/10">
          {session?.user?.image ? (
            <Image
              src={session?.user.image as string}
              alt={session?.user.name ?? "User"}
              width={36}
              height={36}
              className="rounded-full object-cover"
            />
          ) : (
            <AvatarFallback className="bg-indigo-600/80 text-white text-sm font-semibold">
              {session?.user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-white truncate">
            {session?.user?.name}
          </p>
          <p className="text-xs text-zinc-400 truncate">
            {session?.user?.email}
          </p>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={handelSignOut}
        className="
      group
      rounded-lg p-2
      text-zinc-400
      hover:text-red-400
      hover:bg-white/5
      transition-all duration-200
      active:scale-95
    "
        aria-label="Log out"
      >
        <LogOut
          size={16}
          className="transition-transform group-hover:-translate-x-0.5"
        />
      </button>
    </div>
  );
}

export default Profile;
