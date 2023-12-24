import { getSurveyCollector, getSurveyPages } from "@/app/actions";
import React from "react";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import SurveyResponse from "../components/survey-response";

import { getSurveyQuestionsAndResponses } from "@/app/actions";
import { cookies } from "next/headers";
import { RedirectType, permanentRedirect } from "next/navigation";

const TakeSurveyPage = async ({ params }: { params: { slug: string } }) => {
  //if u took the servey based on cookie get message that u took the survey

  const queryClient = new QueryClient();

  const collector = await getSurveyCollector(params.slug, "das");

  const blockedCollectorsCookie = cookies().get("blocked_col")?.value;
  if (blockedCollectorsCookie) {
    const blockedCollectors: string[] = JSON.parse(blockedCollectorsCookie);
    const surveyCollectorAlreadySubmitted = !!blockedCollectors.find(
      (collectorId) => collectorId === collector.id
    );

    if (surveyCollectorAlreadySubmitted)
      permanentRedirect("/survey-taken", RedirectType.replace);
  }

  const surveyId = collector.surveyId;

  const prefetchSurveyPages = queryClient.prefetchQuery({
    queryKey: ["survey", collector.surveyId, "pages"],
    queryFn: () => getSurveyPages(surveyId),
  });

  const prefetchQuestionsAndResponses = queryClient.prefetchQuery({
    queryKey: ["survey", surveyId, "questions-responses", 1],
    queryFn: () => getSurveyQuestionsAndResponses(surveyId, collector.id, 1),
  });

  await Promise.all([prefetchSurveyPages, prefetchQuestionsAndResponses]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="mx-auto max-w-3xl p-10">
        <SurveyResponse collectorId={collector.id} surveyId={surveyId} />
      </div>
    </HydrationBoundary>
  );
};

export default TakeSurveyPage;
