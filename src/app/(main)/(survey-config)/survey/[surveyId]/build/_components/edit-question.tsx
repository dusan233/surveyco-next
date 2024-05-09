import React from "react";
import MultiChoiceQuestion from "./build-multichoice-question";
import TextboxQuestionn from "./build-textbox-question";
import QuestionCard from "@/components/questions/question-card";
import EditQuestionHeader from "./edit-question-header";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { Question, QuestionType, UnsavedQuestion } from "@/types/question";
import { isSavedQuestion } from "@/lib/util/questionUtils";

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
    id: isSavedQuestion(question) ? question.id : "unsavedQuestion",
  });
  const dragStyle = {
    opacity: isDragging ? "0.4" : undefined,
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const renderQuestionEditor = (question: Question | UnsavedQuestion) => {
    if (question.type === QuestionType.textbox)
      return (
        <TextboxQuestionn
          surveyId={surveyId}
          qIndex={qIndex}
          scrollToQuestion={scrollToQuestion}
          question={question}
        />
      );
    return (
      <MultiChoiceQuestion
        scrollToQuestion={scrollToQuestion}
        surveyId={surveyId}
        qIndex={qIndex}
        question={question}
      />
    );
  };

  const isUnsavedQuestion = !isSavedQuestion(question);

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
