"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import PlaceQuestionForm from "../place-question-form";
import { DialogProps } from "@/types/common";

type CopyQuestionDialogProps = DialogProps & {
  surveyId: string;
  questionId: string;
};

const MoveQuestionDialog = ({
  isOpen,
  onOpenChange,
  surveyId,
  questionId,
}: CopyQuestionDialogProps) => {
  return (
    <Dialog modal onOpenChange={onOpenChange} open={isOpen}>
      <DialogContent className="sm:max-w-[425px] md:max-w-lg">
        <DialogHeader hidden>
          <DialogTitle>Move Question</DialogTitle>
          <DialogDescription>Move this question to...</DialogDescription>
        </DialogHeader>
        <PlaceQuestionForm
          surveyId={surveyId}
          onCloseDialog={onOpenChange}
          questionId={questionId}
        />
      </DialogContent>
    </Dialog>
  );
};

export default MoveQuestionDialog;
