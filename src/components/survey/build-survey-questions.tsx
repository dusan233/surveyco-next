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
    1
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
    setQuestions((questions) => {
      const newQuestion =
        type === QuestionType.textbox
          ? {
              type: type,
              description: "",
              updated_at: null,
            }
          : {
              type: type,
              description: "",
              updated_at: null,
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
      <div className="mb-4 max-w-xs">
        <Select
          onValueChange={(value) => {
            console.log(value);
          }}
          defaultValue={"1"}
        >
          {/* <FormControl> */}
          <SelectTrigger>
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          {/* </FormControl> */}
          <SelectContent>
            {surveyPages!.map((page) => (
              <SelectItem key={page.id} value={page.number.toString()}>
                {"Page " + page.number}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {isLoading ? (
        <div className="flex justify-center">
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
            setAddingQuestion={setAddingQuestion}
            surveyId={surveyId}
            selectedQuestion={selectedQuestion}
            setPendingQuestion={setPendingQuestion}
            questions={questions}
          />
          <AddQuestion addQuestion={addNewQuestion} />
        </QuestionsListContext.Provider>
      )}
    </div>
  );
};

export default BuildSurveyQuestions;
