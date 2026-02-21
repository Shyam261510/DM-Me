"use client";
import DialogCompo from "@/app/frontendComponents/Custom/DialogCompo";
import useGroup from "@/hooks/useGroup";
import { RootState } from "@/libs/Store";
import { Plus, Users } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "@/components/ui/spinner";
import { group } from "console";
import Loader from "@/app/frontendComponents/Loader/Loader";
import Link from "next/link";

function Group() {
  const userInfo = useSelector((state: RootState) => state.dataSlice.user);

  const [groupName, setGroupName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { createGroupMutation, groups, isLoading } = useGroup();

  const handleCreate = () => {
    if (!groupName.trim()) return;

    createGroupMutation.mutate({
      user: userInfo,
      groupName,
    });

    setGroupName("");
    setIsOpen(false);
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="w-full min-h-screen bg-[#0B0B0F] text-white px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-xl sm:text-2xl font-semibold">Groups</h1>
        {groups.length > 0 && (
          <button
            onClick={() => setIsOpen(true)}
            className="
            flex items-center justify-center gap-2
            w-full sm:w-auto
            bg-gradient-to-r from-purple-500 to-pink-500
            px-4 py-2 rounded-lg text-sm font-medium
            hover:opacity-90 transition
          "
          >
            <Plus size={18} />
            Create Group
          </button>
        )}
      </div>

      {/* Empty State */}
      {groups.length === 0 ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="bg-[#16161F] border border-[#23232E] rounded-2xl p-6 sm:p-10 max-w-sm w-full text-center shadow-lg">
            <Users size={40} className="mx-auto mb-4 text-gray-400" />

            <h2 className="text-lg font-semibold mb-2">No groups yet</h2>

            <p className="text-sm text-gray-400 mb-6">
              Create your first group to start organizing your reels.
            </p>

            <button
              onClick={() => setIsOpen(true)}
              className="
                w-full flex items-center justify-center gap-2
                bg-gradient-to-r from-purple-500 to-pink-500
                py-2 rounded-lg text-sm font-medium
                hover:opacity-90 transition
              "
            >
              <Plus size={16} />
              Create Group
            </button>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {/* Group cards here */}
          {groups.map((group, index) => (
            <Link
              href={`/Home/Group/${group.id}`}
              key={group.id}
              className="
    bg-[#16161F] cursor-pointer
    border border-[#23232E]
    rounded-xl
    p-4
    flex flex-col gap-3
    hover:border-purple-500/40
    hover:shadow-lg
    transition
  "
            >
              {/* Top Section */}
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-white truncate">
                  {group.groupName}
                </h2>
              </div>

              {/* Members */}
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Users size={16} />
                <span>{group.groupMembers.length} Members</span>
              </div>

              {/* Created Date */}
              <p className="text-xs text-[#71717A]">
                Created {new Date(group.createdAt).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      )}

      {/* Dialog */}
      <DialogCompo
        isOpen={isOpen}
        onOpenChange={() => setIsOpen((prev) => !prev)}
        title="Create New Group"
        className="
          bg-[#16161F]
          border border-[#23232E]
          w-[90vw] max-w-md
        "
        icon={<Users />}
      >
        <div className="space-y-5">
          {/* Input */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Group Name</label>

            <input
              type="text"
              placeholder="e.g. Marketing Team"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="
                h-10 w-full
                rounded-lg
                border border-[#23232E]
                bg-[#0B0B0F]
                px-4 text-sm text-white
                placeholder:text-[#71717A]
                outline-none
                focus:border-[#6C5CE7]
                focus:ring-2 focus:ring-[#6C5CE7]/30
                transition
              "
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-3">
            <button
              onClick={() => setIsOpen(false)}
              className="
                w-full sm:w-auto
                px-4 py-2 text-sm rounded-lg
                border border-[#23232E]
                text-gray-400
                hover:bg-[#23232E] transition
              "
            >
              Cancel
            </button>

            <button
              onClick={handleCreate}
              disabled={createGroupMutation.isPending}
              className="
                w-full sm:w-auto
                px-4 py-2 text-sm rounded-lg
                bg-gradient-to-r from-purple-500 to-pink-500
                font-medium hover:opacity-90 transition
              "
            >
              {createGroupMutation.isPending ? (
                <h2 className="flex gap-2 items-center">
                  <Spinner />
                  Creating...
                </h2>
              ) : (
                "Create Group"
              )}
            </button>
          </div>
        </div>
      </DialogCompo>
    </div>
  );
}

export default Group;
