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
import { DialogProps } from "@/types/common";
import { PlacePageData } from "@/types/survey";
import useMoveSurveyPage from "../_hooks/useMoveSurveyPage";
import { useLoadingToast } from "@/hooks/useLoadingToast";
import { useQueryClient } from "@tanstack/react-query";
import PlaceSurveyPageForm from "./place-survey-page-form";
import { getErrorMessage } from "@/lib/util/errorUtils";
import { toastError } from "@/lib/util/toastError";

type MovePageModalProps = DialogProps & {
  surveyId: string;
};

const MoveSurvePageModal = ({
  isOpen,
  onClose,
  surveyId,
}: MovePageModalProps) => {
  const queryClient = useQueryClient();
  const currentPage = useBuildQuestionsContext((s) => s.currentPage);
  const { surveyPages } = useSurveyPages(surveyId);
  const { movePageMutationAsync, isPending } = useMoveSurveyPage();
  const pageNumber =
    surveyPages!.findIndex((page) => page.id === currentPage!.id) + 1;

  const handleMoveSurveyPage = async (values: PlacePageData) => {
    try {
      onClose();
      const movedSurveyPage = await movePageMutationAsync({
        surveyId,
        sourcePageId: currentPage!.id,
        data: { position: values.position, pageId: values.pageId },
      });
      await queryClient.invalidateQueries({
        queryKey: ["survey", surveyId, "questions", movedSurveyPage.id],
      });

      return movedSurveyPage;
    } catch (err) {
      toastError(getErrorMessage(err));
    }
  };

  useLoadingToast(isPending, "Moving page...");

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent className="sm:max-w-[425px] md:max-w-lg">
        <DialogHeader hidden>
          <DialogTitle>Move Page {pageNumber}</DialogTitle>
        </DialogHeader>

        <PlaceSurveyPageForm
          onPlacePage={handleMoveSurveyPage}
          onCancel={onClose}
          isPending={isPending}
          surveyPages={surveyPages!}
          type="move"
        />
      </DialogContent>
    </Dialog>
  );
};

export default MoveSurvePageModal;
