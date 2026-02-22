/**
 * ============================================================
 * useSmartSearch — Hook Workflow Overview
 * ============================================================
 *
 *  INPUT
 *  ─────
 *  reels[]  →  raw reel data passed in from the parent component
 *
 *  STATE SETUP
 *  ───────────
 *  • userReels     – local copy of reels, synced via useEffect
 *  • input         – raw text typed by the user
 *  • debounceQuery – debounced version of input (1 s delay)
 *  • filter        – currently active tag + its embedding vector
 *  • searchEmbedding – embedding vector generated for the search query
 *
 *  TAG FILTERING  (useMemo: tags, filterReels)
 *  ────────────────────────────────────────────
 *  1. Extract unique niche / subNiche tags from all reels → `tags[]`
 *  2. When the user picks a tag, compare its embedding against every
 *     reel's niche (65 %) + subNiche (35 %) embeddings via cosine
 *     similarity, keep top results within 90 % of the top score → `filterReels`
 *
 *  SEMANTIC SEARCH  (useMutation → useEffect → useMemo: filteredVideos)
 *  ─────────────────────────────────────────────────────────────────────
 *  3. When debounceQuery changes, call POST /api/embeddings to get a
 *     vector for the search text → `searchEmbedding`
 *  4. Compare searchEmbedding against each reel's title (35 %) +
 *     audioTranscribe (65 %) embeddings inside the tag-filtered set,
 *     keep top results within 90 % of the top score → `filteredVideos`
 *
 *  OUTPUT
 *  ──────
 *  { input, setInput, filter, tags, clearHandler, tagsHandler,
 *    filteredVideos, isGenerating }
 *
 * ============================================================
 */

import React, { useState, useEffect, useMemo } from "react";
import { ReelsTypes } from "@/app/frontendComponents/Reels/Reels";
import useDebounce from "@/hooks/useDebounce";
import axios from "axios";
import { Reel } from "@/interface";
import { ErrorToast } from "@/app/frontendComponents/Toasts/toast";
import { useMutation } from "@tanstack/react-query";
import { handelAsyc } from "@/helper/handleAsync";
import { cosineSimilarity } from "ai";

interface UseSmartSearchProps {
  reelsInfo: ReelsTypes[]
}

function useSmartSearch({ reelsInfo }: UseSmartSearchProps) {
  // Raw text the user is typing into the search box
  const [input, setInput] = useState<string>("");

  // Embedding vector representing the current search query (null when no query)
  const [searchEmbedding, setSearchEmbedding] = useState<number[] | null>(null);

  // Currently active tag filter and its pre-computed embedding vector
  const [filter, setFilter] = useState<{ tag: string; embedding: number[] }>({
    tag: "All",
    embedding: [0],
  });

  // Local copy of reels shaped for the Reels component
  const [userReels, setUserReels] = useState<ReelsTypes[]>([] as ReelsTypes[]);

  // Debounced search query — waits 1 s after the user stops typing
  const debounceQuery = useDebounce({ query: input, delay: 1000 });

  // ── Mutation: fetch an embedding vector for the current search query ──
  const createEmbeddingMutation = useMutation({
    mutationFn: async () => {
      const res = await handelAsyc(async () => {
        const embeddingResponse = await axios.get(
          `/api/embeddings?userQuery=${encodeURIComponent(debounceQuery)}`,
        );
        return embeddingResponse.data;
      }, "Failed to created embedding");
      return res;
    },
    onSuccess(data) {
      // Guard: surface API-level errors as toasts without crashing
      if (!data?.success) {
        ErrorToast(data?.message as string);
        return;
      }
      if (!data.data?.success) {
        ErrorToast(data.data?.message as string);
        return;
      }

      // Store the returned embedding so filteredVideos can use it
      setSearchEmbedding(data.data?.embeddings as number[]);
      return;
    },
    onError: (error) => {
      ErrorToast(error.message);
      return;
    },
  });

  // ── Sync: keep userReels in step with the reels prop ──
  useEffect(() => {
    if (reelsInfo) {
      setUserReels(reelsInfo.map((r) => ({ reel: r.reel, user: r.user})));
    }
  }, [reelsInfo]);

  // ── Trigger: request a new embedding whenever the debounced query or
  //    active filter changes; clear the embedding when the query is empty ──
  useEffect(() => {
    if (input === "" || !debounceQuery || debounceQuery === "") {
      setSearchEmbedding(null);
      return;
    }

    createEmbeddingMutation.mutate();
  }, [debounceQuery, filter]);

  // ── Derive: build a deduplicated list of {tag, embedding} pairs from
  //    every reel's niche and subNiche fields ──
  const tags = useMemo(() => {
    let tagMap = new Map();
    let filters = [] as { tag: string; embedding: number[] }[];

    userReels.forEach((r) => {
      // Skip if this niche has already been added
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

  // ── Derive: apply tag filter via cosine similarity ──
  const filterReels = useMemo(() => {
    // "All" tag → return every reel unfiltered
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

      // Weighted fusion: primary category (65 %) + subcategory (35 %)
      const finalSimilarity =
        0.65 * nicheSimilarity + 0.35 * subNicheSimilarity;

      return {
        reel: r,
        similarity: finalSimilarity,
      };
    });

    // Keep only reels within 90 % of the top similarity score
    const sorted = similarities.sort((a, b) => b.similarity - a.similarity);
    const topScore = sorted[0]?.similarity || 0;
    const topMatches = sorted.filter((m) => m.similarity >= topScore * 0.9);

    return {
      success: true,
      results: topMatches.map((match) => match.reel),
    };
  }, [filter, userReels]);

  // ── Derive: apply semantic search on top of the tag-filtered set ──
  const filteredVideos = useMemo(() => {
    // No query and no tag filter → return everything
    if (input === "" && filter.tag === "All") {
      return { success: true, results: userReels };
    }

    // Query present but embedding not ready yet → fall back to tag filter only
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

      // Weighted fusion: audio transcript (65 %) + title (35 %)
      // Audio is weighted higher because it contains richer contextual content
      const finalSimilarity =
        0.65 * audioTranscribeSimilarity + 0.35 * titleSimilarity;

      return {
        reel: r,
        similarity: finalSimilarity,
      };
    });

    // Keep only reels within 90 % of the top similarity score
    const sorted = similarities.sort((a, b) => b.similarity - a.similarity);
    const topScore = sorted[0]?.similarity || 0;
    const topMatches = sorted.filter((m) => m.similarity >= topScore * 0.9);

    return {
      success: true,
      results: topMatches.map((match) => match.reel),
    };
  }, [searchEmbedding, filterReels, filter, input]);

  // ── Handlers ──

  // Reset both the tag filter and the search input to their defaults
  const clearHandler = () => {
    setFilter({ tag: "All", embedding: [0] });
    setInput("");
  };

  // Set the active tag filter when the user clicks a tag chip
  function tagsHandler(tag: string) {
    let newTagInfo = tags.find((t) => t.tag === tag) ?? { tag, embedding: [0] };
    setFilter(newTagInfo);
  }

  return {
    input,
    setInput,
    filter,
    tags,
    clearHandler,
    tagsHandler,
    filteredVideos,
    isGenerating: createEmbeddingMutation.isPending, // true while embedding API call is in-flight
  };
}

export default useSmartSearch;
