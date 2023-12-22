"use client";

import React from "react";
import QuestionCard from "../question-card";
import QuestionDescription from "../question-description";
import { MultipleChoiceQuestion, Question, QuestionType } from "@/lib/types";
import TextboxQuestionResponse from "./textbox-question-response";
import DropdownQuestionResponse from "./dropdown-question-response";
import MultiChoiceQuestionResponse from "./multichoice-question-response";
import CheckboxesQuestionResponse from "./checkboxes-question-response";

type QuestionResponseProps = {
  question: Question;
  index: number;
  defaultValue: string | string[];
};

const renderQuestionResponseContent = (
  questionData: Question,
  index: number,
  defaultValue: string | string[]
) => {
  if (questionData.type === QuestionType.textbox) {
    return (
      <TextboxQuestionResponse name={`questionResponses.${index}.answer`} />
    );
  } else if (questionData.type === QuestionType.dropdown) {
    return (
      <DropdownQuestionResponse
        question={questionData as MultipleChoiceQuestion}
        name={`questionResponses.${index}.answer`}
        defaultValue={defaultValue as string}
      />
    );
  } else if (questionData.type === QuestionType.multiple_choice) {
    return (
      <MultiChoiceQuestionResponse
        question={questionData as MultipleChoiceQuestion}
        name={`questionResponses.${index}.answer`}
        defaultValue={defaultValue as string}
      />
    );
  } else if (questionData.type === QuestionType.checkboxes) {
    return (
      <CheckboxesQuestionResponse
        question={questionData as MultipleChoiceQuestion}
        name={`questionResponses.${index}.answer`}
        defaultValue={defaultValue as string[]}
      />
    );
  }
  return null;
};

const QuestionResponse = ({
  question,
  index,
  defaultValue,
}: QuestionResponseProps) => {
  return (
    <QuestionCard>
      <>
        <QuestionDescription question={question} />
        <div className="mt-7 ml-7">
          {renderQuestionResponseContent(question, index, defaultValue)}
        </div>
      </>
    </QuestionCard>
  );
};

export default QuestionResponse;
