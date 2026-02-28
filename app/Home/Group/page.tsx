"use client";
import DialogCompo from "@/app/frontendComponents/Custom/Dialog/DialogCompo";
import useGroup from "@/hooks/useGroup";
import { RootState } from "@/libs/Store";
import { Plus, Users } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "@/components/ui/spinner";
import Loader from "@/app/frontendComponents/Loader/Loader";
import DialogButton from "../../frontendComponents/Custom/Dialog/DialogButton";
import GroupCard from "@/app/frontendComponents/Group/GroupCard";

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
    <div className="w-full min-h-screen bg-[#0B0B0F] text-white px-4 sm:px-6 lg:px-8 py-8">
      {/* Container */}
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Groups
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Organize and manage your saved reels
            </p>
          </div>

          {groups.length > 0 && (
            <DialogButton
              setIsOpen={setIsOpen}
              icon={<Plus size={18} />}
              title="Create Group"
              className="w-full sm:w-auto"
            />
          )}
        </div>

        {/* Empty State */}
        {groups.length === 0 ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div
              className="
          bg-gradient-to-b from-[#16161F] to-[#121218]
          border border-[#23232E]
          rounded-2xl
          p-8 sm:p-12
          max-w-md w-full
          text-center
          shadow-xl
        "
            >
              <div className="flex items-center justify-center mb-5">
                <div className="bg-white/5 p-4 rounded-xl">
                  <Users size={40} className="text-gray-400" />
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-2">No groups yet</h2>

              <p className="text-sm text-gray-400 mb-6">
                Create your first group to organize your reels and stay
                productive.
              </p>

              <button
                onClick={() => setIsOpen(true)}
                className="
              w-full flex items-center justify-center gap-2
              bg-gradient-to-r from-purple-500 to-pink-500
              py-2.5 rounded-lg text-sm font-medium
              hover:opacity-90 active:scale-[0.98]
              transition
            "
              >
                <Plus size={16} />
                Create Group
              </button>
            </div>
          </div>
        ) : (
          /* Groups Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {groups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        )}
      </div>

      {/* Dialog */}
      <DialogCompo
        isOpen={isOpen}
        onOpenChange={() => setIsOpen((prev) => !prev)}
        title="Create New Group"
        className="
      bg-[#16161F]
      border border-[#23232E]
      w-[90vw] max-w-md
      shadow-2xl
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
            h-11 w-full
            rounded-lg
            border border-[#23232E]
            bg-[#0B0B0F]
            px-4 text-sm text-white
            placeholder:text-[#71717A]
            outline-none
            focus:border-purple-500
            focus:ring-2 focus:ring-purple-500/30
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
            hover:bg-[#23232E]
            transition
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
            font-medium
            hover:opacity-90 active:scale-[0.98]
            transition
          "
            >
              {createGroupMutation.isPending ? (
                <span className="flex gap-2 items-center">
                  <Spinner />
                  Creating...
                </span>
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
