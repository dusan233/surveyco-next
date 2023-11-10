"use client";

import React from "react";
import {
  MultipleChoiceQuestion,
  Question,
  QuestionType,
  TextboxQuestion,
  UnsavedQuestion,
} from "../../lib/types";
import MultiChoiceQuestion from "./multichoice-question";
import TextboxQuestionn from "./textbox-question";

type BuildQuestionsListProps = {
  questions: (Question | UnsavedQuestion)[];
  selectedQuestion: string | number | null;
  surveyId: string;
  addingQuestion: boolean;
  setPendingQuestion: React.Dispatch<React.SetStateAction<string | null>>;
  setAddingQuestion: React.Dispatch<React.SetStateAction<boolean>>;
};

const BuildQuestionsList = ({
  questions,
  selectedQuestion,
  setPendingQuestion,
  addingQuestion,
  surveyId,
  setAddingQuestion,
}: BuildQuestionsListProps) => {
  const lastQuestionIndex = questions.length - 1;

  const renderQuestionDesc = (question: Question | UnsavedQuestion) => {
    return (
      <div
        data-question="true"
        onClick={() => {
          setPendingQuestion(question.id!);
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
  };

  const renderQuestionEditor = (
    question: Question | UnsavedQuestion,
    index: number
  ) => {
    return [
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
        surveyId={surveyId}
        index={index}
        question={question as TextboxQuestion}
      />
    );
  };
  const renderQuestion = (
    question: Question | UnsavedQuestion,
    index: number
  ) => {
    return question.id === selectedQuestion ||
      (lastQuestionIndex === index && addingQuestion)
      ? renderQuestionEditor(question, index)
      : renderQuestionDesc(question);
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
