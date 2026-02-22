/**
 * ============================================================
 * useReels — Hook Workflow Overview
 * ============================================================
 *
 *  PREREQUISITES
 *  ─────────────
 *  • NextAuth session must exist — userId is passed to the API
 *  • useInfiniteScroll handles pagination + intersection observer
 *
 *  FLOW
 *  ────
 *  1. useSession()        – get the current auth session
 *  2. fetchReels()        – fetches a paginated page of reels from
 *                           the backend using cursor-based pagination,
 *                           wrapped in handelAsyc for safe error handling
 *  3. useInfiniteScroll() – drives infinite pagination; calls fetchReels
 *                           automatically as the user scrolls to the ref
 *  4. flatMap()           – flattens paginated pages into a single reel array
 *
 *  ERROR HANDLING
 *  ──────────────
 *  • handelAsyc wraps every API call — catches thrown errors and returns
 *    a { success, data, message } result instead of throwing
 *  • If success is false → ErrorToast is shown with the error message
 *
 *  OUTPUT
 *  ──────
 *  { reels, isLoading, isFetching, hasNextPage, ref }
 *    reels       – flat array of all loaded Reel objects
 *    isLoading   – true on the very first fetch (no cached data yet)
 *    isFetching  – true whenever any fetch (including pagination) is active
 *    hasNextPage – false when the cursor has reached the end
 *    ref         – attach to the last reel element to trigger next page load
 *
 * ============================================================
 */

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { ErrorToast } from "@/app/frontendComponents/Toasts/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { setReels } from "@/libs/dataslice";
import { Reel } from "@/interface";
import useInfiniteScroll from "./useInfiniteScroll";
import { handelAsyc } from "@/helper/handleAsync";
import { ReelsTypes } from "@/app/frontendComponents/Reels/Reels";

export default function useReels() {
  // Grab session so we can pass the userId to the API
  const { data: session, status } = useSession();

  // ── Fetcher: load one page of reels using cursor-based pagination ──
  const fetchReels = async ({ pageParam }: { pageParam: number }) => {
    const result = await handelAsyc(
      () =>
        axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT!}/api/getReels?userId=${session?.user?.id}&cursor=${pageParam}&limit=8`,
        ),
      "Failed to fetch reels",
    );

    // Surface API/network errors as a toast and bail
    if (!result.success) {
      ErrorToast(result.message as string);
      return null;
    }

    return result.data?.data;
  };

  // ── Infinite scroll: manages pagination, caching, and the sentinel ref ──
  const { data, isPending, isFetching, hasNextPage, ref } = useInfiniteScroll({
    fetcher: fetchReels,
    key: "reels",
    status,
  });

  // Flatten all paginated pages into a single array for easy consumption
  const userReels = (
    data?.pages.flatMap((page) => page.data.reels ?? []) as Reel[]
  )?.map((r) => ({ reel: r }));
  

  return {
    reels: userReels as ReelsTypes[], // All reels loaded so far
    isLoading: isPending, // True only on the initial load
    isFetching, // True on any active fetch (including pagination)
    hasNextPage, // False when all pages have been loaded
    ref, // Attach to the last reel element to auto-load next page
  };
}
