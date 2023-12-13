"use client";

import React, { useEffect, useId, useState } from "react";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { OperationPosition, Question, UnsavedQuestion } from "../../lib/types";
import EditQuestion from "./edit-question";
import QuestionPreview from "./question-preview";

import useMoveQuestion from "@/lib/hooks/useMoveQuestion";
import { useLoadingToast } from "@/lib/hooks/useLoadingToast";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useSmoothScrollToQuestion } from "@/lib/hooks/useSmoothScroll";

type BuildQuestionsListProps = {
  questions: (Question | UnsavedQuestion)[];
  selectedQuestion: string | number | null;
  surveyId: string;
  addingQuestion: boolean;
  currentPageId: string;
  currentPageNumber: number;
  setQuestions: (
    value: React.SetStateAction<(Question | UnsavedQuestion)[]>
  ) => void;
};

const BuildQuestionsList = ({
  questions,
  selectedQuestion,
  addingQuestion,
  surveyId,
  currentPageId,
  currentPageNumber,
  setQuestions,
}: BuildQuestionsListProps) => {
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const listRef = React.useRef<HTMLDivElement | null>(null);

  const { isPending, moveQuestionMutation } = useMoveQuestion();
  const lastQuestionIndex = questions.length - 1;

  const dndContextId = useId();
  const savedQuestions = questions.filter((q) => q.id) as Question[];
  const activeQuestion = savedQuestions.find((q) => q.id === activeId)!;
  const activeIndex = savedQuestions.findIndex((q) => q.id === activeId);

  const virtualizer = useWindowVirtualizer({
    count: questions.length,
    estimateSize: () => 50,
    overscan: 5,
    scrollMargin: listRef.current?.offsetTop ?? 0,
  });
  const virtualItems = virtualizer.getVirtualItems();

  const renderQuestion = (
    question: Question | UnsavedQuestion,
    index: number
  ) => {
    return question.id === selectedQuestion ||
      (lastQuestionIndex === index && addingQuestion) ? (
      <EditQuestion
        key={question.id}
        question={question}
        questionIndex={index}
        lastQuestionIndex={lastQuestionIndex}
        addingQuestion={addingQuestion}
        surveyId={surveyId}
      />
    ) : (
      <QuestionPreview
        index={index}
        key={question.id}
        surveyId={surveyId}
        activeId={activeId}
        question={question as Question}
      />
    );
  };

  useLoadingToast(isPending, "Moving question...");
  const scrollToQuestionIndex = useSmoothScrollToQuestion(virtualizer);

  useEffect(() => {
    const questionIndex = questions.findIndex((q) => q.id === selectedQuestion);
    if (questionIndex !== -1)
      scrollToQuestionIndex(questionIndex, { aling: "start" });
  }, [selectedQuestion, questions, virtualizer, scrollToQuestionIndex]);

  function handleDragStart(event: any) {
    const { active } = event;

    setActiveId(active.id);
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      const movingQuestionId = active.id;
      const destinationIndex = over.data.current.sortable.index;
      const sourceIndex = active.data.current.sortable.index;

      const position =
        sourceIndex > destinationIndex
          ? OperationPosition.before
          : OperationPosition.after;

      setQuestions((prev) => {
        return arrayMove(prev, sourceIndex, destinationIndex);
      });
      setActiveId(null);
      moveQuestionMutation({
        surveyId,
        questionId: movingQuestionId,
        pageNumber: currentPageNumber,
        data: {
          position,
          questionId: over.id,
          pageId: currentPageId,
        },
      });
    } else {
      setActiveId(null);
    }
  }

  return (
    <DndContext
      id={dndContextId}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={savedQuestions}
        strategy={verticalListSortingStrategy}
      >
        <div ref={listRef}>
          <div
            className="w-full relative"
            style={{
              height: `${
                virtualItems.length === 0 ? 0 : virtualizer.getTotalSize()
              }px`,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${
                  virtualItems[0]?.start - virtualizer.options.scrollMargin
                }px)`,
              }}
            >
              {virtualItems.map((virtualRow) => (
                <div
                  key={virtualRow.key}
                  data-index={virtualRow.index}
                  ref={virtualizer.measureElement}
                  className="pb-3"
                >
                  {renderQuestion(
                    questions[virtualRow.index],
                    virtualRow.index
                  )}
                </div>
              ))}
              {/* <div className="pb-3 h-32 bg-red-400">Hellpo there</div> */}
            </div>
          </div>
        </div>
      </SortableContext>
      <DragOverlay modifiers={[restrictToVerticalAxis]}>
        {activeId ? (
          <QuestionPreview
            index={activeIndex}
            key={activeQuestion.id}
            surveyId={surveyId}
            isOverlay
            question={activeQuestion}
            activeId={activeId}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default BuildQuestionsList;
