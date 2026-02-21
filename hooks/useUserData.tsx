"use client";

import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { ErrorToast } from "@/app/frontendComponents/Toasts/toast";
import { setUser } from "@/libs/dataslice";
import { useQuery } from "@tanstack/react-query";
import { use, useEffect, useState } from "react";
import axios from "axios";
import { User } from "@/interface";
interface UserResponseType {
  success: boolean;
  user?: User;
  message?: string;
}

export const useUserData = () => {
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState<User>({} as User);
  const dispatch = useDispatch();

  const userQuery = useQuery({
    queryKey: ["user", session?.user?.id],
    enabled: status === "authenticated",
    staleTime: 20_000,
    queryFn: async () => {
      const res = await axios.get(
        `/api/auth/getUserInfo?userId=${session?.user?.id}`,
      );
      return res.data as UserResponseType;
    },
  });

  useEffect(() => {
    // ✅ handle error

    if (userQuery.data && !userQuery.data?.success) {
      ErrorToast(userQuery.data?.message as string);
      return;
    }
    // ✅ handle success

    dispatch(setUser(userQuery.data?.user as User));
    setUserInfo(userQuery.data?.user as User);
  }, [userQuery.data?.success]);

  return {
    user: userInfo,
    status,
    isLoading: userQuery.isLoading,
  };
};
