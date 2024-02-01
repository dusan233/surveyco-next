import { getSurvey } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SurveyStatus } from "@/lib/types";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";

type SurveySummaryProps = {
  surveyId: string;
};

const SurveySummary = async ({ surveyId }: SurveySummaryProps) => {
  const survey = await getSurvey(surveyId);

  return (
    <div className="p-5 shadow-sm rounded-lg bg-white ">
      <div className="text-xs  text-gray-500">
        Created on {format(new Date(survey.created_at), "M/d/yyyy")}
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
        <Link href={`/survey/${surveyId}/build`}>
          <Button className="w-full" variant="secondary" size="sm">
            Edit design
          </Button>
        </Link>
        <Link href={`/survey/${surveyId}/preview`}>
          <Button className="w-full" variant="secondary" size="sm">
            Preview survey
          </Button>
        </Link>
        <Link href={`/survey/${surveyId}/collectors`}>
          <Button className="w-full" variant="secondary" size="sm">
            Send survey
          </Button>
        </Link>
        <Link href={`/survey/${surveyId}/results`}>
          <Button className="w-full" variant="secondary" size="sm">
            Survey results
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SurveySummary;
