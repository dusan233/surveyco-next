"use client";

import SurveyResponseForm from "@/components/survey/survey-response-form";
import Spinner from "@/components/ui/spinner";
import useSurveyPages from "@/lib/hooks/useSurveyPages";
import useSurveyQuestions from "@/lib/hooks/useSurveyQuestions";

import React, { useState } from "react";

const SurveyPreviewPage = ({ params }: { params: { slug: string } }) => {
  const surveyId = params.slug;
  const [currentPageNum, setCurrentPageNum] = useState(1);

  const { surveyPages, isLoading: loadingPages } = useSurveyPages(surveyId);
  const { questions, isLoading: loadingQuestions } = useSurveyQuestions(
    surveyId,
    currentPageNum
  );

  if (loadingPages || loadingQuestions)
    return (
      <div className="flex justify-center pt-10">
        <Spinner size="xl" />
      </div>
    );

  return (
    <div className="bg-slate-100 p-10">
      <div className="max-w-3xl mx-auto">
        <SurveyResponseForm questions={questions!} />
      </div>
    </div>
  );
};

export default SurveyPreviewPage;
