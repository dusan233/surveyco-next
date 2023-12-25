"use client";

import useSurveyPages from "@/lib/hooks/useSurveyPages";
import useSurveyQuestions from "@/lib/hooks/useSurveyQuestions";
import React, { useEffect, useRef, useState } from "react";
import SurveyResponseForm from "./survey-response-form";
import { Question } from "@/lib/types";
import useQuestionsAndResponses from "@/lib/hooks/useQuestionsAndResponses";
import SurveyModifiedAlertDialog from "./survey-modified-alert-dialog";
import { Button } from "@/components/ui/button";

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
  const [selectedPageNum, setSelectedPageNum] = useState(1);
  const [displayPageNum, setDisplayPageNum] = useState(1);
  const [startTime, setStartTime] = useState(surveyResposneStartTime);
  const [showSurveyModifiedDialog, setShowSurveyModifiedDialog] =
    useState(false);

  const { surveyPages, isLoading: loadingPages } = useSurveyPages(surveyId);
  const {
    questions: questionsData,
    questionResponses: questionResponsesData,
    isLoading: loadingQuestions,
    isFetching,
  } = useQuestionsAndResponses(surveyId, collectorId, selectedPageNum);

  const [questions, setQuestions] = useState(questionsData);
  const [questionResponses, setQuestionResponses] = useState(
    questionResponsesData
  );

  const resetSurveyStartTime = () => {
    setStartTime(new Date());
  };

  useEffect(() => {
    if (!isFetching) {
      console.log(questionsData, questionResponsesData);
      setQuestions(questionsData);
      setQuestionResponses(questionResponsesData);
      setDisplayPageNum(selectedPageNum);
    }
  }, [isFetching, selectedPageNum, questionsData, questionResponsesData]);

  return (
    <div>
      {/* {surveyPages!.map((page) => {
        return page.number === displayPageNum ? (
          <SurveyResponseForm
            key={page.id}
            displayPageNum={displayPageNum}
            setSelectedPageNum={setSelectedPageNum}
            surveyPages={surveyPages!}
            questions={questions!}
            isFetchingPage={isFetching}
          />
        ) : null;
      })} */}
      <SurveyModifiedAlertDialog
        isOpen={showSurveyModifiedDialog}
        onOpenChange={() => setShowSurveyModifiedDialog((show) => !show)}
      />

      <SurveyResponseForm
        surveyId={surveyId}
        collectorId={collectorId}
        surveyResposneStartTime={startTime}
        resetSurveyStartTime={resetSurveyStartTime}
        key={
          displayPageNum
          // !isFetching
          //   ? surveyPages?.find((page) => page.number === displayPageNum)?.id
          //   : ""
        }
        isFetchingPage={isFetching}
        questions={questions!}
        questionResponses={questionResponses!}
        surveyPages={surveyPages!}
        setSelectedPageNum={setSelectedPageNum}
        displayPageNum={displayPageNum}
        setShowSurveyModifiedDialog={setShowSurveyModifiedDialog}
      />
    </div>
  );
};

export default SurveyResponse;
