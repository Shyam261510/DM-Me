"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/libs/Store";
import { openInstagramDM } from "@/helper/openInstagramDM";
import { getMessage } from "@/helper/getMessage";
import { copyToClipboard } from "@/helper/copyToClipboard";
import { Copy, CheckCircle, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { successToast } from "../frontendComponents/Toasts/toast";

function Home() {
  const userInfo = useSelector((state: RootState) => state.dataSlice.user);
  const message = getMessage(userInfo.username, userInfo.id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
            Instagram Account Setup
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Connect your Instagram once to start receiving reels automatically
          </p>
        </div>

        {/* Status Card */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          {userInfo.reciverId ? (
            <div className="flex flex-col items-center gap-3 text-center">
              <CheckCircle className="h-10 w-10 text-emerald-500" />
              <h2 className="text-lg font-semibold text-zinc-800">
                Instagram Connected
              </h2>
              <p className="text-sm text-zinc-500">
                Your account is already configured and ready to use.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Instructions */}
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-zinc-800">
                  Almost there 👋
                </h2>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Check your Instagram DMs for a message saying{" "}
                  <span className="font-medium text-zinc-800">
                    “Your account has been successfully configured.”
                  </span>
                  <br />
                  Paste that message below and wait about 10 seconds. Once
                  confirmed, refresh the dashboard.
                </p>
              </div>

              {/* Message Box */}
              <div className="rounded-xl bg-zinc-50 p-4 border">
                <p className="text-xs font-medium text-zinc-500 mb-2">
                  Message to send
                </p>

                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm text-zinc-800 leading-snug">
                    Hi! This is <b>{userInfo.username}</b> ******** 👋
                  </p>

                  <button
                    onClick={() => {
                      copyToClipboard(message);
                      successToast("Copied to clipboard");
                    }}
                    className="flex items-center gap-1 text-xs font-medium cursor-pointer text-indigo-600 hover:text-indigo-700"
                  >
                    <Copy className="h-4 w-4" />
                    Copy
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  className="flex items-center gap-2"
                  onClick={() => openInstagramDM(message)}
                >
                  <Instagram className="h-4 w-4" />
                  Open Instagram DM
                </Button>

                <Button variant="outline" disabled>
                  Waiting for confirmation…
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;
