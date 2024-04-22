import { SortObject } from "@/lib/types";
import React from "react";
import CollectorsSummaryItem from "./collectors-summary-item";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getSurveyCollectors } from "@/api/survey";
import { auth } from "@clerk/nextjs/server";

type CollectorsSummaryListProps = {
  surveyId: string;
};

const CollectorsSummaryList = async ({
  surveyId,
}: CollectorsSummaryListProps) => {
  const { getToken } = auth();
  const token = await getToken();
  const sort: SortObject = { column: "total_responses", type: "desc" };
  const collectorsData = await getSurveyCollectors({
    surveyId,
    sort,
    page: 1,
    token,
    take: 5,
  });
  const collectors = collectorsData.data;

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm">
      <div className=" space-y-4   bg-white">
        {collectors.map((collector) => {
          return (
            <CollectorsSummaryItem key={collector.id} collector={collector} />
          );
        })}
      </div>

      <div className="mt-10">
        <Link href={`/survey/${surveyId}/collectors`}>
          <Button size="sm" className="w-full sm:w-auto">
            See all collectors
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CollectorsSummaryList;
