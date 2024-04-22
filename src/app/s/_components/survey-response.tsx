"use client";

import React from "react";

import SurveyModifiedAlertDialog from "./survey-modified-alert-dialog";

import SurveyResponseForm from "@/components/survey/survey-response-form";
import useTakeSurvey from "../useTakeSurvey";

type SurveyResponseProps = {
  surveyId: string;
  collectorId: string;
  surveyResposneStartTime: Date;
};

const SurveyResponse = ({
  surveyId,
  collectorId,
  surveyResposneStartTime,
}: SurveyResponseProps) => {
  const {
    questions,
    surveyPages,
    handlePreviousPage,
    handleSuccessfullPageSubmission,
    handleSurveyDataChanged,
    getInitialQuestionResponses,
    isFetching,
    startTime,
    showSurveyModifiedDialog,
    setShowSurveyModifiedDialog,
    page,
    isError,
  } = useTakeSurvey(surveyId, collectorId, surveyResposneStartTime);

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

  return (
    <>
      <SurveyModifiedAlertDialog
        isOpen={showSurveyModifiedDialog}
        onOpenChange={() => setShowSurveyModifiedDialog((show) => !show)}
      />

      <SurveyResponseForm
        surveyId={surveyId}
        collectorId={collectorId}
        surveyResposneStartTime={startTime}
        onSurveyChange={handleSurveyDataChanged}
        onSuccessfulSubmit={handleSuccessfullPageSubmission}
        key={page!}
        isPreview={false}
        initialResponses={getInitialQuestionResponses()}
        isFetchingPage={isFetching}
        questions={questions!}
        surveyPages={surveyPages!}
        onPreviousPage={handlePreviousPage}
        displayPageId={page!}
      />
    </>
  );
};

export default SurveyResponse;
