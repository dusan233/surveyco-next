"use client";

import useSurveyPages from "@/lib/hooks/useSurveyPages";
import React, { useEffect, useState } from "react";

import { Question, QuestionType, QuestionsResponsesData } from "@/lib/types";
import useQuestionsAndResponses from "@/lib/hooks/useQuestionsAndResponses";
import SurveyModifiedAlertDialog from "./survey-modified-alert-dialog";

import { useRouter } from "next/navigation";
import SurveyResponseForm from "@/components/survey/survey-response-form";

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
  const { replace } = useRouter();
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
      setQuestions(questionsData);
      setQuestionResponses(questionResponsesData);
      setDisplayPageNum(selectedPageNum);
    }
  }, [isFetching, selectedPageNum, questionsData, questionResponsesData]);

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
        onSurveyChange={onSurveyChange}
        onSubmit={onSubmit}
        key={
          displayPageNum
          // !isFetching
          //   ? surveyPages?.find((page) => page.number === displayPageNum)?.id
          //   : ""
        }
        initialResponses={getInitialResponses()}
        isFetchingPage={isFetching || selectedPageNum !== displayPageNum}
        questions={questions!}
        surveyPages={surveyPages!}
        setSelectedPageNum={setSelectedPageNum}
        displayPageNum={displayPageNum}
      />
    </div>
  );
};

export default SurveyResponse;
