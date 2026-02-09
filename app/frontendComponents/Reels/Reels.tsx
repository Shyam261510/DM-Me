import { VideoComponent } from "../Video/VideoCompo";
import { Reel } from "@/interface";

interface ReelsProps {
  reels: Reel[];
}

function Reels({ reels }: ReelsProps) {
  // Empty State
  if (!reels.length) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-center text-white">
        <div className="space-y-3">
          <p className="text-xl font-semibold">No Reels Saved Yet</p>
          <p className="text-sm text-[#A1A1AA] max-w-sm mx-auto">
            Reels sent to your Instagram DMs will appear here automatically.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 text-white">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold">Saved Reels</h1>
        <p className="mt-2 text-sm text-[#A1A1AA]">
          All Instagram Reels sent to your DMs, saved and organized.
        </p>
      </div>

      {/* Reels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {reels.map((r) => (
          <div
            key={r.id}
            className="
              group rounded-2xl
              border border-[#23232E]
              bg-[#16161F]
              overflow-hidden
              transition-all duration-300
              hover:-translate-y-1
              hover:border-[#6C5CE7]/40
              hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]
            "
          >
            {/* Video */}
            <div className="relative">
              <VideoComponent url={r.reel.url} thumbnail={r.reel.thumbnail} />

              {/* Hover Glow Overlay */}
              <div
                className="
                absolute inset-0 opacity-0 group-hover:opacity-100
                transition
                bg-gradient-to-t from-black/40 to-transparent
              "
              />
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Title */}
              <h2 className="text-sm font-medium text-white line-clamp-2">
                {r.reel.title}
              </h2>

              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-2">
                <span
                  className="
                    text-xs px-2.5 py-1 rounded-full
                    bg-[#6C5CE7]/15
                    text-[#6C5CE7]
                    border border-[#6C5CE7]/30
                  "
                >
                  {r.reel.niche}
                </span>

                <span
                  className="
                    text-xs px-2.5 py-1 rounded-full
                    bg-[#FF4D8D]/15
                    text-[#FF4D8D]
                    border border-[#FF4D8D]/30
                  "
                >
                  {r.reel.subNiche}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reels;
