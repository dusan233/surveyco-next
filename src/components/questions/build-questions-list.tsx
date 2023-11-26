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
import EditQuestion from "./edit-question";
import QuestionPreview from "./question-preview";

type BuildQuestionsListProps = {
  questions: (Question | UnsavedQuestion)[];
  selectedQuestion: string | number | null;
  surveyId: string;
  addingQuestion: boolean;
};

const BuildQuestionsList = ({
  questions,
  selectedQuestion,
  addingQuestion,
  surveyId,
}: BuildQuestionsListProps) => {
  const lastQuestionIndex = questions.length - 1;

  const renderQuestion = (
    question: Question | UnsavedQuestion,
    index: number
  ) => {
    return question.id === selectedQuestion ||
      (lastQuestionIndex === index && addingQuestion) ? (
      <EditQuestion
        key={question.id}
        question={question}
        questionIndex={index}
        surveyId={surveyId}
      />
    ) : (
      <QuestionPreview
        key={question.id}
        surveyId={surveyId}
        question={question as Question}
      />
    );
  };

  return (
    <div className="flex flex-col rounded-sm py-3 gap-3 bg-slate-100">
      {questions.map((question, index) => {
        return renderQuestion(question, index);
      })}
    </div>
  );
};

export default BuildQuestionsList;
