import { getSurvey } from "@/api/survey";
import { PageParams } from "@/types/common";
import { auth } from "@clerk/nextjs/server";
import React from "react";

type SurveyTitleDefaultProps = {
  params: PageParams<["surveyId"]>;
};

const SurveyTitleDefault = async ({ params }: SurveyTitleDefaultProps) => {
  const surveyId = params.surveyId;
  const { getToken } = auth();
  const token = await getToken();

  const survey = await getSurvey({ surveyId, token });

  return (
    <section className="bg-slate-800 flex items-center min-h-[100px] px-4 sm:px-10">
      <h1 className="text-2xl text-white font-bold py-4 break-words min-w-[1%]">
        {survey.title}
      </h1>
    </section>
  );
};

export default SurveyTitleDefault;
