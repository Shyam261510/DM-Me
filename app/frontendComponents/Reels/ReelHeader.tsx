import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ReelHeaderProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  filter: { tag: string; embedding: number[] };
  tags: { tag: string; embedding: number[] }[];
  clearHandler: () => void;
  tagsHandler: (tag: string) => void;
}
function ReelHeader({
  input,
  setInput,
  filter,
  tags,
  clearHandler,
  tagsHandler,
}: ReelHeaderProps) {
  return (
    <div className="sticky top-0 z-20 bg-[#0B0B0F]/80 backdrop-blur-xl border-b border-[#23232E]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4">
        {/* Mobile: stacked | Desktop: single row */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search */}
          <input
            type="text"
            placeholder="Search reels..."
            className="
          h-10 w-full
          sm:flex-1
          lg:max-w-sm
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
            w-full
            sm:w-48
            lg:w-56
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
            onClick={clearHandler}
            className="
          text-sm
          text-[#A1A1AA]
          hover:text-white
          transition-colors
          sm:ml-auto
          self-start sm:self-auto
        "
          >
            Clear filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReelHeader;
