import React from "react";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import SurveyCollectors from "./_components/survey-collectors";
import { Metadata } from "next";
import { getSurveyCollectors } from "@/api/survey";
import { auth } from "@clerk/nextjs/server";
import { PageParams, SortObject } from "@/types/common";

export const metadata: Metadata = {
  title: "Surveyco - Collector List",
  description: "Page dedicated for displaying list of all survey collectors.",
};

type CollectResponsesPageProps = {
  params: PageParams<["surveyId"]>;
};

const CollectResponsesPage = async ({ params }: CollectResponsesPageProps) => {
  const surveyId = params.surveyId;
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
