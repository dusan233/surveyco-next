import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const items = [1, 2, 3];

const CollectorsSummarySkeleton = () => {
  return (
    <div className="p-5 space-y-4 shadow-sm rounded-lg bg-white">
      {items.map((_, index) => (
        <div
          key={index}
          className="flex flex-wrap sm:flex-nowrap  gap-2 items-center sm:justify-between"
        >
          <div className="flex flex-col items-start gap-1.5">
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-32" />
          </div>
          <div className="text-lg flex flex-col items-center gap-1 font-medium text-center max-w-[100px]">
            <Skeleton className="h-5 w-8" />
            <Skeleton className="h-12 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CollectorsSummarySkeleton;
