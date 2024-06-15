"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogProps } from "@/types/common";
import useMoveQuestion from "../_hooks/useMoveQuestion";
import { useLoadingToast } from "@/hooks/useLoadingToast";
import { PlaceQuestionData } from "@/types/question";
import PlaceQuestion from "./place-question";
import { getErrorMessage } from "@/lib/util/errorUtils";
import { toastError } from "@/lib/util/toastError";

type MoveQuestionModalProps = DialogProps & {
  surveyId: string;
  questionId: string;
};

const MoveQuestionModal = ({
  isOpen,
  onClose,
  surveyId,
  questionId,
}: MoveQuestionModalProps) => {
  const { moveQuestionMutationAsync, isPending } = useMoveQuestion();

  const handleMoveQuestion = async (values: PlaceQuestionData) => {
    try {
      onClose();
      const movedQuestion = await moveQuestionMutationAsync({
        surveyId,
        questionId: questionId,
        data: values,
      });

      return movedQuestion;
    } catch (err) {
      toastError(getErrorMessage(err));
    }
  };

  useLoadingToast(isPending, "Moving question...");

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent className="sm:max-w-[425px] md:max-w-lg">
        <DialogHeader hidden>
          <DialogTitle>Move Question</DialogTitle>
          <DialogDescription>Move this question to...</DialogDescription>
        </DialogHeader>

        <div className="gap-2 mt-5">
          <PlaceQuestion
            surveyId={surveyId}
            isPending={isPending}
            onCancel={onClose}
            onPlaceQuestion={handleMoveQuestion}
            type="move"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MoveQuestionModal;
