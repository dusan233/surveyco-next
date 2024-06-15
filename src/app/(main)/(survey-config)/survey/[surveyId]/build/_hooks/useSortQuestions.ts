import useMoveQuestion from "./useMoveQuestion";
import { useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import useBuildQuestionsContext from "./useBuildQuestionsContext";
import { SurveyPage } from "@/types/survey";
import { DragEndEvent } from "@/types/dnd";
import { OperationPosition } from "@/types/common";
import { getErrorMessage } from "@/lib/util/errorUtils";
import { toastError } from "@/lib/util/toastError";

export default function useSortQuestions(
  surveyId: string,
  currentPage: SurveyPage
) {
  const [activeId, setActiveId] = useState(null);
  const { isPending, moveQuestionMutationAsync } = useMoveQuestion();
  const updateQuestions = useBuildQuestionsContext((s) => s.updateQuestions);

  const handleDragStart = (event: any) => {
    const { active } = event;
    setActiveId(active.id);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    try {
      const { active, over } = event;

      if (active.id !== over.id) {
        const movingQuestionId = active.id;
        const destinationIndex = over.data.current?.sortable.index;
        const sourceIndex = active.data.current?.sortable.index;

        const position =
          sourceIndex > destinationIndex
            ? OperationPosition.before
            : OperationPosition.after;

        updateQuestions((questions) => {
          return arrayMove(questions, sourceIndex, destinationIndex);
        });
        setActiveId(null);
        await moveQuestionMutationAsync({
          surveyId,
          questionId: movingQuestionId as string,
          data: {
            position,
            questionId: over.id as string,
            pageId: currentPage!.id,
          },
        });
      } else {
        setActiveId(null);
      }
    } catch (err) {
      toastError(getErrorMessage(err));
    }
  };

  return {
    activeId,
    handleDragEnd,
    handleDragStart,
    isPending,
  };
}
