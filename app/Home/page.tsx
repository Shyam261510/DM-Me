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
  const message = getMessage(userInfo.username, userInfo.email);

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white">
      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Instagram Account Setup
          </h1>
          <p className="mt-3 text-sm text-[#A1A1AA]">
            Connect your Instagram once to start receiving reels automatically
          </p>
        </div>

        {/* Status Card */}
        <div className="rounded-2xl border border-[#23232E] bg-[#16161F] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          {userInfo.reciverId ? (
            <div className="flex flex-col items-center gap-4 text-center">
              <CheckCircle className="h-12 w-12 text-emerald-500" />

              <h2 className="text-xl font-semibold">Instagram Connected</h2>

              <p className="text-sm text-[#A1A1AA] max-w-sm">
                Your account is configured and ready. You can now send reels
                directly to JustDM.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Instructions */}
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Almost there 👋</h2>

                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  Check your Instagram DMs for a message saying{" "}
                  <span className="font-medium text-white">
                    “Your account has been successfully configured.”
                  </span>
                  <br />
                  Paste that message below and wait about 10 seconds. Then
                  refresh your dashboard.
                </p>
              </div>

              {/* Message Box */}
              <div className="rounded-xl bg-[#0B0B0F] border border-[#23232E] p-5">
                <p className="text-xs font-medium text-[#71717A] mb-3">
                  Message to send
                </p>

                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm text-white leading-snug">
                    Hi! This is <b>{userInfo.username}</b> ******** 👋
                  </p>

                  <button
                    onClick={() => {
                      copyToClipboard(message);
                      successToast("Copied to clipboard");
                    }}
                    className="flex items-center gap-1 text-xs font-medium text-[#6C5CE7] hover:text-[#FF4D8D] transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                    Copy
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  className="
                    flex items-center gap-2
                    bg-gradient-to-r from-[#6C5CE7] to-[#FF4D8D]
                    text-white
                    border-0
                    hover:opacity-90
                  "
                  onClick={() => openInstagramDM(message)}
                >
                  <Instagram className="h-4 w-4" />
                  Open Instagram DM
                </Button>

                <Button
                  variant="outline"
                  disabled
                  className="
                    border-[#23232E]
                    text-[#A1A1AA]
                    bg-[#16161F]
                  "
                >
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
