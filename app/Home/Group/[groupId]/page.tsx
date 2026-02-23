"use client";

import { useParams } from "next/navigation";
import { handelAsyc } from "@/helper/handleAsync";
import axios from "axios";
import { Role } from "@/interface";
import { ReelsSkeleton } from "@/app/frontendComponents/Reels/ReelsSkeleton";
import dynamic from "next/dynamic";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useSession } from "next-auth/react";
import ReelHeader from "@/app/frontendComponents/Reels/ReelHeader";
import useSmartSearch from "@/hooks/useSmartSearch";
import { ReelsTypes } from "@/app/frontendComponents/Reels/Reels";
import { Plus, Users } from "lucide-react";
import { useState } from "react";
import DialogButton from "../DialogButton";
import DialogCompo from "@/app/frontendComponents/Custom/DialogCompo";
import DialogChildren from "../DialogChildren";
import { useMutation } from "@tanstack/react-query";
import { ErrorToast } from "@/app/frontendComponents/Toasts/toast";

const Reels = dynamic(() => import("@/app/frontendComponents/Reels/Reels"), {
  loading: () => <ReelsSkeleton />,
  ssr: false,
});

export default function GroupDetailsPage() {
  const { groupId } = useParams();
  const { status, data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [memberEmail, setMemberEmail] = useState<string>("");
  const [memberEmails, setMemberEmails] = useState<string[]>([]);

  const fetchGroupDetails = async ({ pageParam }: { pageParam: number }) => {
    const response = await handelAsyc(async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT!}/api/getGroupReels?userId=${session?.user?.id}&groupId=${groupId}&cursor=${pageParam}&limit=8`,
      );

      return res.data?.data;
    }, "Error in fetching Group details");
    return response;
  };
  const { data, isPending, isFetching, hasNextPage, ref, role } =
    useInfiniteScroll({
      fetcher: fetchGroupDetails,
      key: "groupReels",
      status,
    });

  const groupReels = (data?.pages.flatMap((page) => page.data.reels) ||
    []) as ReelsTypes[];

  const {
    input,
    setInput,
    clearHandler,
    tagsHandler,
    filteredVideos,
    isGenerating,
    filter,
    tags,
  } = useSmartSearch({ reelsInfo: groupReels });

  const inviteMemberMutation = useMutation({
    mutationFn: async () => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/inviteMember`,
        {
          groupId,
          emails: memberEmails,
        },
      );
    },
    onSuccess: () => {
      setMemberEmails([]);
      setMemberEmail("");
      setIsOpen(false);
    },
  });
  function formHandler() {
    // IF the user mistakenly add its own email then don't allow the user
    if (
      String(session?.user.email).toLowerCase() === memberEmail.toLowerCase()
    ) {
      ErrorToast("You cannot invite yourself");
      return;
    }
    setMemberEmails((prev) => [...prev, memberEmail]);
    setMemberEmail("");
  }
  function removeEmail(index: number) {
    setMemberEmails((prev) => prev.filter((_, i) => i !== index));
  }
  if (isPending || isFetching) {
    return <ReelsSkeleton />;
  }
  return (
    <div className="min-h-screen w-full  text-white overflow-x-hidden">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 backdrop-blur-md  border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          {/* Header Content */}
          <div className="w-full sm:w-auto">
            <ReelHeader
              input={input}
              setInput={setInput}
              filter={filter}
              tags={tags}
              clearHandler={clearHandler}
              tagsHandler={tagsHandler}
            />
          </div>

          {/* Admin Action */}
          {role && (role as Role) === "ADMIN" && (
            <div className="w-full sm:w-auto">
              <DialogButton
                setIsOpen={setIsOpen}
                icon={<Plus size={18} />}
                title="Invite Member"
                className="w-full sm:w-auto"
              />
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-10">
        {/* Loading State */}
        {isGenerating && (
          <div className="flex items-center justify-center py-16 sm:py-20 text-neutral-400 text-sm sm:text-base">
            Generating reels...
          </div>
        )}

        {/* Empty State */}
        {!isGenerating && filteredVideos?.results?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20 text-neutral-400 text-center px-4">
            <p className="text-base sm:text-lg font-medium">No reels found</p>
            <p className="text-xs sm:text-sm opacity-70 mt-2">
              Try adjusting filters or search keywords
            </p>
          </div>
        )}

        {/* Reels */}
        {!isGenerating && filteredVideos?.results?.length > 0 && (
          <Reels reelsInfo={filteredVideos.results} />
        )}

        {/* Infinite Scroll Trigger */}
        {hasNextPage && <div ref={ref} className="h-8 sm:h-10" />}

        {/* Fetching Skeleton */}
        {isFetching && (
          <div className="mt-4 sm:mt-6">
            <ReelsSkeleton />
          </div>
        )}
      </div>

      {/* Dialog */}
      <DialogCompo
        isOpen={isOpen}
        onOpenChange={() => setIsOpen((prev) => !prev)}
        title="Invite New Member"
        className="
      bg-[#16161F]
      border border-[#23232E]
      w-[92vw] sm:w-[420px]
      max-w-md
      max-h-[85vh]
      overflow-y-auto
    "
        icon={<Users />}
      >
        <DialogChildren
          input={memberEmail}
          setInput={setMemberEmail}
          setIsOpen={setIsOpen}
          label="Invite member by email"
          placeholder="e.g one@gmail.com"
          buttonName="Invite"
          loader="Inviting..."
          mutation={inviteMemberMutation.mutate}
          isPending={inviteMemberMutation.isPending}
          list={memberEmails}
          formHandler={formHandler}
          removeItem={removeEmail}
        />
      </DialogCompo>
    </div>
  );
}
