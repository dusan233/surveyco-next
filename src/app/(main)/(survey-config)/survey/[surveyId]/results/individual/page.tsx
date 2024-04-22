import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";
import NoResponses from "../_components/no-responses";
import IndividualResponses from "../_components/individual-response/individual-responses";
import { SortObject } from "@/lib/types";
import { Metadata } from "next";
import { getSurvey, getSurveyPages, getSurveyResponses } from "@/api/survey";
import { auth } from "@clerk/nextjs/server";

export const metadata: Metadata = {
  title: "Surveyco - Survey results",
  description: "Survey individual response results.",
};

const IndividualResponsesPage = async ({
  params,
}: {
  params: { surveyId: string };
}) => {
  const surveyId = params.surveyId;
  const queryClient = new QueryClient();
  const { getToken } = auth();
  const token = await getToken();

  const initialSort: SortObject = {
    column: "updated_at",
    type: "desc",
  };

  const [survey] = await Promise.all([
    getSurvey({ surveyId, token }),
    queryClient.fetchQuery({
      queryKey: ["survey", surveyId, "responses", 1, initialSort],
      queryFn: () =>
        getSurveyResponses({ surveyId, page: 1, sort: initialSort, token }),
    }),
    queryClient.fetchQuery({
      staleTime: Infinity,
      gcTime: 1000 * 60 * 5 * 10,
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
