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
import QuestionCard from "@/components/questions/question-card";
import QuestionHeader from "./question-header";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import useBuildQuestionsContext from "../hooks/useBuildQuestionsContext";

type EditQuestionProps = {
  question: Question | UnsavedQuestion;
  questionIndex: number;
  surveyId: string;
  lastQuestionIndex: number;
};

const EditQuestion = ({
  question,
  questionIndex,
  surveyId,
  lastQuestionIndex,
}: EditQuestionProps) => {
  const { setNodeRef, isDragging, transform, transition } = useSortable({
    id: question.id || "unsavedQuestion",
  });
  const addingQuestion = useBuildQuestionsContext((s) => s.addingQuestion);
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

  return (
    <div
      ref={!isAddQuestionEdit ? setNodeRef : undefined}
      style={!isAddQuestionEdit ? style : undefined}
      className="mb-4"
    >
      <QuestionCard>
        <QuestionHeader surveyId={surveyId} question={question} />
        {renderQuestionEditor(question, questionIndex)}
      </QuestionCard>
    </div>
  );
};

export default EditQuestion;
