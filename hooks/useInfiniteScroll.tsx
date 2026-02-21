import { useInView } from "react-intersection-observer";
import { ServiceResult } from "@/helper/handleAsync";
import { ErrorToast } from "@/app/frontendComponents/Toasts/toast";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

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

        return !lastPage.data.hasNext ? null : lastPage.data.cursor;
      },
    });

  useEffect(() => {
    if (!inView) return;

    fetchNextPage();
  }, [inView]);

  return { ref, isPending, data, isFetching, hasNextPage };
}

export default useInfiniteScroll;
