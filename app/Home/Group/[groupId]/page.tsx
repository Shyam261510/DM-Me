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

const Reels = dynamic(() => import("@/app/frontendComponents/Reels/Reels"), {
  loading: () => <ReelsSkeleton />,
  ssr: false,
});

export default function GroupDetailsPage() {
  const { groupId } = useParams();
  const { status, data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [memberEmail, setMemberEmail] = useState<string>("");

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

  if (isPending || isFetching) {
    return <ReelsSkeleton />;
  }

  return (
    <div className="min-h-screen w-full bg-neutral-950 text-white">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 backdrop-blur-md bg-neutral-950/80 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <ReelHeader
            input={input}
            setInput={setInput}
            filter={filter}
            tags={tags}
            clearHandler={clearHandler}
            tagsHandler={tagsHandler}
          />

          {role && (role as Role) === "ADMIN" && (
            <DialogButton
              setIsOpen={setIsOpen}
              icon={<Plus size={18} />}
              title="Invite Member"
            />
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Loading State */}
        {isGenerating && (
          <div className="flex items-center justify-center py-20 text-neutral-400">
            Generating reels...
          </div>
        )}

        {/* Empty State */}
        {!isGenerating && filteredVideos?.results?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-neutral-400">
            <p className="text-lg font-medium">No reels found</p>
            <p className="text-sm opacity-70 mt-2">
              Try adjusting filters or search keywords
            </p>
          </div>
        )}

        {/* Reels */}
        {!isGenerating && filteredVideos?.results?.length > 0 && (
          <Reels reelsInfo={filteredVideos.results} />
        )}

        {/* Infinite Scroll Trigger */}
        {hasNextPage && <div ref={ref} className="h-10" />}

        {/* Fetching Skeleton */}
        {isFetching && <ReelsSkeleton />}
      </div>
      <DialogCompo
        isOpen={isOpen}
        onOpenChange={() => setIsOpen((prev) => !prev)}
        title="Invite New Member"
        className="
          bg-[#16161F]
          border border-[#23232E]
          w-[90vw] max-w-md
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
        />
      </DialogCompo>
    </div>
  );
}
