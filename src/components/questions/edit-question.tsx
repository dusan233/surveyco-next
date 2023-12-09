import {
  MultipleChoiceQuestion,
  Question,
  QuestionType,
  TextboxQuestion,
  UnsavedQuestion,
} from "@/lib/types";
import React from "react";
import MultiChoiceQuestion from "./build-multichoice-question";
import TextboxQuestionn from "./build-textbox-question";
import QuestionCard from "./question-card";
import QuestionHeader from "./question-header";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

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
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    isDragging,
    transform,
    transition,
  } = useSortable({ id: question.id || "unsavedQuestion" });

  const style = {
    opacity: isDragging ? "0.4" : undefined,
    transform: CSS.Transform.toString(transform),
    transition,
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

  const isAddQuestionEdit =
    lastQuestionIndex === questionIndex && addingQuestion;

  return isAddQuestionEdit ? (
    <div ref={setNodeRef} style={style}>
      <QuestionCard>
        <QuestionHeader
          surveyId={surveyId}
          index={questionIndex}
          question={question}
        />
        {renderQuestionEditor(question, questionIndex)}
      </QuestionCard>
    </div>
  ) : (
    <div ref={setNodeRef} style={style} className="mb-4">
      <QuestionCard>
        <QuestionHeader
          surveyId={surveyId}
          index={questionIndex}
          question={question}
        />
        {renderQuestionEditor(question, questionIndex)}
      </QuestionCard>
    </div>
  );
};

export default EditQuestion;
