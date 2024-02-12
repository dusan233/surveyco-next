"use client";

import React, { useEffect } from "react";
import useSurveyQuestions from "@/lib/hooks/useSurveyQuestions";
import BuildQuestionsList from "./build-questions-list";
import AddQuestion from "./add-question";

import PageControlBar from "./page-control-bar";
import { useLoadingToast } from "@/lib/hooks/useLoadingToast";
import useBuildQuestionsContext from "../useBuildQuestionsContext";

const BuildSurveyQuestions = ({ surveyId }: { surveyId: string }) => {
  const currentPage = useBuildQuestionsContext((s) => s.currentPage);

  const { questions: questionsData, isFetching } = useSurveyQuestions(
    surveyId,
    currentPage!.number
  );

  const updateQuestions = useBuildQuestionsContext((s) => s.updateQuestions);
  const addingQuestion = useBuildQuestionsContext((s) => s.addingQuestion);
  const questions = useBuildQuestionsContext((s) => s.questions);
  const canSelectQuestion = useBuildQuestionsContext(
    (s) => s.canSelectQuestion
  );
  const setSelectedQuestion = useBuildQuestionsContext(
    (s) => s.setSelectedQuestion
  );
  const queueQuestion = useBuildQuestionsContext((s) => s.queueQuestion);
  const selectedQuestion = useBuildQuestionsContext((s) => s.selectedQuestion);

  //select new question if no other question is being saved at the moment.
  useEffect(() => {
    if (canSelectQuestion) {
      setSelectedQuestion(queueQuestion);
    }
  }, [canSelectQuestion, setSelectedQuestion, queueQuestion]);

  //sync useQuestions query data with store questions data.
  useEffect(() => {
    if (questionsData) {
      updateQuestions(questionsData);
    }
  }, [questionsData, updateQuestions]);

  //fillter out unsaved question on cancel adding new question.
  useEffect(() => {
    if (!addingQuestion) {
      updateQuestions((questions) => {
        return questions.filter((question) => question.id);
      });
    }
  }, [addingQuestion, updateQuestions]);

  useLoadingToast(isFetching, "Loading page...");

  return (
    <div className="p-5 sm:p-10 bg-accent max-w-screen-lg mx-auto">
      <PageControlBar surveyId={surveyId} />
      <BuildQuestionsList
        currentPageId={currentPage!.id}
        currentPageNumber={currentPage!.number}
        addingQuestion={addingQuestion}
        surveyId={surveyId}
        selectedQuestion={selectedQuestion}
        questions={questions}
        setQuestions={updateQuestions}
      />

      <AddQuestion />
    </div>
  );
};

export default BuildSurveyQuestions;
