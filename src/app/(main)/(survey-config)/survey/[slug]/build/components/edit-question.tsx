import {
  MultipleChoiceQuestion,
  Question,
  QuestionType,
  TextboxQuestion,
  UnsavedQuestion,
  UnsavedTextQuestion,
} from "@/lib/types";
import React from "react";
import MultiChoiceQuestion from "./build-multichoice-question";
import TextboxQuestionn from "./build-textbox-question";
import QuestionCard from "@/components/questions/question-card";
import EditQuestionHeader from "./edit-question-header";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

type EditQuestionProps = {
  question: Question | UnsavedQuestion;
  surveyId: string;
  scrollToQuestion: (qIndex: number) => void;
  qIndex: number;
};

const EditQuestion = ({
  question,
  surveyId,
  scrollToQuestion,
  qIndex,
}: EditQuestionProps) => {
  const { setNodeRef, isDragging, transform, transition } = useSortable({
    id: question.id || "unsavedQuestion",
  });
  const dragStyle = {
    opacity: isDragging ? "0.4" : undefined,
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const renderQuestionEditor = (question: Question | UnsavedQuestion) => {
    return [
      QuestionType.dropdown,
      QuestionType.checkboxes,
      QuestionType.multiple_choice,
    ].includes(question.type) ? (
      <MultiChoiceQuestion
        scrollToQuestion={scrollToQuestion}
        surveyId={surveyId}
        qIndex={qIndex}
        question={question as MultipleChoiceQuestion}
      />
    ) : (
      <TextboxQuestionn
        surveyId={surveyId}
        qIndex={qIndex}
        scrollToQuestion={scrollToQuestion}
        question={question as TextboxQuestion | UnsavedTextQuestion}
      />
    );
  };

  const isUnsavedQuestion = !question.id;

  return (
    <div
      ref={!isUnsavedQuestion ? setNodeRef : undefined}
      style={!isUnsavedQuestion ? dragStyle : undefined}
    >
      <QuestionCard>
        <EditQuestionHeader surveyId={surveyId} question={question} />
        {renderQuestionEditor(question)}
      </QuestionCard>
    </div>
  );
};

export default EditQuestion;
