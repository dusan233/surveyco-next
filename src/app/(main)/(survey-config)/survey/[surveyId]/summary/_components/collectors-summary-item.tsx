import { Collector } from "@/types/collector";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";

type CollectorsSummaryItemProps = {
  collector: Collector;
};

const CollectorsSummaryItem = ({ collector }: CollectorsSummaryItemProps) => {
  const createdAt = new Date(collector.created_at);

  return (
    <div
      key={collector.id}
      className="flex flex-wrap sm:flex-nowrap items-center justify-between"
    >
      <div className="flex flex-col items-start gap-1.5">
        <div
          className={`py-1 w-auto uppercase px-2 ${
            collector.status === "open" ? "bg-green-500" : "bg-gray-500"
          } text-white text-xs font-medium rounded-sm`}
        >
          {collector.status}
        </div>

        <Link
          className="underline inline-block"
          href={`/survey/${collector.surveyId}/collector/${collector.id}`}
        >
          {collector.name}
        </Link>
        <div className="text-xs  text-gray-500">
          Created on{" "}
          <time dateTime={createdAt.toISOString()}>
            {format(createdAt, "M/d/yyyy")}
          </time>
        </div>
      </div>
      <div className="text-lg  font-medium text-center max-w-[100px]">
        {collector.total_responses}
        <div className="text-sm font-normal">responses collected</div>
      </div>
    </div>
  );
};

export default CollectorsSummaryItem;
