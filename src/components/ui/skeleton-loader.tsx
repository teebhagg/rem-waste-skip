import React from "react";

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div
      className={`animate-pulse bg-slate-200 dark:bg-slate-800 rounded-md ${
        className || ""
      }`}
    />
  );
};

export const SkipCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
      <div className="p-5">
        {/* Skip size and title */}
        <Skeleton className="h-7 w-1/3 mb-2" />

        {/* Price */}
        <Skeleton className="h-10 w-2/5 mb-4" />

        {/* Features */}
        <div className="space-y-3 mb-5">
          <div className="flex items-center">
            <Skeleton className="h-5 w-5 mr-2" />
            <Skeleton className="h-4 flex-1" />
          </div>
          <div className="flex items-center">
            <Skeleton className="h-5 w-5 mr-2" />
            <Skeleton className="h-4 flex-1" />
          </div>
          <div className="flex items-center">
            <Skeleton className="h-5 w-5 mr-2" />
            <Skeleton className="h-4 flex-1" />
          </div>
        </div>

        {/* Button */}
        <Skeleton className="h-10 w-full rounded-full" />
      </div>
    </div>
  );
};

export const SkipCardSkeletonGrid: React.FC = () => {
  return (
    <div className="w-screen max-w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 mx-auto">
        {Array(9)
          .fill(0)
          .map((_, index) => (
            <SkipCardSkeleton key={index} />
          ))}
      </div>
    </div>
  );
};
