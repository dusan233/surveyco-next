import { QuestionsListContext } from "@/lib/context";
import { Question } from "@/lib/types";
import React, { useContext, useEffect, useState } from "react";
import QuestionActions from "./question-actions";
import { Draggable } from "react-beautiful-dnd";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

type QuestionPreviewProps = {
  question: Question;
  surveyId: string;
  index: number;
  isOverlay?: boolean;
  activeId: string | null;
};

const QuestionPreview = ({
  question,
  isOverlay = false,
  activeId,
  surveyId,
  index,
}: QuestionPreviewProps) => {
  const { setPendingQuestion, setAddingQuestion } =
    useContext(QuestionsListContext);
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

  return (
    <div
      data-question="true"
      onClick={() => {
        setPendingQuestion(question.id!);
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
      className={`p-3 mb-4 ${
        isDragging &&
        "outline-dashed outline-2 outline-blue-500 outline-offset-4"
      } shadow-sm !cursor-pointer relative bg-white rounded-sm hover:bg-slate-200 after:absolute after:top-0 after:left-0 after:bg-transparent after:w-full after:h-full`}
    >
      <div className="flex items-start gap-3">
        <span className="font-bold text-xl">{question.number}.</span>
        <h4
          className="flex-1 text-lg "
          dangerouslySetInnerHTML={{
            __html: question.description,
          }}
        ></h4>
      </div>
      <div className="font-bold mt-2">type:{question.type}</div>
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
