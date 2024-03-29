import React from "react";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import SurveyResponse from "../components/survey-response";

import { cookies } from "next/headers";
import { RedirectType, permanentRedirect } from "next/navigation";
import { CollectorStatus } from "@/lib/types";
import { Metadata } from "next";
import { getCollector } from "@/app/_api/collector";
import {
  getSurveyPages,
  getSurveyQuestionsAndResponses,
} from "@/app/_api/survey";

type PageProps = { params: { slug: string } };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const collectorId = params.slug;
  const collector = await getCollector(collectorId);

  return {
    title: `${collector.survey.title} Survey`,
    description: "Page dedicated for takeing survey.",
  };
}

const TakeSurveyPage = async ({ params }: PageProps) => {
  const queryClient = new QueryClient();

  const collector = await getCollector(params.slug);

  if (collector.status === CollectorStatus.closed) {
    permanentRedirect("/survey-closed", RedirectType.replace);
  }

  const blockedCollectorsCookie = cookies().get("blocked_col")?.value;

  if (blockedCollectorsCookie) {
    const blockedCollectors: string[] = JSON.parse(blockedCollectorsCookie);
    const surveyCollectorAlreadySubmitted = !!blockedCollectors.find(
      (collectorId) => collectorId === collector.id
    );

    if (surveyCollectorAlreadySubmitted)
      permanentRedirect("/survey-taken", RedirectType.replace);
  }

  const surveyId = collector.surveyId;

  const surveyResposneStartTime = new Date();

  const prefetchSurveyPages = await queryClient.fetchQuery({
    queryKey: ["survey", collector.surveyId, "pages"],
    queryFn: () => getSurveyPages(surveyId),
  });

  const firstPageId = prefetchSurveyPages.find((page) => page.number === 1)!.id;

  await queryClient.fetchQuery({
    queryKey: ["survey", surveyId, "questions-responses", firstPageId],
    queryFn: () =>
      getSurveyQuestionsAndResponses(surveyId, collector.id, firstPageId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="mx-auto max-w-4xl">
        <SurveyResponse
          surveyResposneStartTime={surveyResposneStartTime}
          collectorId={collector.id}
          surveyId={surveyId}
        />
      </div>
    </HydrationBoundary>
  );
};

export default TakeSurveyPage;
