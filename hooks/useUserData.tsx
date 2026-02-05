"use client";

import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { ErrorToast } from "@/app/frontendComponents/Toasts/toast";
import { getUserInfo } from "@/helper/getUserInfo";
import { setUser } from "@/libs/dataslice";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useUserData = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  const userQuery = useQuery({
    queryKey: ["user", session?.user?.id],
    enabled: status === "authenticated",
    staleTime: 20_000,
    queryFn: async () => {
      return await getUserInfo({
        url: `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/get_user_info?userId=${session?.user?.id}`,
      });
    },
  });

  // ✅ handle success
  useEffect(() => {
    if (userQuery.data?.success) {
      dispatch(setUser(userQuery.data.user));
    }
  }, [userQuery.data?.success]);

  // ✅ handle error
  useEffect(() => {
    if (userQuery.data && !userQuery.data.success) {
      ErrorToast(userQuery.data.message);
    }
  }, [userQuery.data?.success]);

  return {
    user: session?.user,
    status,
    isLoading: userQuery.isLoading,
  };
};
