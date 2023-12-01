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
import { Draggable, DraggableProvided } from "react-beautiful-dnd";

type EditQuestionProps = {
  question: Question | UnsavedQuestion;
  questionIndex: number;
  surveyId: string;
  lastQuestionIndex: number;
  addingQuestion: boolean;
};

const EditQuestion = ({
  question,
  questionIndex,
  surveyId,
  lastQuestionIndex,
  addingQuestion,
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

  const isAddQuestionEdit =
    lastQuestionIndex === questionIndex && addingQuestion;

  return isAddQuestionEdit ? (
    <QuestionCard>
      <QuestionHeader
        surveyId={surveyId}
        index={questionIndex}
        question={question}
      />
      {renderQuestionEditor(question, questionIndex)}
    </QuestionCard>
  ) : (
    <Draggable
      isDragDisabled
      draggableId={question.id || ""}
      index={questionIndex}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mb-4"
        >
          <QuestionCard>
            <QuestionHeader
              surveyId={surveyId}
              index={questionIndex}
              question={question}
            />
            {renderQuestionEditor(question, questionIndex)}
          </QuestionCard>
        </div>
      )}
    </Draggable>
  );
};

export default EditQuestion;
