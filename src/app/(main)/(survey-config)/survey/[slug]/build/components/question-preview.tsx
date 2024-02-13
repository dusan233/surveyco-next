import { MultipleChoiceQuestion, Question, QuestionType } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

import MultiChoiceQuestionResponse from "./multichoice-question-response";
import DropdownQuestionResponse from "./dropdown-question-response";
import TextboxQuestionResponse from "./textbox-question-response";
import CheckboxesQuestionResponse from "./checkboxes-question-response";
import QuestionDescription from "@/components/questions/question-description";
import useBuildQuestionsContext from "../hooks/useBuildQuestionsContext";

type QuestionPreviewProps = {
  question: Question;
  isOverlay?: boolean;
  activeId: string | null;
};

const QuestionPreview = ({
  question,
  isOverlay = false,
  activeId,
}: QuestionPreviewProps) => {
  const setQueueQuestion = useBuildQuestionsContext((s) => s.setQueueQuestion);
  const setAddingQuestion = useBuildQuestionsContext(
    (s) => s.setAddingQuestion
  );
  const [showDraggableState, setShowDraggableState] = useState(() => isOverlay);

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    isDragging,
    transform,
    transition,
  } = useSortable({ id: question.id });

  const style = {
    opacity: isDragging ? "0.4" : undefined,
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    if (!activeId) {
      setShowDraggableState(false);
    }
  }, [activeId]);

  const renderQuestionPreviewResponseInput = (question: Question) => {
    switch (question.type) {
      case QuestionType.multiple_choice:
        return (
          <MultiChoiceQuestionResponse
            question={question as MultipleChoiceQuestion}
            isPreview
          />
        );
      case QuestionType.dropdown:
        return (
          <DropdownQuestionResponse
            question={question as MultipleChoiceQuestion}
            isPreview
          />
        );
      case QuestionType.textbox:
        return <TextboxQuestionResponse question={question} isPreview />;
      case QuestionType.checkboxes:
        return (
          <CheckboxesQuestionResponse
            question={question as MultipleChoiceQuestion}
            isPreview
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      data-question="true"
      onClick={() => {
        console.log("seting" + question.id);
        setQueueQuestion(question.id);
        setAddingQuestion(false);
      }}
      onMouseOver={() => {
        setShowDraggableState(true);
      }}
      onMouseLeave={() => {
        if (!isOverlay) {
          setShowDraggableState(false);
        }
      }}
      ref={setNodeRef}
      style={style}
      className={`px-3 py-5 mb-4 ${
        isDragging &&
        "outline-dashed outline-2 outline-blue-500 outline-offset-4"
      } shadow-sm !cursor-pointer relative bg-white rounded-sm hover:bg-slate-200 after:absolute after:z-[100] after:top-0 after:left-0 after:bg-transparent after:w-full after:h-full`}
    >
      <QuestionDescription question={question} />

      <div className="mt-7 ml-7">
        {renderQuestionPreviewResponseInput(question)}
      </div>

      {showDraggableState && (
        <button
          {...attributes}
          {...listeners}
          ref={setActivatorNodeRef}
          className="absolute cursor-move z-10 right-[-1.7rem] translate-y-[-50%] top-1/2"
        >
          <GripVertical className="w-7 h-7" />
        </button>
      )}
    </div>
  );
};

export default QuestionPreview;
