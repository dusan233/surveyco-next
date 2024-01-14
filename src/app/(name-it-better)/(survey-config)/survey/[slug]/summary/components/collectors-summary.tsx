import { getSurveyCollectors } from "@/app/actions";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";

type CollectorsSummaryProps = {
  surveyId: string;
};

const CollectorsSummary = async ({ surveyId }: CollectorsSummaryProps) => {
  const collectors = await getSurveyCollectors(surveyId);

  return (
    <div className="p-5 space-y-4 shadow-sm rounded-lg bg-white">
      {collectors.map((collector) => {
        return (
          <div key={collector.id} className="flex items-center justify-between">
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
                href={`/survey/${surveyId}/collector/${collector.id}`}
              >
                {collector.name}
              </Link>
              <div className="text-xs  text-gray-500">
                Created on {format(new Date(collector.created_at), "M/d/yyyy")}
              </div>
            </div>
            <div className="text-lg font-medium text-center max-w-[100px]">
              {collector.total_responses}
              <div className="text-sm font-normal">responses collected</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CollectorsSummary;
