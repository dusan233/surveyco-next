"use client";

import React, { useState } from "react";
import {
  MultipleChoiceQuestion,
  Question,
  QuestionType,
  TextboxQuestion,
  UnsavedQuestion,
} from "../../lib/types";
import MultiChoiceQuestion from "./multichoice-question";
import TextboxQuestionn from "./textbox-question";
import { QuestionsListContext } from "@/lib/context";

type BuildQuestionsListProps = {
  questions: (Question | UnsavedQuestion)[];
  selectedQuestion: string | number | null;
  surveyId: string;
  addingQuestion: boolean;
  setSelectedQuestion: React.Dispatch<
    React.SetStateAction<string | number | null>
  >;
  setAddingQuestion: React.Dispatch<React.SetStateAction<boolean>>;
};

const BuildQuestionsList = ({
  questions,
  selectedQuestion,
  setSelectedQuestion,
  addingQuestion,
  surveyId,
  setAddingQuestion,
}: BuildQuestionsListProps) => {
  const renderQuestion = (
    question: Question | UnsavedQuestion,
    index: number
  ) => {
    // if (addingQuestion) {
    //   if (questions.length === index + 1) {
    //     return [
    //       QuestionType.dropdown,
    //       QuestionType.checkboxes,
    //       QuestionType.multiple_choice,
    //     ].includes(question.type) ? (
    //       <MultiChoiceQuestion
    //         surveyId={surveyId}
    //         index={index}
    //         question={question as MultipleChoiceQuestion}
    //       />
    //     ) : (
    //       <TextboxQuestionn
    //         index={index}
    //         question={question as TextboxQuestion}
    //       />
    //     );
    //   } else {
    //     return (
    //       <div
    //         onClick={() => {
    //           setSelectedQuestion(question.id!);
    //           setAddingQuestion(false);
    //         }}
    //         className="p-2 cursor-pointer bg-white rounded-sm hover:bg-slate-200"
    //         key={question.id}
    //       >
    //         <div
    //           dangerouslySetInnerHTML={{
    //             __html: question.description,
    //           }}
    //         ></div>
    //         <div className="font-bold mt-2">type:{question.type}</div>
    //       </div>
    //     );
    //   }
    // } else {
    return question.id === selectedQuestion ? (
      [
        QuestionType.dropdown,
        QuestionType.checkboxes,
        QuestionType.multiple_choice,
      ].includes(question.type) ? (
        <MultiChoiceQuestion
          surveyId={surveyId}
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
          setSelectedQuestion(question.id!);
          setAddingQuestion(false);
        }}
        className="p-2 cursor-pointer bg-white rounded-sm hover:bg-slate-200"
        key={question.id}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: question.description,
          }}
        ></div>
        <div className="font-bold mt-2">type:{question.type}</div>
      </div>
    );
    // }
  };

  return (
    <div className="flex flex-col rounded-sm p-3 gap-3 bg-slate-100">
      {questions.map((question, index) => {
        return renderQuestion(question, index);
      })}
    </div>
  );
};

export default BuildQuestionsList;
