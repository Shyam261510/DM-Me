import { aspectRatio } from "framer-motion";
import React from "react";

interface ReelSkeletonProps {
  aspectRatio?: string;
}

function ReelSkeleton({ aspectRatio = "9/16" }: ReelSkeletonProps) {
  return (
    <div className="space-y-3">
      <div
        className={`aspect-[${aspectRatio}] rounded-xl bg-zinc-200 animate-pulse`}
      />
      <div className="h-4 bg-zinc-200 rounded w-3/4 animate-pulse" />
      <div className="flex gap-2">
        <div className="h-4 w-16 bg-zinc-200 rounded-full animate-pulse" />
        <div className="h-4 w-16 bg-zinc-200 rounded-full animate-pulse" />
      </div>
    </div>
  );
}

export default ReelSkeleton;
