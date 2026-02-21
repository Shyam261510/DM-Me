"use client";

import { useParams } from "next/navigation";
import { handelAsyc } from "@/helper/handleAsync";
import axios from "axios";
import { Reel } from "@/interface";
import { ReelsSkeleton } from "@/app/frontendComponents/Reels/ReelsSkeleton";
import Reels from "@/app/frontendComponents/Reels/Reels";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useSession } from "next-auth/react";

export default function GroupDetailsPage() {
  const { groupId } = useParams();
  const { status } = useSession();

  const fetchGroupDetails = async ({ pageParam }: { pageParam: number }) => {
    const response = await handelAsyc(async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT!}/api/getGroupReels?groupId=${groupId}&cursor=${pageParam}&limit=8`,
      );

      return res.data?.data;
    }, "Error in fetching Group details");
    return response;
  };
  const { data, isPending, isFetching, hasNextPage, ref } = useInfiniteScroll({
    fetcher: fetchGroupDetails,
    key: "groupReels",
    status,
  });

  const groupReels = (data?.pages.flatMap((page) => page.data.reels) || []) as {
    user: { username: string };
    reel: Reel;
  }[];

  if (isPending || isFetching) {
    return <ReelsSkeleton />;
  }

  return (
    <div>
      <Reels reelsInfo={groupReels} />

      {hasNextPage && <div ref={ref} />}
      {isFetching && <ReelsSkeleton />}
    </div>
  );
}
