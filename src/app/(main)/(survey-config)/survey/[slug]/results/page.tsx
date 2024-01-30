import {
  getQuestionsResult,
  getSurvey,
  getSurveyQuestions,
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

  const [survey, questionsData] = await Promise.all([
    getSurvey(surveyId),
    getSurveyQuestions(surveyId, 1),
  ]);

  const questions = questionsData.questions;
  const questionIds = questions.slice(0, 5).map((q) => q.id);

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["questions", "results", 1],
    queryFn: ({ pageParam }) => getQuestionsResult(surveyId, pageParam),
    initialPageParam: questionIds,
  });

  if (survey.responses_count === 0) {
    return <NoResponses surveyId={surveyId} />;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <SurveyQuestionResults
          survey={survey}
          questions={questions}
          surveyId={surveyId}
        />
      </div>
    </HydrationBoundary>
  );
};

export default SurveyResultsPage;
