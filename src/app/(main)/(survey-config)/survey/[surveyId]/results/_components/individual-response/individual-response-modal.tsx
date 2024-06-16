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
import { DialogProps, SortObject } from "@/types/common";

type IndividualResponseModalProps = DialogProps & {
  surveyId: string;
  responseId: string;
  dataTableState: { sort: SortObject; page: number };
};

const IndividualResponseModal = ({
  isOpen,
  onClose,
  surveyId,
  responseId,
  dataTableState,
}: IndividualResponseModalProps) => {
  useSurveyPages(surveyId);
  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent className="sm:max-w-[425px] md:max-w-2xl">
        <DialogHeader hidden>
          <DialogTitle>Respondent results</DialogTitle>
        </DialogHeader>
        <div className="gap-2 mt-5">
          <IndividualResponse
            dataTableState={dataTableState}
            surveyId={surveyId}
            responseId={responseId}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IndividualResponseModal;
