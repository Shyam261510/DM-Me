/**
 * ============================================================
 * useUserData — Hook Workflow Overview
 * ============================================================
 *
 *  PREREQUISITES
 *  ─────────────
 *  • NextAuth session must exist (status === "authenticated")
 *  • session.user.id is used as the query key + API param
 *
 *  FLOW
 *  ────
 *  1. useSession()   – get the current auth session and its status
 *  2. useQuery()     – fetch /api/auth/getUserInfo once authenticated
 *                      (cached for 20 s via staleTime)
 *  3. useEffect()    – react to query result:
 *       ├─ error  → show an ErrorToast with the API message
 *       └─ success → sync user into Redux store + local state
 *
 *  OUTPUT
 *  ──────
 *  { user, status, isLoading }
 *    user      – User object for direct component use
 *    status    – NextAuth session status (authenticated / loading / etc.)
 *    isLoading – true while the API request is in-flight
 *
 * ============================================================
 */

"use client";

import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { ErrorToast } from "@/app/frontendComponents/Toasts/toast";
import { setUser } from "@/libs/dataslice";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "@/interface";

interface UserResponseType {
  success: boolean;
  user?: User;
  message?: string;
}

export const useUserData = () => {
  // Grab the NextAuth session — query is gated on authentication status
  const { data: session, status } = useSession();

  // Local copy of the user, returned directly to components
  const [userInfo, setUserInfo] = useState<User>({} as User);

  const dispatch = useDispatch();

  // ── Query: fetch full user profile from the API ──
  const userQuery = useQuery({
    queryKey: ["user", session?.user?.id], // re-fetches automatically if the user id changes
    enabled: status === "authenticated", // do not run until the session is confirmed
    staleTime: 20_000, // treat cached data as fresh for 20 s
    queryFn: async () => {
      const res = await axios.get(
        `/api/auth/getUserInfo?userId=${session?.user?.id}`,
      );
      return res.data as UserResponseType;
    },
  });

  // ── Effect: sync query result into Redux and local state ──
  useEffect(() => {
    // Guard: surface API-level failures as a toast and bail early
    if (userQuery.data && !userQuery.data?.success) {
      ErrorToast(userQuery.data?.message as string);
      return;
    }

    // Happy path: push user into the Redux store and local state
    dispatch(setUser(userQuery.data?.user as User));
    setUserInfo(userQuery.data?.user as User);
  }, [userQuery.data?.success]); // only re-runs when the success flag changes

  return {
    user: userInfo, // User object for component consumption
    status, // Session status from NextAuth
    isLoading: userQuery.isLoading, // true while the initial fetch is in-flight
  };
};
