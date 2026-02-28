"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/frontendComponents/Sidebar/AppSidebar";
import { useUserData } from "@/hooks/useUserData";
import Loader from "../frontendComponents/Loader/Loader";
import { useMemo, useState } from "react";
import { Group } from "@/interface";
import { BellRing } from "lucide-react";
import DialogCompo from "../frontendComponents/Custom/Dialog/DialogCompo";
import { useMutation } from "@tanstack/react-query";
import { handelAsyc } from "@/helper/handleAsync";
import axios from "axios";
import { ErrorToast } from "../frontendComponents/Toasts/toast";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

export default function Layout({ children }: { children: React.ReactNode }) {
  const naviagte = useRouter();
  const { isLoading, user, status } = useUserData();
  const groupInfo = useGroupInfo();
  const [isOpen, setIsOpen] = useState(true);

  const hasGroup = Object.entries(groupInfo).length !== 0;

  const joinGroupMutation = useMutation({
    mutationFn: async () => {
      const res = await handelAsyc(async () => {
        const joinGroupResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/joinGroup`,
          {
            userId: user?.id,
            groupId: groupInfo.id,
          },
        );
        return joinGroupResponse.data;
      }, "Error in Joining Group");

      return res;
    },
    onSuccess: (data) => {
      if (!data.success || !data.data?.success) {
        ErrorToast(data.data?.message as string);
        return;
      }
      localStorage.removeItem("groupInfo");
      setIsOpen(false);
      naviagte.push(`/Home/Group/${groupInfo.id}`);
    },
  });
  if (isLoading) return <Loader />;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-b from-[#0B0B0F] to-[#07070A] text-white">
        {/* Sidebar */}
        <AppSidebar reciverId={user?.reciverId} status={status} />

        {/* Main Area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div
            className="
          sticky top-0 z-20
          bg-[#0B0B0F]/70
          backdrop-blur-2xl
          border-b border-white/5
          shadow-[0_4px_20px_rgba(0,0,0,0.35)]
        "
          >
            <Header />
          </div>

          {/* Page Content */}

          {children}

          {/* Notification Dialog */}
          {hasGroup && (
            <NotificationDialog
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              description={`${groupInfo.admin.username} invited you to join "${groupInfo.groupName}"`}
              isLoading={joinGroupMutation.isPending}
              mutation={joinGroupMutation.mutate}
            />
          )}
        </main>
      </div>
    </SidebarProvider>
  );
}
interface DialogChildrenProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  description: string;
  isLoading: boolean;
  mutation: () => void;
}
function NotificationDialog({
  isOpen,
  setIsOpen,
  description,
  isLoading,
  mutation,
}: DialogChildrenProps) {
  return (
    <DialogCompo
      isOpen={isOpen}
      title="Group Invitation"
      icon={<BellRing className="text-indigo-400" />}
      discription={description}
      className="
              bg-[#121218]
              border border-white/10
              w-[92vw] sm:w-[420px]
              max-w-md
              rounded-2xl
              shadow-2xl
              backdrop-blur-xl
              p-6
              space-y-6
            "
    >
      {/* Content */}
      <div className="text-sm text-zinc-400 leading-relaxed">
        Join the group to start collaborating and receiving updates.
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setIsOpen(false)}
          className="
                  px-4 py-2 rounded-lg
                  text-sm font-medium
                  text-zinc-400
                  hover:text-white
                  hover:bg-white/5
                  transition
                "
        >
          Remind later
        </button>

        <button
          disabled={isLoading}
          onClick={() => mutation()}
          className="
                  px-5 py-2 rounded-lg
                  text-zinc-50
                  text-sm font-semibold
                  bg-indigo-600
                  hover:bg-indigo-500
                  active:scale-[0.98]
                  transition-all
                  shadow-lg shadow-indigo-600/20
                "
        >
          {isLoading ? (
            <h2 className="flex gap-2 items-center justify-center">
              <Spinner /> <span>Joining...</span>{" "}
            </h2>
          ) : (
            "Join"
          )}
        </button>
      </div>
    </DialogCompo>
  );
}

function useGroupInfo(): Group {
  return useMemo(() => {
    return JSON.parse(localStorage.getItem("groupInfo") ?? "{}") as Group;
  }, []);
}

function Header() {
  return (
    <header>
      <SidebarTrigger />
    </header>
  );
}
