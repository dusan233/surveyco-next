import { getSurvey } from "@/app/_actions/survey-actions";
import React from "react";

const SurveyTitleDefault = async ({ params }: { params: { slug: string } }) => {
  const surveyId = params.slug;

  const survey = await getSurvey(surveyId);

  return (
    <div className="bg-slate-800 flex items-center min-h-[100px] px-4 sm:px-10">
      <h1 className="text-2xl text-white font-bold py-4 break-words min-w-[1%]">
        {survey.title}
      </h1>
    </div>
  );
};

export default SurveyTitleDefault;
