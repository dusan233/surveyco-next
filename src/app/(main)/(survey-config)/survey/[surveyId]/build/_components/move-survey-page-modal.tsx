"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useSurveyPages from "@/hooks/useSurveyPages";
import useBuildQuestionsContext from "../_hooks/useBuildQuestionsContext";
import MoveSurveyPageForm from "./move-survey-page-form";
import { DialogProps } from "@/types/common";

type MovePageDialogProps = DialogProps & {
  surveyId: string;
};

const MoveSurvePageDialog = ({
  isOpen,
  onOpenChange,
  surveyId,
}: MovePageDialogProps) => {
  const currentPage = useBuildQuestionsContext((s) => s.currentPage);
  const { surveyPages } = useSurveyPages(surveyId);
  const pageNumber =
    surveyPages!.findIndex((page) => page.id === currentPage!.id) + 1;

  return (
    <Dialog modal onOpenChange={onOpenChange} open={isOpen}>
      <DialogContent className="sm:max-w-[425px] md:max-w-lg">
        <DialogHeader hidden>
          <DialogTitle>Move Page {pageNumber}</DialogTitle>
        </DialogHeader>
        <MoveSurveyPageForm
          surveyId={surveyId}
          onMovePage={() => onOpenChange()}
        />
      </DialogContent>
    </Dialog>
  );
};

export default MoveSurvePageDialog;