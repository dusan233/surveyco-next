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
};

const renderQuestionResponseContent = (
  questionData: Question,
  index: number
) => {
  if (questionData.type === QuestionType.textbox) {
    return <TextboxQuestionResponse name={`questions.${index}.answer`} />;
  } else if (questionData.type === QuestionType.dropdown) {
    return (
      <DropdownQuestionResponse
        question={questionData as MultipleChoiceQuestion}
        name={`questions.${index}.answer`}
      />
    );
  } else if (questionData.type === QuestionType.multiple_choice) {
    return (
      <MultiChoiceQuestionResponse
        question={questionData as MultipleChoiceQuestion}
        name={`questions.${index}.answer`}
      />
    );
  } else if (questionData.type === QuestionType.checkboxes) {
    return (
      <CheckboxesQuestionResponse
        question={questionData as MultipleChoiceQuestion}
        name={`questions.${index}.answer`}
      />
    );
  }
  return null;
};

const QuestionResponse = ({ question, index }: QuestionResponseProps) => {
  return (
    <QuestionCard>
      <>
        <QuestionDescription question={question} />
        <div className="mt-7 ml-7">
          {renderQuestionResponseContent(question, index)}
        </div>
      </>
    </QuestionCard>
  );
};

export default QuestionResponse;
