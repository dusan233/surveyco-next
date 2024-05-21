import { getSurvey } from "@/api/survey";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SurveyStatus } from "@/types/survey";
import { auth } from "@clerk/nextjs/server";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";

type SurveySummaryProps = {
  surveyId: string;
};

const SurveySummary = async ({ surveyId }: SurveySummaryProps) => {
  const { getToken } = auth();
  const token = await getToken();
  const survey = await getSurvey({ surveyId, token });

  const links = [
    { text: "Edit design", href: `/survey/${surveyId}/build` },
    { text: "Preview survey", href: `/survey/${surveyId}/preview` },
    { text: "Send survey", href: `/survey/${surveyId}/collectors` },
    { text: "Survey results", href: `/survey/${surveyId}/results` },
  ];

  const createdAt = new Date(survey.created_at);

  return (
    <div className="p-5 shadow-sm rounded-lg bg-white ">
      <div className="text-xs  text-gray-500">
        Created on{" "}
        <time dateTime={createdAt.toISOString()}>
          {format(createdAt, "M/d/yyyy")}
        </time>
      </div>
      <div className="flex h-full flex-wrap sm:flex-nowrap sm:h-24 gap-5 mt-5">
        <div className="uppercase flex max-w-xs w-full flex-col gap-2 sm:gap-6">
          <p className="text-sm text-gray-500">total responses</p>
          <div className="font-medium text-2xl">{survey.responses_count}</div>
        </div>
        <Separator orientation="vertical" />
        <div className="uppercase flex max-w-xs w-full flex-col gap-2 sm:gap-6">
          <p className="text-sm text-gray-500">survey status</p>
          <div
            className={`font-medium text-2xl ${
              survey.survey_status === SurveyStatus.close
                ? "text-red-500"
                : survey.survey_status === SurveyStatus.draft
                ? "text-orange-300"
                : "text-green-500"
            } uppercase`}
          >
            {survey.survey_status}
          </div>
        </div>
        <Separator orientation="vertical" />
        <div className="uppercase flex max-w-xs w-full flex-col gap-2 sm:gap-6">
          <p className="text-sm text-gray-500">pages</p>
          <div className="font-medium text-2xl uppercase">
            {survey.page_count}
          </div>
        </div>
        <Separator orientation="vertical" />
        <div className="uppercase flex max-w-xs w-full flex-col gap-2 sm:gap-6">
          <p className="text-sm text-gray-500">questions</p>
          <div className="font-medium text-2xl uppercase">
            {survey.question_count}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mt-4 justify-center sm:justify-end">
        {links.map((link) => (
          <Link key={link.text} href={link.href}>
            <Button className="w-full" variant="neutral" size="sm">
              {link.text}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SurveySummary;
