"use client";

import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import IndividualResponse from "./individual-response";
import useSurveyPages from "@/hooks/useSurveyPages";
import { DialogProps } from "@/types/common";

type IndividualResponseModalProps = DialogProps & {
  surveyId: string;
  responseId: string;
};

const IndividualResponseModal = ({
  isOpen,
  onClose,
  surveyId,
  responseId,
}: IndividualResponseModalProps) => {
  useSurveyPages(surveyId);
  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent className="sm:max-w-[425px] md:max-w-2xl">
        <DialogHeader hidden>
          <DialogTitle>Respondent results</DialogTitle>
        </DialogHeader>
        <div className="gap-2 mt-5">
          <IndividualResponse surveyId={surveyId} responseId={responseId} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IndividualResponseModal;
