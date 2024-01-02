"use client";

import { useQuestionResults } from "@/lib/hooks/useSurveyResults";
import { Question } from "@/lib/types";
import React from "react";

type SurveyResultsProps = {
  questions: Question[];
  surveyId: string;
};

const SurveyResults = ({ surveyId, questions }: SurveyResultsProps) => {
  const { questionResults } = useQuestionResults(surveyId, questions);

  return (
    <div>
      {questionResults?.map((qResult) => (
        <div key={qResult.id}>Hello</div>
      ))}
    </div>
  );
};

export default SurveyResults;
