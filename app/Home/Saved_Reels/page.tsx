"use client";
import { RootState } from "@/libs/Store";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
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

const Reels = dynamic(() => import("@/app/frontendComponents/Reels/Reels"), {
  loading: () => <ReelsSkeleton />,
  ssr: false, // IMPORTANT for video-heavy components
});

function SavedReels() {
  const userinfo = useSelector((state: RootState) => state.dataSlice.user);
  const [input, setInput] = useState<string>("");
  const [searchEmbedding, setSearchEmbedding] = useState<number[] | null>(null);

  const debounceQuery = useDebounce({ query: input, delay: 1000 });

  const [filter, setFilter] = useState<{ tag: string; embedding: number[] }>({
    tag: "All",
    embedding: [0],
  });

  const tags = useMemo(() => {
    const reels = userinfo.reels;
    let tagMap = new Map();
    let filters = [] as { tag: string; embedding: number[] }[];

    reels.forEach((r) => {
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
  }, [userinfo]);

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

  const filterReels = useMemo(() => {
    if (filter.tag === "All") {
      return { success: true, results: userinfo.reels };
    }

    const similarities = userinfo.reels.map((r) => {
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
  }, [filter, userinfo.reels]);

  const filteredVideos = useMemo(() => {
    if (input === "" && filter.tag === "All") {
      return { success: true, results: userinfo.reels };
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

  return (
    <div className="w-full bg-gray-50 h-screen overflow-y-scroll overflow-x-hidden">
      {/* Filter Bar */}
      <div className="sticky top-0 z-20 bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex flex-wrap gap-3 items-center">
            {/* Search */}
            <input
              type="text"
              placeholder="Search reels..."
              className="h-9 w-full sm:w-64 rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            {/* Niche Filter */}
            <Select
              defaultValue={filter.tag as string}
              value={filter.tag}
              onValueChange={(value) => tagsHandler(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {[{ tag: "All", embedding: [0] }, ...tags].map((t, index) => (
                    <SelectItem key={index} value={t.tag}>
                      {t.tag}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Clear */}
            <button
              className="ml-auto text-sm text-zinc-500 hover:text-zinc-900"
              onClick={clearHandler}
            >
              Clear filters
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <Reels reels={filteredVideos.results} />
      </div>
    </div>
  );
}

export default SavedReels;
