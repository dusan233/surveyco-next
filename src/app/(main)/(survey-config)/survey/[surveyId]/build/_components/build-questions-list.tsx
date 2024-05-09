"use client";

import React, { useEffect } from "react";

import EditQuestion from "./edit-question";
import QuestionPreview from "./question-preview";
import { useLoadingToast } from "@/hooks/useLoadingToast";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useSmoothScrollToQuestion } from "@/hooks/useSmoothScroll";
import useBuildQuestionsContext from "../_hooks/useBuildQuestionsContext";
import SortableList from "@/components/layout/sortable-list";
import WindowedVirtualList from "@/components/layout/windowed-virtual-list";
import useSortQuestions from "../_hooks/useSortQuestions";
import { isSavedQuestion } from "@/lib/util/questionUtils";
import { Question, UnsavedQuestion } from "@/types/question";

type BuildQuestionsListProps = {
  surveyId: string;
};

const BuildQuestionsList = ({ surveyId }: BuildQuestionsListProps) => {
  const listRef = React.useRef<HTMLDivElement | null>(null);

  const questions = useBuildQuestionsContext((s) => s.questions);
  const selectedQuestion = useBuildQuestionsContext((s) => s.selectedQuestion);
  const currentPage = useBuildQuestionsContext((s) => s.currentPage);
  const { handleDragEnd, handleDragStart, isPending, activeId } =
    useSortQuestions(surveyId, currentPage!);

  const lastQuestionIndex = questions.length - 1;

  const savedQuestions = questions.filter((q) =>
    isSavedQuestion(q)
  ) as Question[];
  const activeQuestion = savedQuestions.find((q) => q.id === activeId)!;

  const virtualizer = useWindowVirtualizer({
    count: questions.length,
    estimateSize: () => 50,
    overscan: 5,
    scrollMargin: listRef.current?.offsetTop ?? 0,
  });

  useLoadingToast(isPending, "Moving question...");
  const scrollToQuestionIndex = useSmoothScrollToQuestion(virtualizer);

  const scrollToQuestion = (qIndex: number) => {
    scrollToQuestionIndex(qIndex, { aling: "start" });
  };
  //scroll to selected question
  useEffect(() => {
    const questionIndex = (
      questions.filter((q) => isSavedQuestion(q)) as Question[]
    ).findIndex((q) => q.id === selectedQuestion);
    const lastQuestion = questions[questions.length - 1];
    if (questionIndex !== -1)
      scrollToQuestionIndex(questionIndex, { aling: "start" });
    else if (questions.length && !isSavedQuestion(lastQuestion)) {
      scrollToQuestionIndex(questions.length - 1, { aling: "start" });
    }
  }, [selectedQuestion, questions, scrollToQuestionIndex]);

  const renderItem = (question: Question | UnsavedQuestion, index: number) => {
    if (isSavedQuestion(question)) {
      if (question.id === selectedQuestion)
        return (
          <EditQuestion
            scrollToQuestion={scrollToQuestion}
            key={question.id}
            question={question}
            surveyId={surveyId}
            qIndex={index}
          />
        );

      return (
        <QuestionPreview
          key={question.id}
          activeId={activeId}
          question={question}
        />
      );
    }
    return (
      <EditQuestion
        scrollToQuestion={scrollToQuestion}
        key={"new_question"}
        question={question}
        surveyId={surveyId}
        qIndex={index}
      />
    );
  };

  return (
    <SortableList
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      items={savedQuestions}
      overlayItem={
        activeId ? (
          <QuestionPreview
            key={activeQuestion.id}
            isOverlay
            question={activeQuestion}
            activeId={activeId}
          />
        ) : null
      }
    >
      <WindowedVirtualList
        virtualizer={virtualizer}
        listRef={listRef}
        renderItem={(virtualRow) => {
          return renderItem(questions[virtualRow.index], virtualRow.index);
        }}
      />
    </SortableList>
  );
};

export default BuildQuestionsList;
