"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CopyQuestionForm from "./copy-question-form";
import { DialogProps } from "@/types/common";

type CopyQuestionDialogProps = DialogProps & {
  surveyId: string;
  questionId: string;
};

const CopyQuestionDialog = ({
  isOpen,
  onOpenChange,
  surveyId,
  questionId,
}: CopyQuestionDialogProps) => {
  return (
    <Dialog modal onOpenChange={onOpenChange} open={isOpen}>
      <DialogContent className="sm:max-w-[425px] md:max-w-lg">
        <DialogHeader hidden>
          <DialogTitle>Copy Question</DialogTitle>
          <DialogDescription>
            Copy this question and put it on ...
          </DialogDescription>
        </DialogHeader>
        <CopyQuestionForm
          surveyId={surveyId}
          copyQuestionId={questionId}
          onCloseDialog={onOpenChange}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CopyQuestionDialog;
