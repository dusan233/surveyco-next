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
import useCopyQuestion from "../_hooks/useCopyQuestion";
import { PlaceQuestionData } from "@/types/question";
import { useLoadingToast } from "@/hooks/useLoadingToast";
import PlaceQuestion from "./place-question";
import { getErrorMessage } from "@/lib/util/errorUtils";
import { toastError } from "@/lib/util/toastError";

type CopyQuestionModalProps = DialogProps & {
  surveyId: string;
  questionId: string;
};

const CopyQuestionModal = ({
  isOpen,
  onClose,
  surveyId,
  questionId,
}: CopyQuestionModalProps) => {
  const { copyQuestionMutationAsync, isPending } = useCopyQuestion();

  const handleCopyQuestion = async (values: PlaceQuestionData) => {
    try {
      onClose();
      const copiedQuestion = await copyQuestionMutationAsync({
        surveyId,
        questionId: questionId,
        data: values,
      });

      return copiedQuestion;
    } catch (err) {
      toastError(getErrorMessage(err));
    }
  };

  useLoadingToast(isPending, "Copying question...");

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent className="sm:max-w-[425px] md:max-w-lg">
        <DialogHeader hidden>
          <DialogTitle>Copy Question</DialogTitle>
          <DialogDescription>
            Copy this question and put it on ...
          </DialogDescription>
        </DialogHeader>

        <div className="gap-2 mt-5">
          <PlaceQuestion
            surveyId={surveyId}
            isPending={isPending}
            onCancel={onClose}
            onPlaceQuestion={handleCopyQuestion}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CopyQuestionModal;
