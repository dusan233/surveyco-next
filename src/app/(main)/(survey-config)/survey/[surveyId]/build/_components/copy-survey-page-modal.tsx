"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import useBuildQuestionsContext from "../_hooks/useBuildQuestionsContext";
import useSurveyPages from "@/hooks/useSurveyPages";
import { DialogProps } from "@/types/common";
import { PlacePageData } from "@/types/survey";
import useCopySurveyPage from "../_hooks/useCopySurveyPage";
import { useToast } from "@/components/ui/use-toast";
import { useLoadingToast } from "@/hooks/useLoadingToast";
import PlaceSurveyPageForm from "./place-survey-page-form";
import { getErrorMessage } from "@/lib/util/errorUtils";

type CopyPageModalProps = DialogProps & {
  surveyId: string;
};

const CopySurvePageModal = ({
  isOpen,
  onClose,
  surveyId,
}: CopyPageModalProps) => {
  const { toast } = useToast();
  const currentPage = useBuildQuestionsContext((s) => s.currentPage);
  const setCurrentPage = useBuildQuestionsContext((s) => s.setCurrentPage);
  const { copyPageMutationAsync, isPending } = useCopySurveyPage();
  const { surveyPages } = useSurveyPages(surveyId);
  const pageNumber =
    surveyPages!.findIndex((page) => page.id === currentPage!.id) + 1;

  const handleCopySurveyPage = async (values: PlacePageData) => {
    try {
      onClose();
      const copiedSurveyPage = await copyPageMutationAsync({
        surveyId,
        sourcePageId: currentPage!.id,
        data: { position: values.position, pageId: values.pageId },
      });
      setCurrentPage(copiedSurveyPage);
      return copiedSurveyPage;
    } catch (err) {
      toast({
        title: getErrorMessage(err),
        variant: "destructive",
      });
    }
  };

  useLoadingToast(isPending, "Copying page...");

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent className="sm:max-w-[425px] md:max-w-lg">
        <DialogHeader hidden>
          <DialogTitle>Copy Page {pageNumber}</DialogTitle>
        </DialogHeader>

        <PlaceSurveyPageForm
          onPlacePage={handleCopySurveyPage}
          onCancel={onClose}
          isPending={isPending}
          surveyPages={surveyPages!}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CopySurvePageModal;
