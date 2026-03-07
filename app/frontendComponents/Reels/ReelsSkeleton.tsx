import ReelSkeleton from "./ReelSkeleton";

export const ReelsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i}>
          <ReelSkeleton />
        </div>
      ))}
    </div>
  );
};
