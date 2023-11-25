"use client";

import React, { useEffect, useState } from "react";
import Spinner from "../ui/spinner";
import useSurveyQuestions from "@/lib/hooks/useSurveyQuestions";
import { useSelectedQuestion } from "@/lib/hooks/useSelectedQuestion";
import { Question, QuestionType, UnsavedQuestion } from "@/lib/types";
import { QuestionsListContext } from "@/lib/context";
import BuildQuestionsList from "../questions/build-questions-list";
import AddQuestion from "../questions/add-question";
import useSurveyPages from "@/lib/hooks/useSurveyPages";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import PageControlBar from "./page-control-bar";
import { useToast } from "../ui/use-toast";

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

  const { questions: questionsData, isLoading } = useSurveyQuestions(
    surveyId,
    currentPageNumber
  );

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

  const addNewQuestion = (type: QuestionType) => {
    const lastQuestionNumber = (questions[questions.length - 1] as Question)
      .number;
    setQuestions((questions) => {
      const newQuestion =
        type === QuestionType.textbox
          ? {
              type: type,
              description: "",
              updated_at: null,
              number: lastQuestionNumber + 1,
            }
          : {
              type: type,
              description: "",
              updated_at: null,
              number: lastQuestionNumber + 1,
              options: [
                {
                  description: "",
                },
                {
                  description: "",
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
        surveyId={surveyId}
      />

      {isLoading ? (
        <div className="flex py-20 justify-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <QuestionsListContext.Provider
          value={{
            setCanSelectQuestion,
            setPendingQuestion,
            setAddingQuestion,
            addingQuestion,
            lastQuestionIndex: questions.length - 1,
            currentPage,
          }}
        >
          <BuildQuestionsList
            addingQuestion={addingQuestion}
            surveyId={surveyId}
            selectedQuestion={selectedQuestion}
            questions={questions}
          />
          <AddQuestion addQuestion={addNewQuestion} />
        </QuestionsListContext.Provider>
      )}
    </div>
  );
};

export default BuildSurveyQuestions;
