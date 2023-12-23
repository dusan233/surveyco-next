import {
  getSurveyCollector,
  getSurveyPages,
  getSurveyQuestions,
} from "@/app/actions";
import React from "react";

import SurveyResponseForm from "@/components/survey/survey-response-form";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import SurveyResponse from "../components/survey-response";
import { QuestionsResponseData } from "@/lib/types";
import { getSurveyQuestionsAndResponses } from "@/app/actions";
import { cookies } from "next/headers";

const TakeSurveyPage = async ({ params }: { params: { slug: string } }) => {
  //if u took the servey based on cookie get message that u took the survey
  const queryClient = new QueryClient();

  const collector = await getSurveyCollector(params.slug, "das");
  // const questions = await getSurveyQuestions(collector.surveyId, 1);
  const surveyId = collector.surveyId;

  await queryClient.prefetchQuery({
    queryKey: ["survey", collector.surveyId, "pages"],
    queryFn: () => getSurveyPages(surveyId),
  });

  await queryClient.prefetchQuery({
    queryKey: ["survey", surveyId, "questions-responses", 1],
    queryFn: () => getSurveyQuestionsAndResponses(surveyId, collector.id, 1),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="mx-auto max-w-3xl p-10">
        <SurveyResponse collectorId={collector.id} surveyId={surveyId} />
      </div>
    </HydrationBoundary>
  );
};

export default TakeSurveyPage;
