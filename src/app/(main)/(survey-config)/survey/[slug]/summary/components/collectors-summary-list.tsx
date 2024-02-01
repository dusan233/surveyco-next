import { getSurveyCollectors } from "@/app/actions";
import { SortObject } from "@/lib/types";
import React from "react";
import CollectorsSummaryItem from "./collectors-summary-item";

type CollectorsSummaryListProps = {
  surveyId: string;
};

const CollectorsSummaryList = async ({
  surveyId,
}: CollectorsSummaryListProps) => {
  const sort: SortObject = { column: "total_responses", type: "desc" };
  const collectorsData = await getSurveyCollectors(surveyId, 1, sort);
  const collectors = collectorsData.data;

  return (
    <div className="p-5 space-y-4 shadow-sm rounded-lg bg-white">
      {collectors.map((collector) => {
        return (
          <CollectorsSummaryItem key={collector.id} collector={collector} />
        );
      })}
    </div>
  );
};

export default CollectorsSummaryList;
