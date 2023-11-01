"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Question,
  QuestionType,
  UnsavedQuestion,
} from "../../../../../lib/types";
import BuildQuestionsList from "@/components/questions/build-questions-list";

import AddQuestion from "@/components/questions/add-question";
import useSurvey from "@/lib/hooks/useQuiz";
import { useParams } from "next/navigation";
import Spinner from "@/components/ui/spinner";

const questionss = [
  {
    id: 1,
    type: QuestionType.multiple_choice,
    question_description: "<p>Question description 1</p>",
    updated_at: "2023-10-06",
    options: [
      {
        id: 1,
        description: "<p>Option 1</p>",
      },
      {
        id: 2,
        description: "<p>Option 2</p>",
      },
    ],
  },
  {
    id: 2,
    type: QuestionType.textbox,
    updated_at: "2023-10-06",
    question_description:
      "<p>This is first question and it is multi choice</p>",
  },
  {
    id: 3,
    type: QuestionType.checkboxes,
    updated_at: "2023-10-06",
    question_description: "<p>Description for the second question</p>",
    options: [
      {
        id: 1,
        description: "",
      },
      {
        id: 2,
        description: "",
      },
    ],
  },
];

const BuildSurveyPage = ({ params }: { params: { slug: string } }) => {
  const { survey, isLoading } = useSurvey(params.slug);

  const [questions, setQuestions] = useState<(Question | UnsavedQuestion)[]>(
    []
  );
  const previousSelectedQuestion = useRef<string | null | number>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<
    string | number | null
  >(null);

  useEffect(() => {
    if (survey) {
      setQuestions(survey.questions);
    }
  }, [survey]);

  useEffect(() => {
    if (previousSelectedQuestion.current) {
      console.log(previousSelectedQuestion.current);
      const isPreviousQUnsaved =
        questions.find(
          (question) => question.id === previousSelectedQuestion.current
        )?.updated_at === null;
      if (isPreviousQUnsaved) {
        console.log("teraj");
        setQuestions((questions) => {
          const newQuestions = questions.filter(
            (question) => question.id !== previousSelectedQuestion.current
          );
          console.log(newQuestions);
          previousSelectedQuestion.current = selectedQuestion;
          return newQuestions;
        });
      } else {
        previousSelectedQuestion.current = selectedQuestion;
      }
    } else {
      previousSelectedQuestion.current = selectedQuestion;
    }
  }, [selectedQuestion, questions]);

  const addNewQuestion = (type: QuestionType) => {
    const unsavedQuestionExists = !!questions.find(
      (question) => !question.updated_at
    );
    const newQuestionId = unsavedQuestionExists
      ? questions.length
      : questions.length + 1;
    setQuestions((questions) => {
      const newQuestion =
        type === QuestionType.textbox
          ? {
              id: newQuestionId,
              type: type,
              description: "",
              updated_at: null,
            }
          : {
              id: newQuestionId,
              type: type,
              description: "",
              updated_at: null,
              options: [
                {
                  id: 1,
                  description: "",
                },
                {
                  id: 2,
                  description: "",
                },
              ],
            };
      const filteredQuestions = questions.filter(
        (question) => question.updated_at
      );
      return [...filteredQuestions, newQuestion];
    });
    setSelectedQuestion(newQuestionId);
  };

  return (
    <div className="p-10 rounded-sm  bg-slate-100">
      {isLoading ? (
        <div className="flex justify-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          <BuildQuestionsList
            selectedQuestion={selectedQuestion}
            setSelectedQuestion={setSelectedQuestion}
            questions={questions}
          />
          <AddQuestion addNewQuestion={addNewQuestion} />
        </>
      )}
    </div>
  );
};

export default BuildSurveyPage;
