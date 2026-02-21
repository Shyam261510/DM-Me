import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { ErrorToast } from "@/app/frontendComponents/Toasts/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { setReels } from "@/libs/dataslice";
import { Reel } from "@/interface";

export default function useReels() {
  const dispatch = useDispatch();
  const { status, data: session } = useSession();
  const [userReels, setUserReels] = useState<Reel[] | undefined>(undefined);

  const reelsQuery = useQuery({
    queryKey: ["reels"],
    queryFn: async () => {
      const res = await axios.get(
        `/api/reels/getUserReels?userId=${session?.user?.id}`,
      );
      return res.data;
    },
    enabled: status === "authenticated",
    staleTime: 20_000,
  });

  useEffect(() => {
    // ✅ handle error
    if (reelsQuery.data && !reelsQuery.data.success) {
      ErrorToast(reelsQuery.data.message);
      return;
    }

    dispatch(setReels(reelsQuery.data?.data as Reel[]));
    setUserReels(reelsQuery.data?.data as Reel[]);
    return;
  }, [reelsQuery.data?.success]);

  return {
    reels: userReels,
    isLoading: reelsQuery.isLoading,
  };
}
