"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import useBuildQuestionsContext from "../hooks/useBuildQuestionsContext";
import CopySurveyPageForm from "./copy-survey-page-form";
import useSurveyPages from "@/lib/hooks/useSurveyPages";

type CopyPageDialogProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  surveyId: string;
};

const CopySurvePageDialog = ({
  isOpen,
  onOpenChange,
  surveyId,
}: CopyPageDialogProps) => {
  const currentPage = useBuildQuestionsContext((s) => s.currentPage);
  const { surveyPages } = useSurveyPages(surveyId);
  const pageNumber =
    surveyPages!.findIndex((page) => page.id === currentPage!.id) + 1;

  return (
    <Dialog modal onOpenChange={onOpenChange} open={isOpen}>
      <DialogContent className="sm:max-w-[425px] md:max-w-lg">
        <DialogHeader hidden>
          <DialogTitle>Copy Page {pageNumber}</DialogTitle>
        </DialogHeader>
        <CopySurveyPageForm
          surveyId={surveyId}
          onCopyPage={() => onOpenChange()}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CopySurvePageDialog;
