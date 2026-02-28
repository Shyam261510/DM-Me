import React from "react";
import { Folder, FoldHorizontal, Users } from "lucide-react";
import { GroupInfo } from "@/interface";
import Link from "next/link";
interface Props {
  group: GroupInfo;
}
function GroupCard({ group }: Props) {
  return (
    <Link href={`/Home/Group/${group.id}`} key={group.id}>
      <div
        className="
      flex flex-col items-center
      w-full sm:w-40 md:w-44 lg:w-48
      py-3 sm:py-4
      rounded-xl
      transition
      hover:bg-zinc-800
      active:bg-zinc-800/70
    "
      >
        {/* Folder Icon */}
        <Folder
          className="
        h-16 w-16
        sm:h-20 sm:w-20
        md:h-24 md:w-24
        lg:h-28 lg:w-28
        text-white
      "
        />

        <div className="flex flex-col gap-1 mt-2 text-center w-full px-2">
          {/* Group Name */}
          <div className="flex items-center justify-center">
            <h2 className="text-sm sm:text-base font-semibold text-white truncate w-full">
              {group.groupName}
            </h2>
          </div>

          {/* Members */}
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-400">
            <Users size={14} className="sm:size-4" />
            <span>{group.groupMembers.length} Members</span>
          </div>

          {/* Created Date */}
          <p className="text-[10px] sm:text-xs text-[#71717A]">
            Created {new Date(group.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default GroupCard;
