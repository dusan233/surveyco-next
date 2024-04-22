"use client";

import SurveyResponseForm from "@/components/survey/survey-response-form";
import Spinner from "@/components/ui/spinner";
import React from "react";
import PreviewEnd from "./_components/preview-end";
import useSurveyPreview from "./useSurveyPreview";

const SurveyPreviewPage = ({ params }: { params: { slug: string } }) => {
  const surveyId = params.slug;
  const {
    isLoading,
    isPreviewFinished,
    restartPreview,
    handlePreviousPage,
    handleSuccessfullPageSubmission,
    handleSurveyDataChanged,
    surveyResposneStartTime,
    getInitialQuestionResponses,
    surveyPages,
    questions,
    pageId,
    fetchingPageQuestions,
    isError,
  } = useSurveyPreview(surveyId);

  if (isError)
    return (
      <div className="mx-auto space-y-4 max-w-sm text-center p-5 sm:p-10">
        <h1 className="text-2xl font-medium">Internal Server Error</h1>
        <p className="text-lg">
          Sorry, we had some tehnical problems during your last operation.
          Please try again in a bit.
        </p>
      </div>
    );

  if (isLoading)
    return (
      <div className="flex justify-center p-5 sm:p-10">
        <Spinner size="xl" />
      </div>
    );

  if (isPreviewFinished)
    return (
      <div className="max-w-3xl mx-auto mt-10 p-5 sm:p-10">
        <PreviewEnd restartPreview={restartPreview} surveyId={surveyId} />
      </div>
    );

  return (
    <div className="bg-slate-100 p-5 sm:p-10">
      <div className="max-w-4xl mx-auto">
        <SurveyResponseForm
          onSurveyChange={handleSurveyDataChanged}
          onSuccessfulSubmit={handleSuccessfullPageSubmission}
          surveyResposneStartTime={surveyResposneStartTime}
          surveyId={surveyId}
          collectorId={null}
          key={pageId!}
          isPreview={true}
          displayPageId={pageId!}
          onPreviousPage={handlePreviousPage}
          surveyPages={surveyPages!}
          questions={questions!}
          isFetchingPage={fetchingPageQuestions}
          initialResponses={getInitialQuestionResponses()}
        />
      </div>
    </div>
  );
};

export default SurveyPreviewPage;
