import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SurveySummarySkeleton = () => {
  return (
    <div className="p-5 shadow-sm rounded-lg bg-white ">
      <Skeleton className="h-4 w-24" />
      <div className="flex  flex-wrap sm:flex-nowrap  gap-5 mt-5">
        <Skeleton className=" w-full   h-24" />
        <Skeleton className=" w-full   h-24" />
        <Skeleton className="  w-full  h-24" />
        <Skeleton className="w-full   h-24" />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 mt-4 justify-center sm:justify-end">
        <Skeleton className=" w-full sm:w-28  h-8" />
        <Skeleton className=" w-full sm:w-28  h-8" />
        <Skeleton className=" w-full sm:w-28  h-8" />
        <Skeleton className=" w-full sm:w-28  h-8" />
      </div>
    </div>
  );
};

export default SurveySummarySkeleton;
