import { getSurvey, getSurveyResponses } from "@/app/actions";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";
import NoResponses from "../components/no-responses";
import SurveyResponsesView from "../components/survey-responses-view";

const SurveyResultsIndividualPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const surveyId = params.slug;
  const queryClient = new QueryClient();

  const initialSort: { name: string; type: "asc" | "desc" } = {
    name: "updated_at",
    type: "desc",
  };

  const [survey] = await Promise.all([
    getSurvey(surveyId),
    queryClient.prefetchQuery({
      queryKey: ["survey", surveyId, "responses", 1, initialSort],
      queryFn: () => getSurveyResponses(surveyId, 1, initialSort),
    }),
  ]);

  if (survey.responses_count === 0) {
    return <NoResponses surveyId={surveyId} />;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SurveyResponsesView survey={survey} />
    </HydrationBoundary>
  );
};

export default SurveyResultsIndividualPage;
