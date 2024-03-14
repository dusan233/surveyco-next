import React from "react";

import dynamic from "next/dynamic";
import Spinner from "@/components/ui/spinner";
import { getSurveyResponsesVolume } from "@/app/_actions/survey-actions";

type ResponsesVolumeProps = {
  surveyId: string;
};

const DynamicResponsesVolumeChart = dynamic(
  () => import("./responses-volume-chart"),
  { ssr: false, loading: () => <Spinner size="md" /> }
);

const ResponsesVolume = async ({ surveyId }: ResponsesVolumeProps) => {
  const responsesVolumeData = await getSurveyResponsesVolume(surveyId);

  return (
    <div className="p-5 shadow-sm rounded-lg bg-white">
      <p className="mb-4">Last 10 days</p>
      <div className="flex justify-center">
        <DynamicResponsesVolumeChart data={responsesVolumeData} />
      </div>
    </div>
  );
};

export default ResponsesVolume;
