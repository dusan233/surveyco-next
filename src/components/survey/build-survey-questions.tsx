"use client";

import React, { useEffect, useState } from "react";
import useSurveyQuestions from "@/lib/hooks/useSurveyQuestions";
import { useSelectedQuestion } from "@/lib/hooks/useSelectedQuestion";
import { Question, QuestionType, UnsavedQuestion } from "@/lib/types";
import { QuestionsListContext } from "@/lib/context";
import BuildQuestionsList from "../questions/build-questions-list";
import AddQuestion from "../questions/add-question";
import useSurveyPages from "@/lib/hooks/useSurveyPages";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import PageControlBar from "./page-control-bar";
import { useLoadingToast } from "@/lib/hooks/useLoadingToast";
import { StrictModeDroppable } from "../strict-mode-droppable";

const BuildSurveyQuestions = ({
  surveyId,
  currentSurveyPage,
}: {
  surveyId: string;
  currentSurveyPage: number;
}) => {
  const [currentPageNumber, setCurrentPageNumber] = useState(currentSurveyPage);
  const { surveyPages } = useSurveyPages(surveyId);
  const currentPage = surveyPages!.find(
    (page) => page.number === currentPageNumber
  );
  const {
    questions: questionsData,
    isLoading,
    isFetching,
  } = useSurveyQuestions(surveyId, currentPageNumber);

  const [questions, setQuestions] = useState<(Question | UnsavedQuestion)[]>(
    []
  );
  const [addingQuestion, setAddingQuestion] = useState(false);

  const { selectedQuestion, setCanSelectQuestion, setPendingQuestion } =
    useSelectedQuestion();

  useEffect(() => {
    if (questionsData) {
      console.log(questionsData);
      setQuestions(questionsData);
    }
  }, [questionsData]);

  useEffect(() => {
    if (!addingQuestion) {
      setQuestions((questions) => {
        return questions.filter((question) => question.id);
      });
    }
  }, [addingQuestion]);
  useLoadingToast(isFetching, "Loading page...");

  const addNewQuestion = (type: QuestionType) => {
    const lastQuestionNumber = questions.length
      ? (questions[questions.length - 1] as Question).number
      : 0;
    setQuestions((questions) => {
      const newQuestion =
        type === QuestionType.textbox
          ? {
              type: type,
              description: "",
              description_image: null,
              updated_at: null,
              required: false,
              number: lastQuestionNumber + 1,
            }
          : {
              type: type,
              description: "",
              description_image: null,
              updated_at: null,
              required: false,
              number: lastQuestionNumber + 1,
              options: [
                {
                  description: "",
                  description_image: null,
                },
                {
                  description: "",
                  description_image: null,
                },
              ],
            };
      const filteredQuestions = questions.filter((question) => question.id);
      const newQuestions = [...filteredQuestions, newQuestion];

      return newQuestions;
    });
    setPendingQuestion(null);
    setAddingQuestion(true);
  };

  return (
    <div className="p-10 rounded-sm  bg-slate-100">
      <PageControlBar
        currentPageNumber={currentPageNumber}
        setCurrentPageNumber={setCurrentPageNumber}
        currentPage={currentPage!}
        surveyId={surveyId}
      />

      <QuestionsListContext.Provider
        value={{
          setCanSelectQuestion,
          setPendingQuestion,
          setAddingQuestion,
          addingQuestion,
          lastQuestionIndex: questions.length - 1,
          currentPage,
          setQuestions,
        }}
      >
        <BuildQuestionsList
          currentPageId={currentPage!.id}
          currentPageNumber={currentPageNumber}
          addingQuestion={addingQuestion}
          surveyId={surveyId}
          selectedQuestion={selectedQuestion}
          questions={questions}
          setQuestions={setQuestions}
        />

        <AddQuestion addQuestion={addNewQuestion} />
      </QuestionsListContext.Provider>
    </div>
  );
};

export default BuildSurveyQuestions;
