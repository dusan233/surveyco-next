import React from "react";

import BuildSurveyQuestions from "./components/build-survey-questions";
import { getSurveyPages, getSurveyQuestions } from "@/app/actions";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { BuildQuestionsProvider } from "@/lib/context";

const BuildSurveyQuestionsPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const queryClient = new QueryClient();
  const surveyId = params.slug;

  const pages = await queryClient.fetchQuery({
    queryKey: ["survey", surveyId, "pages"],
    queryFn: () => getSurveyPages(surveyId),
  });

  const firstPage = pages.find((page) => page.number === 1);

  const questions = await queryClient.fetchQuery({
    queryKey: ["survey", surveyId, "questions", firstPage!.id],
    queryFn: () => getSurveyQuestions(surveyId, firstPage!.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BuildQuestionsProvider
        questions={questions.questions}
        currentPage={pages.find((page) => page.number === 1)!}
      >
        <BuildSurveyQuestions surveyId={surveyId} />
      </BuildQuestionsProvider>
    </HydrationBoundary>
  );
};

export default BuildSurveyQuestionsPage;
