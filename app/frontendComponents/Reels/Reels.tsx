import { VideoComponent } from "../Video/VideoCompo";
import { Reel } from "@/interface";
interface ReelsProps {
  reels: Reel[];
}
function Reels({ reels }: ReelsProps) {
  if (!reels.length || reels.length === 0) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-center">
        <div className="space-y-2">
          <p className="text-lg font-semibold">No Reels Saved Yet</p>
          <p className="text-sm text-gray-600">
            Reels sent to your Instagram DMs will appear here automatically.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-zinc-900">Saved Reels</h1>
        <p className="mt-1 text-sm text-zinc-500">
          All Instagram Reels sent to your DMs, saved in one place.
        </p>
      </div>

      {/* Reels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {reels.map((r) => (
          <div
            key={r.id}
            className="group rounded-xl border border-zinc-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden"
          >
            {/* Video */}
            <VideoComponent url={r.reel.url} thumbnail={r.reel.thumbnail} />

            {/* Content */}
            <div className="p-3">
              {/* Title */}
              <h2 className="text-sm font-medium text-zinc-800 line-clamp-2">
                {r.reel.title}
              </h2>

              {/* Badges */}
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                  {r.reel.niche}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
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
