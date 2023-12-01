"use client";

import React from "react";
import {
  MultipleChoiceQuestion,
  OperationPosition,
  Question,
  QuestionType,
  TextboxQuestion,
  UnsavedQuestion,
} from "../../lib/types";
import MultiChoiceQuestion from "./multichoice-question";
import TextboxQuestionn from "./textbox-question";
import EditQuestion from "./edit-question";
import QuestionPreview from "./question-preview";
import { StrictModeDroppable } from "../strict-mode-droppable";
import {
  DragDropContext,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import useMoveQuestion from "@/lib/hooks/useMoveQuestion";
import { useLoadingToast } from "@/lib/hooks/useLoadingToast";

type BuildQuestionsListProps = {
  questions: (Question | UnsavedQuestion)[];
  selectedQuestion: string | number | null;
  surveyId: string;
  addingQuestion: boolean;
  currentPageId: string;
};

const BuildQuestionsList = ({
  questions,
  selectedQuestion,
  addingQuestion,
  surveyId,
  currentPageId,
}: BuildQuestionsListProps) => {
  const { isPending, moveQuestionMutation } = useMoveQuestion();
  const lastQuestionIndex = questions.length - 1;

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
        question={question as Question}
      />
    );
  };

  useLoadingToast(isPending);

  const handleDragEnd = (result: DropResult, provided: ResponderProvided) => {
    console.log(result);

    if (!result.destination || result.destination.index === result.source.index)
      return;

    const movingQuestionId = result.draggableId;
    const destinationIndex = result.destination?.index;
    const sourceIndex = result.source.index;

    const position =
      sourceIndex > destinationIndex
        ? OperationPosition.before
        : OperationPosition.after;
    const targetQuestion = questions.find(
      (_, index) => index === destinationIndex
    ) as Question;
    moveQuestionMutation({
      surveyId,
      questionId: movingQuestionId,
      data: {
        position,
        questionId: targetQuestion.id,
        pageId: currentPageId,
      },
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <StrictModeDroppable droppableId="list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <div className="rounded-sm py-3 bg-slate-100">
              {questions.map((question, index) => {
                return renderQuestion(question, index);
              })}
            </div>
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
};

export default BuildQuestionsList;
