import React from "react";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { SortObject } from "@/lib/types";
import SurveyCollectors from "./components/survey-collectors";
import { getSurveyCollectors } from "@/app/_actions/survey-actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Surveyco - Collector List",
  description: "Page dedicated for displaying list of all survey collectors.",
};

const CollectResponsesPage = async ({
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

  await queryClient.fetchQuery({
    queryKey: ["survey", surveyId, "collectors", 1, initialSort],
    queryFn: () => getSurveyCollectors(surveyId, 1, initialSort),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="p-5 sm:p-10 bg-slate-100 max-w-screen-lg mx-auto">
        <SurveyCollectors surveyId={surveyId} />
      </div>
    </HydrationBoundary>
  );
};

export default CollectResponsesPage;
