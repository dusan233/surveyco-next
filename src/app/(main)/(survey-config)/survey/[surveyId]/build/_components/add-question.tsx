"use client";

import React from "react";

import useBuildQuestionsContext from "../_hooks/useBuildQuestionsContext";
import {
  createNewQuestion,
  getQuestionTypes,
  isSavedQuestion,
} from "@/lib/util/questionUtils";
import { QuestionType } from "@/types/question";

type AddQuestionProps = {
  onAddQuestion?: () => void;
};

const AddQuestion = ({ onAddQuestion }: AddQuestionProps) => {
  const updateQuestions = useBuildQuestionsContext((s) => s.updateQuestions);
  const setAddingQuestion = useBuildQuestionsContext(
    (s) => s.setAddingQuestion
  );
  const setQueueQuestion = useBuildQuestionsContext((s) => s.setQueueQuestion);

  const addNewQuestion = (type: QuestionType) => {
    updateQuestions((questions) => {
      const filteredQuestions = questions.filter((question) =>
        isSavedQuestion(question)
      );
      const lastQuestionNumber = filteredQuestions.length
        ? filteredQuestions[filteredQuestions.length - 1].number
        : 0;
      const newQuestionNumber = lastQuestionNumber + 1;
      const newQuestion = createNewQuestion(type, newQuestionNumber);
      const updatedQuestions = [...filteredQuestions, newQuestion];

      return updatedQuestions;
    });
    setQueueQuestion(null);
    setAddingQuestion(true);
  };

  return (
    <div className="grid gap-2 grid-cols-2">
      {getQuestionTypes().map((questionType, index) => {
        const Icon = questionType.icon;
        return (
          <button
            onClick={() => {
              addNewQuestion(questionType.type);
              onAddQuestion?.();
            }}
            className="flex gap-2 hover:bg-slate-100 items-center p-2"
            key={index}
          >
            <div>
              <Icon />
            </div>
            <div>{questionType.title}</div>
          </button>
        );
      })}
    </div>
  );
};

export default AddQuestion;
