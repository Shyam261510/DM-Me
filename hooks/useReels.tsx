import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { ErrorToast } from "@/app/frontendComponents/Toasts/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { setReels } from "@/libs/dataslice";
import { Reel } from "@/interface";
import useInfiniteScroll from "./useInfiniteScroll";

export default function useReels() {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();

  const fetchReels = async ({ pageParam }: { pageParam: number }) => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT!}/api/getReels?userId=${session?.user?.id}&cursor=${pageParam}&limit=8`,
    );
    return res.data;
  };

  const { data, isPending, isFetching, hasNextPage, ref } = useInfiniteScroll({
    fetcher: fetchReels,
    key: "reels",
    status,
  });
  const userReels = data?.pages.flatMap((page) => page.data.reels);

  return {
    reels: userReels,
    isLoading: isPending,
    isFetching,
    hasNextPage,
    ref,
  };
}
