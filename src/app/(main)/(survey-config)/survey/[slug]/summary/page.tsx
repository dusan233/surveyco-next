import React, { Suspense } from "react";
import SurveySummary from "./components/survey-summary";
import MarketResearch from "./components/market-research";
import SummarySectionHeading from "./components/summary-section-heading";
import ResponsesVolume from "./components/responses-volume";
import SurveySummarySkeleton from "./components/survey-summary-skeleton";
import CollectorsSummarySkeleton from "./components/collectors-summary-skeleton";
import CollectorsSummaryList from "./components/collectors-summary-list";

const SurveySummaryPage = ({ params }: { params: { slug: string } }) => {
  const surveyId = params.slug;

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