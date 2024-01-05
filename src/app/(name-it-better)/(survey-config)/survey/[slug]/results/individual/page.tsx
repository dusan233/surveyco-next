import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";

const SurveyResultsIndividualPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const surveyId = params.slug;
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>dasdsad</div>
    </HydrationBoundary>
  );
};

export default SurveyResultsIndividualPage;
