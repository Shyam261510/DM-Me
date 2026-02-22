/**
 * ============================================================
 * useSignOut — Hook Workflow Overview
 * ============================================================
 *
 *  CALL
 *  ────
 *  Component calls useSignOut() → receives signOutHandler function
 *
 *  ON INVOKE  (signOutHandler)
 *  ───────────────────────────
 *  1. signOut()     – ends the NextAuth session and redirects the
 *                     user to "/" via callbackUrl
 *  2. resetState()  – dispatches a Redux action to wipe all local
 *                     app state, preventing stale data after logout
 *
 *  OUTPUT
 *  ──────
 *  signOutHandler  →  async function, attach directly to onClick etc.
 *
 * ============================================================
 */

"use client";
import { signOut } from "next-auth/react";

import { resetState } from "@/libs/dataslice";
import { useDispatch } from "react-redux";

export function useSignOut() {
  const dispatch = useDispatch();

  // Ends the session and clears all Redux state
  async function signOutHandler() {
    // Sign out via NextAuth and redirect to the home page
    await signOut({ callbackUrl: "/" });

    // Wipe Redux store so no user data lingers after logout
    dispatch(resetState());
  }

  // Return the handler so the caller can bind it to a button or any trigger
  return signOutHandler;
}
