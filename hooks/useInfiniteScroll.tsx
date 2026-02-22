import { useInView } from "react-intersection-observer";
import { ServiceResult } from "@/helper/handleAsync";
import { ErrorToast } from "@/app/frontendComponents/Toasts/toast";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Role } from "@/interface";

interface UseInfiniteScrollType {
  fetcher: ({
    pageParam,
  }: {
    pageParam: number;
  }) => Promise<ServiceResult<any>>;
  key: string;
  status: "authenticated" | "loading" | "unauthenticated";
}
function useInfiniteScroll({ fetcher, key, status }: UseInfiniteScrollType) {
  const { ref, inView } = useInView();
  let role = null as Role | null;

  const { isPending, data, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: [key],
      queryFn: fetcher,
      staleTime: 20_000,
      initialPageParam: 0,
      enabled: status === "authenticated",
      getNextPageParam: (lastPage) => {
        if (!lastPage.success) {
          ErrorToast(lastPage.message as string);
        }

        if (lastPage.data.role) {
          role = lastPage.data.role;
        }

        return !lastPage.data.hasNext ? null : lastPage.data.cursor;
      },
    });

  useEffect(() => {
    if (!inView) return;

    fetchNextPage();
  }, [inView]);

  return { ref, isPending, data, isFetching, hasNextPage, role };
}

export default useInfiniteScroll;
