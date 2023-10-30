"use client";

import React, { useState } from "react";
import {
  MultipleChoiceQuestion,
  Question,
  QuestionType,
  TextboxQuestion,
} from "../../lib/types";
import MultiChoiceQuestion from "./multichoice-question";
import TextboxQuestionn from "./textbox-question";
import { QuestionsListContext } from "@/lib/context";

type BuildQuestionsListProps = {
  questions: Question[];
  selectedQuestion: string | number | null;
  setSelectedQuestion: React.Dispatch<
    React.SetStateAction<string | number | null>
  >;
};

const BuildQuestionsList = ({
  questions,
  selectedQuestion,
  setSelectedQuestion,
}: BuildQuestionsListProps) => {
  return (
    <QuestionsListContext.Provider
      value={{ setSelectedQuestion: setSelectedQuestion }}
    >
      <div className="flex flex-col rounded-sm p-3 gap-2 bg-white">
        {questions.map((question, index) => {
          return question.id === selectedQuestion ? (
            [
              QuestionType.dropdown,
              QuestionType.checkboxes,
              QuestionType.multiple_choice,
            ].includes(question.type) ? (
              <MultiChoiceQuestion
                index={index}
                question={question as MultipleChoiceQuestion}
              />
            ) : (
              <TextboxQuestionn
                index={index}
                question={question as TextboxQuestion}
              />
            )
          ) : (
            <div
              onClick={() => {
                setSelectedQuestion(question.id);
              }}
              className="p-2 cursor-pointer rounded-sm hover:bg-gray-100"
              key={question.id}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: question.question_description,
                }}
              ></div>
              <div className="font-bold mt-2">type:{question.type}</div>
            </div>
          );
        })}
      </div>
    </QuestionsListContext.Provider>
  );
};

export default BuildQuestionsList;
