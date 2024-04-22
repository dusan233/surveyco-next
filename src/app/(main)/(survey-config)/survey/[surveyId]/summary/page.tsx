import React, { Suspense } from "react";
import SurveySummary from "./_components/survey-summary";
import MarketResearch from "./_components/market-research";
import SummarySectionHeading from "./_components/summary-section-heading";
import ResponsesVolume from "./_components/responses-volume";
import SurveySummarySkeleton from "./_components/survey-summary-skeleton";
import CollectorsSummarySkeleton from "./_components/collectors-summary-skeleton";
import CollectorsSummaryList from "./_components/collectors-summary-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Surveyco - Survey Summary",
  description:
    "Page dedicated for displaying information and base stats about survey.",
};

const SurveySummaryPage = ({ params }: { params: { surveyId: string } }) => {
  const surveyId = params.surveyId;

  return (
    <div className="p-5 sm:p-10 bg-slate-100 max-w-screen-xl mx-auto">
      <div className="gap-5 flex flex-col md:flex-row">
        <div className="flex-1 max-w-xs min-w-[215px]">
          <div className="space-y-2">
            <SummarySectionHeading> Did you know?</SummarySectionHeading>
            <MarketResearch />
          </div>
        </div>
        <div className="flex-1">
          <div className="space-y-5">
            <div className="space-y-2">
              <SummarySectionHeading>Summary</SummarySectionHeading>
              <Suspense fallback={<SurveySummarySkeleton />}>
                <SurveySummary surveyId={surveyId} />
              </Suspense>
            </div>
            <div className="space-y-2">
              <SummarySectionHeading>Collectors</SummarySectionHeading>
              <Suspense fallback={<CollectorsSummarySkeleton />}>
                <CollectorsSummaryList surveyId={surveyId} />
              </Suspense>
            </div>
            <div className="space-y-2">
              <SummarySectionHeading>Responses Volume</SummarySectionHeading>
              <Suspense fallback={"Loading..."}>
                <ResponsesVolume surveyId={surveyId} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveySummaryPage;
