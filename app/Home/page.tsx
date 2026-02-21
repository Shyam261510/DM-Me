"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/libs/Store";
import { openInstagramDM } from "@/helper/openInstagramDM";
import { getMessage } from "@/helper/getMessage";
import { copyToClipboard } from "@/helper/copyToClipboard";
import { Copy, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { successToast } from "../frontendComponents/Toasts/toast";
import Loader from "../frontendComponents/Loader/Loader";
import SetupVideoSection from "../landing/components/SetupVideoSection";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const navigator = useRouter();

  const userInfo = useSelector((state: RootState) => state.dataSlice.user);

  useEffect(() => {
    if (userInfo?.reciverId) {
      navigator.push("/Home/SavedReels");
    }
  }, [userInfo?.reciverId, navigator]);

  if (!userInfo) {
    return <Loader />;
  }
  const message = getMessage(userInfo.username, userInfo.email as string);

  const handleCopy = () => {
    copyToClipboard(message);
    successToast("Copied to clipboard");
  };
  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white">
      <main className="max-w-4xl mx-auto px-6 py-10 space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold">Quick Setup Below</h1>
        </div>

        {/* Setup Video */}
        <SetupVideoSection />

        {/* Setup Card */}
        <div className="bg-[#16161F] border border-[#23232E] rounded-xl p-6 space-y-6">
          {/* Instructions */}
          <div>
            <h2 className="text-lg font-semibold mb-1">Almost there 👋</h2>
            <p className="text-sm text-gray-400">
              Check your Instagram DMs for the confirmation message. Paste it
              below, wait ~10 seconds, then refresh your dashboard.
            </p>
          </div>

          {/* Message Box */}
          <div className="bg-[#0B0B0F] border border-[#23232E] rounded-lg p-4 flex justify-between items-start gap-4">
            <p className="text-sm">
              Hi! This is <b>{userInfo.username}</b> ******** 👋
            </p>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs text-purple-400 hover:text-pink-400"
            >
              <Copy className="h-4 w-4" />
              Copy
            </button>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => openInstagramDM(message)}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            >
              <Instagram className="h-4 w-4" />
              Open Instagram DM
            </Button>

            <Button
              variant="outline"
              disabled
              className="border-[#23232E] bg-[#16161F] text-gray-400"
            >
              Waiting for confirmation…
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
