"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Question,
  QuestionType,
  UnsavedQuestion,
} from "../../../../../lib/types";
import BuildQuestionsList from "@/components/questions/build-questions-list";

import AddQuestion from "@/components/questions/add-question";
import Spinner from "@/components/ui/spinner";
import useSurveyQuestions from "@/lib/hooks/useSurveyQuestions";
import { QuestionsListContext } from "@/lib/context";

const BuildSurveyPage = ({ params }: { params: { slug: string } }) => {
  const { questions: questionsData, isLoading } = useSurveyQuestions(
    params.slug
  );

  const [questions, setQuestions] = useState<(Question | UnsavedQuestion)[]>(
    []
  );
  const [addingQuestion, setAddingQuestion] = useState(false);
  // const previousSelectedQuestion = useRef<string | null | number>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<
    string | number | null
  >(null);

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

  // useEffect(() => {
  //   if (previousSelectedQuestion.current) {
  //     console.log(previousSelectedQuestion.current);
  //     const isPreviousQUnsaved =
  //       questions.find(
  //         (question) => question.id === previousSelectedQuestion.current
  //       )?.updated_at === null;
  //     if (isPreviousQUnsaved) {
  //       console.log("teraj");
  //       setQuestions((questions) => {
  //         const newQuestions = questions.filter(
  //           (question) => question.id !== previousSelectedQuestion.current
  //         );
  //         console.log(newQuestions);
  //         previousSelectedQuestion.current = selectedQuestion;
  //         return newQuestions;
  //       });
  //     } else {
  //       previousSelectedQuestion.current = selectedQuestion;
  //     }
  //   } else {
  //     previousSelectedQuestion.current = selectedQuestion;
  //   }
  // }, [selectedQuestion, questions]);

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
    setSelectedQuestion(null);
    setAddingQuestion(true);
  };

  return (
    <div className="p-10 rounded-sm  bg-slate-100">
      {isLoading ? (
        <div className="flex justify-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <QuestionsListContext.Provider
          value={{
            setSelectedQuestion,
            setAddingQuestion,
            addingQuestion,
            lastQuestionIndex: questions.length - 1,
          }}
        >
          <BuildQuestionsList
            addingQuestion={addingQuestion}
            setAddingQuestion={setAddingQuestion}
            surveyId={params.slug}
            selectedQuestion={selectedQuestion}
            setSelectedQuestion={setSelectedQuestion}
            questions={questions}
          />
          <AddQuestion addQuestion={addNewQuestion} />
        </QuestionsListContext.Provider>
      )}
    </div>
  );
};

export default BuildSurveyPage;
