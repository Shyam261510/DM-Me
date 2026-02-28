import { ReelsTypes } from "./Reels";
import ReelHeader from "./ReelHeader";
import { ReelsSkeleton } from "@/app/frontendComponents/Reels/ReelsSkeleton";
import dynamic from "next/dynamic";
import { Role } from "@/interface";
import DialogButton from "@/app/frontendComponents/Custom/Dialog/DialogButton";
import { Plus } from "lucide-react";

const Reels = dynamic(() => import("@/app/frontendComponents/Reels/Reels"), {
  loading: () => <ReelsSkeleton />,
  ssr: false,
});

interface TagTypes {
  tag: string;
  embedding: number[];
}

interface SavedReelSectionProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  reels: ReelsTypes[];
  clearHandler: () => void;
  tagsHandler: (tag: string) => void;
  ref: (node?: Element | null | undefined) => void;
  isFetching: boolean;
  isGenerating: boolean;
  hasNextPage: boolean;
  filter: TagTypes;
  tags: TagTypes[];
  role?: Role;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ReelSection({
  input,
  setInput,
  reels,
  isGenerating,
  isFetching,
  hasNextPage,
  clearHandler,
  tagsHandler,
  ref,
  filter,
  tags,
  role,
  setIsOpen = () => {},
}: SavedReelSectionProps) {
  return (
    <div className="min-h-screen w-full bg-[#0B0B0F] text-white">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 backdrop-blur-md  border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          {/* Header Content */}
          <div className="w-full sm:w-auto">
            <ReelHeader
              input={input}
              setInput={setInput}
              filter={filter}
              tags={tags}
              clearHandler={clearHandler}
              tagsHandler={tagsHandler}
            />
          </div>

          {/* Admin Action */}
          {role && (role as Role) === "ADMIN" && (
            <div className="w-full sm:w-auto">
              <DialogButton
                setIsOpen={setIsOpen}
                icon={<Plus size={18} />}
                title="Invite Member"
                className="w-full sm:w-auto"
              />
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-10">
        {/* Loading State */}
        {isGenerating && (
          <div className="flex items-center justify-center py-16 sm:py-20 text-neutral-400 text-sm sm:text-base">
            Generating reels...
          </div>
        )}

        {/* Empty State */}
        {!isGenerating && reels.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20 text-neutral-400 text-center px-4">
            <p className="text-base sm:text-lg font-medium">No reels found</p>
            <p className="text-xs sm:text-sm opacity-70 mt-2">
              Try adjusting filters or search keywords
            </p>
          </div>
        )}

        {/* Reels */}
        {!isGenerating && reels.length > 0 && <Reels reelsInfo={reels} />}

        {/* Infinite Scroll Trigger */}
        {hasNextPage && <div ref={ref} className="h-8 sm:h-10" />}

        {/* Fetching Skeleton */}
        {isFetching && (
          <div className="mt-4 sm:mt-6">
            <ReelsSkeleton />
          </div>
        )}
      </div>
    </div>
  );
}
