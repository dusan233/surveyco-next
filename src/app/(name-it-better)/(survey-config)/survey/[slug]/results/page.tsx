import { getQuestionResults, getSurveyQuestions } from "@/app/actions";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";
import SurveyResults from "./components/survey-results";

const SurveyResultsPage = async ({ params }: { params: { slug: string } }) => {
  const surveyId = params.slug;
  const queryClient = new QueryClient();

  const questionsData = await getSurveyQuestions(surveyId, 1);
  const questions = questionsData.questions;
  const questionIds = questions.slice(0, 5).map((q) => q.id);

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["questions", "results", 1],
    queryFn: ({ pageParam }) => getQuestionResults(surveyId, pageParam),
    initialPageParam: questionIds,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SurveyResults questions={questions} surveyId={surveyId} />
    </HydrationBoundary>
  );
};

export default SurveyResultsPage;
