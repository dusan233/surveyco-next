"use client";

import useSurveyPages from "@/lib/hooks/useSurveyPages";
import React, { useCallback, useEffect, useState } from "react";

import { Question, QuestionType, QuestionsResponsesData } from "@/lib/types";
import useQuestionsAndResponses from "@/lib/hooks/useQuestionsAndResponses";
import SurveyModifiedAlertDialog from "./survey-modified-alert-dialog";

import { useRouter } from "next/navigation";
import SurveyResponseForm from "@/components/survey/survey-response-form";
import { useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();
  const { replace } = useRouter();
  const [selectedPageNum, setSelectedPageNum] = useState(1);
  const [displayPageNum, setDisplayPageNum] = useState(1);
  const [startTime, setStartTime] = useState(surveyResposneStartTime);
  const [showSurveyModifiedDialog, setShowSurveyModifiedDialog] =
    useState(false);

  const { surveyPages } = useSurveyPages(surveyId);
  const { questions, questionResponses, page, isFetching } =
    useQuestionsAndResponses(surveyId, collectorId, selectedPageNum);

  const resetSurveyStartTime = () => {
    setStartTime(new Date());
  };

  const getInitialAnswer = (question: Question) => {
    const questionRes = questionResponses!.find(
      (qRes) => qRes.questionId === question.id
    );

    if (!questionRes)
      return question.type === QuestionType.checkboxes ? ([] as string[]) : "";

    return question.type === QuestionType.checkboxes
      ? questionRes.answer.map((answer) => answer.questionOptionId!)
      : question.type === QuestionType.textbox
      ? questionRes.answer[0].textAnswer!
      : questionRes.answer[0].questionOptionId!;
  };

  const getInitialResponses = () => {
    return questions!.map((question) => {
      const questionResponse = questionResponses!.find(
        (qRes) => qRes.questionId === question.id
      );

      return {
        ...(questionResponse &&
          questionResponse.id && { id: questionResponse.id }),
        questionId: question.id,
        required: question.required,
        answer: getInitialAnswer(question),
        questionType: question.type,
      };
    });
  };
  const clearPagesCachedData = useCallback(
    (discludeCurrentPage: boolean = false) => {
      queryClient.resetQueries({
        predicate(query) {
          const queryKey = query.queryKey;
          console.log(query);
          const condition =
            queryKey[0] === "survey" &&
            queryKey[1] === surveyId &&
            queryKey[2] === "questions-responses" &&
            (discludeCurrentPage ? queryKey[3] !== page : true);

          if (condition) {
            return true;
          }

          return false;
        },
      });
    },
    [queryClient, page, surveyId]
  );

  const onSurveyChange = () => {
    setShowSurveyModifiedDialog(true);
    setSelectedPageNum(1);
    resetSurveyStartTime();
  };
  const onSubmit = (data: QuestionsResponsesData, submitted: boolean) => {
    if (submitted) {
      replace("/survey-thanks");
    } else {
      setSelectedPageNum((selectedPageNum) => selectedPageNum + 1);
    }
  };

  const onPreviousPage = () => {
    setSelectedPageNum((selectedPageNum) => selectedPageNum - 1);
  };

  useEffect(() => {
    if (questions && page && questionResponses) {
      console.log("happening");
      clearPagesCachedData(true);
    }
  }, [questions, page, clearPagesCachedData, questionResponses]);

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
        onSurveyChange={onSurveyChange}
        onSuccessfulSubmit={onSubmit}
        key={page}
        initialResponses={getInitialResponses()}
        isFetchingPage={isFetching}
        questions={questions!}
        surveyPages={surveyPages!}
        onPreviousPage={onPreviousPage}
        displayPageNum={page!}
      />
    </>
  );
};

export default SurveyResponse;
