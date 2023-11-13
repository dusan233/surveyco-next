import { getSurveyCollector, getSurveyQuestions } from "@/app/actions";
import React from "react";

import SurveyResponseForm from "@/components/survey/survey-response-form";

const TakeSurveyPage = async ({ params }: { params: { slug: string } }) => {
  //if u took the servey based on cookie get message that u took the survey

  const collector = await getSurveyCollector(params.slug, "das");
  const questions = await getSurveyQuestions(collector.surveyId);

  return (
    <div className="mx-auto max-w-2xl p-10">
      <SurveyResponseForm questions={questions.questions} />
    </div>
  );
};

export default TakeSurveyPage;
