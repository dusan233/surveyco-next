import React from "react";

import BuildSurveyQuestions from "./_components/build-survey-questions";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { BuildQuestionsProvider } from "@/lib/providers/build-questions-provider";
import { Metadata } from "next";
import { getSurveyPages, getSurveyQuestions } from "@/api/survey";
import { PageParams } from "@/types/common";

export const metadata: Metadata = {
  title: "Surveyco - Build Survey Questions",
  description: "Page dedicated for building survey pages and questions.",
};

type BuildSurveyQuestionsPageProps = {
  params: PageParams<["surveyId"]>;
};

const BuildSurveyQuestionsPage = async ({
  params,
}: BuildSurveyQuestionsPageProps) => {
  const queryClient = new QueryClient();
  const surveyId = params.surveyId;

  const pages = await queryClient.fetchQuery({
    queryKey: ["survey", surveyId, "pages"],
    queryFn: () => getSurveyPages(surveyId),
  });

  const firstPage = pages.find((page) => page.number === 1);

  const questionsData = await queryClient.fetchQuery({
    queryKey: ["survey", surveyId, "questions", firstPage!.id],
    queryFn: () => getSurveyQuestions({ surveyId, surveyPage: firstPage!.id }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BuildQuestionsProvider
        questions={questionsData.questions}
        currentPage={pages.find((page) => page.number === 1)!}
      >
        <BuildSurveyQuestions surveyId={surveyId} />
      </BuildQuestionsProvider>
    </HydrationBoundary>
  );
};

export default BuildSurveyQuestionsPage;
