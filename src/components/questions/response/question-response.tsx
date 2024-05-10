"use client";

import React from "react";
import QuestionDescription from "../question-description";
import TextboxQuestionResponse from "./textbox-question-response";
import DropdownQuestionResponse from "./dropdown-question-response";
import MultiChoiceQuestionResponse from "./multichoice-question-response";
import CheckboxesQuestionResponse from "./checkboxes-question-response";
import { useFormContext } from "react-hook-form";
import AutoAnimate from "@/components/auto-animate";
import { AlertTriangleIcon } from "lucide-react";
import {
  Question,
  QuestionType,
  QuestionsResponsesData,
} from "@/types/question";

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
        question={questionData}
        name={`questionResponses.${index}.answer`}
        defaultValue={defaultValue as string}
      />
    );
  } else if (questionData.type === QuestionType.multiple_choice) {
    return (
      <MultiChoiceQuestionResponse
        question={questionData}
        name={`questionResponses.${index}.answer`}
        defaultValue={defaultValue as string}
      />
    );
  } else if (questionData.type === QuestionType.checkboxes) {
    return (
      <CheckboxesQuestionResponse
        question={questionData}
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
  const {
    formState: { errors },
  } = useFormContext<QuestionsResponsesData>();

  const error = errors.questionResponses?.[index];

  return (
    <div>
      <>
        <AutoAnimate duration={100}>
          {error && (
            <p className="text-xs mb-2 font-medium flex gap-1 items-center text-destructive">
              <AlertTriangleIcon className="h-3.5 w-3.5" />
              {error.message}
            </p>
          )}
        </AutoAnimate>
        <QuestionDescription question={question} />
        <div className="mt-7 ml-4 sm:ml-7">
          {renderQuestionResponseContent(question, index, defaultValue)}
        </div>
      </>
    </div>
  );
};

export default QuestionResponse;
