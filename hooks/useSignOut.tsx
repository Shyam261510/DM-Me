"use client";
import { signOut } from "next-auth/react";

import { resetState } from "@/libs/dataslice";
import { useDispatch } from "react-redux";

export function useSignOut() {
  const dispatch = useDispatch();

  async function signOutHandler() {
    await signOut({ callbackUrl: "/" });

    // Clear redux state
    dispatch(resetState());
  }

  return signOutHandler;
}
