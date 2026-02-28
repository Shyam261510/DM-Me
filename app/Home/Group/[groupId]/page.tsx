"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { RootState } from "@/libs/Store";
import { handelAsyc } from "@/helper/handleAsync";
import axios from "axios";
import { Role } from "@/interface";
import { ReelsSkeleton } from "@/app/frontendComponents/Reels/ReelsSkeleton";
import { ReelSection } from "@/app/frontendComponents/Reels/ReelsSection";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useSmartSearch from "@/hooks/useSmartSearch";
import { ReelsTypes } from "@/app/frontendComponents/Reels/Reels";
import { InviteDialog } from "@/app/frontendComponents/Invite/InviteDialog";

export default function GroupDetailsPage() {
  const { groupId } = useParams();
  const { status, data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const groups = useSelector((state: RootState) => state.dataSlice.groups);
  const group = groups.find((g) => g.id === groupId);

  const fetchGroupDetails = async ({ pageParam }: { pageParam: number }) => {
    return handelAsyc(async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT!}/api/getGroupReels`,
        {
          params: {
            userId: session?.user?.id,
            groupId,
            cursor: pageParam,
            limit: 8,
          },
        },
      );
      return res.data?.data;
    }, "Error in fetching Group details");
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

  if (isPending) return <ReelsSkeleton />;

  return (
    <div>
      <ReelSection
        input={input}
        setInput={setInput}
        setIsOpen={setIsOpen}
        isFetching={isFetching}
        isGenerating={isGenerating}
        hasNextPage={hasNextPage}
        reels={filteredVideos.results}
        ref={ref}
        role={role as Role}
        clearHandler={clearHandler}
        tagsHandler={tagsHandler}
        filter={filter}
        tags={tags}
      />
      <InviteDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        groupId={groupId as string}
        groupName={group?.groupName ?? ""}
        userId={session?.user?.id as string}
        currentUserEmail={session?.user?.email as string}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}
