import { getSurveyCollector, getSurveyQuestions } from "@/app/actions";
import React from "react";

const TakeSurveyPage = async ({ params }: { params: { slug: string } }) => {
  //if u took the servey based on cookie get message that u took the survey

  const collector = await getSurveyCollector(params.slug, "das");
  const questions = await getSurveyQuestions(collector.surveyId);

  return <div>TakeSurveyPage</div>;
};

export default TakeSurveyPage;
