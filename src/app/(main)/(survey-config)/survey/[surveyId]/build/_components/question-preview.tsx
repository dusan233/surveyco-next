"use client";

import { MultipleChoiceQuestion, Question, QuestionType } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

import MultiChoiceQuestionPreview from "./multichoice-question-preview";
import DropdownQuestionPreview from "./dropdown-question-preview";
import TextboxQuestionPreview from "./textbox-question-preview";
import CheckboxesQuestionPreview from "./checkboxes-question-preview";
import QuestionDescription from "@/components/questions/question-description";
import useBuildQuestionsContext from "../_hooks/useBuildQuestionsContext";

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
  const [showDraggable, setShowDraggable] = useState(() => isOverlay);

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
      setShowDraggable(false);
    }
  }, [activeId]);

  const renderQuestionPreviewContent = (question: Question) => {
    switch (question.type) {
      case QuestionType.multiple_choice:
        return (
          <MultiChoiceQuestionPreview
            question={question as MultipleChoiceQuestion}
          />
        );
      case QuestionType.dropdown:
        return <DropdownQuestionPreview />;
      case QuestionType.textbox:
        return <TextboxQuestionPreview />;
      case QuestionType.checkboxes:
        return (
          <CheckboxesQuestionPreview
            question={question as MultipleChoiceQuestion}
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
        setQueueQuestion(question.id);
        setAddingQuestion(false);
      }}
      onMouseOver={() => {
        setShowDraggable(true);
      }}
      onMouseLeave={() => {
        if (!isOverlay) {
          setShowDraggable(false);
        }
      }}
      ref={setNodeRef}
      style={style}
      className={`px-3 py-5 ${
        isDragging &&
        "outline-dashed outline-2 outline-blue-500 outline-offset-4"
      } shadow-sm !cursor-pointer relative bg-white rounded-sm hover:bg-slate-200 after:absolute after:z-[100] after:top-0 after:left-0 after:bg-transparent after:w-full after:h-full`}
    >
      <QuestionDescription question={question} />
      <div className="mt-7 ml-7">{renderQuestionPreviewContent(question)}</div>

      {showDraggable && (
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
