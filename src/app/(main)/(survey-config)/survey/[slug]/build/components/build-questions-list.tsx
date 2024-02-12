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
import { OperationPosition, Question, UnsavedQuestion } from "@/lib/types";
import EditQuestion from "./edit-question";
import QuestionPreview from "./question-preview";

import useMoveQuestion from "@/lib/hooks/useMoveQuestion";
import { useLoadingToast } from "@/lib/hooks/useLoadingToast";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useSmoothScrollToQuestion } from "@/lib/hooks/useSmoothScroll";
import useBuildQuestionsContext from "../useBuildQuestionsContext";

type BuildQuestionsListProps = {
  surveyId: string;
};

const BuildQuestionsList = ({ surveyId }: BuildQuestionsListProps) => {
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const listRef = React.useRef<HTMLDivElement | null>(null);

  const questions = useBuildQuestionsContext((s) => s.questions);
  const updateQuestions = useBuildQuestionsContext((s) => s.updateQuestions);
  const addingQuestion = useBuildQuestionsContext((s) => s.addingQuestion);
  const selectedQuestion = useBuildQuestionsContext((s) => s.selectedQuestion);
  const currentPage = useBuildQuestionsContext((s) => s.currentPage);

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
        surveyId={surveyId}
      />
    ) : (
      <QuestionPreview
        key={question.id}
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

      updateQuestions((prev) => {
        return arrayMove(prev, sourceIndex, destinationIndex);
      });
      setActiveId(null);
      moveQuestionMutation({
        surveyId,
        questionId: movingQuestionId,
        pageNumber: currentPage!.number,
        data: {
          position,
          questionId: over.id,
          pageId: currentPage!.id,
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
            key={activeQuestion.id}
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
