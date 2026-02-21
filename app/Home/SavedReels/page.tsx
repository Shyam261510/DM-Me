"use client";

import { useEffect, useMemo, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cosineSimilarity } from "@/app/helper/cosinSimarilties";
import useDebounce from "@/hooks/useDebounce";
import axios from "axios";
import { ErrorToast } from "@/app/frontendComponents/Toasts/toast";
import { ReelsSkeleton } from "@/app/frontendComponents/Reels/ReelsSkeleton";
import dynamic from "next/dynamic";
import useReels from "@/hooks/useReels";
import { Reel } from "@/interface";
import { ReelsTypes } from "@/app/frontendComponents/Reels/Reels";

const Reels = dynamic(() => import("@/app/frontendComponents/Reels/Reels"), {
  loading: () => <ReelsSkeleton />,
  ssr: false,
});

function SavedReels() {
  const { isLoading, reels, ref, isFetching } = useReels();

  const [input, setInput] = useState<string>("");
  const [searchEmbedding, setSearchEmbedding] = useState<number[] | null>(null);

  const [filter, setFilter] = useState<{ tag: string; embedding: number[] }>({
    tag: "All",
    embedding: [0],
  });
  const [userReels, setUserReels] = useState<ReelsTypes[]>([] as ReelsTypes[]);

  const debounceQuery = useDebounce({ query: input, delay: 1000 });

  useEffect(() => {
    if (reels) {
      setUserReels(reels.map((r) => ({ reel: r })));
    }
  }, [reels]);

  useEffect(() => {
    if (input === "" || !debounceQuery || debounceQuery === "") {
      setSearchEmbedding(null);
      return;
    }
    async function fetchEmbeddings() {
      try {
        // ⚠️ Missing try-catch
        const response = await axios.get(
          `/api/embeddings?userQuery=${encodeURIComponent(debounceQuery)}`,
        );
        const { success, embeddings } = response.data; // ⚠️ 'message' doesn't exist in your API
        if (!success) {
          ErrorToast("Failed to create embedding"); // ⚠️ Use error field
          return;
        }

        setSearchEmbedding(embeddings);
      } catch (error) {
        // ⚠️ Add this
        console.error("Error fetching embeddings:", error);
        ErrorToast("Failed to fetch embeddings");
      }
    }
    fetchEmbeddings();
  }, [debounceQuery, filter]);

  const tags = useMemo(() => {
    let tagMap = new Map();
    let filters = [] as { tag: string; embedding: number[] }[];

    userReels.forEach((r) => {
      if (tagMap.has(r.reel.niche)) {
        return;
      }
      if (tagMap.has(r.reel.niche)) {
        return;
      }
      tagMap.set(r.reel.niche, true);
      tagMap.set(r.reel.subNiche, true);
      filters.push({
        tag: r.reel.niche as string,
        embedding: r.reel.nicheEmbeddings,
      });
      filters.push({
        tag: r.reel.subNiche as string,
        embedding: r.reel.subNicheEmbeddings,
      });
    });
    return filters;
  }, [userReels]);

  const filterReels = useMemo(() => {
    if (filter.tag === "All") {
      return { success: true, results: userReels };
    }

    const similarities = userReels.map((r) => {
      const nicheSimilarity = cosineSimilarity(
        r.reel.nicheEmbeddings,
        filter.embedding,
      );

      const subNicheSimilarity = cosineSimilarity(
        r.reel.subNicheEmbeddings,
        filter.embedding,
      );
      // 🔥 Weighted fusion
      // using the 65% of niche similarities and 35% of subNiche similarities
      const finalSimilarity =
        0.65 * nicheSimilarity + 0.35 * subNicheSimilarity;
      return {
        reel: r,
        similarity: finalSimilarity,
      };
    });
    // Sort first
    const sorted = similarities.sort((a, b) => b.similarity - a.similarity);
    const topScore = sorted[0]?.similarity || 0;
    const topMatches = sorted.filter((m) => m.similarity >= topScore * 0.9);

    return {
      success: true,
      results: topMatches.map((match) => match.reel),
    };
  }, [filter, userReels]);

  const filteredVideos = useMemo(() => {
    if (input === "" && filter.tag === "All") {
      return { success: true, results: userReels };
    }
    if (!debounceQuery || debounceQuery === "" || !searchEmbedding) {
      return filterReels;
    }

    const similarities = filterReels.results.map((r) => {
      const titleSimilarity = cosineSimilarity(
        r.reel.titleEmbeddings,
        searchEmbedding as number[],
      );
      const audioTranscribeSimilarity = cosineSimilarity(
        r.reel.audioTranscribeEmbeddings,
        searchEmbedding as number[],
      );
      // 🔥 Weighted fusion
      // using the 65% of audioTranscribe similarities and 35% of title similarities
      const finalSimilarity =
        0.65 * audioTranscribeSimilarity + 0.35 * titleSimilarity;
      return {
        reel: r,
        similarity: finalSimilarity,
      };
    });
    // Sort first
    const sorted = similarities.sort((a, b) => b.similarity - a.similarity);
    const topScore = sorted[0]?.similarity || 0;
    const topMatches = sorted.filter((m) => m.similarity >= topScore * 0.9);
    return {
      success: true,
      results: topMatches.map((match) => match.reel),
    };
  }, [searchEmbedding, filterReels, filter, input]);

  const clearHandler = () => {
    setFilter({ tag: "All", embedding: [0] });
    console.log(filter);
    setInput("");
  };

  function tagsHandler(tag: string) {
    let newTagInfo = tags.find((t) => t.tag === tag) ?? { tag, embedding: [0] };
    setFilter(newTagInfo);
  }
  if (isLoading || isFetching) {
    return <ReelsSkeleton />;
  }

  return (
    <div className="w-full  min-h-screen overflow-y-auto overflow-x-hidden text-white">
      {/* Filter Bar */}
      <div className="sticky top-0 z-20 bg-[#0B0B0F]/80 backdrop-blur-xl border-b border-[#23232E]">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex flex-wrap gap-3 items-center">
            {/* Search */}
            <input
              type="text"
              placeholder="Search reels..."
              className="
            h-10 w-full sm:w-72
            rounded-xl
            border border-[#23232E]
            bg-[#16161F]
            px-4 text-sm text-white
            placeholder:text-[#71717A]
            outline-none
            focus:border-[#6C5CE7]
            focus:ring-2 focus:ring-[#6C5CE7]/30
            transition-all
          "
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            {/* Tag Filter */}
            <Select
              defaultValue={filter.tag as string}
              value={filter.tag}
              onValueChange={(value) => tagsHandler(value)}
            >
              <SelectTrigger
                className="
              w-[200px]
              bg-[#16161F]
              border-[#23232E]
              text-white
              rounded-xl
              focus:ring-2 focus:ring-[#6C5CE7]/30
            "
              >
                <SelectValue />
              </SelectTrigger>

              <SelectContent className="bg-[#16161F] border border-[#23232E] text-white">
                <SelectGroup>
                  {[{ tag: "All", embedding: [0] }, ...tags].map((t, index) => (
                    <SelectItem
                      key={index}
                      value={t.tag}
                      className="focus:bg-[#6C5CE7]/20 focus:text-white"
                    >
                      {t.tag}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Clear Filters */}
            <button
              className="
            ml-auto text-sm
            text-[#A1A1AA]
            hover:text-white
            transition-colors
          "
              onClick={clearHandler}
            >
              Clear filters
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 py-10">
        <Reels reelsInfo={filteredVideos.results} />
        <div ref={ref} />
      </div>
    </div>
  );
}

export default SavedReels;
