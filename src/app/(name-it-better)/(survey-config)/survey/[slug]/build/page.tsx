import React from "react";

import BuildSurveyQuestions from "@/components/survey/build-survey-questions";
import { getSurveyPages, getSurveyQuestions } from "@/app/actions";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

const BuildSurveyPage = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: {
    page?: string;
  };
}) => {
  const queryClient = new QueryClient();
  const surveyId = params.slug;
  const currenSurveyPage = Number(searchParams?.page) || 1;

  await queryClient.prefetchQuery({
    queryKey: ["survey", surveyId, "pages"],
    queryFn: () => getSurveyPages(surveyId),
  });

  await queryClient.prefetchQuery({
    queryKey: ["survey", surveyId, "questions", currenSurveyPage],
    queryFn: () => getSurveyQuestions(surveyId, currenSurveyPage),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BuildSurveyQuestions
        currentSurveyPage={currenSurveyPage}
        surveyId={surveyId}
      />
      ;
    </HydrationBoundary>
  );
};

export default BuildSurveyPage;
