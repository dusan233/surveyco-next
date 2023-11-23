import {
  MultipleChoiceQuestion,
  Question,
  QuestionType,
  TextboxQuestion,
  UnsavedQuestion,
} from "@/lib/types";
import React from "react";
import MultiChoiceQuestion from "./multichoice-question";
import TextboxQuestionn from "./textbox-question";
import QuestionCard from "./question-card";
import QuestionHeader from "./question-header";

type EditQuestionProps = {
  question: Question | UnsavedQuestion;
  questionIndex: number;
  surveyId: string;
};

const EditQuestion = ({
  question,
  questionIndex,
  surveyId,
}: EditQuestionProps) => {
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

  return (
    <QuestionCard>
      <QuestionHeader index={questionIndex} type={question.type} />
      {renderQuestionEditor(question, questionIndex)}
    </QuestionCard>
  );
};

export default EditQuestion;
