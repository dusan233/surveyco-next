import React from "react";

import BuildSurveyQuestions from "./components/build-survey-questions";
import { getSurveyPages, getSurveyQuestions } from "@/app/actions";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

const BuildSurveyQuestionsPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const queryClient = new QueryClient();
  const surveyId = params.slug;

  const prefetchSurveyPages = queryClient.fetchQuery({
    queryKey: ["survey", surveyId, "pages"],
    queryFn: () => getSurveyPages(surveyId),
  });

  const prefetchSurveyPageQuestions = queryClient.fetchQuery({
    queryKey: ["survey", surveyId, "questions", 1],
    queryFn: () => getSurveyQuestions(surveyId, 1),
  });

  await Promise.all([prefetchSurveyPages, prefetchSurveyPageQuestions]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BuildSurveyQuestions surveyId={surveyId} />
    </HydrationBoundary>
  );
};

export default BuildSurveyQuestionsPage;
