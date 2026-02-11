import Image from "next/image";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { useSignOut } from "@/hooks/useSignOut";

import { useSession } from "next-auth/react";
function Profile() {
  const { data: session, status } = useSession();

  const dispatch = useDispatch();
  const handelSignOut = useSignOut();

  return (
    <div className="flex items-center justify-between gap-3 px-3 py-3 border-t">
      {/* User Info */}
      <div className="flex items-center gap-3 min-w-0">
        <Avatar className="h-9 w-9">
          {session?.user?.image ? (
            <Image
              src={session?.user.image as string}
              alt={session?.user.name ?? "User"}
              width={36}
              height={36}
              className="rounded-full object-cover"
            />
          ) : (
            <AvatarFallback className="bg-slate-600 text-white text-sm">
              {session?.user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>

        <div className="min-w-0">
          <p className="text-sm font-semibold truncate">
            {session?.user?.name}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {session?.user?.email}
          </p>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={handelSignOut}
        className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition"
        aria-label="Log out"
      >
        <LogOut size={16} />
      </button>
    </div>
  );
}

export default Profile;
