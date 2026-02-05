import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { resetState } from "@/libs/dataslice";
import { useUserData } from "@/hooks/useUserData";

function Profile() {
  const { user } = useUserData();
  const navigate = useRouter();
  const dispatch = useDispatch();

  function handelSignOut() {
    signOut();
    dispatch(resetState());
    navigate.push("/");
  }

  return (
    <div className="flex items-center justify-between gap-3 px-3 py-3 border-t">
      {/* User Info */}
      <div className="flex items-center gap-3 min-w-0">
        <Avatar className="h-9 w-9">
          {user?.image ? (
            <Image
              src={user.image}
              alt={user.name ?? "User"}
              width={36}
              height={36}
              className="rounded-full object-cover"
            />
          ) : (
            <AvatarFallback className="bg-slate-600 text-white text-sm">
              {user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>

        <div className="min-w-0">
          <p className="text-sm font-semibold truncate">{user?.name}</p>
          <p className="text-xs text-muted-foreground truncate">
            {user?.email}
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
