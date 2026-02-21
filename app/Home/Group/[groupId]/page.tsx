"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { handelAsyc } from "@/helper/handleAsync";
import axios from "axios";
import { ErrorToast } from "@/app/frontendComponents/Toasts/toast";
import { Reel } from "@/interface";
import { ReelsSkeleton } from "@/app/frontendComponents/Reels/ReelsSkeleton";
import Reels from "@/app/frontendComponents/Reels/Reels";
import { useInView } from "react-intersection-observer";

export default function GroupDetailsPage() {
  const { groupId } = useParams();
  const { ref, inView } = useInView();

  const fetchGroupDetails = async ({ pageParam }: { pageParam: number }) => {
    const response = await handelAsyc(async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT!}/api/getGroupReels?groupId=${groupId}&cursor=${pageParam}&limit=8`,
      );

      return res.data;
    }, "Error in fetching Group details");
    return response;
  };

  const {
    isPending,
    error,
    data,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchNextPageError,
  } = useInfiniteQuery({
    queryKey: ["groupReels"],
    queryFn: fetchGroupDetails,
    staleTime: 20_000,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.success) {
        ErrorToast(lastPage.message as string);
      }

      return !lastPage.data.data.hasNext ? null : lastPage.data.data.cursor;
    },
  });
  useEffect(() => {
    if (!inView) return;

    fetchNextPage();
  }, [inView]);
  const groupReels = (data?.pages.flatMap((page) => page.data.data.reels) ||
    []) as {
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
