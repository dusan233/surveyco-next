import { getSurvey } from "@/app/actions";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";
import NoResponses from "../components/no-responses";

const SurveyResultsIndividualPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const surveyId = params.slug;
  const queryClient = new QueryClient();

  const [survey] = await Promise.all([getSurvey(surveyId)]);

  if (survey.responses_count === 0) {
    return <NoResponses surveyId={surveyId} />;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>dasdsad</div>
    </HydrationBoundary>
  );
};

export default SurveyResultsIndividualPage;
