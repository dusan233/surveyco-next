import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";
import NoResponses from "../components/no-responses";
import IndividualResponses from "../components/individual-response/individual-responses";
import { SortObject } from "@/lib/types";
import {
  getSurvey,
  getSurveyPages,
  getSurveyResponses,
} from "@/app/_actions/survey-actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Surveyco - Survey results",
  description: "Survey individual response results.",
};

const IndividualResponsesPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const surveyId = params.slug;
  const queryClient = new QueryClient();

  const initialSort: SortObject = {
    column: "updated_at",
    type: "desc",
  };

  const [survey] = await Promise.all([
    getSurvey(surveyId),
    queryClient.fetchQuery({
      queryKey: ["survey", surveyId, "responses", 1, initialSort],
      queryFn: () => getSurveyResponses(surveyId, 1, initialSort),
    }),
    queryClient.fetchQuery({
      queryKey: ["survey", surveyId, "pages"],
      queryFn: () => getSurveyPages(surveyId),
    }),
  ]);

  if (survey.responses_count === 0) {
    return <NoResponses surveyId={surveyId} />;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <IndividualResponses survey={survey} />
    </HydrationBoundary>
  );
};

export default IndividualResponsesPage;
