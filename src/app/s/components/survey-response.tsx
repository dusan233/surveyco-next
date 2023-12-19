"use client";

import useSurveyPages from "@/lib/hooks/useSurveyPages";
import useSurveyQuestions from "@/lib/hooks/useSurveyQuestions";
import React, { useState } from "react";
import SurveyResponseForm from "./survey-response-form";

type SurveyResponseProps = {
  surveyId: string;
};

const SurveyResponse = ({ surveyId }: SurveyResponseProps) => {
  const [selectedPageNum, setSelectedPageNum] = useState(1);

  const { surveyPages, isLoading: loadingPages } = useSurveyPages(surveyId);
  const {
    questions: questionsData,
    isLoading: loadingQuestions,
    isFetching,
  } = useSurveyQuestions(surveyId, selectedPageNum);

  return (
    <div>
      <SurveyResponseForm />
    </div>
  );
};

export default SurveyResponse;
