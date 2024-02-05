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
  } = useTakeSurvey(surveyId, collectorId, surveyResposneStartTime);

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
        key={page}
        initialResponses={getInitialQuestionResponses()}
        isFetchingPage={isFetching}
        questions={questions!}
        surveyPages={surveyPages!}
        onPreviousPage={handlePreviousPage}
        displayPageNum={page!}
      />
    </>
  );
};

export default SurveyResponse;
