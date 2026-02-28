"use client";

import { ReelsSkeleton } from "@/app/frontendComponents/Reels/ReelsSkeleton";
import { ReelSection } from "@/app/frontendComponents/Reels/ReelsSection";
import useReels from "@/hooks/useReels";

import useSmartSearch from "@/hooks/useSmartSearch";

function SavedReels() {
  const { isLoading, reels, ref, isFetching, hasNextPage } = useReels();

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

  if (isLoading) {
    return <ReelsSkeleton />;
  }

  return (
    <ReelSection
      input={input}
      setInput={setInput}
      isFetching={isFetching}
      isGenerating={isGenerating}
      hasNextPage={hasNextPage}
      reels={filteredVideos.results}
      clearHandler={clearHandler}
      tagsHandler={tagsHandler}
      filter={filter}
      tags={tags}
      ref={ref}
    />
  );
}

export default SavedReels;
