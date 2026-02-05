export const ReelsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <div className="aspect-[9/16] rounded-xl bg-zinc-200 animate-pulse" />
          <div className="h-4 bg-zinc-200 rounded w-3/4 animate-pulse" />
          <div className="flex gap-2">
            <div className="h-4 w-16 bg-zinc-200 rounded-full animate-pulse" />
            <div className="h-4 w-16 bg-zinc-200 rounded-full animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};
