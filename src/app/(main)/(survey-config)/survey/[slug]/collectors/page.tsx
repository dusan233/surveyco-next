import React from "react";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { SortObject } from "@/lib/types";
import SurveyCollectors from "./components/survey-collectors";
import { Metadata } from "next";
import { getSurveyCollectors } from "@/app/_api/survey";
import { auth } from "@clerk/nextjs/server";

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
  const { getToken } = auth();
  const token = await getToken();
  const queryClient = new QueryClient();

  const initialSort: SortObject = {
    column: "updated_at",
    type: "desc",
  };

  await queryClient.fetchQuery({
    queryKey: ["survey", surveyId, "collectors", 1, initialSort],
    queryFn: () =>
      getSurveyCollectors({ surveyId, sort: initialSort, page: 1, token }),
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
