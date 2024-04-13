import React from "react";

import BuildSurveyQuestions from "./components/build-survey-questions";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { BuildQuestionsProvider } from "@/lib/providers/build-questions-provider";
import { Metadata } from "next";
import { getSurveyPages, getSurveyQuestions } from "@/app/_api/survey";

export const metadata: Metadata = {
  title: "Surveyco - Build Survey Questions",
  description: "Page dedicated for building survey pages and questions.",
};

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
    queryFn: () => getSurveyQuestions({ surveyId, surveyPage: firstPage!.id }),
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
