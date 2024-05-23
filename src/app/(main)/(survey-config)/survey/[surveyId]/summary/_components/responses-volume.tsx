import React from "react";

import dynamic from "next/dynamic";
import Spinner from "@/components/ui/spinner";
import { getSurveyResponsesVolume } from "@/api/survey";
import { auth } from "@clerk/nextjs/server";
import { Card } from "@/components/ui/card";

type ResponsesVolumeProps = {
  surveyId: string;
};

const DynamicResponsesVolumeChart = dynamic(
  () => import("./responses-volume-chart"),
  { ssr: false, loading: () => <Spinner size="md" /> }
);

const ResponsesVolume = async ({ surveyId }: ResponsesVolumeProps) => {
  const { getToken } = auth();
  const token = await getToken();

  const responsesVolumeData = await getSurveyResponsesVolume({
    surveyId,
    token,
  });

  return (
    <Card>
      <p className="mb-4">Last 10 days</p>
      <div className="flex justify-center">
        <DynamicResponsesVolumeChart data={responsesVolumeData} />
      </div>
    </Card>
  );
};

export default ResponsesVolume;
