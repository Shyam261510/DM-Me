"use client";

import { ReelsSkeleton } from "@/app/frontendComponents/Reels/ReelsSkeleton";
import dynamic from "next/dynamic";
import useReels from "@/hooks/useReels";

import ReelHeader from "@/app/frontendComponents/Reels/ReelHeader";
import useSmartSearch from "@/hooks/useSmartSearch";

const Reels = dynamic(() => import("@/app/frontendComponents/Reels/Reels"), {
  loading: () => <ReelsSkeleton />,
  ssr: false,
});

function SavedReels() {
  const { isLoading, reels, ref, isFetching } = useReels();

  const {
    input,
    setInput,
    clearHandler,
    tagsHandler,
    filteredVideos,
    isGenerating,
    filter,
    tags,
  } = useSmartSearch({ reelsInfo: reels });

  if (isLoading || isFetching) {
    return <ReelsSkeleton />;
  }

  return (
    <div className="min-h-screen w-full bg-[#0B0B0F] text-white">
      {/* Filter Bar (already responsive inside ReelHeader) */}
      <ReelHeader
        input={input}
        setInput={setInput}
        filter={filter}
        tags={tags}
        clearHandler={clearHandler}
        tagsHandler={tagsHandler}
      />

      {/* Content Section */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Generating State */}
        {isGenerating && (
          <div className="flex items-center justify-center py-20 text-sm text-gray-400">
            Generating reels...
          </div>
        )}

        {/* Empty State */}
        {!isGenerating && filteredVideos?.results?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 text-center">
            <p className="text-lg font-medium">No reels found</p>
            <p className="text-sm opacity-70 mt-2">
              Try adjusting your filters or search keywords
            </p>
          </div>
        )}

        {/* Reels */}
        {!isGenerating && filteredVideos?.results?.length > 0 && (
          <div className="animate-fadeIn">
            <Reels reelsInfo={filteredVideos.results} />
          </div>
        )}

        {/* Infinite Scroll Trigger */}
        <div ref={ref} className="h-10 sm:h-14" />
      </div>
    </div>
  );
}

export default SavedReels;
