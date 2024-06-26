import React from "react";
import CollectorsSummaryItem from "./collectors-summary-item";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getSurveyCollectors } from "@/api/survey";
import { auth } from "@clerk/nextjs/server";
import { SortObject } from "@/types/common";
import { Card } from "@/components/ui/card";

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
    <Card>
      <div className=" space-y-4 bg-white">
        {collectors.map((collector) => {
          return (
            <CollectorsSummaryItem key={collector.id} collector={collector} />
          );
        })}
      </div>

      <div className="mt-10">
        <Button size="sm" className="w-full sm:w-auto" asChild>
          <Link href={`/survey/${surveyId}/collectors`}>
            See all collectors
          </Link>
        </Button>
      </div>
    </Card>
  );
};

export default CollectorsSummaryList;
