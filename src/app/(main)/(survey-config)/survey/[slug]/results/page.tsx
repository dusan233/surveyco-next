import {
  getPageQuestionResults,
  getSurvey,
  getSurveyPages,
} from "@/app/actions";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";
import SurveyQuestionResults from "./components/survey-question-results";
import NoResponses from "./components/no-responses";

const SurveyResultsPage = async ({ params }: { params: { slug: string } }) => {
  const surveyId = params.slug;
  const queryClient = new QueryClient();

  const surveyPages = await queryClient.fetchQuery({
    queryKey: ["survey", surveyId, "pages"],
    queryFn: () => getSurveyPages(surveyId),
  });

  const firstPage = surveyPages.find((page) => page.number === 1);

  const [survey] = await Promise.all([
    getSurvey(surveyId),
    queryClient.fetchQuery({
      queryKey: ["survey", surveyId, "questions", "results", firstPage!.id],
      queryFn: () => getPageQuestionResults(surveyId, firstPage!.id),
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
