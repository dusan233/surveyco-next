import useMoveQuestion from "./useMoveQuestion";
import { useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import useBuildQuestionsContext from "./useBuildQuestionsContext";
import { useToast } from "@/components/ui/use-toast";
import { SurveyPage } from "@/types/survey";
import { DragEndEvent } from "@/types/dnd";
import { OperationPosition } from "@/types/common";

export default function useSortQuestions(
  surveyId: string,
  currentPage: SurveyPage
) {
  const { toast } = useToast();
  const [activeId, setActiveId] = useState(null);
  const { isPending, moveQuestionMutation } = useMoveQuestion();
  const updateQuestions = useBuildQuestionsContext((s) => s.updateQuestions);

  const handleDragStart = (event: any) => {
    const { active } = event;
    setActiveId(active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
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
      moveQuestionMutation(
        {
          surveyId,
          questionId: movingQuestionId as string,
          pageNumber: currentPage!.number,
          data: {
            position,
            questionId: over.id as string,
            pageId: currentPage!.id,
          },
        },
        {
          onError() {
            toast({
              title: "Something went wrong!",
              variant: "destructive",
            });
          },
        }
      );
    } else {
      setActiveId(null);
    }
  };

  return {
    activeId,
    handleDragEnd,
    handleDragStart,
    isPending,
  };
}
