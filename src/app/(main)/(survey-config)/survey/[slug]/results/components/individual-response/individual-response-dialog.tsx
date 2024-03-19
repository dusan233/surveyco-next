"use client";

import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import IndividualResponse from "./individual-response";
import useSurveyPages from "@/lib/hooks/useSurveyPages";

type IndividualResponseDialogProps = {
  isOpen: boolean;
  onOpenChange: (show: boolean) => void;
  surveyId: string;
  responseId: string;
};

const IndividualResponseDialog = ({
  isOpen,
  onOpenChange,
  surveyId,
  responseId,
}: IndividualResponseDialogProps) => {
  useSurveyPages(surveyId);
  return (
    <Dialog modal onOpenChange={onOpenChange} open={isOpen}>
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

export default IndividualResponseDialog;
