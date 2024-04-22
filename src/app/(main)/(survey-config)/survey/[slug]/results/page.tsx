import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";
import SurveyQuestionResults from "./_components/survey-question-results";
import NoResponses from "./_components/no-responses";
import { Metadata } from "next";
import {
  getPageQuestionResults,
  getSurvey,
  getSurveyPages,
} from "@/api/survey";
import { auth } from "@clerk/nextjs/server";

export const metadata: Metadata = {
  title: "Surveyco - Survey results",
  description: "Survey page question results.",
};

const SurveyResultsPage = async ({ params }: { params: { slug: string } }) => {
  const surveyId = params.slug;
  const queryClient = new QueryClient();
  const { getToken } = auth();
  const token = await getToken();

  const surveyPages = await queryClient.fetchQuery({
    queryKey: ["survey", surveyId, "pages"],
    queryFn: () => getSurveyPages(surveyId),
  });

  const firstPage = surveyPages.find((page) => page.number === 1);

  const [survey] = await Promise.all([
    getSurvey({ surveyId, token }),
    queryClient.fetchQuery({
      queryKey: ["survey", surveyId, "questions", "results", firstPage!.id],
      queryFn: () =>
        getPageQuestionResults({ surveyId, pageId: firstPage!.id, token }),
    }),
  ]);

  if (survey.responses_count === 0) {
    return <NoResponses surveyId={surveyId} />;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SurveyQuestionResults survey={survey} surveyId={surveyId} />
    </HydrationBoundary>
  );
};

export default SurveyResultsPage;
