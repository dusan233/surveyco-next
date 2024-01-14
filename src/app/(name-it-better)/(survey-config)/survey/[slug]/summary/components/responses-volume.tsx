import { getSurveyResponsesVolume } from "@/app/actions";
import React from "react";

type ResponsesVolumeProps = {
  surveyId: string;
};

const ResponsesVolume = async ({ surveyId }: ResponsesVolumeProps) => {
  const responsesVolumeData = await getSurveyResponsesVolume(surveyId);
  console.log(responsesVolumeData);

  return (
    <div className="p-5 shadow-sm rounded-lg bg-white">ResponsesVolume</div>
  );
};

export default ResponsesVolume;
